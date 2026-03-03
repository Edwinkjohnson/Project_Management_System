import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import { useUsers } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
  const { projects } = useProjects();
  const { allTasks: tasks } = useTasks();
  const { users } = useUsers();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ SAFETY CHECK (PREVENT BLANK SCREEN)
  if (!user) {
    return <div className="text-center mt-5">Loading dashboard...</div>;
  }

  // ✅ Correct task filtering
  const myTasks =
    user.role === "manager"
      ? tasks
      : tasks.filter(t => t.assigneeId === user.id || t.assigneeId?._id === user.id);

  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const completionRate = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className="container mt-4">

      <h3 className="mb-4">Dashboard</h3>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center">
            <h6>Total Projects</h6>
            <h3>{projects.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center">
            <h6>Total Tasks</h6>
            <h3>{tasks.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center">
            <h6>Completed Tasks</h6>
            <h3>{completedTasks}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center">
            <h6>Team Members</h6>
            <h3>{users.length}</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">

        {/* Recent Projects */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <h5>Recent Projects</h5>
            {projects.slice(0, 5).map(p => (
              <div key={p._id || p.id} className="border-bottom py-2 d-flex justify-content-between align-items-center">
                <div>
                  <strong>{p.title}</strong>
                  <div className="text-muted small">
                    Deadline: {p.deadline || "N/A"}
                  </div>
                </div>
                <div className="d-flex gap-1">
                  <button className="btn btn-sm btn-link p-0 text-primary" onClick={() => navigate(`/projects/${p._id}/tasks`)} title="Tasks"><i className="bi bi-list-task"></i></button>
                  <button className="btn btn-sm btn-link p-0 text-warning" onClick={() => navigate(`/projects/${p._id}/board`)} title="Kanban"><i className="bi bi-kanban"></i></button>
                  <button className="btn btn-sm btn-link p-0 text-success" onClick={() => navigate(`/chat/${p._id}`)} title="Chat"><i className="bi bi-chat-dots"></i></button>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-muted">No projects yet</p>
            )}
          </div>
        </div>

        {/* My Active Tasks */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <h5>My Active Tasks</h5>
            {myTasks.slice(0, 5).map(t => (
              <div key={t._id || t.id} className="border-bottom py-2">
                <strong>{t.title}</strong>
                <div className="small">
                  Status: <span className="fw-bold">{t.status}</span>
                </div>
              </div>
            ))}
            {myTasks.length === 0 && (
              <p className="text-muted">No active tasks</p>
            )}
          </div>
        </div>

        {/* Productivity */}
        <div className="col-md-8">
          <div className="card p-3 shadow-sm">
            <h5>Productivity Overview</h5>
            <div className="progress mt-2" style={{ height: "20px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${completionRate}%` }}
              >
                {completionRate}%
              </div>
            </div>
            <small className="text-muted mt-2 d-block">
              {completedTasks} of {tasks.length} tasks completed
            </small>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Quick Actions</h5>
            <div className="d-grid gap-2 mt-2">
              <Link to="/projects" className="btn btn-primary btn-sm">
                Manage Projects
              </Link>
              <Link to="/projects/new" className="btn btn-outline-primary btn-sm">
                + Create Project
              </Link>
              <Link to="/chat" className="btn btn-outline-secondary btn-sm">
                Open Team Chat
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;
