from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from  utils.helper import db_config


app = FastAPI()

# Define a Pydantic model for the request body
class PlaceInput(BaseModel):
    place_id: int
    name: str
    description: str
    image: str

# Function to insert data into the Places table
def save_place(place_id: int, name: str, description: str, image: str):
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute SQL query to insert data
        cursor.execute("INSERT INTO Places (place_id, name, description, image) VALUES (%s, %s, %s, %s)", (place_id, name, description, image))
        
        # Commit the transaction
        conn.commit()

        return {"message": "Data inserted successfully"}

    except mysql.connector.Error as e:
        return {"error": str(e)}

    finally:
        # Close connection
        if conn.is_connected():
            cursor.close()
            conn.close()
            
            