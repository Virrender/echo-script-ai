from datetime import datetime, timedelta,timezone
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status

from sqlalchemy.orm import Session

from app.database.connections import engine
from app.models.user import Users



oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)

def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    print(token)


from app.config import(
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)


def create_access_token(data:dict):

    to_encode=data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp":expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return encoded_jwt
