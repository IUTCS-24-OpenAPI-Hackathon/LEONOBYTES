from fastapi import FastAPI, status, HTTPException, Query
from Countrydetails import countries,country
app = FastAPI()

@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    return {"status": "ok"}


#for auto completing country names
@app.get("/countries")
async def get_all_countries():
    try:
        data = countries.all_countries()
        all_countries = data.countries()
        return {"countries": all_countries}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#get states    
@app.get("/states")
async def get_states(country_name: str = Query(..., title="Country Name", description="Enter the name of the country")):
    try:
        country_info = country.country_details(country_name)
        states = country_info.states()
        if states:
            return {"states": states}
        else:
            raise HTTPException(status_code=404, detail="States not found for the specified country")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
    
    