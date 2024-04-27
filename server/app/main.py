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
from utils.show_photos import fetch_image_link_from_pexels
from models.place_photo_models import QueryRequest 
from models.amenities_models import LocationInput
from utils.show_amenties import find_nearby_locations 
from typing import List
from models.socio_factor_models import SocioRequest,SocioResponse
from utils.socio_eco_factors import chat
from pydantic import BaseModel
from utils.helper import db_config
from shapely.geometry import Point
# from database import User, Comment,
from geopy.geocoders import Nominatim
from database import connect_to_database
from model import User, Place, Comment
from create_tables import get_search_results_by_userid
from models.search_table_save import SearchInput, save_search
from utils.save_place_info import save_place,PlaceInput
from utils.login import authenticate_user, LoginInput
from utils.attractions_based_on_geo import find_attractions
from utils.attractions_based_on_geo import extract_lat_lon_from_point
import mysql.connector
from models.chatreq import ChatRequest
import uuid


# Connect to the database
conn = connect_to_database()
cursor = conn.cursor()



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
    
    
# #show photos
# @app.post("/place_photos/")
# async def get_place_photos_endpoint(request: PlacePhotosRequest):
#     try:

#         photo_urls = get_place_photos(request.place_name)[0:5]
        
#         return PlacePhotosResponse(photo_urls=photo_urls)
#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/fetch_image_link")
async def fetch_image_link(query_request: QueryRequest):
    image_link = fetch_image_link_from_pexels(query_request.query)
    if "http" in image_link:
        return {"image_url": image_link}
    else:
        raise HTTPException(status_code=404, detail=image_link)

 
@app.post("/amenities/")
async def find_locations(location_input: LocationInput):
    geolocator = Nominatim(user_agent="get_lat_long")
    user_location = geolocator.geocode(location_input.location_name)
    latitude = user_location.latitude
    longitude = user_location.longitude
    
    print(location_input)

    locations = {}
    for amenty in location_input.amenties:
        locations[amenty] = find_nearby_locations(latitude, longitude, location_input.radius, amenty)

    return {"user_location_name": location_input.location_name, 
            "user_location_lat": latitude,
            "user_location_lng": longitude,
            "locations": locations}    

@app.post("/socio_economic_factors/", response_model=SocioResponse)
async def get_socio_economic_factors(request: SocioRequest):
    try:
        socio_economic_factors = chat(request.location_description)
        return SocioResponse(ans=socio_economic_factors)
    except Exception as e:
        return SocioResponse(ans=str(e))
    
# @app.post("/user/")
# async def create_user(user: UserCreate):
#     return User.create(user.user_id, user.password)


# @app.post("/comment/")
# async def create_comment(comment: CommentCreate):
#     return Comment.create(comment.place_id, comment.comment_text, comment.user_id)


# @app.get("/comments/{place_id}")
# async def get_comments(place_id: int):
#     return Comment.get_by_place_id(place_id)




@app.post("/user/")
async def create_user(user: User):
    try:
        cursor.execute("INSERT INTO User (user_id, password) VALUES (%s, %s)", (user.user_id, user.password))
        conn.commit()
        return {"message": "User created successfully"}
    except mysql.connector.Error as e:
        return {"error": str(e)}

# @app.post("/comment/")
# async def create_comment(comment: Comment):
#     try:
#          # Generate a random unique comment_id
#         comment_id = str(uuid.uuid4())

#         cursor.execute("INSERT INTO Comments (comment_id, place_id, comment_text, user_id) VALUES (%s, %s, %s, %s)",
#                        (comment_id, comment.place_id, comment.comment_text, comment.user_id))
#         conn.commit()
#         return {"message": "Comment added successfully"}
#     except mysql.connector.Error as e:
#         return {"error": str(e)}

# @app.get("/comments/{place_id}")
# async def get_comments(place_id: int):
#     try:
#         cursor.execute("SELECT c.comment_text, u.user_id FROM Comments c JOIN User u ON c.user_id = u.user_id WHERE c.place_id = %s", (place_id,))
#         comments = cursor.fetchall()
#         return {"comments": comments}
#     except mysql.connector.Error as e:
#         return {"error": str(e)}
    
@app.post("/comment/")
async def create_comment(comment: Comment):
    try:
        # Check if the place exists
        cursor.execute("SELECT * FROM Places WHERE place_id = %s", (comment.place_id,))
        place = cursor.fetchone()

        if not place:
            # Place doesn't exist, so add the place with status=0
            cursor.execute("INSERT INTO Places (place_id, name, description, image, status) VALUES (%s, %s, %s, %s, %s)",
                           (comment.place_id, "", "", "", 0))
            conn.commit()

        # Generate a random unique comment_id
        comment_id = str(uuid.uuid4())

        # Add the comment
        cursor.execute("INSERT INTO Comments (comment_id, place_id, comment_text, user_id) VALUES (%s, %s, %s, %s)",
                       (comment_id, comment.place_id, comment.comment_text, comment.user_id))
        conn.commit()
        
        status=1
        
        if not place:
            status=0

        return {"message": "Comment added successfully", "status": status}
    except mysql.connector.Error as e:
        return {"error": str(e)}

# @app.get("/comments/{place_id}")
# async def get_comments(place_id: int):
#     try:
#         cursor.execute("SELECT c.comment_text, u.user_id FROM Comments c JOIN User u ON c.user_id = u.user_id WHERE c.place_id = %s", (place_id,))
#         comments = cursor.fetchall()
#         return {"comments": comments}
#     except mysql.connector.Error as e:
#         return {"error": str(e)}
    

    
@app.get("/search/{user_id}")
async def search_results_by_user_id(user_id: str):
    return get_search_results_by_userid(user_id)    



@app.post("/save_search_data")
async def save_search_data(search_input: SearchInput):
    result = save_search(search_input.user_id, search_input.search_text)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result


@app.post("/places")
async def save_place_data(place_input: PlaceInput):
    result = save_place(place_input.place_id, place_input.name, place_input.description, place_input.image)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result

@app.post("/login")
async def login_user(login_input: LoginInput):
    result = authenticate_user(login_input.user_id, login_input.password)
    if "error" in result:
        raise HTTPException(status_code=401, detail=result["error"])
    return result

import osmnx as ox
from geopy.geocoders import Nominatim
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from shapely.geometry import Point


class Location(BaseModel):
    district: str
    country: str
    distance_km: int = 10

def find_attractions(lat, lon, distance_km):
    # Set the location and distance in meters
    location_point = (lat, lon)
    distance_meters = distance_km * 1000
    
    # Construct a query to fetch data
    custom_filter = f'"tourism"~"attraction"'
    attractions = ox.geometries.geometries_from_point(location_point, tags={'tourism': True}, dist=distance_meters)
    
    # Filter the attractions based on the tourism tag and ensure they are Points
    attractions = attractions[attractions['geometry'].apply(lambda geom: isinstance(geom, Point))]
    
    # Replace NaN values with an empty string
    attractions = attractions.fillna('')
    
    # Extract name and geometry coordinates
    attractions_data = []
    for index, row in attractions.iterrows():
        name = row['name']
        geometry = row['geometry']
        lat, lon = geometry.y, geometry.x  # Extract lat and lon from Point geometry
        coordinates = [lon, lat]  # Reverse order to lon, lat
        attractions_data.append({'name': name, 'coordinates': coordinates})
    
    return attractions_data[:10]


@ app.post("/attractions/")
async def get_attractions(location: Location):
    # Geocode the district and country to get latitude and longitude
    geolocator = Nominatim(user_agent="get_lat_long")
    address = f"{location.district}, {location.country}"
    location_info = geolocator.geocode(address)
    
    if not location_info:
        raise HTTPException(status_code=404, detail="Location not found")
    
    latitude, longitude = location_info.latitude, location_info.longitude
    
    # Find attractions within the specified distance
    nearby_attractions = find_attractions(latitude, longitude, location.distance_km)
    
    return nearby_attractions



from utils.helper import model
from langchain_core.messages import HumanMessage, SystemMessage
from langchain.prompts import ChatPromptTemplate
from langchain.prompts import HumanMessagePromptTemplate

places = {'Coxs Bazar': 'I loved it', 'Moinot Ghat': 'Loved it', 'Dhaka':'Hated it', "Padma River":'Best days of my life'}

chat_template = ChatPromptTemplate.from_messages(
    [
        SystemMessage(
            content=(
                f"You are a tour itinerary planner."
                ),
            role=(
                "helpful chatbot"
            )
        ),
        HumanMessagePromptTemplate.from_template("{user_requirements}"),
    ]
)

def chat(user_requirements):
    chat_message =  chat_template.format_messages(user_requirements=user_requirements)
    ans=model.invoke(chat_message)
    return ans.content





@ app.post("/chat")
async def get_chat(request: ChatRequest):
     places= get_comments_and_places(request.user_id)[1]
     print(places)
     user_req =  f'{request.text}. You plan tours based on the user previous travel experience. Previous traveled places : {places}. Justify why you have chosen those places. '
     res = chat(user_req)
     return {"response": res}
 
 
 
 
 
# Function to fetch all comments and places associated with a user
def get_comments_and_places(user_id):
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Fetch all comments associated with the user
        cursor.execute("SELECT * FROM sys.comments WHERE user_id = %s", (user_id,))
        comments = cursor.fetchall()

        # Fetch all places associated with the user
        cursor.execute("SELECT description FROM sys.places WHERE place_id IN (SELECT place_id FROM sys.comments WHERE user_id = %s)", (user_id,))
        places = cursor.fetchall()

        return comments, places  # Return comments and places as lists

    except mysql.connector.Error as e:
        return [], []  # Return empty lists in case of error
 
 # Endpoint to fetch all places info
@app.get("/all_places/")
async def get_all_places():
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute SQL query to fetch all places info
        cursor.execute("SELECT * FROM sys.places")
        places = cursor.fetchall()

        return {"places": places}  # Return places info as JSON

    except mysql.connector.Error as e:
        return {"error": str(e)}

    finally:
        # Close connection
        if conn.is_connected():
            cursor.close()
            conn.close()
            

chat_template1 = ChatPromptTemplate.from_messages(
    [
        SystemMessage(
            content=(
                f"You are a tour itinerary planner."
                ),
            role=(
                "helpful chatbot"
            )
        ),
        HumanMessagePromptTemplate.from_template("{user_requirements}"),
    ]
)


def chat1(user_requirements):
    chat_message =  chat_template1.format_messages(user_requirements=user_requirements)
    ans=model.invoke(chat_message)
    return ans.content
         

@ app.post("/chatiternary")
async def get_chat(request: ChatRequest):
     places= get_comments_and_places(request.user_id)[1]
     print(places)
     user_req =  f'{request.text}. You plan tours based on the user previous travel experience. Previous traveled places : {places}. Justify why you have chosen those places. '
     res = chat1(user_req)
     return {"response": res}            
 
 
 
 
 

chat_template2 = ChatPromptTemplate.from_messages(
    [
        SystemMessage(
            content=(
                f"You are a tour planner."
                ),
            role=(
                "helpful chatbot"
            )
        ),
        HumanMessagePromptTemplate.from_template("{user_requirements}"),
    ]
)

def chat2(user_requirements):
    chat_message =  chat_template2.format_messages(user_requirements=user_requirements)
    ans=model.invoke(chat_message)
    return ans.content

@ app.post("/chatbackpacking/")
async def get_chat(request: ChatRequest):
     places= get_comments_and_places(request.user_id)[1]
     print(places)
     user_req =  f'{request.text}. My previous travelling experience {places}. Plan me a tour according my travel experience.'
     res = chat2(user_req)
     return {"response": res}            
 

# user_input = "I have a tour budget of 30,000 taka. I want luxury tour of 5 days. I can travel anywhere in Bangladesh and India"
# user_req = f'{user_input}. My previous travelling experience {places}. Plan me a tour according my travel experience.'

# print(chat(user_req))