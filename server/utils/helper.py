import google.generativeai as genai
from dotenv import dotenv_values
from langchain_google_genai import ChatGoogleGenerativeAI

config = dotenv_values(".env")
GOOGLE_API_KEY=config['GOOGLE_API_KEY'] 
genai.configure(api_key=GOOGLE_API_KEY)
model = ChatGoogleGenerativeAI(model="gemini-pro",google_api_key=GOOGLE_API_KEY)
