from sqlalchemy import Integer, String, Column, Text, DateTime, ForeignKey, Index
from sqlalchemy.dialects.postgresql import JSONB
from app.database.connections import Base


class Recordings(Base):
    __tablename__ = "recordings"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False)
    audio_path = Column(String, nullable=False)
    transcript = Column(Text, nullable=True)
    segments = Column(JSONB, nullable=True)

    __table_args__ = (
        Index(
            "ix_recordings_user_created",
            "user_id",
            "created_at",
        ),
    )
