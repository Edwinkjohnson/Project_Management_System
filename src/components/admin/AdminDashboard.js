import { useProjects } from "../../context/ProjectContext";
import { useUsers } from "../../context/UserContext";
import { useTasks } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { projects } = useProjects();
  const { users } = useUsers();
  const { allTasks: tasks } = useTasks();
  const navigate = useNavigate();

  const today = new Date();

  const overdueProjects = projects.filter(
    p => new Date(p.deadline) < today
  );

  const completedTasks = tasks.filter(t => t.status === "Completed").length;

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Control Panel</h2>
        <p className="text-muted">
          Monitor projects, users, and system performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="text-muted">Total Projects</h6>
            <h2>{projects.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="text-muted">Total Tasks</h6>
            <h2>{tasks.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="text-muted">Completed Tasks</h6>
            <h2>{completedTasks}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="text-muted">Users</h6>
            <h2>{users.length}</h2>
          </div>
        </div>

      </div>

      {/* Alerts + Actions */}
      <div className="row g-4 mb-4">

        {/* Overdue Projects */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3 h-100">
            <h5 className="mb-3">⚠️ Overdue Projects</h5>

            {overdueProjects.length === 0 && (
              <p className="text-muted">No overdue projects 🎉</p>
            )}

            {overdueProjects.map(p => (
              <div key={p._id} className="border-bottom py-2">
                <strong>{p.title}</strong>
                <div className="text-danger small">
                  Deadline: {p.deadline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3 h-100">
            <h5 className="mb-3">Quick Actions</h5>

            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/projects")}
              >
                Manage Projects
              </button>

              <button
                className="btn btn-outline-primary"
                onClick={() => navigate("/admin/users")}
              >
                Manage Users
              </button>

              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/analytics")}
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Projects */}
      <div className="card shadow-sm p-3">
        <h5 className="mb-3">Recent Projects</h5>

        {projects.slice(0, 5).map(p => (
          <div key={p._id} className="border-bottom py-2">
            <strong>{p.title}</strong>
            <div className="small text-muted">
              Deadline: {p.deadline}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;
