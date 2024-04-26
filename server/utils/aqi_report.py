from fastapi import  HTTPException
from dotenv import dotenv_values

config = dotenv_values(".env")
api_key=config['api_key'] 



import requests
def get_air_quality(city):
    # Replace spaces with URL-safe %20
    url_safe_city = city.replace(' ', '%20')
    url = f"https://api.waqi.info/feed/{url_safe_city}/?token={api_key}"
    
    response = requests.get(url)
    data = response.json()
    
    if data["status"] == "ok":
        aqi = data["data"]["aqi"]
        return aqi
    else:
        raise HTTPException(status_code=404, detail="Data not found for this location.")
