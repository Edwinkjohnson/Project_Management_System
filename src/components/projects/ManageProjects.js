import { useProjects } from "../../context/ProjectContext";
import { useNavigate } from "react-router-dom";

const ManageProjects = () => {
  const { projects, deleteProject } = useProjects();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Projects</h3>
        <button className="btn btn-primary" onClick={() => navigate("/projects/new")}>
          + New Project
        </button>
      </div>

      {projects.length === 0 && <p>No projects created yet.</p>}

      {projects.map(p => (
        <div key={p.id} className="card p-3 mb-3 shadow-sm">
          <div className="d-flex justify-content-between">
            <div>
              <h5>{p.title}</h5>
              <p className="mb-1 text-muted">{p.description}</p>
              <small>Deadline: {p.deadline}</small>
            </div>

            <div className="d-flex gap-2 align-items-start">
  <button
    className="btn btn-primary btn-sm"
    onClick={() => navigate(`/projects/${p.id}`)}
  >
    Open
  </button>

  <button
    className="btn btn-outline-secondary btn-sm"
    onClick={() => navigate(`/projects/edit/${p.id}`)}
  >
    Edit
  </button> 

  <button
    className="btn btn-outline-danger btn-sm"
    onClick={() => deleteProject(p.id)}
  >
    Delete
  </button>
</div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProjects;
