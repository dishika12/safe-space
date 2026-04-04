from openwakeword.model import Model
import sounddevice as sd
import numpy as np
import time
from alert_client import send_alert
from layer2_distress import trigger_layer_two
from config import DEVICE_ID, SAFETY_WORD

model = Model(
    wakeword_models=["hey_jarvis"],
    inference_framework="onnx"
)

def audio_callback(indata, frames, time_info, status):
    if status:
        print(f"[Audio Warning]: {status}")

    audio_chunk = np.frombuffer(indata, dtype=np.int16)
    prediction = model.predict(audio_chunk)

    for word, score in prediction.items():
        if score > 0.5:
            print("\n" + "="*50)
            print(f"WAKE WORD DETECTED: {word} (confidence: {score:.2f})")
            print("="*50 + "\n")
            send_alert(level="possible", device_id=DEVICE_ID)
            trigger_layer_two(device_id=DEVICE_ID)

def start_listening():
    print(f"[Layer 1] Listening for: '{SAFETY_WORD}'...")
    print("[Layer 1] Press Ctrl+C to stop\n")

    try:
        with sd.InputStream(
            samplerate=16000,
            channels=1,
            dtype='int16',
            blocksize=1280,
            callback=audio_callback
        ):
            while True:
                time.sleep(0.1)

    except KeyboardInterrupt:
        print("\n[Layer 1] Stopped.")