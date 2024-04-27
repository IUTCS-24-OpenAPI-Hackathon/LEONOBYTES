import google.generativeai as genai
from dotenv import dotenv_values
from langchain_google_genai import ChatGoogleGenerativeAI
import mysql.connector

# Database connection configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Rubaiyat26',
    'database': 'sys'
}

config = dotenv_values(".env")
GOOGLE_API_KEY=config['GOOGLE_API_KEY'] 
genai.configure(api_key=GOOGLE_API_KEY)
model = ChatGoogleGenerativeAI(model="gemini-pro",google_api_key=GOOGLE_API_KEY)
