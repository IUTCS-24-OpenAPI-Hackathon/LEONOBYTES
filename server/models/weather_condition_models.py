from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

class WeatherRequest(BaseModel):
    place_name: str

class WeatherResponse(BaseModel):
    temp: int
    temp_min: int
    temp_max: int
    feels_like: int
    humidity: int
    sky: str
    
    