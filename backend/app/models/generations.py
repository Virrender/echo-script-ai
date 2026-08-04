from sqlalchemy import Integer, String, Column, Text, DateTime, ForeignKey, Index
from sqlalchemy.dialects.postgresql import JSONB
from app.database.connections import Base


class Generations(Base):
    __tablename__ = "generations"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False)
    title= Column(String,nullable=False)
    audio_path = Column(String, nullable=True)
    script = Column(Text, nullable=True)
    segments = Column(JSONB, nullable=True)

    __table_args__ = (
        Index(
            "ix_generations_user_created",
            "user_id",
            "created_at",
        ),
    )
