import { useUsers } from "../../context/UserContext";

const UserManagement = () => {
  const { users, updateUser } = useUsers();

  return (
    <>
      <h3>User Management</h3>

      {users.map(u => (
        <div key={u.id} className="card p-2 mb-2">
          {u.email}
          <select
            value={u.role}
            onChange={e => updateUser(u.id, { ...u, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="member">Member</option>
          </select>
        </div>
      ))}
    </>
  );
};

export default UserManagement;
