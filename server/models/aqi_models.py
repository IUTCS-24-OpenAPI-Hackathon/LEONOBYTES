from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

class CityAQIRequest(BaseModel):
    city: str


class CityAQIResponse(BaseModel):
    city: str
    aqi_value: int
    air_quality: str


