"""
staff/app.py
Run with: python app.py
Install deps: pip install flask flask-socketio flask-login
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_socketio import SocketIO, emit
from datetime import datetime
from functools import wraps
import uuid

app = Flask(__name__)
app.secret_key = "safe-space-secret-key-change-in-production"
socketio = SocketIO(app, cors_allowed_origins="*")


STAFF_CREDENTIALS = {
    "admin": "safespace123",
    "staff1": "password1",
}

SENSORS = {}

ALERT_HISTORY = []

RESOURCES = [
    {"name": "Crisis Line (National)", "type": "Phone", "contact": "1-800-799-7233", "description": "24/7 domestic violence hotline"},
    {"name": "BC Housing Emergency", "type": "Phone", "contact": "604-433-2218", "description": "Emergency shelter referrals in BC"},
    {"name": "VictimLink BC", "type": "Phone", "contact": "1-800-563-0808", "description": "24/7 confidential support for victims"},
    {"name": "Battered Women's Support Services", "type": "Website", "contact": "www.bwss.org", "description": "Resources and advocacy for women"},
    {"name": "BC211", "type": "Website", "contact": "www.bc211.ca", "description": "Community social services directory"},
    {"name": "Covenant House", "type": "Phone", "contact": "604-685-7474", "description": "Youth crisis shelter services"},
]

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "username" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated


@app.route("/", methods=["GET"])
def index():
    if "username" in session:
        return redirect(url_for("dashboard"))
    return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()
        if STAFF_CREDENTIALS.get(username) == password:
            session["username"] = username
            return redirect(url_for("dashboard"))
        error = "Invalid username or password."
    return render_template("login.html", error=error)


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


@app.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html", sensors=SENSORS, username=session["username"])


@app.route("/resources")
@login_required
def resources():
    return render_template("resources.html", resources=RESOURCES, username=session["username"])


@app.route("/history")
@login_required
def history():
    return render_template("history.html", history=ALERT_HISTORY, username=session["username"])


@app.route("/alert", methods=["POST"])
def receive_alert():
    data = request.get_json(force=True)
    device_id  = data.get("device_id", "unknown")
    level      = data.get("level", "possible")
    signal_type = data.get("signal_type", "Unknown")

    alert_id = str(uuid.uuid4())[:8]
    timestamp = datetime.now()

    if device_id in SENSORS:
        SENSORS[device_id]["status"] = level
        SENSORS[device_id]["alert_type"] = signal_type
        SENSORS[device_id]["alert_id"] = alert_id

    ALERT_HISTORY.insert(0, {
        "id": alert_id,
        "device_id": device_id,
        "sensor_name": SENSORS.get(device_id, {}).get("name", device_id),
        "location": SENSORS.get(device_id, {}).get("location", "Unknown"),
        "level": level,
        "signal_type": signal_type,
        "timestamp": timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        "resolved": False,
    })

    socketio.emit("new_alert", {
        "device_id": device_id,
        "sensor_name": SENSORS.get(device_id, {}).get("name", device_id),
        "location": SENSORS.get(device_id, {}).get("location", "Unknown"),
        "level": level,
        "signal_type": signal_type,
        "alert_id": alert_id,
        "timestamp": timestamp.strftime("%H:%M:%S"),
    })

    return jsonify({"status": "ok", "alert_id": alert_id}), 200


@app.route("/resolve", methods=["POST"])
@login_required
def resolve_alert():
    data = request.get_json(force=True)
    device_id = data.get("device_id")
    alert_id  = data.get("alert_id")

    if device_id in SENSORS and SENSORS[device_id]["alert_id"] == alert_id:
        SENSORS[device_id]["status"] = "safe"
        SENSORS[device_id]["alert_type"] = None
        SENSORS[device_id]["alert_id"] = None

    for entry in ALERT_HISTORY:
        if entry["id"] == alert_id:
            entry["resolved"] = True
            entry["resolved_by"] = session.get("username")
            entry["resolved_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            break

    socketio.emit("alert_resolved", {"device_id": device_id, "alert_id": alert_id})
    return jsonify({"status": "resolved"}), 200

@app.route("/register", methods=["POST"])
def register_device():
    data = request.get_json(force=True)
    device_id = data.get("device_id")
    name      = data.get("name", device_id)
    location  = data.get("location", "Unknown")

    if device_id and device_id not in SENSORS:
        SENSORS[device_id] = {
            "name": name,
            "location": location,
            "status": "safe",
            "alert_type": None,
            "alert_id": None,
        }
        socketio.emit("device_registered", SENSORS[device_id] | {"device_id": device_id})
        print(f"[Server] New device registered: {device_id} @ {location}")

    return jsonify({"status": "ok"}), 200


@app.route("/api/sensors")
@login_required
def api_sensors():
    return jsonify(SENSORS)


if __name__ == "__main__":
    print("Safe Space Staff Server starting on http://0.0.0.0:8000")
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
