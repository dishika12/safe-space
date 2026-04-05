#def trigger_layer_two(device_id: str):
 #   # Stub — replace when Layer 2 is implemented
  #  print(f"[Layer 2 Stub] Would classify audio for device={device_id}")



import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import librosa
import matplotlib.pyplot as plt
import sounddevice as sd
from scipy.io.wavfile import write
import datetime
import time
import os

# 1. Load the YAMNet model (Cache it locally to avoid redownloading every time)
print("Loading YAMNet Model...")
model = hub.load('https://tfhub.dev/google/yamnet/1')

# 2. Extract Class Names
class_map_path = model.class_map_path().numpy()
with tf.io.gfile.GFile(class_map_path) as f:
    class_names = [line.split(',')[1] for line in f.read().splitlines()[1:]]

# Configuration
SAFETY_INDICES = {
    10: "Yell", 11: "Shouting", 12: "Screaming",
    14: "Crying", 437: "Crash", 441: "Glass", 442: "Shatter",
    434: "Thump", 435: "Bang", 436: "Slap", 438: "Smash"
}

def record_audio_local(seconds=4, filename='current_segment.wav', fs=16000):
    """Replaces the Colab JS recorder with local system microphone access."""
    print(f"[*] Recording ({seconds}s)...", end="\r")
    # Record as float32 to match YAMNet expectations
    recording = sd.rec(int(seconds * fs), samplerate=fs, channels=1, dtype='float32')
    sd.wait()  # Wait until recording is finished
    write(filename, fs, recording)  # Save as wav file
    return recording.flatten()

def check_explosive_conflict(waveform, scores_matrix):
    """Detects conflict via classification scores AND sudden energy bursts."""
    shout_indices = [10, 11, 12]
    impact_indices = [434, 435, 436, 437, 438, 441, 442]

    # Energy-based check
    energy = np.array([np.sum(waveform[i:i+2048]**2) for i in range(0, len(waveform), 2048)])
    if len(energy) > 1:
        energy_delta = np.max(np.diff(energy))
        avg_energy = np.mean(energy)
        is_vocal_spike = energy_delta > (avg_energy * 8.0) and avg_energy > 0.0015
        is_heavy_burst = energy_delta > (avg_energy * 25.0) and avg_energy > 0.005
    else:
        is_vocal_spike = is_heavy_burst = False

    for i in range(scores_matrix.shape[0]):
        max_shout = np.max([scores_matrix[i, j] for j in shout_indices])
        max_impact = np.max([scores_matrix[i, j] for j in impact_indices])

        if max_shout > 0.35 or (is_vocal_spike and max_shout > 0.10):
            return True, "Explosive Vocal/Scolding", max(max_shout, 0.5 if is_vocal_spike else 0)

        if max_impact > 0.65 or (is_heavy_burst and max_impact > 0.35):
            return True, "Sudden Physical Impact", max(max_impact, 0.7 if is_heavy_burst else 0)

    return False, None, 0

def run_watchdog():
    print("\n" + "="*40)
    print("🛡️  WATCHDOG ACTIVE: LOCAL MONITORING MODE")
    print("Press Ctrl+C to stop.")
    print("="*40 + "\n")

    live_incidents = []

    try:
        while True:
            # 1. Capture local audio
            y_norm = record_audio_local(seconds=4)

            # 2. Run YAMNet Inference
            # YAMNet expects waveform in [-1.0, 1.0]
            scores, embeddings, spectrogram = model(y_norm)
            scores_np = scores.numpy()

            # 3. Analyze for danger
            is_danger, sound_type, intensity = check_explosive_conflict(y_norm, scores_np)

            if is_danger:
                timestamp = datetime.datetime.now().strftime('%H:%M:%S')
                print(f"\a") # System beep for alert
                print(f"🛑 ALERT [{timestamp}]: {sound_type} detected!")
                print(f"   Intensity: {int(intensity*100)}%")
                live_incidents.append({'Time': timestamp, 'Type': sound_type})
            else:
                # Optional: Visual heartbeat to show it's still running
                print(f"Listening... (Safe)            ", end="\r")

    except KeyboardInterrupt:
        print("\n\n🛑 Watchdog deactivated.")
        if live_incidents:
            print(f"Summary: {len(live_incidents)} incidents logged.")

if __name__ == "__main__":
    run_watchdog()
