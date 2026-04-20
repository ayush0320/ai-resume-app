import React from "react";
import { useNavigate, Link } from "react-router";

const Register = () => {
  // to navigate to other pages
  const navigate = useNavigate();

  // to prevent default form submission behavior
  const handSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Register</h1>

          <form action="">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                id="username"
                name="username"
                placeholder="Enter username"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </form>

          <p>
            Already registered? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
