# from utils.helper import model
# from langchain_core.messages import HumanMessage, SystemMessage
# from langchain.prompts import ChatPromptTemplate
# from langchain.prompts import HumanMessagePromptTemplate

# places = {'Coxs Bazar': 'I loved it', 'Moinot Ghat': 'Loved it', 'Dhaka':'Hated it', "Padma River":'Best days of my life'}

# chat_template = ChatPromptTemplate.from_messages(
#     [
#         SystemMessage(
#             content=(
#                 f"You are a tour itinerary planner."
#                 ),
#             role=(
#                 "helpful chatbot"
#             )
#         ),
#         HumanMessagePromptTemplate.from_template("{user_requirements}"),
#     ]
# )

# def chat_req(user_requirements):
#     chat_message =  chat_template.format_messages(user_requirements=user_requirements)
#     ans=model.invoke(chat_message)
#     return ans.content

# user_req =  f"{}You plan tours based on the user previous travel experience. Previous traveled places : {places}. Justify why you have chosen those places. '

# print(chat(user_req))
