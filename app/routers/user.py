from fastapi import APIRouter, Depends, Header, Request
from typing import Annotated
from app.security import get_current_user
from fastapi import APIRouter, Header
from jose import jwt
from app.models.user import Users

from app.config import SECRET_KEY, ALGORITHM
router = APIRouter(
    tags=["Users"]
)


@router.get("/me")
async def me(
    current_user : Users = Depends(get_current_user)
):
    
    username=current_user.username
    user_id=current_user.id

    return {
        "id":user_id,
        "username":username,
    }