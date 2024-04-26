from pydantic import BaseModel

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class PlaceBase(BaseModel):
    name: str
    description: str
    image: str
    place_id: str

class Place(PlaceBase):
    id: int

    class Config:
        orm_mode = True

class CommentBase(BaseModel):
    comment_text: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    user_id: int
    place_id: str

    class Config:
        orm_mode = True
