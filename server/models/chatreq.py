from pydantic import BaseModel


class ChatRequest(BaseModel):
     text:str
     user_id:str