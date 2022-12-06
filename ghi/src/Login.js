import { useEffect, useState } from "react";
import { useToken } from "./useToken";
// import {useAuthContext, getTokenInternal } from "./useToken";
import { useNavigate } from "react-router-dom";

function Login() {

  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    // how to get token from url (when we have a hashtag and no token)
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      // set hash token to an empty string
      window.location.hash = "";
      // save token to local storage
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const [, login] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = await login(email, password);

    if (name !== null) {
      navigate("/");
    } else {
      navigate("/register");
    }
  };
  return (
    <>
      <br></br>
      <br></br>
      <h1>Please login </h1>
      <h2>
        {!token ? (
          <a
            href="/"
          >
            Login
          </a>
        ) : (
          <button className="btn btn-dark" onClick={logout}>
            Logout
          </button>
        )}
      </h2>

      {!token ? (
        <p></p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
              id="email"
              placeholder="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              placeholder="shhhhhh"
            />
          </div>
          <button className="btn btn-primary">Login</button>
          <div className="success-message">
            Welcome
          </div>
          <p>
            Not a member yet? {" "}
            <a href="http://localhost:3000/register">here</a>
          </p>
        </form>
      )}

    </>
  );
}

export default Login;
