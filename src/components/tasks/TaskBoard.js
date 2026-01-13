import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

const TaskBoard = () => {
  const { tasks, deleteTask, updateTask } = useTasks();
  const { user } = useAuth();

  if (!user) return null;

  const visibleTasks =
    user.role === "manager"
      ? tasks
      : tasks.filter(t => t.assignee === user.name);

  const cycleStatus = (status) => {
    if (status === "Pending") return "In Progress";
    if (status === "In Progress") return "Completed";
    return "Pending";
  };

  return (
    <div className="container mt-4">
      <h4>My Tasks</h4>

      {visibleTasks.length === 0 && <p>No tasks available.</p>}

      {visibleTasks.map(t => (
        <div key={t.id} className="card p-3 mb-3 shadow-sm">

          <div className="d-flex justify-content-between align-items-center">
            <strong>{t.title}</strong>

            <button
              className={`btn btn-sm ${
                t.status === "Pending"
                  ? "btn-secondary"
                  : t.status === "In Progress"
                  ? "btn-warning"
                  : "btn-success"
              }`}
              onClick={() => updateTask(t.id, { status: cycleStatus(t.status) })}
            >
              {t.status}
            </button>
          </div>

          <div className="mt-2 text-muted">
            Assigned to: {t.assignee || "Unassigned"}
          </div>

          {/* 🆕 Due Date */}
          <div className="mt-2">
            <label className="form-label mb-1">Due Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={t.dueDate || ""}
              onChange={(e) =>
                updateTask(t.id, { dueDate: e.target.value })
              }
            />
          </div>

          {/* Manager Controls */}
          {user.role === "manager" && (
            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  if (window.confirm("Delete this task?")) {
                    deleteTask(t.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
