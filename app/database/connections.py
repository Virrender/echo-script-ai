from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import create_engine

engine = create_engine(
    "postgresql+psycopg://postgres:123456@localhost:5432/echo_script"
)


class Base(DeclarativeBase):
    pass
