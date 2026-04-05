# edge/main.py
import threading
from alert_client import register_device
from layer1_keyword import start_listening
from layer2_distress import continuous_monitor

if __name__ == "__main__":
    register_device()
    
    t = threading.Thread(target=continuous_monitor, daemon=True)
    t.start()

    start_listening()