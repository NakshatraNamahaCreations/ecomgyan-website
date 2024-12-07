import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
const socket = io("http://localhost:3000");

function Chat() {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("userToken");

  const userstoredata = user ? JSON.parse(user) : null;

  const API = (token) =>
    axios.create({
      baseURL: "http://localhost:8082/",
      headers: { Authorization: token },
    });

  // Fetch all chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await API(token).get("/api/chat");
        setChats(data);
      } catch (error) {
        console.error("Error in fetching chats: ", error);
      }
    };

    fetchChats();
  }, [token]);

  // Fetch messages for a selected chat
  const fetchMessages = async (chatId) => {
    try {
      const { data } = await API(token).get(`/api/message/${chatId}`);
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: data,
      }));
    } catch (error) {
      console.error("Error in fetching messages: ", error);
    }
  };

  // Handle chat selection
  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat._id); // Fetch messages when a chat is selected
  };

  // Send a message
  const sendMessage = async () => {
    if (message.trim() && selectedChat) {
      try {
        const { data } = await API(token).post("/api/message", {
          chatId: selectedChat._id,
          message,
        });

        // Update selectedChat state with the new message
        setSelectedChat((prevChat) => ({
          ...prevChat,
          messages: [...prevChat.messages, data],
        }));

        // Emit the message to the server via Socket.io (Optional)
        socket.emit("message", data);

        setMessage(""); // Clear input field after sending
      } catch (error) {
        console.error("Error in sending message: ", error);
      }
    }
  };

  return (
    <div className="chat-container mb-4">
      <div className="chat-header">
        <div className="chat-title">Chat Page</div>
      </div>
      <div className="d-flex">
        <div className="col-md-3">
          <div className="chat-list">
            {chats.map((chat) => (
              <div
                className="d-flex p-2"
                onClick={() => handleChatSelection(chat)}
              >
                <div
                  className="col-md-2"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={chat.photo}
                    alt="Profile"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
                <div className="col-md-10 mx-2">
                  <div className="poppins-medium">
                    {chat.latestMessage.sender.name}
                  </div>
                  <div
                    key={chat._id}
                    className="poppins-regular"
                    // Handle chat selection
                  >
                    {chat.latestMessage?.message || "No messages yet"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <div className="chat-box">
            {selectedChat && (
              <>
                <div className="messages">
                  {selectedChat.messages?.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${
                        msg.sender._id === userstoredata._id
                          ? "sent"
                          : "received"
                      }`}
                    >
                      <div className="message-content">{msg.message}</div>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    className="input-field"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button className="send-button" onClick={sendMessage}>
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
