import React from "react";

const Registration = () => {
  return (
    <div className="container mt-4">

      {/* Breadcrumb / Section Header */}
      <h4 className="mb-3">
        <span className="text-primary">Registration</span> / Create a new account
      </h4>

      <form className="row g-3 p-4 border rounded shadow-sm bg-white">

        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" placeholder="John" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" placeholder="Doe" required />
        </div>

        <div className="col-md-12">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="example@gmail.com" required />
        </div>

        <div className="col-md-12">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" placeholder="Choose a username" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="••••••" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" placeholder="••••••" required />
        </div>

        <div className="col-md-12">
          <label className="form-label">Role</label>
          <select className="form-select" required>
            <option value="">Select Role</option>
            <option>Project Manager</option>
            <option>Team Lead</option>
            <option>Developer</option>
          </select>
        </div>

        <div className="col-md-12">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="termsCheck" required />
            <label className="form-check-label" htmlFor="termsCheck">
              Agree to terms & conditions
            </label>
          </div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary w-100" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
