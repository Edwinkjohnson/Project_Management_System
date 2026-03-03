import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

const ProjectWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject, deleteProject } = useProjects();
  const { tasks } = useTasks();
  const { user } = useAuth();

  const project = projects.find(p => p._id === id);
  const projectTasks = tasks[id] || [];

  if (!project) return <p className="p-4">Project not found</p>;

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>{project.title}</h3>
          <div className="text-muted">Deadline: {project.deadline}</div>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate(`/projects/${project._id}/board`)}
          >
            Open Kanban Board
          </button>

          <button
            className="btn btn-outline-warning btn-sm"
            onClick={() => {
              const title = prompt("New title", project.title);
              const deadline = prompt("New deadline", project.deadline);
              if (title && deadline) {
                updateProject(project._id, { title, deadline });
              }
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              deleteProject(project._id);
              navigate("/dashboard");
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <hr />

      <h5>Tasks</h5>

      {projectTasks.length === 0 && (
        <p className="text-muted">No tasks for this project</p>
      )}

      {projectTasks.map(t => (
        <div key={t._id} className="card p-2 mb-2">
          <strong>{t.title}</strong>
          <div>Status: {t.status}</div>
          <div>Assigned to: {t.assigneeId?.name || (t.assigneeId === user.id || t.assigneeId?._id === user.id ? user.name : "Unassigned")}</div>
        </div>
      ))}

    </div>
  );
};

export default ProjectWorkspace;
