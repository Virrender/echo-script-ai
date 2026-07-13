from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database.connections import engine
from pwdlib import PasswordHash
import os
import uuid
from app.models.recordings import Recordings
password_hash=PasswordHash.recommended()
from app.models.user import Users
from app.security import get_current_user
from app.config import BASE_DIR
from app.schemas.user import UserSignup, UserLogin
recording_dir = BASE_DIR / "recordings"
os.makedirs(recording_dir, exist_ok=True)
router=APIRouter()

from app.schemas.recordings import RecordingResponse




@router.post("/upload")
async def upload(
    current_user : Users = Depends(get_current_user),
    audio: UploadFile = File(...)):
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
            user_id=current_user.id
        )
        session.add(recording)
        session.commit()
        print(f"current _user_id=====>{current_user.id}")
        print(f"current_user name ======>>>{current_user.username}")
        print("<<<======== Recordings MetaData Saved In Table ======>>>")
    return {"message": "saved"}


@router.get("/recordings",
           response_model=list[RecordingResponse])
async def recordings(
    current_user : Users = Depends(get_current_user)   
):
    with Session(engine) as session:
        recordings=(
            session.query(Recordings)
            .filter(
                Recordings.user_id == current_user.id
            )
            .all()
        )
        print(f"==========>{recordings}<==========")
        return recordings
        
    