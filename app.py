from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import requests
import os

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "openrouter/free"




app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")




@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    if not api_key:
        return jsonify({"error": "API key is not configured."}), 500

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "user", "content": message}
        ]
    }

    try:
        response = requests.post(
            OPENROUTER_URL,
            headers=headers,
            json=payload,
            timeout=60
        )

        response.raise_for_status()

        data = response.json()
        reply = data["choices"][0]["message"]["content"]

        return jsonify({"reply": reply})

    except requests.exceptions.Timeout:
        return jsonify({
            "error": "The AI took too long to respond. Please try again."
        }), 504

    except requests.exceptions.RequestException:
        return jsonify({
            "error": "Could not connect to the AI service. Please try again."
        }), 502

    except (ValueError, KeyError, IndexError, TypeError):
        return jsonify({
            "error": "The AI service returned an unexpected response."
        }), 502




if __name__ == "__main__":
    print("OpenRouter API key loaded:", bool(api_key))
    app.run(debug=True)