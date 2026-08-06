from pydantic import BaseModel
from datetime import datetime


class GenerationsCreate(BaseModel):
    title: str
    script: str


class GenerationResponse(BaseModel):
    id: int
    created_at: datetime
    script: str | None
    segments: list | None
    model_config = {  # Read data from object attributes (user.id) instead of expecting a dictionary.
        # "When you receive an object, read its attributes."
        "from_attributes": True
    }


class PaginatedGenerationResponse(BaseModel):
    items: list[GenerationResponse]
    total: int
