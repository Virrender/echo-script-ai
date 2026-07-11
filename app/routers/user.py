from fastapi import APIRouter, Depends, Header, Request
from typing import Annotated
from app.security import get_current_user
from fastapi import APIRouter, Header
from jose import jwt

from app.config import SECRET_KEY, ALGORITHM
router = APIRouter()

@router.get("/me")
async def me(
    authorization: Annotated[str, Header()]
):
    scheme, token = authorization.split()
    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )

    print(payload)

    return {"message": "ok"}