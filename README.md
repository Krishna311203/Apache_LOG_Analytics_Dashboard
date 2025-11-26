# 🚀 Spark Log Analytics Dashboard  
**A full end-to-end data engineering pipeline built with Apache Spark, MySQL, Flask, and a modern JavaScript dashboard.  
It processes real HTTP performance logs generated through Locust load testing on public APIs.**

---

## 📌 **Project Overview**

This project simulates a real-world data engineering pipeline:

1. **Locust** generates performance logs by load testing a public API.  
2. Logs are stored locally as raw text (`app.log`).  
3. **Apache Spark** processes the logs (ETL) to generate insights:  
   - Average latency  
   - Request count  
   - Error count  
   - Error rate  
   - P95 latency  
4. Spark writes the results into **MySQL** using JDBC.  
5. A **Flask backend API** exposes analytics from MySQL.  
6. A **JavaScript dashboard** visualizes the metrics using Chart.js  
   (multiple chart types + animations + custom styling).

This project demonstrates concepts used in real production systems like  
**Datadog, Grafana, AWS CloudWatch, and Kibana dashboards**.

---

## 🏗 **Architecture**

      +---------------------------+
      |      Public API (GET)     |
      +-------------+-------------+
                    |
                    | Load Testing
                    v
             +--------------+
             |    Locust    |
             +------+-------+
                    |
                    | Raw Logs
                    v
            /logs/app.log
                    |
                    | ETL Processing
                    v
      +-------------------------------+
      |           Apache Spark        |
      |  Aggregations + P95 + Errors  |
      +-------------------------------+
                    |
                    | JDBC Write
                    v
             +-------------+
             |   MySQL     |
             +------+------+
                    |
                    | Flask API
                    v
        +-------------------------+
        |     Frontend Dashboard |
        |  (Chart.js + Animations)|
        +-------------------------+

---

## 🛠 **Tech Stack**

### **Data Generation**
- Locust (Python)
- Public API: JSONPlaceholder

### **Big Data / ETL**
- Apache Spark (PySpark)
- DataFrame API, aggregations, percentile_approx

### **Database**
- MySQL 8+
- JDBC Connector

### **Backend**
- Flask
- Flask-CORS

### **Frontend**
- HTML, CSS
- Chart.js (Line, Bar, Doughnut, Radar)
- Grid-based responsive layout
- Animated dashboard cards + counters

---

## ✨ **Features**

### ✔ End-to-end Big Data pipeline  
### ✔ Generates realistic latency + error logs  
### ✔ Spark computes production-grade metrics  
### ✔ MySQL stores analytics for dashboard  
### ✔ Flask REST API exposes results  
### ✔ Beautiful animated UI  
### ✔ 5 powerful visual charts:
- Average Latency  
- Error Count  
- Request Count (Horizontal Bar)  
- Error Rate (Doughnut)  
- P95 Latency (Radar Chart)

### ✔ Summary section with animated counters


