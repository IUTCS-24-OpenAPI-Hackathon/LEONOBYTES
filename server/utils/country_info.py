from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests


def get_country_info(country_name):
    url = f"https://restcountries.com/v3.1/name/{country_name}?fullText=true"
    response = requests.get(url)
    data = response.json()
    
    if response.status_code == 200:
        currencies = [value['name'] for key, value in data[0]['currencies'].items()]
        borders = data[0].get('borders', [])
        
        border_names = []
        if borders:
            borders_url = f"https://restcountries.com/v3.1/alpha?codes={','.join(borders)}"
            borders_response = requests.get(borders_url)
            border_data = borders_response.json()
            border_names = [country['name']['common'] for country in border_data]

        return currencies, border_names
    else:
        raise HTTPException(status_code=404, detail="Data not found for this country.")

def get_capital(country_name):
    url = f"https://restcountries.com/v3.1/name/{country_name}?fullText=true"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        capital = data[0]['capital'][0] if 'capital' in data[0] else "No capital found."
        return capital
    else:
        raise HTTPException(status_code=404, detail="Country not found.")