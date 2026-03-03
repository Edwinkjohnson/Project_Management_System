import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">

      {/* HERO SECTION */}
      <div className="row align-items-center mb-5 py-5 fade-in">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold mb-3" style={{ lineHeight: '1.2' }}>
            Manage Projects <br /><span className="text-primary">Smarter</span>
          </h1>

          <p className="lead text-muted mb-4">
            The all-in-one platform to plan, track, and collaborate with your team.
            Built for modern productivity and seamless execution.
          </p>

          <div className="d-flex gap-3">
            <button
              className="btn btn-primary btn-lg px-4"
              onClick={() => navigate("/register")}
            >
              Get Started Free
            </button>
            <button className="btn btn-outline-secondary btn-lg px-4">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="col-md-6 text-center">
          <div className="position-relative">
            <div className="position-absolute top-50 start-50 translate-middle bg-primary opacity-10 rounded-circle" style={{ width: '400px', height: '400px', zIndex: -1 }}></div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png"
              alt="project management"
              className="img-fluid"
              style={{ maxHeight: '380px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))' }}
            />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-5">
        <h2 className="text-center fw-bold mb-5">Built for Excellence</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body">
                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 d-inline-block mb-3">
                  <i className="bi bi-stack fs-4"></i>
                </div>
                <h5 className="fw-bold">Task Management</h5>
                <p className="text-muted small">
                  Create, assign, and track tasks with deadlines and priorities in real-time.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body">
                <div className="bg-success bg-opacity-10 text-success rounded-3 p-3 d-inline-block mb-3">
                  <i className="bi bi-people fs-4"></i>
                </div>
                <h5 className="fw-bold">Team Collaboration</h5>
                <p className="text-muted small">
                  Bring your entire team together. Share updates and stay aligned effortlessly.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body">
                <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3 d-inline-block mb-3">
                  <i className="bi bi-graph-up fs-4"></i>
                </div>
                <h5 className="fw-bold">Progress Insights</h5>
                <p className="text-muted small">
                  Visual dashboards to monitor project health and delivery status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="text-center my-5 p-5 bg-white border-0 shadow-sm rounded-4 fade-in">
        <h3 className="fw-bold mb-3">Ready to transform your workflow?</h3>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '500px' }}>
          Join thousands of teams who use ProjectManagerX to ship better products, faster.
        </p>

        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/register")}
        >
          Create Your Free Account
        </button>
      </div>

    </div>
  );
};

export default Home;
