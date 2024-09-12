import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import yaml

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
client = OpenAI()

app = Flask(__name__)

# Dodanie obsługi CORS
CORS(app)


def load_endpoints(path: str):
    with open(path, 'r') as file:
        return yaml.safe_load(file)


endpoints = load_endpoints("endpoints.yml")


# Endpoint do przetwarzania wiadomości użytkownika
@app.route(endpoints["action_endpoint"]["send_message"], methods=['POST'])
def send_message():
    data = request.json
    user_message = data.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    # Wywołanie API OpenAI z zapytaniem użytkownika
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Jesteś pomocnym asystentem."},
            {"role": "user", "content": user_message}
        ]
    )
    chat_response = response.choices[0].message.content
    return jsonify({'response': chat_response})

    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', endpoints["port"]))
    app.run(host=endpoints["action_endpoint"]["host"], port=port, debug=True)
