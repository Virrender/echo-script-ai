from fastapi import APIRouter,  HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.connections import engine
from pwdlib import PasswordHash
password_hash=PasswordHash.recommended()
from app.models.user import Users
from app.security import create_access_token

from app.schemas.user import UserSignup, UserLogin


router=APIRouter()

@router.post("/signup")
async def signup(user:UserSignup):
    hashed_pswd=password_hash.hash(user.password)
    with Session(engine) as session:
        new_user= Users(
            username=user.username,
            hashed_password=hashed_pswd
        )
        session.add(new_user)
        session.commit()
    
    return {"message": "User created"}



@router.post("/login") 
async def login(user: UserLogin): # if using OAuth2PasswordBearer then login fn expects (form_data:OAuth2PasswordRequestForm=Depends())
    with Session(engine) as session:
        db_user=(session.query(Users)
                 .filter(Users.username==user.username)
                 .first()
        )

        if db_user is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid username or password"
            )
        
        if not password_hash.verify(
            user.password,
            db_user.hashed_password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid username or password"
            )
        
        access_token = create_access_token(
            data={
                "sub":db_user.username
            }
        )
        
        return{
            "access_token": access_token,
            "token_type":"bearer"
        }
