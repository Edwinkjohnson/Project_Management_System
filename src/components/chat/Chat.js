import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useProjects } from "../../context/ProjectContext";
import { useUsers } from "../../context/UserContext";
import axios from "axios";

const Chat = () => {
  const { id } = useParams();
  const projectId = id || null;
  const { user } = useAuth();
  const { projects } = useProjects();
  const { users: allUsers } = useUsers();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  const socketRef = useRef(null);

  const currentProject = projects.find(p => p._id === projectId);
  // Show project team if in project, otherwise all users
  const chatMembers = projectId ? currentProject?.team || [] : allUsers;

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    const room = projectId || "global";
    socket.emit("join_project", room);

    if (projectId && projectId.match(/^[0-9a-fA-F]{24}$/)) {
      const fetchMessages = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/messages/${projectId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [projectId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socketRef.current) return;

    const messageData = {
      senderId: user.id,
      senderName: user.name, // Pass the name for global broadcast
      text: newMessage,
      projectId: projectId || "global"
    };

    socketRef.current.emit("send_message", messageData);
    setNewMessage("");
  };

  return (
    <div className="row g-0 h-100 shadow-sm rounded overflow-hidden bg-white" style={{ minHeight: '600px' }}>
      {/* Sidebar - Project Members */}
      <div className="col-md-3 border-end bg-light d-none d-md-flex flex-column">
        <div className="p-3 bg-primary text-white">
          <h6 className="mb-0">
            <i className="bi bi-people-fill me-2"></i>
            {projectId ? "Project Members" : "All Members"}
          </h6>
        </div>
        <div className="p-3 overflow-auto flex-grow-1">
          {chatMembers.map((member) => (
            <div key={member._id || member} className="d-flex align-items-center mb-3">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2 shadow-sm"
                style={{ width: "32px", height: "32px", fontSize: '0.8rem' }}
              >
                {(member.name || (allUsers.find(u => u._id === member)?.name) || "?")[0]}
              </div>
              <div className="small fw-semibold text-dark">
                {member.name || allUsers.find(u => u._id === member)?.name || "Unknown User"}
              </div>
            </div>
          ))}
          {chatMembers.length === 0 && <p className="text-muted small">No members found</p>}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="col-md-9 d-flex flex-column bg-white">
        <div className="p-3 border-bottom bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">
            <i className="bi bi-chat-dots me-2 text-primary"></i>
            {projectId ? `Chat: ${currentProject?.title}` : "Global Workspace Chat"}
          </h5>
        </div>

        <div className="flex-grow-1 p-4 overflow-auto bg-light" style={{ maxHeight: '500px' }}>
          {messages.length === 0 && (
            <div className="text-center text-muted mt-5 pill bg-white p-3 shadow-sm mx-auto" style={{ maxWidth: '300px' }}>
              No messages yet. Start the conversation!
            </div>
          )}

          {messages.map((msg, index) => {
            const isMe = msg.sender?._id === user.id || msg.sender === user.id;
            return (
              <div key={msg._id || index} className={`d-flex mb-3 ${isMe ? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`p-3 rounded-4 shadow-sm ${isMe ? 'bg-primary text-white' : 'bg-white text-dark'}`} style={{ maxWidth: '75%' }}>
                  {!isMe && <div className="small fw-bold mb-1 text-primary">{msg.sender?.name || "User"}</div>}
                  <div className="mb-1">{msg.text}</div>
                  <div className={`small ${isMe ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.65rem' }}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        <div className="p-3 border-top">
          <form onSubmit={handleSendMessage} className="d-flex gap-2">
            <input
              className="form-control rounded-pill border-light bg-light px-4 shadow-sm"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="btn btn-primary rounded-circle shadow-sm" style={{ width: '45px', height: '45px' }}>
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
