from flask import Flask, jsonify, make_response
import mysql.connector

app = Flask(__name__)

# MANUAL CORS FIX — works 100% always
@app.after_request
def apply_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:9000"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# MySQL connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # use your MySQL password here
    database="logdb"
)

@app.route("/metrics", methods=["GET"])
def get_metrics():
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM metrics")
    rows = cursor.fetchall()
    return jsonify(rows)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
