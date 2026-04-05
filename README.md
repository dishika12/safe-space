# safe-space

SafeSpace is an infrastructure for mental rest in women’s shelters. By using privacy-first, edge-based audio intelligence, it recognizes patterns like vocal tension and physical energy shifts. This provides a responsive environment where needs are heard without the social risk of speaking out. It reduces the weight of hyper-vigilance, allowing residents to move out of survival mode and reconnect with their own identity and wellbeing.

Tech Stack Used : 
1. Edge (Detection Device)
2. Python
3. openwakeword - wake word detection (hey jarvis)
4. sounddevice - microphone audio recording
5. tensorflow_hub + YAMNet - audio classification model (screaming, crying, glass, etc.)
6. numpy - audio waveform processing
7. librosa - audio utilities
8. requests - sending HTTP alerts to the staff server
9. threading - running Layer 1 and Layer 2 concurrently

   

Staff Server (Backend)
1. Python + Flask - web server and REST API endpoints (/register, /alert, /resolve)
2. Flask-SocketIO - real-time WebSocket push to the browser dashboard

Setup Instructions:
1. Clone the repository.
2. Run the staff dashboard:
`cd staff`
`pip install -r requirements.txt`
`python app.py`
3. Run the edge device client:
`cd edge`
`pip install -r requirements.txt`
`python main.py`


Limitations: 
1. Laptop microphones differ in sensitivity, directionality, and noise handling. Shelter environments have overlapping voices, echoes, and background noise that are not replicated.
2. Training and testing data may not fully represent real distress signals across accents, languages, emotional intensity, or speaking styles.
