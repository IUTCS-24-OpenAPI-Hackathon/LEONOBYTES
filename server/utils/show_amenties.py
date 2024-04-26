import overpy  # Import overpy
from typing import List

def find_nearby_amenities(lat: float, lon: float, radius: int, amenity: str) -> List[dict]:
    api = overpy.Overpass()

    # Define the Overpass query
    query = f"""
    [out:json];
    (
      node["amenity"={amenity}](around:{radius},{lat},{lon});
      way["amenity"={amenity}](around:{radius},{lat},{lon});
      rel["amenity"={amenity}](around:{radius},{lat},{lon});
    );
    out center;
    """
    
    # Execute the query
    result = api.query(query)
    
    # Extract and return information from the result
    amenities = []
    for node in result.nodes:
        amenities.append({
            'name': node.tags.get("name", "Unknown"),
            'latitude': node.lat,
            'longitude': node.lon,
            'address': node.tags.get("addr:street", "No address provided")
        })

    for way in result.ways:
        amenities.append({
            'name': way.tags.get("name", "Unknown"),
            'latitude': way.center_lat,
            'longitude': way.center_lon,
            'address': way.tags.get("addr:street", "No address provided")
        })

    return amenities
