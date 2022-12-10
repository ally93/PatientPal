import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "./useToken";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function QuestionnairesList() {
    const [questionnaires, setQuestionnaires] = useState([]);
    const { patient_id } = useParams()
    const {token} = useAuthContext();

    // const fetchQuestionnaires = useCallback(async () => {
    //   const url = `${process.env.REACT_APP_PATIENTS_API_HOST}/api/patient/${patient_id}/questionnaires`;
    //   const response = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //      Authorization: `Bearer ${token}`,
    //    },
    //  });

    //   if (response.ok) {
    //     const data = await response.json();
    //     setQuestionnaires(data);
    //   }
    // }, [token, patient_id]);

    useEffect(() => {
      async function fetchQuestionnaires() {
        const url = `${process.env.REACT_APP_PATIENTS_API_HOST}/api/patient/${patient_id}/questionnaires`;
        const response = await fetch(url, {
        method: "GET",
        headers: {
         Authorization: `Bearer ${token}`,
        },
      });

        if (response.ok) {
        const data = await response.json();
        setQuestionnaires(data);
        }
      }
      if (token) {
        fetchQuestionnaires()
      }
    }, [token, patient_id]);

    async function deleteQuestionnaire(questionnaire_id) {
        const deleteUrl = `${process.env.REACT_APP_PATIENTS_API_HOST}/questionnaire/${questionnaire_id}`;
        const fetchConfig = {
        method: "delete",
        headers: {
         Authorization: `Bearer ${token}`,
        },
        }

        const response = await fetch(deleteUrl,fetchConfig)
        if(response.ok) {
          const updatedQuestionnaire = questionnaires.filter((q) => q.id !== questionnaire_id)
          setQuestionnaires(updatedQuestionnaire)
    }
}

    return (
      <>
        <Navbar />
        <div className="container">
          <h3 className="display-6 fw-bold">Questionnaire List</h3>
          <button>
            <Link to={`/patient/${patient_id}/questionnaire/create`}>
              Create Questionnaire
            </Link>
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Questionnaire Date </th>
              </tr>
            </thead>
            <tbody>
              {questionnaires.map((questionnaire) => {
                return (
                  <tr key={questionnaire.id}>
                    <td>
                      <Link to={`/questionnaire/${questionnaire.id}`}>
                        {questionnaire.date}
                      </Link>
                      <button
                        onClick={() => deleteQuestionnaire(questionnaire.id)}
                      >
                        Delete
                      </button>
                      <button>
                        <Link
                          to={`/patient/${questionnaire.patient_id}/questionnaire/${questionnaire.id}/edit`}
                        >
                          Edit
                        </Link>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Footer />
      </>
    );
}

export default QuestionnairesList
