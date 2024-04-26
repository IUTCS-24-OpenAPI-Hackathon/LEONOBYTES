from pydantic import BaseModel


class PlaceDetailsRequest(BaseModel):
    place_name: str

class PlaceDetailsResponse(BaseModel):
    rating: float
    reviews: list[dict]