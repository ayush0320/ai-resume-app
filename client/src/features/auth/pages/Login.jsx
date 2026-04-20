import React from "react";
import "../auth.form.scss";
import { Link } from "react-router";

const Login = () => {
  // to prevent default form submission behavior
  const handSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Login</h1>

          <form action="">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>

          <p>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
