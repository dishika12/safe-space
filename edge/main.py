from alert_client import register_device, send_alert
from layer1_keyword import start_listening

if __name__ == "__main__":
    register_device()
    start_listening()