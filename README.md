# Echo Script

A web application for recording audio, transcribing speech, and generating speech from written scripts.

## Two Modes

### Echo Script

Record audio and get a timestamped transcript.

### Script Echo

Enter a script and generate speech with synchronized word timestamps.

## Features

### Echo

- Browser-based audio recording
- Audio upload and storage
- Speech-to-text using Whisper
- Word-level timestamps
- Synchronized audio and transcript playback
- Search, pagination, and downloads

### Script Echo

- Create and save scripts
- Text-to-speech using Kokoro
- Word-level timestamps
- Synchronized audio and text playback
- Search, pagination, and downloads
- Export scripts as `.md`

## Authentication

- User signup and login
- Gmail-only email validation
- OTP email verification
- Resend OTP
- JWT authentication
- Automatic login after verification

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router, Material UI, Framer Motion |
| Backend | FastAPI, SQLAlchemy, PostgreSQL, Alembic, Redis, JWT |
| AI / Audio | Whisper, Kokoro TTS, FFmpeg |

## Project Structure

```text
echo-script/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── email/
│   │   ├── models/
│   │   ├── redis/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── security.py
│   │   └── config.py
│   ├── alembic/
│   └── requirements-wsl.txt
│
└── README.md
```

## API

### Authentication

- `POST /auth/signup`
- `POST /auth/verify-email`
- `POST /auth/resend-otp`
- `POST /auth/login`

### Recordings

- `POST /recordings/upload`
- `GET /recordings`
- `GET /recordings/{id}`
- `GET /recordings/{id}/audio`

### Generations

- `POST /generation/upload`
- `GET /generation`
- `GET /generation/{id}`
- `GET /generation/{id}/audio`

## Setup

### Backend

Create a virtual environment:

```bash
python -m venv myvenv
```

Activate it on Linux / WSL:

```bash
source myvenv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements-wsl.txt
```

Create a `.env` file and configure the required environment variables.

Start the backend:

```bash
uvicorn app.main:app --reload
```

### Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your_secret_key_here
DATABASE_URL=your_database_url_here

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email_here
SMTP_PASSWORD=your_app_password_here
```

## How It Works

### Echo

```text
Audio
  ↓
FastAPI
  ↓
Whisper
  ↓
Timestamped Transcript
  ↓
PostgreSQL + File Storage
  ↓
Synchronized Playback
```

### Script Echo

```text
Script
  ↓
FastAPI
  ↓
Kokoro TTS
  ↓
Audio + Word Timestamps
  ↓
PostgreSQL + File Storage
  ↓
Synchronized Playback
```

### Email Verification

```text
Signup
  ↓
Generate OTP
  ↓
Store temporary data in Redis
  ↓
Send OTP
  ↓
Verify OTP
  ↓
Create Account
  ↓
Login
```

## Database

- **PostgreSQL** stores persistent application data including users, recordings, generations, transcripts, timestamps, file paths, and metadata.
- **Redis** handles temporary signup data and email verification OTPs.
- **Alembic** manages database migrations.

## Future Improvements

- Recording and generation deletion
- Improved audio controls
- More authentication options
- Additional STT/TTS models
- Production deployment
- Improved error handling
- More speech customization

## Author

- **Virender** - 
(https://github.com/Virrender)