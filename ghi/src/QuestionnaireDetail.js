import {React, useEffect, useState} from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getToken } from "./useToken";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function QuestionnaireDetail () {
    const navigate = useNavigate();

    const [questionnaire, setQuestionnaire] = useState([]);
    const { questionnaire_id } = useParams()
    const token = getToken();

    useEffect ( () => {
        async function fetchQuestionnaire() {
            const url = `${process.env.REACT_APP_PATIENTS_API_HOST}/questionnaire/${questionnaire_id}`;
            const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

            if(response.ok) {
                const data = await response.json()
                setQuestionnaire(data)
            }
        }
        fetchQuestionnaire()
    }, [questionnaire_id, token])

    async function deleteQuestionnaire() {
        const deleteUrl = `${process.env.REACT_APP_PATIENTS_API_HOST}/questionnaire/${questionnaire_id}`;
        const fetchConfig = {
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await fetch(deleteUrl, fetchConfig)
        if(response.ok) {
            navigate('/patient/'+ questionnaire.patient_id+'/questionnaires')
        }


    }
    return (
      <>
        <Navbar />
        <div>
          <p></p>
          <h1>Questionnaire Detail</h1>
          <h2>{questionnaire.date}</h2>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Medications</th>
                <td>{questionnaire.medications}</td>
              </tr>
              <tr>
                <th>Surgeries</th>
                <td>{questionnaire.surgeries}</td>
              </tr>
              <tr>
                <th>Concerns</th>
                <td>{questionnaire.concerns}</td>
              </tr>
              <tr>
                <th>Blood Pressure</th>
                <td>{questionnaire.blood_pressure}</td>
              </tr>
              <tr>
                <th>Weight(lbs)</th>
                <td>{questionnaire.weight}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => deleteQuestionnaire()}>Delete</button>
          <button>
            <Link
              to={`/patient/${questionnaire.patient_id}/questionnaire/${questionnaire.id}/edit`}
            >
              Edit
            </Link>
          </button>
          <button>
            <Link to={`/patient/${questionnaire.patient_id}/questionnaires/`}>
              Go Back
            </Link>
          </button>
        </div>
        <Footer />
      </>
    );
}

export default QuestionnaireDetail
