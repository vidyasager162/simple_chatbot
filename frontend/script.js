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
  addMessageToChat(userInput, "user");

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
      console.log(data.response);
      addMessageToChat(data.response, "bot");
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessageToChat("Error occurred", "bot");
    });
}

function addMessageToChat(message, type) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  if (type === "bot") {
    messageElement.innerHTML = marked.parse(message);
    messageElement.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  } else {
    messageElement.textContent = message;
  }
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
