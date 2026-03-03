import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/">Opero</Link>

      <div className="ms-auto d-flex gap-2">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="btn btn-outline-success">Dashboard</Link>
            <button
              className="btn btn-danger"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
