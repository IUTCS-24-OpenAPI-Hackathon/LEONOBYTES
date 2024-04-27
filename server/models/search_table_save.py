from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from utils.helper import db_config

# # Database connection configuration
# db_config = {
#     'host': 'localhost',
#     'user': 'root',
#     'password': 'root',
#     'database': 'sys'
# }

app = FastAPI()

# Define a Pydantic model for the request body
class SearchInput(BaseModel):
    user_id: str
    search_text: str

# Function to insert data into the search_table
def save_search(user_id: int, search_text: str):
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute SQL query to insert data
        cursor.execute("INSERT INTO search_table (user_id, search_text) VALUES (%s, %s)", (user_id, search_text))
        
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

