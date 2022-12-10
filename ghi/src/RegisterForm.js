import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken"; // added this


const RegisterForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pid, setPid] = useState("");
  const navigate = useNavigate();


  const [, , , signup] = useToken(); // added this

  const clearRegisterForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPid("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response_success = await signup(name, password, email, pid)
    console.log("RESPONSEEE", response_success)
    if (!response_success) {
      setSubmitted(true)
      console.log("BAD REQUEST", response_success)
    } else {
      clearRegisterForm();
      navigate("/")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          id="name"
          placeholder=" name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="form-control"
          id="email"
          placeholder="Email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="password"
          placeholder="secret"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pid" className="form-label">
          PID
        </label>
        <input
          required
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          type="pid"
          className="form-control"
          id="pid"
          placeholder="########"
        />
      </div>
      <button className="btn btn-primary">Create</button>
      {submitted && (
        <div className="success-message">
          Success! Thank you for registering
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
