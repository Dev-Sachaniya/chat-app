import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";

const socket = io.connect("https://chat-app-ten-sand.vercel.app");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChatBody, setShowChatBody] = useState(false);

  const joinRoom = () => {
    if (name && room) {
      socket.emit("join_room", room);
    }
    setShowChatBody(true);
  };
  return (
    <div className="App">
      {!showChatBody ? (
        <div className="joinChatContainer">
          <h2>Join Chat</h2>

          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Room id"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
          />

          <button onClick={joinRoom}>Submit</button>
        </div>
      ) : (
        <Chat socket={socket} name={name} room={room} />
      )}
    </div>
  );
}

export default App;
