from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# Create all tables defined in models.py (if they don't already exist)
from app.database.connections import Base, engine
from app import models
Base.metadata.create_all(engine)

from app.routers import auth,user,recordings

app = FastAPI()


app.include_router(auth.router)
app.include_router(recordings.router)
app.include_router(user.router)


