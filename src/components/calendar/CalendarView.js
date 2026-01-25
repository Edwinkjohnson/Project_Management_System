import { useProjects } from "../../context/ProjectContext";

const CalendarView = () => {
  const { projects } = useProjects();

  const today = new Date().toISOString().split("T")[0];

  const overdue = projects.filter(p => p.deadline < today);
  const upcoming = projects.filter(p => p.deadline >= today);

  return (
    <div className="container mt-4">

      <h3 className="mb-3">📅 Schedule</h3>
      <p className="text-muted">
        Track project deadlines and upcoming work
      </p>

      {/* Overdue Section */}
      <div className="card shadow-sm p-3 mb-4 border-danger">
        <h5 className="text-danger mb-3">⚠️ Overdue Projects</h5>

        {overdue.length === 0 && (
          <p className="text-muted">No overdue projects 🎉</p>
        )}

        {overdue.map(p => (
          <div key={p.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div>
              <strong>{p.title}</strong>
              <div className="small text-muted">Deadline: {p.deadline}</div>
            </div>
            <span className="badge bg-danger">Overdue</span>
          </div>
        ))}
      </div>

      {/* Upcoming Section */}
      <div className="card shadow-sm p-3">
        <h5 className="mb-3">⏳ Upcoming Deadlines</h5>

        {upcoming.length === 0 && (
          <p className="text-muted">No upcoming deadlines</p>
        )}

        {upcoming.map(p => (
          <div key={p.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div>
              <strong>{p.title}</strong>
              <div className="small text-muted">Deadline: {p.deadline}</div>
            </div>
            <span className="badge bg-primary">Upcoming</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CalendarView;
