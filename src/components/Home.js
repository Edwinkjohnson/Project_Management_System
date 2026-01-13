import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">

      {/* HERO SECTION */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="fw-bold">
            Manage Projects <span className="text-primary">Smarter</span>
          </h1>

          <p className="text-muted mt-3">
            Plan, track, and collaborate with your team using a modern
            project management system built for productivity.
          </p>

          <button
            className="btn btn-primary me-2"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button className="btn btn-outline-secondary">
            Learn More
          </button>
        </div>

        <div className="col-md-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png"
            alt="project management"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
      </div>

      {/* FEATURES SECTION */}
      <h3 className="text-center mb-4">Core Features</h3>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Task Management</h5>
              <p className="card-text">
                Create, assign, and track tasks with deadlines and priorities.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Team Collaboration</h5>
              <p className="card-text">
                Communicate, share files, and collaborate in real time.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Progress Tracking</h5>
              <p className="card-text">
                Visual dashboards to monitor project performance and status.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="row mt-5 align-items-center">
        <div className="col-md-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
            alt="features"
            className="img-fluid"
            style={{ maxHeight: "280px" }}
          />
        </div>

        <div className="col-md-6">
          <h3>Why Choose ProjectManagerX?</h3>
          <ul className="mt-3">
            <li>Easy to use interface</li>
            <li>Role-based access control</li>
            <li>Secure authentication</li>
            <li>Built for teams & individuals</li>
          </ul>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="text-center mt-5 p-4 bg-light rounded">
        <h4>Start managing your projects today</h4>
        <p className="text-muted">
          Join teams who use ProjectManagerX to deliver better results.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          Create Free Account
        </button>
      </div>

    </div>
  );
};

export default Home;
