import React from "react";
// import { useAuthContext } from "./useToken";
import { useState } from "react";
import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginForm() {
  const [token, login] = useToken();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function clickForm(e) {
    e.preventDefault();
    login(username, password).then(() => navigate("dashboard"));
    // Added so no-unused-vars exception is thrown while running npm run build
    // remove this after token used for auth
    console.log(token)
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Login</h1>
          <form onSubmit={login}>
            <div className="mb-3">
              <label htmlFor="username">Email</label>
              <input
                onChange={(e) => setUser(e.target.value)}
                type="email"
                name="username"
                value={username}
                className="form-control"
                required
                placeholder="email@email.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                value={password}
                className="form-control"
                required
                placeholder="password"
              />
            </div>
            <button
              onClick={clickForm}
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
          <Link to="register"> register </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
