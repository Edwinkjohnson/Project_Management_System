import { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import { useUsers } from "../../context/UserContext";
import { useTasks } from "../../context/TaskContext";

const AdminDashboard = () => {
  const { projects, updateProject, deleteProject } = useProjects();
  const { users } = useUsers();
  const { tasks } = useTasks();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", deadline: "" });

  const startEdit = (p) => {
    setEditing(p.id);
    setForm(p);
  };

  const saveEdit = () => {
    updateProject(editing, form);
    setEditing(null);
  };

  return (
    <div className="container mt-4">
      <h2>Admin Control Panel</h2>

      <div className="row my-4 text-center">
        <div className="col">Projects: {projects.length}</div>
        <div className="col">Users: {users.length}</div>
        <div className="col">Tasks: {tasks.length}</div>
      </div>

      <div className="card p-3">
        <h5>All Projects</h5>

        {projects.map(p => (
          <div key={p.id} className="border p-3 mb-2 rounded">

            {editing === p.id ? (
              <>
                <input className="form-control mb-2"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
                <textarea className="form-control mb-2"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
                <input type="date" className="form-control mb-2"
                  value={form.deadline}
                  onChange={e => setForm({ ...form, deadline: e.target.value })}
                />

                <button className="btn btn-success btn-sm me-2" onClick={saveEdit}>
                  Save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <strong>{p.title}</strong>
                <div>{p.description}</div>
                <small>Deadline: {p.deadline}</small>

                <div className="mt-2">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(p)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteProject(p.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
