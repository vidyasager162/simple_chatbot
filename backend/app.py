from flask import Flask, request, jsonify, render_template
import os
import google.generativeai as genai

app = Flask(__name__, static_folder= '../frontend', template_folder='../frontend')

genai.configure(api_key=os.getenv('API_KEY'))
model = genai.GenerativeModel("gemini-1.5-flash")
history = [
    {"role": "user", "parts": "Hello"},
    {"role": "model", "parts": "Great to meet you. What would you like to know?"},
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    global history
    user_input = request.json.get('message')
    if user_input.lower() == "bye":
        return jsonify({"response": "Goodbye!"})
    chat_session = model.start_chat(history=history)
    response = chat_session.send_message(user_input)
    history.append({"role": "user", "parts": user_input})
    history.append({"role": "model", "parts": response.text})
    
    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True)