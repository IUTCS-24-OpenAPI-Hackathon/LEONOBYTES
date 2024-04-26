from pydantic import BaseModel

class User(BaseModel):
    user_id: int
    password: str

class Place(BaseModel):
    place_id: int
    name: str
    description: str
    image: str

class Comment(BaseModel):
    place_id: int
    comment_text: str
    user_id: int
