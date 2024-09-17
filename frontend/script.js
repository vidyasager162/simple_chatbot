document.getElementById("send-btn").addEventListener("click", sendMessage);
document
  .getElementById("user-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  // Display user message
  addMessageToChat("You: " + userInput, "user");

  // Clear input field
  document.getElementById("user-input").value = "";

  // Send the user message to the backend
  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display bot response
      addMessageToChat("Bot: " + data.response, "bot");
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessageToChat("Bot: Error occurred", "bot");
    });
}

function addMessageToChat(message, type) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
