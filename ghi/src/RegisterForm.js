import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken"; // added this

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pid, setPid] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [, , , signup] = useToken(); // added this

  const clearRegisterForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPid("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    signup(name, password, email, pid).then((rsp) => {
      if(rsp) {
        navigate("/");
      } else {
        setErrorMessage("Failed to create account, try again.");  
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer fluid className="my-5">
        <MDBRow className="g-0 align-items-center">
          <MDBCol col="6">
            <MDBCard
              className="my-5 cascading-right"
              style={{
                background: "hsla(0, 0%, 100%, 0.55)",
                backdropFilter: "blur(30px)",
              }}
            >
              <MDBCardBody className="p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Register Now</h2>

                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Your Name"
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Email for login"
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Password"
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Doctor ID (PID)"
                  id="pid"
                  type="number"
                  required
                  value={pid}
                  onChange={(e) => setPid(e.target.value)}
                />

                <MDBBtn className="w-100 mb-4" size="md" type="submit">
                  sign up
                </MDBBtn>
                {errorMessage && (
                  <p className="text-danger"> {errorMessage} </p>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol col="6">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              className="w-100 rounded-4 shadow-4"
              alt=""
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};

export default RegisterForm;
