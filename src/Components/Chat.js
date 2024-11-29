import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://api.proleverageadmin.in");

function Chat() {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("userToken");

  const userstoredata = user ? JSON.parse(user) : null;
  const [searchQuery, setSearchQuery] = useState("");

  console.log("userstoredata===suman", userstoredata);

  const API = (token) =>
    axios.create({
      baseURL: "https://api.proleverageadmin.in/",
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

  const handleLogin = async () => {
    try {
      const config = {
        url: "/users/auth/login",
        method: "post",
        baseURL: "https://api.proleverageadmin.in/api",
        headers: { "content-type": "application/json" },
        data: { email, password },
      };

      const res = await axios(config);

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login Successfully", res.data.token);
        console.log("token sisya", res.data.token);
        window.location.reload("");
      }
    } catch (error) {
      console.log("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  console.log("chat", chats);

  const filteredChats = chats?.filter((chat) =>
    chat.latestMessage.sender.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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

  console.log("selectedChat", selectedChat);
  console.log("message", message);

  return (
    <div className="container">
      {!userstoredata ? (
        <div className="row mt-2 col-md-12 justify-content-center">
          <div className="col-md-4">
            <div className="d-flex justify-content-center">
              <img
                src="./images/eg.png"
                alt="loading..."
                style={{ height: "150px", textAlign: "center" }}
              />
            </div>

            <div className="login_heading">Log In to Proleverage</div>
            <div className="mt-3">
              <div className="label">Email</div>
              <input
                type="text"
                placeholder="Please Enter Email"
                className="input_box"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <div className="label">Password</div>
              <input
                type="text"
                placeholder="Please Enter Password"
                className="input_box"
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="" className="hyperlink">
                Forgot Password?
              </a>
            </div>

            <div className="d-flex mt-2">
              <input type="checkbox" />
              <div
                className=""
                style={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: "700",
                  marginLeft: "10px",
                }}
              >
                Remember Me
              </div>
            </div>

            <div className="login_button" onClick={handleLogin}>
              Login
            </div>

            <div
              className="text-center d-flex mt-3 justify-content-center mb-3"
              style={{ color: "black", fontSize: "15px" }}
            >
              New to Proleverage ?
              <a href="chatsignup" className="hyperlink1 px-1">
                Sign Up Now
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-md-10">
            <div className="d-flex" style={{ margin: "10px" }}>
              <div
                className="col-md-4"
                style={{
                  backgroundColor: "#e9ecef",
                  padding: "10px",
                  height: "97vh",
                }}
              >
                <div className="">
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{
                      fontSize: "14px",
                      position: "absolute",
                      marginTop: "11px",
                      marginLeft: "10px",
                    }}
                  ></i>
                  <input
                    type="text"
                    className="col-md-12 poppins-regular"
                    placeholder="Search"
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      outline: "none",
                      borderRadius: "10px",
                      height: "35px",
                      paddingLeft: "36px",
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {filteredChats.map((chat) => (
                  <div
                    className="d-flex p-2 mt-1"
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
                        src={chat.latestMessage.sender.profilePic}
                        alt="Profile"
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50px",
                        }}
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
              <div className="col-md-8">
                <div
                  className="d-flex"
                  style={{
                    backgroundColor: "#e9ecef",
                    padding: "10px",
                  }}
                >
                  <div className="col-md-11">
                    <div className="d-flex" style={{ alignItems: "center" }}>
                      <div className="">
                        <img
                          src="../images/a5.webp"
                          alt="loading"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50px",
                          }}
                        />
                      </div>
                      <div className="poppins-medium mx-3">Suman Raj</div>
                    </div>
                  </div>
                  <div
                    className="col-md-1"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{
                        fontSize: "16px",
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "50px",
                      }}
                    ></i>
                  </div>
                </div>
                <div
                  className=""
                  style={{
                    backgroundColor: "white",
                    height: "79vh",
                    padding: "10px",
                  }}
                >
                  {selectedChat && (
                    <>
                      <div
                        className="messages"
                        style={{
                          backgroundColor: "white",
                          height: "79vh",
                          padding: "10px",
                        }}
                      >
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
                    </>
                  )}
                </div>
                <div
                  className="d-flex mx-2"
                  style={{ backgroundColor: "#e9ecef", borderRadius: "10px" }}
                >
                  <div className="col-md-11">
                    <i
                      className="fa-solid fa-paperclip"
                      style={{
                        position: "absolute",
                        marginTop: "13px",
                        marginLeft: "10px",
                      }}
                    ></i>
                    <input
                      type="text"
                      className="poppins-regular col-md-12"
                      placeholder="your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "#e9ecef",
                        padding: "10px",
                        borderRadius: "5px",
                        paddingLeft: "35px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div
                    className="col-md-1"
                    onClick={sendMessage}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-paper-plane"
                      style={{ color: "blue" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Chat;
