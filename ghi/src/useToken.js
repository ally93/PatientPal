import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let internalToken = null;

const USER_KEY = "user_id";
const TOKEN_KEY = "token";

export function getToken() {
  if (internalToken) {
    return internalToken;
  } else {
    internalToken = sessionStorage.getItem(TOKEN_KEY);
    return internalToken;
  }
}

export function getUserInfo() {
  const user_info = sessionStorage.getItem(USER_KEY);
  return JSON.parse(user_info);
}

export async function getTokenInternal() {
  const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/accounts/me/token/`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      internalToken = data.access_token;
      console.log("setting token ", internalToken);
      sessionStorage.setItem(TOKEN_KEY, internalToken);
      sessionStorage.setItem(USER_KEY, JSON.stringify(data.account));
      return internalToken;
    }
  } catch (e) {}
  return false;
}

function handleErrorMessage(error) {
  if ("error" in error) {
    error = error.error;
    try {
      error = JSON.parse(error);
      if ("__all__" in error) {
        error = error.__all__;
      }
    } catch {}
  }
  if (Array.isArray(error)) {
    error = error.join("<br>");
  } else if (typeof error === "object") {
    error = Object.entries(error).reduce((acc, x) => `${acc}${x[1]}`, "");
  }
  return error;
}

export const AuthContext = createContext({
  token: null,
  setToken: () => null,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export function useToken() {
  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchToken() {
  //     const token = await getTokenInternal();
  //     setToken(token);
  //   }
  //   if (!token) {
  //     fetchToken();
  //   }
  // }, [setToken, token]);

  async function logout() {
    internalToken = null;
    setToken(null);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    console.log("cleared token");
    try {
      if (token) {
        const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/token`;
        await fetch(url, { method: "delete", credentials: "include" });
      }
    } finally {
      // navigate("/login");
    }
  }

  async function login(email, password) {
    const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/token`;
    const form = new FormData();
    form.append("username", email);
    form.append("password", password);
    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    });
    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      navigate("/dashboard");
      return;
    }
    let error = await response.json();
    return handleErrorMessage(error);
  }

  async function signup(name, password, email, pid) {
    const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/accounts`;
    try {
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          pid: pid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await login(email, password);
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  async function update(username, password, email, firstName, lastName) {
    const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/accounts`;
    const response = await fetch(url, {
      method: "patch",
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await login(username, password);
      return true;
    }
    return false;
  }

  return [token, login, logout, signup, update];
}
