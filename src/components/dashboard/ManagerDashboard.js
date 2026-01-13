import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import { useUsers } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { users } = useUsers();
  const { user } = useAuth();

  const myTasks =
    user.role === "manager"
      ? tasks
      : tasks.filter(t => t.assignee === user.name);

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

      {/* New Section */}
      <div className="row g-4">

        {/* Recent Projects */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <h5>Recent Projects</h5>
            {projects.slice(0, 5).map(p => (
              <div key={p.id} className="border-bottom py-2">
                <strong>{p.title}</strong>
                <div className="text-muted small">Deadline: {p.deadline}</div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-muted">No projects yet</p>}
          </div>
        </div>

        {/* My Active Tasks */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <h5>My Active Tasks</h5>
            {myTasks.slice(0, 5).map(t => (
              <div key={t.id} className="border-bottom py-2">
                <strong>{t.title}</strong>
                <div className="small">
                  Status: <span className="fw-bold">{t.status}</span>
                </div>
              </div>
            ))}
            {myTasks.length === 0 && <p className="text-muted">No active tasks</p>}
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
              <Link to="/projects/new" className="btn btn-primary btn-sm">+ Create Project</Link>
              <Link to="/tasks" className="btn btn-outline-primary btn-sm">View Tasks</Link>
              <Link to="/team-chat" className="btn btn-outline-secondary btn-sm">Open Team Chat</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
