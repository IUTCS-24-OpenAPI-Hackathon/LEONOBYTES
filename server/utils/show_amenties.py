import overpy  # Import overpy
from typing import List

def find_nearby_locations(lat, lon, radius, amenty):
    api = overpy.Overpass()

    # Define the Overpass query
    query = f"""
    [out:json];
    (
      node["amenity"={amenty}](around:{radius},{lat},{lon});
      way["amenity"={amenty}](around:{radius},{lat},{lon});
      rel["amenity"={amenty}](around:{radius},{lat},{lon});
    );
    out center;
    """
    
    # Execute the query
    result = api.query(query)
    
    # Extract and print information from the result
    hospitals = []
    for node in result.nodes:
        hospitals.append({
            'name': node.tags.get("name", "Unknown"),
            'latitude': node.lat,
            'longitude': node.lon,
        })
    for way in result.ways:
        hospitals.append({
            'name': way.tags.get("name", "Unknown"),
            'latitude': way.center_lat,
            'longitude': way.center_lon,
        })

    return hospitals[:5]


# def find_nearby_locations(lat, lon, radius, amenties):
#     api = overpy.Overpass()

#     # Define the Overpass query
#     query = f"""
#     [out:json];
#     (
#       node["amenity"~"{','.join(amenties)}"](around:{radius},{lat},{lon});
#       way["amenity"~"{','.join(amenties)}"](around:{radius},{lat},{lon});
#       rel["amenity"~"{','.join(amenties)}"](around:{radius},{lat},{lon});
#     );
#     out center;
#     """
    
#     # Execute the query
#     result = api.query(query)
    
#     # Extract and return information from the result
#     locations = {}
#     for amenty in amenties:
#         locations[amenty] = []
    
#     for node in result.nodes:
#         for amenty in amenties:
#             if node.tags.get("amenity") == amenty:
#                 locations[amenty].append({
#                     'name': node.tags.get("name", "Unknown"),
#                     'latitude': node.lat,
#                     'longitude': node.lon,
#                 })
    
#     for way in result.ways:
#         for amenty in amenties:
#             if way.tags.get("amenity") == amenty:
#                 locations[amenty].append({
#                     'name': way.tags.get("name", "Unknown"),
#                     'latitude': way.center_lat,
#                     'longitude': way.center_lon,
#                 })
    
#     return locations

# def find_nearby_amenities(lat: float, lon: float, radius: int, amenity: str) -> List[dict]:
#     api = overpy.Overpass()

#     # Define the Overpass query
#     query = f"""
#     [out:json];
#     (
#       node["amenity"={amenity}](around:{radius},{lat},{lon});
#       way["amenity"={amenity}](around:{radius},{lat},{lon});
#       rel["amenity"={amenity}](around:{radius},{lat},{lon});
#     );
#     out center;
#     """
    
#     # Execute the query
#     result = api.query(query)
    
#     # Extract and return information from the result
#     amenities = []
#     for node in result.nodes:
#         amenities.append({
#             'name': node.tags.get("name", "Unknown"),
#             'latitude': node.lat,
#             'longitude': node.lon,
#             'address': node.tags.get("addr:street", "No address provided")
#         })

#     for way in result.ways:
#         amenities.append({
#             'name': way.tags.get("name", "Unknown"),
#             'latitude': way.center_lat,
#             'longitude': way.center_lon,
#             'address': way.tags.get("addr:street", "No address provided")
#         })

#     return amenities
