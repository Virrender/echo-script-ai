from pydantic import BaseModel, field_validator, EmailStr


class UserSignup(BaseModel):
    # how to use regex
    # name: str = Field(pattern=r"^[A-Za-z]+(?: [A-Za-z]+)*$")
    first_name:str 
    last_name:str
    email:EmailStr
    password: str

    @field_validator("first_name", "last_name")
    @classmethod
    def validate_name(cls,value):
        if not value.isalpha():
            raise ValueError("Name must contain Only letters")
        return value


    @field_validator("password")
    @classmethod
    def validate_password(cls, value):
        if len(value)<8:
            raise ValueError("Too short")
        if not any(c.isupper() for c in value):
            raise ValueError("Need uppercase")
        if not any(c.islower() for c in value):
            raise ValueError("Need lowercase")
        if not any(c.isdigit() for c in value):
            raise ValueError("Need digit")
        if not any(not c.isalnum() for c in value):
            raise ValueError("Needs a special character")
        return value
    
    @field_validator("email")
    @classmethod
    def validate_gmail(cls,value):
        if not str(value).endswith("@gmail.com"):
            raise ValueError("only Gmail addresses are allowed")
        return value



class UserLogin(BaseModel):
    username:str
    password: str
