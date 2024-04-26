from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

from dotenv import dotenv_values

config = dotenv_values(".env")
api_key=config['place_details_api'] 


def get_place_details(place_name):
    # Encode the place name parameter correctly for the URL
    place_encoded = requests.utils.quote(place_name)
    
    # First, find the place ID
    search_url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={place_encoded}&inputtype=textquery&fields=place_id&key={api_key}"
    search_response = requests.get(search_url)
    search_data = search_response.json()
    
    if search_data['status'] == 'OK':
        place_id = search_data['candidates'][0]['place_id']
        
        # Then, use the place ID to get detailed information including reviews
        details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,rating,reviews&key={api_key}"
        details_response = requests.get(details_url)
        details_data = details_response.json()
        
        if details_data['status'] == 'OK':
            return details_data['result']
        else:
            raise HTTPException(status_code=404, detail=f"Error fetching details: {details_data['status']}")
    else:
        raise HTTPException(status_code=404, detail=f"Error finding place: {search_data['status']}")
    
