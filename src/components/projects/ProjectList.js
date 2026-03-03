import { Link, useParams } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";
import { useUsers } from "../../context/UserContext";
import { useState, useEffect, useMemo } from "react";

const ProjectList = () => {
  const { id } = useParams();
  const { projects: allProjects = [], deleteProject, loading: projectsLoading } = useProjects();
  const { tasks = {}, addTask, updateTask, loadTasks, loading: tasksLoading } = useTasks();
  const { user } = useAuth();
  const { users = [] } = useUsers();

  const projects = useMemo(() => {
    if (!id) return allProjects;
    return allProjects.filter(p => p._id === id);
  }, [allProjects, id]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [activeProjectId, setActiveProjectId] = useState(id || null);

  useEffect(() => {
    if (id) {
      setActiveProjectId(id);
      if (!tasks[id]) {
        loadTasks(id);
      }
    }
  }, [id, tasks, loadTasks]);

  if (!user) return <div className="container mt-4">Please login</div>;
  if (projectsLoading) return <div className="container mt-4 text-center">Loading projects...</div>;

  const handleLoadTasks = (projectId) => {
    if (activeProjectId === projectId) {
      setActiveProjectId(null);
    } else {
      setActiveProjectId(projectId);
      if (!tasks[projectId]) {
        loadTasks(projectId);
      }
    }
  };

  const cycleStatus = (status) =>
    status === "Pending" ? "In Progress" : status === "In Progress" ? "Completed" : "Pending";

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">My Projects</h4>
        {(user.role === "manager" || user.role === "admin") && (
          <Link to="/projects/new" className="btn btn-primary">+ New Project</Link>
        )}
      </div>

      {projects.length === 0 && <p className="mt-3 text-muted">No projects available.</p>}

      <div className="row g-4">
        {projects.map(p => {
          const projectTasks = tasks[p._id] || [];
          const isActive = activeProjectId === p._id;

          return (
            <div key={p._id} className="col-12">
              <div className={`card border-0 shadow-sm ${isActive ? 'ring-primary' : ''}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div onClick={() => handleLoadTasks(p._id)} style={{ cursor: 'pointer' }}>
                      <h5 className="fw-bold mb-1">{p.title}</h5>
                      <p className="text-muted small mb-2">{p.description}</p>
                      <div className="d-flex gap-3 small text-muted">
                        <span><i className="bi bi-calendar-event me-1"></i> {p.deadline ? new Date(p.deadline).toLocaleDateString() : 'No deadline'}</span>
                        <span><i className="bi bi-person me-1"></i> {p.createdBy?.name || 'Unknown'}</span>
                      </div>
                    </div>

                    {(user.role === "admin" || (user.role === "manager" && p.createdBy?._id === user.id)) && (
                      <button
                        className="btn btn-sm btn-outline-danger border-0"
                        onClick={(e) => { e.stopPropagation(); deleteProject(p._id); }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>

                  {isActive && (
                    <div className="mt-4 pt-3 border-top fade-in">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0">Tasks ({projectTasks.length})</h6>
                        {(user.role === "manager" || user.role === "admin") && (
                          <form
                            className="d-flex gap-2"
                            onSubmit={e => {
                              e.preventDefault();
                              addTask({
                                projectId: p._id,
                                title: newTaskTitle,
                                status: "Pending"
                              });
                              setNewTaskTitle("");
                            }}
                          >
                            <input
                              placeholder="New task..."
                              className="form-control form-control-sm"
                              value={newTaskTitle}
                              onChange={e => setNewTaskTitle(e.target.value)}
                              required
                            />
                            <button className="btn btn-primary btn-sm">Add</button>
                          </form>
                        )}
                      </div>

                      {tasksLoading && !projectTasks.length && <div className="text-center py-2"><div className="spinner-border spinner-border-sm text-primary"></div></div>}

                      <div className="list-group list-group-flush">
                        {projectTasks.map(t => (
                          <div key={t._id} className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
                            <div>
                              <div className="fw-medium">{t.title}</div>
                              {t.assigneeId && (
                                <div className="small text-muted">
                                  {t.assigneeId?.name || users.find(u => u._id === (t.assigneeId?._id || t.assigneeId))?.name || "Unknown"}
                                </div>
                              )}
                            </div>

                            <div className="d-flex gap-2 align-items-center">
                              {(user.role === "manager" || user.role === "admin") && (
                                <select
                                  className="form-select form-select-sm border-0 bg-light"
                                  value={t.assigneeId?._id || t.assigneeId || ""}
                                  onChange={e => updateTask(t._id, { assigneeId: e.target.value })}
                                >
                                  <option value="">Assign to...</option>
                                  {users.filter(u => u.role !== "admin").map(u => (
                                    <option key={u._id} value={u._id}>{u.name}</option>
                                  ))}
                                </select>
                              )}

                              <input
                                type="date"
                                className="form-control form-control-sm border-0 bg-light"
                                style={{ width: 'auto' }}
                                value={t.dueDate ? t.dueDate.split('T')[0] : ""}
                                onChange={e => updateTask(t._id, { dueDate: e.target.value })}
                              />

                              <button
                                className={`btn btn-sm rounded-pill px-3 ${t.status === "Pending" ? "btn-light text-muted" :
                                  t.status === "In Progress" ? "btn-warning-soft text-warning" : "btn-success-soft text-success"
                                  }`}
                                onClick={() => updateTask(t._id, { status: cycleStatus(t.status) })}
                                style={{ fontSize: '0.75rem' }}
                              >
                                {t.status}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
