import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

const MemberDashboard = () => {
  const { tasks } = useTasks();
  const { user } = useAuth();

  const myTasks = tasks.filter(t => t.assignee === user.name);

  const completed = myTasks.filter(t => t.status === "Completed").length;
  const percent = myTasks.length
    ? Math.round((completed / myTasks.length) * 100)
    : 0;

  return (
    <div className="container mt-4">

      <h3>Welcome, {user.name} 👋</h3>
      <p className="text-muted">Your personal productivity workspace</p>

      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h6>My Tasks</h6>
            <h2>{myTasks.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h6>Completed</h6>
            <h2>{completed}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h6>Productivity</h6>
            <h2>{percent}%</h2>
          </div>
        </div>

      </div>

      <div className="card p-3 shadow-sm mb-4">
        <h5>My Active Tasks</h5>
        {myTasks.map(t => (
          <div key={t.id} className="border-bottom py-2">
            <strong>{t.title}</strong>
            <div className="small text-muted">Status: {t.status}</div>
          </div>
        ))}
      </div>

      <div className="card p-3 shadow-sm">
        <h5>Progress</h5>
        <div className="progress mt-2">
          <div className="progress-bar bg-success" style={{ width: `${percent}%` }}>
            {percent}%
          </div>
        </div>
      </div>

    </div>
  );
};

export default MemberDashboard;
