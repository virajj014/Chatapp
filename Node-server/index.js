
  let express = require("express");
  let app = express();
  var http = require("http").Server(app);
  var io = require("socket.io")(http);
  const path = require("path");
  const mainfile = path.join(__dirname, "../");
  app.use(express.static(mainfile));

  app.get("/", function (req, res) {
    res.sendFile(mainfile + "/index.html");
    // console.log(mainfile)
  });

  const users = {};

  io.on("connection", (socket) => {
    socket.on("new_user_joined", (name) => {
      console.log("new user", name);
      users[socket.id] = name;
      socket.broadcast.emit("user-joined", name);
      

      socket.on("disconnect",()=>{
      console.log("user left", name);
      socket.broadcast.emit("user-left", name);
    })
    });

    socket.on("send", (message) => {
        console.log(message);
      socket.broadcast.emit("recieve", {
        message: message,
        name: users[socket.id],
      });
    });

    
  });

  http.listen(8000, function () {
    console.log("Server running at port 8000");
  });

