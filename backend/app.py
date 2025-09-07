from flask import Flask, request, jsonify
import mysql.connector, os, time

app = Flask(__name__)

DB_HOST = os.getenv("DB_HOST", "mysql")
DB_USER = os.getenv("DB_USER", "guest")
DB_PASS = os.getenv("DB_PASS", "guest123")
DB_NAME = os.getenv("DB_NAME", "guestbook")
DB_PORT = int(os.getenv("DB_PORT", "3306"))

def get_conn(retries=5, delay=3):
    for i in range(retries):
        try:
            return mysql.connector.connect(
                host=DB_HOST, user=DB_USER, password=DB_PASS, database=DB_NAME, port=DB_PORT
            )
        except Exception as e:
            print("DB connect failed:", e)
            time.sleep(delay)
    raise Exception("Could not connect to DB")

@app.route("/health")
def health():
    return jsonify({"status":"ok"})

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if not data or "username" not in data or "password" not in data:
        return jsonify({"message":"username and password required"}), 400
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) UNIQUE, password VARCHAR(255))")
    try:
        cursor.execute("INSERT INTO users (username, password) VALUES (%s,%s)", (data["username"], data["password"]))
        conn.commit()
    except mysql.connector.IntegrityError:
        conn.close()
        return jsonify({"message":"user exists"}), 409
    conn.close()
    return jsonify({"message":"User registered successfully"})

@app.route("/signin", methods=["POST"])
def signin():
    data = request.json
    if not data or "username" not in data or "password" not in data:
        return jsonify({"message":"username and password required"}), 400
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE username=%s AND password=%s", (data["username"], data["password"]))
    user = cursor.fetchone()
    conn.close()
    if user:
        return jsonify({"message":"Login successful"})
    return jsonify({"message":"Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
