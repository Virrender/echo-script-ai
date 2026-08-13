#Echo Script

#About

Echo Script is a web application for voice recording, speech-to-text transcription, and text-to-speech generation. It provides synchronized word-level timestamps so users can follow the transcript while audio plays.

#Features
Voice recording
Speech-to-text transcription with Whisper
Word-level timestamps
Text-to-speech generation with Kokoro
Synchronized audio and transcript playback
Search recordings and generations
Pagination
User authentication
Audio and Markdown file downloads


#Tech Stack
Frontend
React
Vite
Tailwind CSS
Lucide React
Material UI

#Backend
FastAPI
SQLAlchemy
PostgreSQL
Whisper
Kokoro TTS
JWT authentication


#Backend API

Main API endpoints include:

POST /auth/signup — Create a user account
POST /auth/login — Authenticate a user
POST /recordings/upload — Upload a recording for transcription
GET /recordings — Get recordings
GET /recordings/{id} — Get a recording
GET /recordings/{id}/audio — Get recording audio
POST /generation/upload — Generate speech from a script
GET /generation — Get generations
GET /generation/{id} — Get a generation
GET /generation/{id}/audio — Get generated audio

#Setup

cd backend
python -m venv myvenv
Activate the virtual environment.
myvenv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

#Frontend
cd frontend
npm install
npm run dev