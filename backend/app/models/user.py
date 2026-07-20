from sqlalchemy import (
    Integer,
    String,
    Column,
    DateTime,
    func,
)

from app.database.connections import Base


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=True)
    email = Column(String, nullable=True)
    hashed_password = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
