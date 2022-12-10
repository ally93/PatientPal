import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useToken";

let internalToken = null;
function SignOut() {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  async function logout() {
    if (token) {
      const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/token`;
      await fetch(url, {
        method: "delete",
        credentials: "include",
      });
      navigate("/logout");
    } else {
      navigate("/");
    }
  }
  const submitHandler = (e) => {
    logout();
    e.preventDefault();
  };
  return (
    <div className="logout-container">
      <center>
        <form onSubmit={submitHandler}>
          <p className="Verification">Verify Logout</p>
          <button className="logout-btn">Logout</button>
        </form>
      </center>
    </div>
  );
}
export default SignOut;
