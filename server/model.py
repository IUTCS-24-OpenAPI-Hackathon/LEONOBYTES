# from pydantic import BaseModel

# class User(BaseModel):
#     user_id: str
#     password: str

# class Place(BaseModel):
#     place_id: str
#     name: str
#     description: str
#     image: str
#     status: str  # Represented as str

# class Comment(BaseModel):
#     place_id: str
#     comment_text: str
#     user_id: str

from pydantic import BaseModel

class User(BaseModel):
    user_id: str
    password: str

class Place(BaseModel):
    place_id: str
    name: str
    description: str
    image: str
    status: str  # Represented as str

class Comment(BaseModel):
    place_id: str
    comment_text: str
    user_id: str
