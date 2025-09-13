import streamlit as st
from groq import Groq

# Initialize Groq client
client = Groq(
    api_key="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"  # 🔑 Replace with your real API key
)

# System message for the bot
SYSTEM_PROMPT = {
    "role": "system",
    "content": (
        "You are a helpful tourist guide who gives travel tips, "
        "places to visit, local food info, and transport help based on user queries."
    )
}

# Initialize session state
if "messages" not in st.session_state:
    st.session_state.messages = [SYSTEM_PROMPT]

st.set_page_config(page_title="Tourist Guide ChatBot", page_icon="🧳")

st.title("🧳 Tourist Guide ChatBot")
st.write("Get travel help, local tips, food suggestions, and more from your AI guide!")

# Chat history display
for msg in st.session_state.messages:
    if msg["role"] == "user":
        with st.chat_message("user"):
            st.markdown(msg["content"])
    elif msg["role"] == "assistant":
        with st.chat_message("assistant"):
            st.markdown(msg["content"])

# Input box for user
if user_input := st.chat_input("Ask about places to visit, local food, or travel tips!"):
    # Save user input
    st.session_state.messages.append({"role": "user", "content": user_input})

    with st.chat_message("user"):
        st.markdown(user_input)

    # Call Groq API with conversation history
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=st.session_state.messages
    )

    reply = response.choices[0].message.content

    # Save bot reply
    st.session_state.messages.append({"role": "assistant", "content": reply})

    with st.chat_message("assistant"):
        st.markdown(reply)
