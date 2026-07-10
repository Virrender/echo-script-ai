from sqlalchemy import (
    Integer, 
    String, 
    Column, 
    Text, 
    DateTime,
    )

from app.database.connections import Base



class Recordings(Base):
    __tablename__ = "recordings"
    id = Column(
        Integer,
        primary_key=True
    )
    created_at = Column(DateTime(timezone=True), nullable=False)
    audio_path = Column(String, nullable=False)
    transcript = Column(Text, nullable=True)
