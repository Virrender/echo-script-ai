from pydantic import BaseModel


class GenerationsCreate(BaseModel):
    title:str
    script: str
    

