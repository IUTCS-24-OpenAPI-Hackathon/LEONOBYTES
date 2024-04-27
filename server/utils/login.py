from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from utils.helper import db_config

# Database connection configuration
# db_config = {
#     'host': 'localhost',
#     'user': 'root',
#     'password': 'root',
#     'database': 'sys'
# }

app = FastAPI()

# Define a Pydantic model for the request body
class LoginInput(BaseModel):
    user_id: int
    password: str

# Function to authenticate user login
def authenticate_user(user_id: int, password: str):
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute SQL query to fetch user's password
        cursor.execute("SELECT password FROM User WHERE user_id = %s", (user_id,))
        result = cursor.fetchone()

        if result:
            # Verify password
            if result[0] == password:
                return {"message": "Login successful"}
            else:
                return {"error": "Invalid password"}
        else:
            return {"error": "User not found"}

    except mysql.connector.Error as e:
        return {"error": str(e)}

    finally:
        # Close connection
        if conn.is_connected():
            cursor.close()
            conn.close()