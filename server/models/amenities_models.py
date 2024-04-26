from pydantic import BaseModel



class AmenitiesRequest(BaseModel):
    location: str
    amenity: str
    radius: str  # Add radius parameter

class AmenityResponse(BaseModel):
    name: str
    latitude: float
    longitude: float
    address: str