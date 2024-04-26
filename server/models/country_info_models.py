from fastapi import FastAPI
from pydantic import BaseModel


class CountryInfoRequest(BaseModel):
    country_name: str

class CountryInfoResponse(BaseModel):
    country_name: str
    currencies: list[str]
    borders: list[str]
    capitals: list[str]
    
    