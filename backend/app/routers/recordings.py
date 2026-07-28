from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Query
from sqlalchemy import desc
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from datetime import datetime, timezone
from app.database.connections import engine
from pwdlib import PasswordHash
import os
import uuid
from app.models.recordings import Recordings

password_hash = PasswordHash.recommended()
from app.models.user import Users
from app.security import get_current_user
from app.config import BASE_DIR

import whisper

model = whisper.load_model("base")
# result = model.transcribe(str(audio_path))


recording_dir = BASE_DIR / "recordings"
os.makedirs(recording_dir, exist_ok=True)

router = APIRouter(prefix="/recordings", tags=["Recordings"])

from app.schemas.recordings import RecordingResponse


@router.post("/upload")
async def upload(
    current_user: Users = Depends(get_current_user), audio: UploadFile = File(...)
):
    filename = f"{uuid.uuid4()}.webm"
    filepath = (
        recording_dir / filename
    )  # to write audio into the file at exact location

    with open(filepath, "wb") as f:
        f.write(await audio.read())

    relative_path = f"recordings/{filename}"

    try:
        result = model.transcribe(str(filepath))
        transcript=result["text"]
    except Exception as e:
        print(f"Whisper Error: {e}")
        transcript = None

    print(transcript)

    with Session(engine) as session:
        recording = Recordings(
            created_at=datetime.now(timezone.utc),
            audio_path=str(relative_path),  # to save in database
            transcript=transcript,
            user_id=current_user.id,
        )
        session.add(recording)
        session.commit()
        print(f"current _user_id=====>{current_user.id}")
        print(f"current_user name ======>>>{current_user.username}")
        print("<<<======== Recordings MetaData Saved In Table ======>>>")


    return {"message": "saved", "transcript": transcript}


@router.get("", response_model=list[RecordingResponse])
async def recordings(
    limit:int = Query(
        default=10,
        gt=1,
        le=100
    ),
    current_user: Users = Depends(get_current_user)):
    with Session(engine) as session:
        recordings = (
            session.query(Recordings)
            .filter(Recordings.user_id == current_user.id)
            .order_by(desc(Recordings.created_at))
            .limit(limit)
            .all()
        )
        print(f"==========>{recordings}<==========")
        return recordings


@router.get("/{recording_id}")
async def get_recording(
    recording_id: int, current_user: Users = Depends(get_current_user)
):
    print("GET, RECORDING endpoint")
    with Session(engine) as session:
        recording = (
            session.query(Recordings).filter(Recordings.id == recording_id).first()
        )
        if recording is None:
            raise HTTPException(status_code=404, detail="Recording not found")

        if recording.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="This is not your recording")

        return recording


@router.delete("/{recording_id}")
async def delete_recording(
    recording_id: int, current_user: Users = Depends(get_current_user)
):
    with Session(engine) as session:
        recording = (
            session.query(Recordings).filter(Recordings.id == recording_id).first()
        )
        if recording is None:
            raise HTTPException(status_code=404, detail="Recording not found")

        if recording.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="Forbidden")

        path = BASE_DIR / recording.audio_path

        if path.exists():
            os.remove(path)

        session.delete(recording)
        session.commit()

        return {"message": f"Recording_id {recording.id } deleted"}


@router.get("/{recording_id}/audio")
async def get_audio(recording_id: int, current_user: Users = Depends(get_current_user)):
    print("GET AUDIO endpoint")
    with Session(engine) as session:
        recording = (
            session.query(Recordings).filter(Recordings.id == recording_id).first()
        )
        if recording is None:
            raise HTTPException(status_code=404, detail="Recording not found")

        if recording.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="Forbidden")

        filepath = BASE_DIR / recording.audio_path
        if not filepath.exists():
            raise HTTPException(status_code=404, detail="Audio file not found")

        print(f"======>>>>>{filepath}")
        print(f"======>>>>>Exists {filepath.exists()}")
        return FileResponse(filepath, media_type="audio/webm")
