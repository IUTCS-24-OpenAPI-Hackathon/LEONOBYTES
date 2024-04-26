from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, status, HTTPException, Query
from Countrydetails import countries,country
from utils.place_description import get_place_description
from models.place_description_models import PlaceDescriptionRequest, PlaceDescriptionResponse
from models.attraction_models import AttractionRequest, AttractionResponse
from utils.classify_attractions import get_tourist_attractions_names
from models.country_models import CountryNameRequest
from models.weather_condition_models import WeatherRequest, WeatherResponse
from utils.weather_report import show_weather
app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,    
    allow_origins=origins,    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    return {"status": "ok"}


#for auto completing country names
@app.get("/countries")
async def get_all_countries():
    try:
        data = countries.all_countries()
        all_countries = data.countries()
        return {"countries": all_countries}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#get states    
@app.post("/states")
async def get_states_by_post(request: CountryNameRequest):
    try:
        country_info = country.country_details(request.country_name)
        states = country_info.states()
        if states:
            return {"states": states}
        else:
            raise HTTPException(status_code=404, detail="States not found for the specified country")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#get attraction places    
@app.post("/tourist_attractions/")
async def get_tourist_attractions(request: AttractionRequest):
    try:
        attractions = get_tourist_attractions_names(request.place_name)
        return AttractionResponse(tourist_attractions=attractions)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
    
#get place description    
@app.post("/place_description/")
async def get_place_description_endpoint(request: PlaceDescriptionRequest):
    try:
        description = get_place_description(request.place_name)
        return PlaceDescriptionResponse(description=description)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  
    
    
#get weather report
@app.post("/weather/")
async def get_weather(request: WeatherRequest):
    try:
        weather_data = show_weather(request.place_name)
        return WeatherResponse(**weather_data)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
      
    