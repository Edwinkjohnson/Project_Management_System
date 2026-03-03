import { useEffect } from "react";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

const TaskBoard = () => {
  const { allTasks: tasks, deleteTask, updateTask, loadAllTasks } = useTasks();
  const { user } = useAuth();

  useEffect(() => {
    loadAllTasks();
  }, [loadAllTasks]);

  if (!user) return null;

  const isManager = user.role === "manager";
  const isAdmin = user.role === "admin";

  const visibleTasks =
    isAdmin
      ? tasks
      : isManager
        ? tasks // Managers see all tasks fetched for their projects
        : tasks.filter(t => t.assigneeId?._id === user.id || t.assigneeId === user.id);

  const cycleStatus = (status) => {
    if (status === "Pending") return "In Progress";
    if (status === "In Progress") return "Completed";
    return "Pending";
  };

  return (
    <div className="container mt-4">
      <h4>{(isManager || isAdmin) ? "Team Tasks" : "My Tasks"}</h4>

      {visibleTasks.length === 0 && <p>No tasks available.</p>}

      {visibleTasks.map(t => (
        <div key={t._id} className="card p-3 mb-3 shadow-sm border-start border-4 border-primary">

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{t.title}</h5>
              <span className="badge bg-info text-dark mb-2">
                Project: {t.projectId?.title || "Unknown Project"}
              </span>
            </div>

            <button
              className={`btn btn-sm ${t.status === "Pending"
                ? "btn-secondary"
                : t.status === "In Progress"
                  ? "btn-warning"
                  : "btn-success"
                }`}
              onClick={() => updateTask(t._id, { status: cycleStatus(t.status) })}
            >
              {t.status}
            </button>
          </div>

          {(!(isManager || isAdmin)) ? null : (
            <div className="mt-2 text-muted">
              <strong>Assigned to:</strong> {t.assigneeId?.name || (t.assigneeId?._id === user.id || t.assigneeId === user.id ? user.name : "Unassigned")}
            </div>
          )}

          {/* 🆕 Due Date */}
          <div className="mt-2 text-start">
            <label className="form-label mb-1 small fw-bold">Due Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={t.dueDate ? t.dueDate.split('T')[0] : ""}
              onChange={(e) =>
                updateTask(t._id, { dueDate: e.target.value })
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
                    deleteTask(t._id, t.projectId?._id || t.projectId);
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
