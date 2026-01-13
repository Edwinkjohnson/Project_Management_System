import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import { useUsers } from "../../context/UserContext";
import { useState } from "react";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { projects, updateProject } = useProjects();
  const { tasks, updateTask, addTask } = useTasks();
  const { users } = useUsers();

  const project = projects.find(p => p.id === Number(id));
  const projectTasks = tasks.filter(t => t.projectId === Number(id));

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [deadline, setDeadline] = useState(project.deadline);
  const [newTask, setNewTask] = useState("");

  const saveProject = () => {
    updateProject(project.id, { title, description, deadline });
    navigate("/projects/manage");
  };

  const addNewTask = () => {
    if (!newTask) return;
    addTask({
      id: Date.now(),
      title: newTask,
      status: "Pending",
      assignee: "",
      projectId: project.id
    });
    setNewTask("");
  };

  return (
    <div className="container mt-4">

      <h3>Edit Project</h3>

      <div className="card p-3 shadow-sm mb-4">
        <label>Title</label>
        <input className="form-control mb-2" value={title} onChange={e => setTitle(e.target.value)} />

        <label>Description</label>
        <textarea className="form-control mb-2" value={description} onChange={e => setDescription(e.target.value)} />

        <label>Deadline</label>
        <input type="date" className="form-control mb-3" value={deadline} onChange={e => setDeadline(e.target.value)} />

        <button onClick={saveProject} className="btn btn-success">Save Changes</button>
      </div>

      <h5>Tasks</h5>

      <div className="mb-3 d-flex gap-2">
        <input className="form-control" placeholder="New Task" value={newTask} onChange={e => setNewTask(e.target.value)} />
        <button className="btn btn-primary" onClick={addNewTask}>Add</button>
      </div>

      {projectTasks.map(t => (
        <div key={t.id} className="card p-3 mb-2 d-flex justify-content-between align-items-center flex-row">
          <div>
            <strong>{t.title}</strong>
            <div>Status: {t.status}</div>
          </div>

          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={t.assignee}
              onChange={e => updateTask(t.id, { assignee: e.target.value })}
            >
              <option value="">Unassigned</option>
              {users.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>

            <select
              className="form-select"
              value={t.status}
              onChange={e => updateTask(t.id, { status: e.target.value })}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditProject;
