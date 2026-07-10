from fastapi import APIRouter, UploadFile, File
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database.connections import engine
from pwdlib import PasswordHash
import os
import uuid
from app.models.recordings import Recordings
password_hash=PasswordHash.recommended()
from app.models.user import Users
from app.security import create_access_token
from app.config import BASE_DIR
from app.schemas.user import UserSignup, UserLogin
recording_dir = BASE_DIR / "recordings"
os.makedirs(recording_dir, exist_ok=True)
router=APIRouter()




@router.post("/upload")
async def upload(audio: UploadFile = File(...)):
    filename = f"{uuid.uuid4()}.webm"
    filepath = (
        recording_dir / filename
    )  # to write audio into the file at exact location

    with open(filepath, "wb") as f:
        f.write(await audio.read())

    relative_path = f"recordings/{filename}"

    with Session(engine) as session:
        recording = Recordings(
            created_at=datetime.now(timezone.utc),
            audio_path=str(relative_path),  # to save in database
            transcript=None,
        )
        session.add(recording)
        session.commit()

        print("<<<======== Recordings MetaData Saved In Table ======>>>")
    return {"message": "saved"}
