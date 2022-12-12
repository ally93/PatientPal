import React from "react";
// import { useAuthContext } from "./useToken";
import { useState } from "react";
import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

function LoginForm() {
  const [, login] = useToken();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function clickForm(e) {
    e.preventDefault();
    if(!(username) || !(password)) {
      setErrorMessage("username and password not entered");
    } else {
      login(username, password).then((rsp) => {
        if(rsp) {
          setErrorMessage(rsp);
        } else {
          navigate("/dashboard");
        }
      });
    }
  }

  return (
     <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" alt="login form" className='rounded-start w-100'/>
            {/* <MDBCardImage src={familyphoto} alt="login form" className='rounded-start w-100'/> */}
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Patient Portal</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
              <form onSubmit={clickForm}>
                <MDBInput 
                  wrapperClass='mb-4' 
                  type='email' 
                  onChange={(e) => setUser(e.target.value)} 
                  value={username}
                  placeholder="Email Address"
                  required
                  size="lg"/>
                <MDBInput wrapperClass='mb-4' type='password' 
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  value={password}
                  className="form-control"
                  required
                  placeholder="Password"
                  size="lg"/>

                <button className="btn btn-dark w-50" onClick={clickForm} type="submit">Login</button>
                {errorMessage && (<p className="text-danger"> {errorMessage} </p>)}
              </form>
              <br/>
              <NavLink className="nav-link" aria-current="page" to="/register">
              Register Here
              </NavLink>
              <br/>
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default LoginForm;
