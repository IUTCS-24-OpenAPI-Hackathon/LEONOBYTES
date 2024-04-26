from fastapi import HTTPException
import requests


from dotenv import dotenv_values

config = dotenv_values(".env")
api_key=config['photos_api'] 

def fetch_image_link_from_pexels(query: str) -> str:
    base_url = "https://api.pexels.com/v1/search"
    headers = {
        "Authorization": api_key
    }
    params = {
        "query": query,
        "per_page": 1  # Fetch only the first image
    }
    
    response = requests.get(base_url, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if data['photos']:
            image_url = data['photos'][0]['src']['original']
            return image_url
        else:
            return "No images found for the specified query"
    else:
        return "Failed to retrieve data with status code " + str(response.status_code)
