import { Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";
import { useUsers } from "../../context/UserContext";
import { useState } from "react";

const ProjectList = () => {
  const { projects = [], deleteProject } = useProjects();
  const { tasks = [], addTask, updateTask } = useTasks();
  const { user } = useAuth();
  const isProjectAdmin = user.role === "manager" || user.role === "admin";
  const { users = [] } = useUsers();


  const [newTaskTitle, setNewTaskTitle] = useState("");

  if (!user) return <div className="container mt-4">Please login</div>;

  // 🔐 Project visibility
  const visibleProjects =
    isProjectAdmin
      ? projects.filter(p => p.managerId === user.id)
      : projects.filter(p => p.team?.includes(user.id));

  const cycleStatus = (status) =>
    status === "Pending" ? "In Progress" : status === "In Progress" ? "Completed" : "Pending";

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Projects</h4>
        {user.role === "manager" && (
          <Link to="/projects/new" className="btn btn-primary">+ New Project</Link>
        )}
      </div>

      {visibleProjects.length === 0 && <p className="mt-3">No projects available.</p>}

      {visibleProjects.map(p => {
        const visibleTasks =
          user.role === "manager"
            ? tasks.filter(t => t.projectId === p.id)
            : tasks.filter(t => t.projectId === p.id && t.assigneeId === user.id);

        return (
          <div key={p.id} className="list-group-item mt-3">

            <h6>{p.title}</h6>
            <p>{p.description}</p>
            <small>Deadline: {p.deadline}</small>

            {user.role === "manager" && (
              <div className="mt-2">
                <button className="btn btn-danger btn-sm" onClick={() => deleteProject(p.id)}>Delete</button>
              </div>
            )}

            <hr />
            <h6>Tasks</h6>

            {user.role === "manager" && (
              <form onSubmit={e => {
                e.preventDefault();
                addTask({
                  id: Date.now(),
                  projectId: p.id,
                  title: newTaskTitle,
                  status: "Pending",
                  assigneeId: null
                });
                setNewTaskTitle("");
              }}>
                <div className="d-flex gap-2">
                  <input className="form-control" value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)} required />
                  <button className="btn btn-primary btn-sm">Add</button>
                </div>
              </form>
            )}

            {visibleTasks.map(t => (
              <div key={t.id} className="border rounded p-2 mt-2 d-flex justify-content-between">

                <div>
                  <strong>{t.title}</strong>
                  {t.assigneeId && (
                    <div className="small text-muted">
                      Assigned to: {users.find(u => u.id === t.assigneeId)?.name}
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2">
                  {user.role === "manager" && (
                    <select
                      className="form-select form-select-sm"
                      value={t.assigneeId || ""}
                      onChange={e => updateTask(t.id, { ...t, assigneeId: Number(e.target.value) })}
                    >
                      <option value="">Assign</option>
                      {users.filter(u => p.team?.includes(u.id)).map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                      ))}
                    </select>
                  )}

                  <button
                    className={`btn btn-sm ${
                      t.status === "Pending" ? "btn-secondary" :
                      t.status === "In Progress" ? "btn-warning" : "btn-success"
                    }`}
                    onClick={() => updateTask(t.id, { ...t, status: cycleStatus(t.status) })}
                  >
                    {t.status}
                  </button>
                </div>

              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
