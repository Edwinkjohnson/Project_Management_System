import { useUsers } from "../../context/UserContext";
import { Link } from "react-router-dom";

const Team = () => {
  const { users } = useUsers();

  const teamMembers = users.filter(u => u.role === "user");

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Team Members</h4>
      </div>

      <div className="row g-3">
        {teamMembers.map(user => (
          <div key={user.id} className="col-md-4">
            <div className="card p-3 shadow-sm border-0 h-100">
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                  {user.name[0]}
                </div>
                <div>
                  <h6 className="mb-0">{user.name}</h6>
                  <small className="text-muted">{user.role}</small>
                </div>
              </div>
              <p className="mb-2 small text-muted"><i className="bi bi-envelope me-2"></i>{user.email}</p>
              <div className="mt-auto d-flex gap-2">
                <Link to="/chat" className="btn btn-sm btn-outline-primary flex-grow-1">
                  <i className="bi bi-chat-dots me-2"></i>Message
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {teamMembers.length === 0 && <p className="text-muted">No team members found.</p>}
    </div>
  );
};

export default Team;
