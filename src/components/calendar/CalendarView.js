import { useProjects } from "../../context/ProjectContext";

const CalendarView = () => {
  const { projects } = useProjects();

  return (
    <>
      <h3>Schedule</h3>
      <ul className="list-group mt-3">
        {projects.map(p => (
          <li key={p.id} className="list-group-item">
            {p.title} — {p.deadline}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CalendarView;
