
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatMessages = document.getElementById("chat-messages");
const sendButton = chatForm.querySelector('button[type="submit"]');

chatForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    // Display the user's message.
    addMessage(message, "user-message");

    messageInput.value = "";
    messageInput.disabled = true;

    if (sendButton) sendButton.disabled = true;

    // Show feedback while waiting for the AI.
    const loadingMessage = addMessage(
        "Yappuccino is brewing... ☕",
        "bot-message"
    );

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "The server returned an error.");
        }

        if (typeof data.reply !== "string") {
            throw new Error("The AI returned an unexpected response.");
        }

        // Replace the loading message with the AI's reply.
        loadingMessage.textContent = data.reply;

    } catch (error) {
        loadingMessage.textContent =
            "Couldn't get a response. Please try again.";

        console.error("Chat request failed:", error);

    } finally {
        messageInput.disabled = false;

        if (sendButton) sendButton.disabled = false;

        messageInput.focus();
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

function addMessage(text, className) {
    const messageElement = document.createElement("div");

    messageElement.classList.add("message", className);
    messageElement.textContent = text;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageElement;
}
