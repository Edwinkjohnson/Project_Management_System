// src/components/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser.role === "admin") {
        navigate("/dashboard");
      } else if (storedUser.role === "manager") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-3 text-center">Login</h4>

      <form
        className="p-4 border rounded shadow-sm bg-white"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
