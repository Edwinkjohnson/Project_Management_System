import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  const common = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Tasks", path: "/tasks" },
    { label: "Schedule", path: "/calendar" },
    { label: "Team Chat", path: "/chat" }
  ];

  const manager = [
    { label: "Projects", path: "/projects" },
    { label: "Team", path: "/team" },
    { label: "Reports", path: "/analytics" }
  ];

  const admin = [
    { label: "Admin Panel", path: "/admin" },
    { label: "User Management", path: "/admin/users" },
    { label: "System Logs", path: "/logs" }
  ];

  const menu =
    user.role === "admin"
      ? [...common, ...manager, ...admin]
      : user.role === "manager"
      ? [...common, ...manager]
      : common;

  return (
    <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "230px" }}>
      <h5 className="mb-4 fw-bold">Workspace</h5>

      {menu.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `d-block mb-2 px-2 py-1 rounded text-decoration-none ${
              isActive ? "bg-primary text-white" : "text-white"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}

      <div className="mt-auto text-muted small">
        Logged in as <br />
        <strong>{user.email}</strong>
      </div>
    </div>
  );
};

export default Sidebar;
