
from fastapi import APIRouter , Depends, Query
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
from app.schemas.generations import PaginatedGenerationResponse

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

    result = next(generator)
    audio = result.output.audio.numpy()

    filename = f"{uuid.uuid4()}.wav"

        
    filepath = (
            generations_dir / filename
        )
    sf.write(filepath, audio, 24000)

    relative_path = f"generations/{filename}"

    segments = []

    for token in result.tokens:
        segment = {
            "word": token.text,
            "start": token.start_ts,
            "end": token.end_ts,
        }
        segments.append(segment)

    with Session(engine) as session:
        generation= Generations(
                created_at=datetime.now(timezone.utc),
                title=tts.title,
                audio_path=relative_path,
                script=tts.script,
                segments=segments,
                user_id=current_user.id,
        )
        session.add(generation)
        session.commit()

    return {
        "message":"saved",
        "title":tts.title,
        "script":tts.script,
        "audio_path":filepath,
        "segments":segments
    }


@router.get("", response_model=PaginatedGenerationResponse)
async def generations(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, gt=1, le=100),
    search: str | None = Query(default=None),
    order: Order = Query(default=Order.desc),
    current_user: Users = Depends(get_current_user),
):

    with Session(engine) as session:

        query = session.query(Generations).filter(Generations.user_id == current_user.id)

        if search:
            search = search.strip()

        if search:
            query = query.filter(Generations.script.ilike(f"%{search}%"))
        if order == "desc":
            query = query.order_by(desc(Generations.created_at))
        else:
            query = query.order_by(asc(Generations.created_at))

        generations = query.limit(limit).offset((page - 1) * limit).all()
        total = query.count()

        print(f"==========>{generations}<==========")
        return {
            "items": generations,
            "total": total,
        }


@router.get("/{generation_id}")
async def get_generation(
    generation_id: int, current_user: Users = Depends(get_current_user)
):
    
    with Session(engine) as session:
        generation = (
            session.query(Generations).filter(Generations.id == generation_id).first()
        )
        if recording is None:
            raise HTTPException(status_code=404, detail="Generation not found")

        if recording.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="This is not your Generation)

        return generation

@router.get("/{generation_id}/audio")
async def get_audio(generation_id: int, current_user: Users = Depends(get_current_user)):
    print("GET AUDIO endpoint")
    with Session(engine) as session:
        generation = (
            session.query(Generations).filter(Generations.id == generation_id).first()
        )
        if generation is None:
            raise HTTPException(status_code=404, detail="Generation not found")

        if generation.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="Forbidden")

        filepath = BASE_DIR / generation.audio_path
        if not filepath.exists():
            raise HTTPException(status_code=404, detail="Audio file not found")

        print(f"======>>>>>{filepath}")
        print(f"======>>>>>Exists {filepath.exists()}")
        return FileResponse(filepath, media_type="audio/wav")




    