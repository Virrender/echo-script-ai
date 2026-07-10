from fastapi import APIRouter, Depends, Header

from app.security import get_current_user

router = APIRouter()

@router.get("/me")
async def me(
    authorization: str = Header(...)
):
    print(authorization)