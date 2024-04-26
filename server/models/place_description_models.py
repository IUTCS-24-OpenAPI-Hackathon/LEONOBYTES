from pydantic import BaseModel


class PlaceDescriptionRequest(BaseModel):
    place_name: str

class PlaceDescriptionResponse(BaseModel):
    description: str