from pydantic import BaseModel



class PlacePhotosRequest(BaseModel):
    place_name: str

class PlacePhotosResponse(BaseModel):
    photo_urls: list[str]
