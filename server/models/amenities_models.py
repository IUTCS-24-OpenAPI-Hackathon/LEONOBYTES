from pydantic import BaseModel


class NearbyAmenitiesRequest(BaseModel):
    location_name: str
    place_type: str

class NearbyAmenitiesResponse(BaseModel):
    amenities: list[dict]