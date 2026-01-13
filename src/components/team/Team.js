import { useUsers } from "../../context/UserContext";

const Team = () => {
  const { users } = useUsers();

  const teamMembers = users.filter(u => u.role === "member");

  return (
    <div className="container mt-4">
      <h4>Team Members</h4>

      {teamMembers.map(user => (
        <div key={user.id} className="card p-3 mb-3">
          <h6>{user.name}</h6>
          <p className="mb-1">{user.email}</p>
          <small className="text-muted">Role: {user.role}</small>
        </div>
      ))}
    </div>
  );
};

export default Team;
