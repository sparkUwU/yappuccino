# Yappuccino ☕

Freshly brewed artificial nonsense.

Yappuccino is a small Flask web app that sends a user's message to OpenRouter and displays the AI response in a simple, coffee-themed chat interface. It is intended as a beginner-friendly example of connecting a browser frontend, a Python backend, and an AI API.

## Features

- Responsive single-page chat interface
- AI responses through the OpenRouter Chat Completions API
- Loading feedback while a response is being generated
- Input and send-button locking during requests
- Client-side empty-message prevention
- Friendly handling for API configuration, timeout, connection, and invalid-response errors

## Tech stack

- HTML, CSS, and vanilla JavaScript
- Python and Flask
- OpenRouter API
- `requests` for HTTP requests
- `python-dotenv` for environment-variable loading

## How it works

1. The browser sends a message to the Flask `POST /chat` endpoint.
2. Flask forwards the message to OpenRouter's Chat Completions API using the `openrouter/free` model selector.
3. The API response is returned to the browser as JSON.
4. JavaScript replaces the loading message with the AI reply.

## Getting started

### Prerequisites

- Python 3
- An [OpenRouter API key](https://openrouter.ai/keys)

### Installation

Clone the repository and enter it:

```bash
git clone https://github.com/sparkUwU/yappuccino.git
cd yappuccino
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the dependencies:

```bash
pip install flask requests python-dotenv
```

Create a `.env` file in the project root and add your OpenRouter key:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

Keep `.env` private; it is already excluded by `.gitignore`.

### Run the app

```bash
python app.py
```

Then open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

## API

### `POST /chat`

Sends a message to the configured OpenRouter model.

Request body:

```json
{
  "message": "Hello!"
}
```

Successful response:

```json
{
  "reply": "Hello! How can I help?"
}
```

The endpoint reports configuration errors, OpenRouter timeouts, connection problems, and unexpected API responses as JSON error messages.

## Project structure

```text
app.py                 Flask application and OpenRouter integration
templates/index.html   Chat page
static/style.css       Interface styling
static/script.js       Browser chat behavior
```

## Notes

This is a learning project. Chats are not stored, and each request contains only the latest user message, so the app has no conversation memory. The `openrouter/free` selector may route to different available free models.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
