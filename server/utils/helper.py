import google.generativeai as genai
from dotenv import dotenv_values

config = dotenv_values(".env")
GOOGLE_API_KEY=config['GOOGLE_API_KEY'] 
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')
