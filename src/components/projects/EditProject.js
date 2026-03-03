import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import { useUsers } from "../../context/UserContext";
import { useState, useEffect } from "react";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { projects, updateProject } = useProjects();
  const { tasks, updateTask, addTask } = useTasks();
  const { users } = useUsers();

  const project = projects.find(p => p._id === id);
  const projectTasks = tasks[id] || [];

  const [team, setTeam] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setDeadline(project.deadline || "");
      setTeam(project.team?.map(m => m._id || m) || []);
    }
  }, [project]);

  if (!project) return <div className="container mt-4">Project not found</div>;

  const toggleMember = (mId) => {
    setTeam(prev => prev.includes(mId) ? prev.filter(id => id !== mId) : [...prev, mId]);
  };

  const saveProject = () => {
    updateProject(project._id, { title, description, deadline, team });
    navigate("/projects");
  };

  const addNewTask = () => {
    if (!newTask) return;
    addTask({
      title: newTask,
      status: "Pending",
      projectId: project._id
    });
    setNewTask("");
  };

  return (
    <div className="container mt-4">
      <h3>Edit Project</h3>

      <div className="card p-3 shadow-sm mb-4">
        <label className="form-label">Title</label>
        <input className="form-control mb-2" value={title} onChange={e => setTitle(e.target.value)} />

        <label className="form-label">Description</label>
        <textarea className="form-control mb-2" value={description} onChange={e => setDescription(e.target.value)} />

        <label className="form-label">Deadline</label>
        <input type="date" className="form-control mb-3" value={deadline} onChange={e => setDeadline(e.target.value)} />

        <label className="form-label">Team Members</label>
        <div className="border rounded p-2 mb-3 bg-light" style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {users.filter(u => u.role !== "admin").map(u => (
            <div key={u._id} className="form-check small">
              <input
                type="checkbox"
                className="form-check-input"
                checked={team.includes(u._id)}
                onChange={() => toggleMember(u._id)}
              />
              <label className="form-check-label">{u.name}</label>
            </div>
          ))}
        </div>

        <button onClick={saveProject} className="btn btn-success">Save Changes</button>
      </div>

      <h5>Tasks</h5>

      <div className="mb-3 d-flex gap-2">
        <input className="form-control" placeholder="New Task" value={newTask} onChange={e => setNewTask(e.target.value)} />
        <button className="btn btn-primary" onClick={addNewTask}>Add</button>
      </div>

      <div className="list-group">
        {projectTasks.map(t => (
          <div key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div style={{ flex: 1 }}>
              <strong className="d-block">{t.title}</strong>
              <small className="text-muted">Status: {t.status}</small>
            </div>

            <div className="d-flex gap-2" style={{ flex: 1 }}>
              <select
                className="form-select form-select-sm"
                value={t.assigneeId?._id || t.assigneeId || ""}
                onChange={e => updateTask(t._id, { assigneeId: e.target.value })}
              >
                <option value="">Unassigned</option>
                {users.filter(u => u.role !== "admin").map(u => (
                  <option key={u._id} value={u._id}>{u.name}</option>
                ))}
              </select>

              <input
                type="date"
                className="form-control form-control-sm"
                style={{ width: 'auto' }}
                value={t.dueDate ? t.dueDate.split('T')[0] : ""}
                onChange={e => updateTask(t._id, { dueDate: e.target.value })}
              />

              <select
                className="form-select form-select-sm"
                value={t.status}
                onChange={e => updateTask(t._id, { status: e.target.value })}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditProject;
