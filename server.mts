import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  // On your server
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", ({ room, username }) => {
      console.log(`User ${username} joining room ${room}`);
      socket.join(room);
      socket.to(room).emit("user_joined", `${username} has joined the room`);
    });

    socket.on("message", ({ room, message, sender }) => {
      console.log(`${sender} send message in room ${room}: ${message}`);
      socket.to(room).emit("message", { message, sender });
    });
  });

  httpServer.listen(port, () => {
    console.log(`http server is listen on http://${hostname}:${port}`);
  });
});
