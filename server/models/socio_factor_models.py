from pydantic import BaseModel



class SocioRequest(BaseModel):
    location_description: str

class SocioResponse(BaseModel):
      ans: str
