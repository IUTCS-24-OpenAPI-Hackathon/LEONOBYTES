from fastapi import  HTTPException
import requests

def get_place_description(place_name):
    url = "https://en.wikipedia.org/w/api.php"

    params = {
        'action': 'query',
        'format': 'json',
        'titles': place_name,
        'prop': 'extracts',
        'exintro': True,
        'explaintext': True,
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses

        # Process the response data
        data = response.json()
        page = next(iter(data['query']['pages'].values()))  # Get the first page item

        # Check if a page exists for the given title
        if 'extract' in page:
            return page['extract']
        else:
            return "No description available for this title."

    except requests.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"HTTP Error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")