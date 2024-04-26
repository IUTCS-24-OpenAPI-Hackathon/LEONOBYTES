from fastapi import  HTTPException
from dotenv import dotenv_values
import requests
import math

config = dotenv_values(".env")
API_key=config['API_key'] 

API_key = '464180b8505f4807a4494e41590e7e67'
def show_weather(place_name):
    city = place_name
    
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_key}"

    try:
        response = requests.get(url).json()

        temp = math.floor((response['main']['temp'] * 1.8) - 459.67)  # Convert to °F
        temp_max = math.floor((response['main']['temp_max'] * 1.8) - 459.67)  # Convert to °F
        temp_min = math.floor((response['main']['temp_min'] * 1.8) - 459.67)  # Convert to °F
        feels_like = math.floor((response['main']['feels_like'] * 1.8) - 459.67)  # Convert to °F
        humidity = response['main']['humidity']
        sky = response['weather'][0]['main']

        return {
            'temp': temp,
            'temp_min' : temp_min,
            'temp_max' : temp_max,
            'feels_like': feels_like,
            'humidity': humidity,
            'sky' : sky
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))