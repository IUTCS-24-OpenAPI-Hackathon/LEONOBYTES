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
from utils.place_details import get_place_details
from models.place_description_models import PlaceDescriptionRequest, PlaceDescriptionResponse
from utils.show_photos import get_place_photos
from models.place_photo_models import PlacePhotosRequest, PlacePhotosResponse
from models.amenities_models import LocationResponse,Location
from utils.show_amenties import find_nearby_locations 
from typing import List
from models.socio_factor_models import SocioRequest,SocioResponse
from utils.socio_eco_factors import chat
from geopy.geocoders import Nominatim




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
    
    
#show photos
@app.post("/place_photos/")
async def get_place_photos_endpoint(request: PlacePhotosRequest):
    try:

        photo_urls = get_place_photos(request.place_name)[0:5]
        
        return PlacePhotosResponse(photo_urls=photo_urls)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @app.post("/nearby_amenities/")
# async def get_nearby_amenities_endpoint(request: NearbyAmenitiesRequest):
#     try:
   
#         amenities = find_nearby_places(request.location_name, request.place_type)
#         return NearbyAmenitiesResponse(amenities=amenities)
#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))    
   

# @app.post("/amenities/", response_model=List[AmenityResponse])
# async def get_nearby_amenities(request: AmenitiesRequest):
#     try:
#         geolocator = Nominatim(user_agent="get_lat_long")
#         location = geolocator.geocode(request.location)
        
#         # Check if location is found
#         if location is None:
#             raise ValueError("Location not found")
        
#         # Use the provided location information
#         latitude = location.latitude
#         longitude = location.longitude
        
#         # Call the function to find nearby amenities with the provided radius
#         amenity_results = find_nearby_amenities(latitude, longitude, request.radius, request.amenity)
        
#         return amenity_results
#     except Exception as e:
#         # Return an empty list if there's an error
#          return e

@app.post("/amenities/", response_model=LocationResponse)
async def get_nearby_locations(location: Location):
    
    print(location)
    geolocator = Nominatim(user_agent="get_lat_long")
    user_location = geolocator.geocode(location.name)
    if not user_location:
        raise HTTPException(status_code=404, detail="Location not found")
    
    radius = location.radius
    latitude = user_location.latitude
    longitude = user_location.longitude
    amenties = location.amenties
    
    
    print(amenties)
    
    Context = {
        'user_location_name' : location.name,
        'user_location_lat' : latitude,
        'user_location_lng' : longitude,
        'hospital' : [],
        'restaurant' : [],
        'parking' : [],
        'bus_station' : [],
        'bank' : []
    }

    for amenty in amenties:
        Location = find_nearby_locations(latitude, longitude, radius, amenty)
        print('Fuck',Location)
        Context[amenty].append(Location)

    #print(Context)
    return Context
 
    

@app.post("/socio_economic_factors/", response_model=SocioResponse)
async def get_socio_economic_factors(request: SocioRequest):
    try:
        socio_economic_factors = chat(request.location_description)
        return SocioResponse(ans=socio_economic_factors)
    except Exception as e:
        return SocioResponse(ans=str(e))