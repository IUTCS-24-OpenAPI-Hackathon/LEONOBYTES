from fastapi import FastAPI, HTTPException
import requests
import googlemaps


from dotenv import dotenv_values

config = dotenv_values(".env")
api_key=config['place_details_api'] 

def find_nearby_places(location_name, place_type):
    # First, get the coordinates of the location
    geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={location_name}&key={api_key}"
    geocode_response = requests.get(geocode_url)
    geocode_data = geocode_response.json()
    
    if geocode_data['status'] == 'OK':
        # Extract the latitude and longitude
        location = geocode_data['results'][0]['geometry']['location']
        lat, lng = location['lat'], location['lng']
        
        # Use the coordinates to search for nearby places
        places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=5000&type={place_type}&key={api_key}"
        places_response = requests.get(places_url)
        places_data = places_response.json()
        
        if places_data['status'] == 'OK':
            results = []
            for place in places_data['results']:
                name = place['name']
                vicinity = place.get('vicinity', 'No address provided')
                results.append({'name': name, 'address': vicinity, 'map_location': get_map_location(api_key,name)})
            return results[:3]
        else:
            raise HTTPException(status_code=404, detail=f"Error in Places API: {places_data['status']}")
    else:
        raise HTTPException(status_code=404, detail=f"Error in Geocode API: {geocode_data['status']}")

def get_map_location(api_key, place_name):
    gmaps = googlemaps.Client(key=api_key)
    # Geocoding a place name
    geocode_result = gmaps.geocode(place_name,language='en')

    try:
        lat = geocode_result[0]['geometry']['location']['lat']
        lng = geocode_result[0]['geometry']['location']['lng']
        return f"https://www.google.com/maps/?q={lat},{lng}"
    except:
        return 'Not Available'
