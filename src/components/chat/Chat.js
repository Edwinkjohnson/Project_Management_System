const Chat = () => {
  return (
    <>
      <h3>Team Chat</h3>
      <div className="card p-3 mt-3" style={{ height: "300px" }}>
        <div className="text-muted">Chat messages will appear here...</div>
      </div>
      <input className="form-control mt-2" placeholder="Type a message..." />
    </>
  );
};

export default Chat;
