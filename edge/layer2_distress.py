# edge/layer2_distress.py

import numpy as np
import sounddevice as sd
import tensorflow_hub as hub
import librosa
import threading
from alert_client import send_alert
from config import CONFIRMATION_WINDOW_SECONDS

_model = None
_model_lock = threading.Lock()

def _get_model():
    global _model
    if _model is None:
        with _model_lock:
            if _model is None:  # double-check after acquiring lock
                print("[Layer 2] Loading YAMNet model (first trigger)...")
                _model = hub.load('https://tfhub.dev/google/yamnet/1')
                print("[Layer 2] YAMNet ready.")
    return _model

SAFETY_INDICES = {
    10: "Yell",
    11: "Shouting",
    12: "Screaming",
    14: "Crying",
    437: "Crash",
    441: "Glass",
    442: "Shatter"
}

_running = False
_running_lock = threading.Lock()


def classify_audio(waveform: np.ndarray) -> tuple[str, float]:
    """
    Takes a float32 waveform.
    Returns (status, highest_danger_score).
    status is one of: "confirmed", "possible", "safe"
    """
    if np.max(np.abs(waveform)) > 0:
        waveform = waveform / np.max(np.abs(waveform))

    model = _get_model()
    scores, _, _ = model(waveform)

    peak_scores = np.max(scores, axis=0)

    safety_score = max([peak_scores[i] for i in SAFETY_INDICES.keys()])

    print("\n[Layer 2] --- Distress Analysis ---")
    detected_any = False
    for idx, name in SAFETY_INDICES.items():
        score = peak_scores[idx]
        if score > 0.10:
            indicator = "🔴" if score > 0.30 else "🟡"
            print(f"  {indicator} {name}: {int(score * 100)}% certainty")
            detected_any = True

    if not detected_any:
        print("  No distress sounds detected above threshold.")

    if safety_score > 0.15:
        status = "confirmed"
        print(f"[Layer 2] 🔴 RED ALERT ({int(safety_score * 100)}% certainty)")
    elif safety_score > 0.10:
        status = "possible"
        print(f"[Layer 2] 🟡 YELLOW WARNING ({int(safety_score * 100)}% certainty)")
    else:
        status = "safe"
        safety_conf = int((1.0 - safety_score) * 100)
        print(f"[Layer 2] 🟢 Normal activity ({safety_conf}% confidence)")

    print("[Layer 2] ----------------------------\n")
    return status, float(safety_score)


def _record_window(duration_seconds: int) -> np.ndarray:
    """
    Records from microphone for a fixed window.
    Returns a float32 waveform at 16kHz.
    """
    print(f"[Layer 2] Recording {duration_seconds}s confirmation window...")
    recording = sd.rec(
        int(duration_seconds * 16000),
        samplerate=16000,
        channels=1,
        dtype='float32'
    )
    sd.wait()
    return recording.flatten()


def trigger_layer_two(device_id: str):
    """
    Called by layer1_keyword.py after wake word is detected.
    Runs in a background thread so Layer 1 keeps listening.
    Ignores the call if a Layer 2 session is already running.
    """
    global _running

    with _running_lock:
        if _running:
            print("[Layer 2] Already running — ignoring duplicate trigger.")
            return
        _running = True

    def _run():
        global _running
        try:
            waveform = _record_window(CONFIRMATION_WINDOW_SECONDS)
            status, score = classify_audio(waveform)

            if status in ("confirmed", "possible"):
                send_alert(level="confirmed", device_id=device_id)
            else:
                print("[Layer 2] No distress confirmed. No additional alert sent.")

        except Exception as e:
            print(f"[Layer 2] Error during classification: {e}")

        finally:
            with _running_lock:
                _running = False
            print("[Layer 2] Session complete. Listening resumed.")

    thread = threading.Thread(target=_run, daemon=True)
    thread.start()
