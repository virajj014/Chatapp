const socket = io();
const form = document.getElementById("sendcont");
const messageInput = document.getElementById("sent_msg");
const messageContainer = document.getElementById("messagebox");

let audio = new Audio("/sounds/iphone_notification.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.appendChild(messageElement);

  if (position == "left" || position == "center") {
    audio.play();
  }
};

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const message = messageInput.value;

  append(`You : ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

let username = prompt("Enter your username");
while (username == null || username == "") {
  alert ("Username can't be empty");
  username = prompt("Enter your username");
}
socket.emit("new_user_joined", username);

socket.on("user-joined", (username) => {
  append(`${username} joined the party`, "center");
});

socket.on("recieve", (data) => {
  append(`${data.username} : ${data.message}`, "left");
});

socket.on("user-online", (objectlength) => {
  document.getElementById("activeusers").innerText = `${objectlength} Active`;
});

socket.on("user-left", (username) => {
  append(`${username} left the party`, "center");
});
