from fastapi import APIRouter, HTTPException

from sqlalchemy.orm import Session
from app.database.connections import engine
from pwdlib import PasswordHash

from app.redis.connection import redis_client

password_hash = PasswordHash.recommended()

from app.models.user import Users
from app.security import create_access_token

from app.schemas.user import UserSignup, UserLogin

router = APIRouter(prefix="/auth", tags=["Authentication"])
from app.schemas.auth import VerifyEmailRequest

from app.email.sender import send_email

import json
import secrets

@router.post("/signup")
async def signup(user: UserSignup):

    # 1. Check whether email is already registered
    with Session(engine) as session:
        existing_user = (
            session.query(Users)
            .filter(Users.email == user.email)
            .first()
        )

        if existing_user is not None:
            raise HTTPException(
                status_code=400,
                detail="Email already registered",
            )

    # 2. Hash password before storing temporary signup data
    hashed_pswd = password_hash.hash(user.password)

    signup_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "hashed_password": hashed_pswd,
    }

    # 3. Store signup data temporarily in Redis
    redis_client.setex(
        f"signup:{user.email}",
        300,
        json.dumps(signup_data),
    )

    # 4. Generate random OTP
    otp = str(secrets.randbelow(900000) + 100000)

    # 5. Store OTP in Redis for 5 minutes
    redis_client.setex(
        f"otp:{user.email}",
        300,
        otp,
    )

    # 6. Send OTP to user's email
    send_email(
        user.email,
        "Echo Script OTP",
        f"Email verification OTP: {otp}\n"
        f"Valid only for 5 minutes.",
    )

    return {
        "message": "OTP sent to your email"
    }

@router.post("/verify-email")
async def verify_email(data: VerifyEmailRequest):

    # 1. Get OTP from Redis
    stored_otp = redis_client.get(f"otp:{data.email}")

    if stored_otp is None:
        raise HTTPException(
            status_code=400,
            detail="OTP expired or not found",
        )

    # 2. Verify OTP
    if stored_otp != data.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP",
        )

    # 3. Get temporary signup data
    signup_data = redis_client.get(
        f"signup:{data.email}"
    )

    if signup_data is None:
        raise HTTPException(
            status_code=400,
            detail="Signup session expired",
        )

    signup_data = json.loads(signup_data)

    # 4. Create permanent user
    with Session(engine) as session:

        # Final safety check
        existing_user = (
            session.query(Users)
            .filter(Users.email == data.email)
            .first()
        )

        if existing_user is not None:
            raise HTTPException(
                status_code=400,
                detail="Email already registered",
            )

        new_user = Users(
            first_name=signup_data["first_name"],
            last_name=signup_data["last_name"],
            email=signup_data["email"],
            hashed_password=signup_data["hashed_password"],
            is_email_verified=True,
        )

        session.add(new_user)
        session.commit()

        session.refresh(new_user)

    # 5. Signup is complete → remove temporary Redis data
    redis_client.delete(f"otp:{data.email}")
    redis_client.delete(f"signup:{data.email}")

    # 6. Automatically log the user in
    access_token = create_access_token(
        data={"sub": new_user.email}
    )

    return {
        "message": "Email verified successfully",
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post("/resend-otp")
async def resend_otp(email: str):

    signup_data = redis_client.get(f"signup:{email}")

    if signup_data is None:
        raise HTTPException(
            status_code=400,
            detail="Signup session expired. Please sign up again.",
        )

    otp = str(secrets.randbelow(900000) + 100000)

    redis_client.setex(
        f"otp:{email}",
        300,
        otp,
    )

    send_email(
        email,
        "Echo Script OTP",
        f"Email verification OTP: {otp}\n"
        f"Valid only for 5 minutes.",
    )

    return {
        "message": "New OTP sent to your email"
    }


@router.post("/login")
async def login(
    user: UserLogin,
):  # if using OAuth2PasswordBearer then login fn expects (form_data:OAuth2PasswordRequestForm=Depends())
    with Session(engine) as session:
        db_user = session.query(Users).filter(Users.email == user.email).first()

        if db_user is None:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if not password_hash.verify(user.password, db_user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email or password")


        access_token = create_access_token(data={"sub": db_user.email})

        return {"access_token": access_token, "token_type": "bearer"}
