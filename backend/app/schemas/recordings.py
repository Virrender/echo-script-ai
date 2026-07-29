from pydantic import BaseModel
from datetime import datetime


class RecordingResponse(BaseModel):
    id: int
    created_at: datetime
    transcript: str | None
    model_config = {  # Read data from object attributes (user.id) instead of expecting a dictionary.
        # "When you receive an object, read its attributes."
        "from_attributes": True
    }

class PaginatedRecordingResponse(BaseModel):
    items:list[RecordingResponse]
    total:int



