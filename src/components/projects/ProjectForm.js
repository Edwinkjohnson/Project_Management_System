import { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const ProjectForm = () => {
  const { addProject } = useProjects();
  const { user } = useAuth();
  const { users = [] } = useUsers();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [team, setTeam] = useState([]);

  // Only project managers can create projects
  if (user?.role !== "manager") return <Navigate to="/projects" />;

  const toggleMember = (id) => {
    setTeam(
      team.includes(id)
        ? team.filter((t) => t !== id)
        : [...team, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addProject({
      id: Date.now(),
      title,
      description,
      deadline,
      managerId: user.id,
      team   // ✅ save selected team members
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDeadline("");
    setTeam([]);
  };

  return (
    <div className="container mt-4">
      <h4>Create New Project</h4>

      <form className="card p-3 mt-3" onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-3"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          className="form-control mb-3"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />

        <label className="form-label fw-semibold">Select Team Members</label>
        {users.filter((u) => u.role === "member").map((u) => (
          <div key={u.id} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={team.includes(u.id)}
              onChange={() => toggleMember(u.id)}
            />
            <label className="form-check-label">{u.name}</label>
          </div>
        ))}

        <button className="btn btn-primary mt-3">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;