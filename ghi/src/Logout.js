import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

function Logout() {
    const [, , logout] = useToken()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // need to call logout twice to clear local tokens
            // not sure why
            logout();
            logout();
        } catch (e) {
            console.log("logout failed ", e);
        }
        navigate("/login");
    }

    return (
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://cdn.pixabay.com/photo/2020/06/07/17/19/child-5271290_960_720.jpg"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <h1
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Leaving so soon?
                </h1>
                <form onSubmit={handleSubmit}>
                  <button
                    className="btn btn-dark w-100"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Logout
                  </button>
                </form>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    );
}

export default Logout
