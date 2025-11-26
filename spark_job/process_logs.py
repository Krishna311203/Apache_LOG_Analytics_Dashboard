from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, count, expr, percentile_approx

# 1. Create a Spark session
spark = SparkSession.builder.appName("LogAnalytics").getOrCreate()

# 2. Read the raw log file
df = spark.read.csv("logs/app.log", sep=" ", inferSchema=True)\
    .toDF("endpoint", "latency", "status")

# 3. Clean/convert types
df = df.withColumn("latency", df["latency"].cast("double"))\
       .withColumn("status", df["status"].cast("int"))

# 4. Compute metrics
result = df.groupBy("endpoint").agg(
    avg("latency").alias("avg_time"),
    count("*").alias("req_count"),
    expr("SUM(CASE WHEN status>=400 THEN 1 ELSE 0 END)").alias("error_count"),
    percentile_approx("latency", 0.95).alias("p95")
)

# 5. Write output to MySQL
result.write.format("jdbc").options(
    url="jdbc:mysql://localhost:3306/logdb",
    driver="com.mysql.cj.jdbc.Driver",
    dbtable="metrics",
    user="root",                     # change if you have custom user
    password=""
).mode("overwrite").save()
