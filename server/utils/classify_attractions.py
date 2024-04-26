import wikipedia
from fastapi import  HTTPException



def get_tourist_attractions_names(place_name):
    """
    Returns a list of tourist attraction names and their types in the given country.
    """
    try:
        # Formulate the search query for tourist attractions in the given country
        search_query = f"{place_name} tourist attractions places names"
        results = wikipedia.search(search_query, results=15)  # Limit to 10 results
        
        attractions = []
        for place_name in results:
            if 'Tourism' in place_name:
                a = 0
            elif 'List' in place_name:
                a = 1
            elif 'Tourist' in place_name:
                a = 1
            elif 'attractions' in place_name:
                a = 1
            else:
                attractions.append(place_name)
        results = attractions
        print(results)
        
        return results
    except Exception as e:
        print(f"An error occurred while searching for tourist attractions: {e}")
        return []