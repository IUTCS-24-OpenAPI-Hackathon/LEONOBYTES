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
from utils.aqi_report import get_air_quality
from models.aqi_models import CityAQIRequest, CityAQIResponse
from utils.country_info import get_country_info, get_capital
from models.country_info_models import CountryInfoRequest, CountryInfoResponse
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
      
#get aqi report

@app.post("/city_aqi/")
async def get_city_aqi(request: CityAQIRequest):
    try:
        aqi_value = get_air_quality(request.city)
        air_quality = ''
        if aqi_value <= 50 : 
            air_quality = 'Good'
        elif aqi_value > 50 and aqi_value < 100:
            air_quality = 'Moderate' 
        elif aqi_value > 101 and aqi_value <= 150:
            air_quality = 'Unhealthy for Sensitive Groups'
        elif aqi_value > 150  and aqi_value <= 200:
            air_quality = 'Unhealthy'
        elif aqi_value > 200 and aqi_value <= 300:
            air_quality = 'Very Unhealthy'    
        else : 
            air_quality = 'Hazardous'

        return CityAQIResponse(city=request.city, aqi_value=aqi_value, air_quality=air_quality)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



#get capitials nearby , currencies and borders

@app.post("/country_info/")
async def get_country_info_endpoint(request: CountryInfoRequest):
    try:
        currencies, borders = get_country_info(request.country_name)
        capitals = [get_capital(request.country_name)]
        for country in borders:
            capital = get_capital(country)
            capitals.append(capital)
        
        return CountryInfoResponse(country_name=request.country_name, currencies=currencies, borders=borders, capitals=capitals)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    