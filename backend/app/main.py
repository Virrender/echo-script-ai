from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

# Create all tables defined in models.py (if they don't already exist)
from app.database.connections import Base, engine

# import tables
from app.models import user
from app.models import recordings
from app.models import generations

Base.metadata.create_all(engine)

from app.routers import auth, user, recordings, generations

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(recordings.router)
app.include_router(user.router)
app.include_router(generations.router)
