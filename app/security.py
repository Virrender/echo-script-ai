from datetime import datetime, timedelta,timezone
from fastapi.security import OAuth2PasswordBearer, HTTPBearer, HTTPAuthorizationCredentials, OAuth2AuthorizationCodeBearer
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status,Header
from typing import Annotated
from sqlalchemy.orm import Session
from app.config import SECRET_KEY, ALGORITHM
from app.database.connections import engine
from app.models.user import Users


#to login with username and password and we have to manually paste the token in Authorize button
# if using HTTPBearer then login fn expects (user: UserLogin)
#get_current_user expects 

#def get_current_user(
#     credentials: HTTPAuthorizationCredentials = Depends(security)
# ):
#     token= credentials.credentials

# security = HTTPBearer()



#this describes security scheme...
#2.to login with same username and pasword and fastapi will automatically get the token
# if using OAuth2PasswordBearer then login fn expects (form_data:OAuth2PasswordRequestForm=Depends())
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)
#get_current_user expects




#3 to login with google
#oauth2_scheme = OAuth2AuthorizationCodeBearer(
#     authorizationUrl="https://accounts.google.com/o/oauth2/auth",
#     tokenUrl="https://oauth2.googleapis.com/token",
# )


def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    

    try:
        payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )
    
    username = payload["sub"]
    print(token)
    with Session(engine) as session:

        db_user = (
          session.query(Users)
        .filter(Users.username == username)
        .first()
     )
    
    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
    )
    return db_user




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
