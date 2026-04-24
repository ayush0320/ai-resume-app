import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

const Register = () => {
  // to navigate to other pages
  const navigate = useNavigate();

  // Local state to manage form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  // to prevent default form submission behavior
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/"); // Navigate to home page after successful registration
  };

  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Register</h1>

          <form action="" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="username"
                id="username"
                name="username"
                placeholder="Enter username"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
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
