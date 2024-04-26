from pydantic import BaseModel


class CountryNameRequest(BaseModel):
    country_name: str