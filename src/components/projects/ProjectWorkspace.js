import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";

const ProjectWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject, deleteProject } = useProjects();
  const { tasks } = useTasks();

  const project = projects.find(p => p.id === Number(id));
  const projectTasks = tasks.filter(t => t.projectId === Number(id));

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
            className="btn btn-outline-warning btn-sm"
            onClick={() => {
              const title = prompt("New title", project.title);
              const deadline = prompt("New deadline", project.deadline);
              if (title && deadline) {
                updateProject(project.id, { title, deadline });
              }
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              deleteProject(project.id);
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
        <div key={t.id} className="card p-2 mb-2">
          <strong>{t.title}</strong>
          <div>Status: {t.status}</div>
          <div>Assigned to: {t.assignee || "Unassigned"}</div>
        </div>
      ))}

    </div>
  );
};

export default ProjectWorkspace;
