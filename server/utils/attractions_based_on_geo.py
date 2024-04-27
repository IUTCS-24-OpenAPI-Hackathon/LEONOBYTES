# from fastapi import FastAPI, HTTPException
# from typing import List
# import osmnx as ox
# from geopy.geocoders import Nominatim
# from shapely.geometry import Point

# app = FastAPI()

# def find_attractions(lat: float, lon: float, distance_km: float) -> List[dict]:
#     try:
#         # Set the location and distance in meters
#         location_point = (lat, lon)
#         distance_meters = distance_km * 1000
        
#         # Construct a query to fetch data
#         custom_filter = f'"tourism"~"attraction"'
#         attractions = ox.geometries.geometries_from_point(location_point, tags={'tourism': True}, dist=distance_meters)
        
#         print("ok")
#         # Filter the attractions based on the tourism tag
#         attractions = attractions[attractions['tourism'] == 'attraction']
        
#         # Convert GeoDataFrame to a list of dictionaries, focusing on name and geometry
#         attractions_list = attractions[['name', 'geometry']].to_dict('records')
#         print(attractions_list)
        
#             # Function to parse geometry and extract latitude and longitude
#         def extract_lat_lon(geometry_str):
#                 # Find coordinates by trimming the 'POINT (' prefix and ')' suffix
#                 print(geometry_str)
#                 GEOMETRY_STR = str(geometry_str)
#                 coord_str = GEOMETRY_STR.strip('<>').split('(')[-1].strip(')>')
#                 print(coord_str)
#                 lon, lat = map(float, coord_str.split())
#                 print("lat",lat)
#                 return {'latitude': lat, 'longitude': lon}
                        
#         #     # Convert geometries to latitude and longitude
#         # attractions_coordinates = [
#         #         {'name': attraction['name'],extract_lat_lon(attraction['geometry'])}
#         #         if isinstance(attraction['geometry'], Point) else None
#         #         for attraction in attractions_list
#         #     ]
            
#             # Filter out None values for non-point geometries
#         attractions_coordinates = [attraction for attraction in attractions_coordinates if attraction is not None]
            
#         return attractions_coordinates
    
#     except Exception as e:
#         return {"error": str(e)}



# Input will be District, Country

import osmnx as ox
import networkx as nx
import geopandas as gpd
from geopy.geocoders import Nominatim
from shapely.geometry import Point

# Assuming the geometries are already proper Shapely Point objects, here's how you would process them:
 
def extract_lat_lon_from_point(point):
    if isinstance(point, Point):
        return {'latitude': point.y, 'longitude': point.x}
    else:
        return None


    
    
def find_attractions(lat, lon, distance_km):
        # Set the location and distance in meters
        location_point = (lat, lon)
        distance_meters = distance_km * 1000
        
        # Construct a query to fetch data
        custom_filter = f'"tourism"~"attraction"'
        attractions = ox.geometries.geometries_from_point(location_point, tags={'tourism': True}, dist=distance_meters)
        
        # Filter the attractions based on the tourism tag
        attractions = attractions[attractions['tourism'] == 'attraction']
        
        return attractions

# geolocator = Nominatim(user_agent="get_lat_long")
# location = 'Sylhet, Bangladesh'
# location = geolocator.geocode(location)

# latitude = location.latitude
# longitude = location.longitude
# print(latitude,longitude)


# # Find attractions within 10 kilometers
# nearby_attractions = find_attractions(latitude, longitude, 100)

# # Convert GeoDataFrame to a list of dictionaries, focusing on name and geometry
# attractions_list = nearby_attractions[['name', 'geometry']].head(10).to_dict('records')

# Function to parse geometry and extract latitude and longitude
def extract_lat_lon(geometry_str):
    # Find coordinates by trimming the 'POINT (' prefix and ')' suffix
    coord_str = geometry_str.strip('<>').split('(')[-1].strip(')>')
    lon, lat = map(float, coord_str.split())
    return {'latitude': lat, 'longitude': lon}



