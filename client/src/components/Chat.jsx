import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, name, room }) => {
  const [message, setMessage] = useState("");
  const [messageBody, setMessageBody] = useState([]);
  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        sender: name,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageBody((prevBody) => [...prevBody, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    const receiveMessage = (data) => {
      console.log(data);
    };

    socket.on("recieve_message", (receiveMessage) => {
      setMessageBody((prevBody) => [...prevBody, receiveMessage]);
    });

    return () => {
      socket.off("recieve_message", receiveMessage); // Remove the event listener when the component unmounts
    };
  }, [socket]);
  return (
    <div className="chat-window">
      <div>
        <div className="chat-header">
          <h4>Nice Chat</h4>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageBody.map((msg) => {
              return (
                <div
                  className="message"
                  id={name === msg.sender ? "me" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{msg.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{msg.time}</p>
                      <p id="author">{msg.sender}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            plcaeholder=" Enter your message"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            value={message}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
