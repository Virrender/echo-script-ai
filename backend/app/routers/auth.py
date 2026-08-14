from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.connections import engine
from pwdlib import PasswordHash
import random
from app.redis.connection import redis_client

password_hash = PasswordHash.recommended()

from app.models.user import Users
from app.security import create_access_token

from app.schemas.user import UserSignup, UserLogin

router = APIRouter(prefix="/auth", tags=["Authentication"])
from app.schemas.auth import VerifyEmailRequest

from app.email.sender import send_email


@router.post("/signup")
async def signup(user: UserSignup):
    hashed_pswd = password_hash.hash(user.password)
    with Session(engine) as session:
        new_user = Users(first_name=user.first_name, last_name=user.last_name, email=user.email, hashed_password=hashed_pswd)
        session.add(new_user)
        session.commit()

    return {"message": "User created"}


@router.post("/send-otp")
async def send_otp(email:str):
    otp=str(random.randint(100000,999999))

    redis_key=f"otp:{email}"

    redis_client.setex(
        redis_key,
        300,
        otp,
    )

    send_email(
    # "at2014637010@gmail.com",
    email,
    "Echo Script OTP",
    f"gmail verification OTP: {otp}\n"
    f"valid only for 5 minutes",
)
    print(otp)
    return {"message":"OTP generated successfully"}


@router.post("/verify-email")
async def verify_email(data: VerifyEmailRequest):

    stored_otp = redis_client.get(f"otp:{data.email}")
    if stored_otp is None:
        raise HTTPException(
            status_code=400,
            detail="OTP expired or not found",
        )


    if stored_otp != data.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP",
        )

    with Session(engine) as session:
        user = session.query(Users).filter(Users.email == data.email).first()

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )

        user.is_email_verified = True
        session.commit()
        
    redis_client.delete(f"otp:{data.email}")

    return {
         "message": "OTP verified successfully"
    }





@router.post("/login")
async def login(
    user: UserLogin,
):  # if using OAuth2PasswordBearer then login fn expects (form_data:OAuth2PasswordRequestForm=Depends())
    with Session(engine) as session:
        db_user = session.query(Users).filter(Users.username == user.username).first()

        if db_user is None:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        if not password_hash.verify(user.password, db_user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        access_token = create_access_token(data={"sub": db_user.username})

        return {"access_token": access_token, "token_type": "bearer"}
