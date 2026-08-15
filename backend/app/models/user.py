from sqlalchemy import (
    Integer,
    String,
    Column,
    DateTime,
    func,
    Boolean
)

from app.database.connections import Base


class Users(Base):
    __tablename__ = "users"
    first_name=Column(String, nullable=True)
    last_name=Column(String, nullable=True)
    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=True)
    is_email_verified = Column(Boolean, default=False, nullable=False)
    hashed_password = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
    DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
