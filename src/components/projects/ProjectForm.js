import { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const { addProject } = useProjects();
  const { user } = useAuth();
  const { users = [] } = useUsers();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [team, setTeam] = useState([]);

  // Only project managers can create projects
  if (user?.role !== "manager" && user?.role !== "admin") return <div className="container mt-4">Not authorized</div>;

  const toggleMember = (id) => {
    setTeam(
      team.includes(id)
        ? team.filter((t) => t !== id)
        : [...team, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addProject({
      title,
      description,
      deadline,
      team   // save selected team member IDs
    });

    navigate("/projects");
  };

  return (
    <div className="container mt-4 fade-in" style={{ maxWidth: '600px' }}>
      <div className="card border-0 shadow-sm p-4">
        <h4 className="fw-bold mb-4">Create New Project</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Project Title</label>
            <input
              className="form-control"
              placeholder="e.g. Website Redesign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="What is this project about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Deadline</label>
            <input
              type="date"
              className="form-control"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">Select Team Members</label>
            <div className="border rounded p-3 bg-light" style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {users.filter((u) => u.role !== "admin").map((u) => (
                <div key={u._id} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`user-${u._id}`}
                    checked={team.includes(u._id)}
                    onChange={() => toggleMember(u._id)}
                  />
                  <label className="form-check-label small" htmlFor={`user-${u._id}`}>
                    {u.name} ({u.role})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary">Create Project</button>
            <button type="button" className="btn btn-light" onClick={() => navigate("/projects")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
