from pydantic import BaseModel
from typing import List


class LocationInput(BaseModel):
    location_name: str
    radius: int
    amenties: List[str]


# class Location(BaseModel):
#     name: str
#     radius: int
#     amenties: List[str]


# class LocationResponse(BaseModel):
#     user_location_name: str
#     user_location_lat: float
#     user_location_lng: float
#     hospitals: list
#     restaurants: list
#     parkings: list
#     bus_stations: list
#     banks: list


# class AmenitiesRequest(BaseModel):
#     location: str
#     amenity: str
#     radius: str  # Add radius parameter

# class AmenityResponse(BaseModel):
#     name: str
#     latitude: float
#     longitude: float
#     address: str