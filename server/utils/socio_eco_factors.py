from utils.helper import model

from langchain_core.messages import HumanMessage, SystemMessage
from langchain.prompts import ChatPromptTemplate
from langchain.prompts import HumanMessagePromptTemplate

chat_template = ChatPromptTemplate.from_messages(
    [
        SystemMessage(
            content=(
                "Act as a helpful chatbot that provides socio-economic information relevant to a specific location.You're job is to take the location description as input and provide a response that includes meaningful socio-economic factors relevant to the specified location."
            )
        ),
        HumanMessagePromptTemplate.from_template("{location_description}"),
    ]
)

def chat(location_description):
    chat_message =  chat_template.format_messages(location_description=location_description)
    ans=model.invoke(chat_message)
    return ans.content
