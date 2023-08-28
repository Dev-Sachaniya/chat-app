import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-client-zeta.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} joined room ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
