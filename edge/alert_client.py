import requests
from config import BACKEND_URL, DEVICE_ID

def send_alert(level: str, device_id: str = DEVICE_ID, signal_type: str = "unknown"):
    """
    Send an alert to the staff dashboard backend.

    Args:
        level: "possible" or "confirmed"
        device_id: ID of the sensor/device (e.g. "shelter-room-1")
        signal_type: type of distress detected (e.g. "Screaming", "keyword")
    """
    try:
        response = requests.post(
            f"{BACKEND_URL}/alert",
            json={
                "level": level,
                "device_id": device_id,
                "signal_type": signal_type,
            },
            timeout=5
        )
        if response.status_code == 200:
            print(f"[Alert Client] Alert sent: level={level}, device={device_id}")
        else:
            print(f"[Alert Client] Server responded with {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("[Alert Client] Could not connect to staff server. Is it running?")
    except Exception as e:
        print(f"[Alert Client] Error sending alert: {e}")

def register_device():
    try:
        requests.post(f"{BACKEND_URL}/register", json={
            "device_id": DEVICE_ID,
            "name": "Room 1",
            "location": "East Wing",
        }, timeout=5)
        print("[Alert Client] Registered with staff server")
    except Exception as e:
        print(f"[Alert Client] Registration failed: {e}")
