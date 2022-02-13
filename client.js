
  const socket = io();
  const form = document.getElementById("sendcont");
  const messageInput = document.getElementById("sent_msg");
  const messageContainer = document.getElementById("messagebox");
   
  let audio = new Audio("/sounds/iphone_notification.mp3")
  
  const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);

    if(position == 'left' || position == 'center'){
      audio.play();
    }
  };

  form.addEventListener('submit',(evt)=>{
      evt.preventDefault();
      const message = messageInput.value;
      
      append(`You : ${message}`,"right");
      socket.emit('send',message)
      messageInput.value = "";
  })



  const name = prompt("Enter your name");
  socket.emit("new_user_joined", name);

  socket.on("user-joined", (name) => {
    append(`${name} joined the party`, "center");
  });

  socket.on('recieve', (data) => {
    append(`${data.name} : ${data.message}`, "left");
  });

  socket.on("user-left", (name) => {
    append(`${name} left the party`, "left");
  });
