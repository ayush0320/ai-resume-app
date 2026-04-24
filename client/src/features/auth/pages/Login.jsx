import React from "react";
import { useState } from "react";
import "../auth.form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Local state to manage form inputs
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  // Local state to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // to prevent default form submission behavior
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/"); // Navigate to home page after successful login
  };

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Login</h1>

          <form action="" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
