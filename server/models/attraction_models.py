from pydantic import BaseModel

class AttractionRequest(BaseModel):
    place_name: str

class AttractionResponse(BaseModel):
    tourist_attractions: list[str]
