import React from "react";
import "../styles/home.scss";

const Home = () => {
  return (
    <main className="home">
      <div className="interview-input-group">
        <div className="left">
          <label>Job Description</label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Enter job description"
          ></textarea>
        </div>
        <div className="right">
          <div className="input-group">
            <p>
              Resume <small className="highlight">(PDF, DOC, DOCX)</small>
            </p>
            <label className="file-label" htmlFor="resume">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.doc,.docx"
              hidden
            />
          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe yourself in a few sentences"
            >
              {" "}
            </textarea>
          </div>
          <button className="button">Submit</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
