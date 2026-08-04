
from fastapi import APIRouter , Depends
from app.models.user import Users
from sqlalchemy.orm import Session
from app.models.generations import Generations
from app.security import get_current_user
from app.database.connections import engine
from app.schemas.generations import GenerationsCreate
from datetime import datetime, timezone
from app.config import BASE_DIR
from kokoro import KPipeline
import soundfile as sf
import os
import uuid

generations_dir = BASE_DIR / "generations"
os.makedirs(generations_dir, exist_ok=True)


print("Loading pipeline...")
pipeline = KPipeline(lang_code="a")
print("Pipeline loaded!")

router=APIRouter(prefix="/generation", tags=["Generations"])

@router.post("/upload")
async def upload(
    tts: GenerationsCreate,
    current_user: Users = Depends(get_current_user)):

    generator = pipeline(
    text=tts.script,
    voice="af_heart",
        )

    audio = b""
    for _, _, audio_chunk in generator:
        audio = audio_chunk
        break

    filename = f"{uuid.uuid4()}.wav"

    filepath = (
            generations_dir / filename
        )
    sf.write(filepath, audio, 24000)

    relative_path = f"generations/{filename}"

    segments = [
    {
        "word": token.text,
        "start": token.start_ts,
        "end": token.end_ts,
    }
    for token in result.tokens
]

    with Session(engine) as session:
        generation= Generations(
                created_at=datetime.now(timezone.utc),
                title=tts.title,
                audio_path=relative_path,
                script=tts.script,
                user_id=current_user.id,
        )
        session.add(generation)
        session.commit()

    return {
        "message":"saved",
        "title":tts.title,
        "script":tts.script,
        "audio_path":filepath
    }






    