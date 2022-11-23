import {React, useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";

function QuestionnairesList() {
    const [questionnaires, setQuestionnaires] = useState([]);
    const { patient_id } = useParams()

    useEffect ( () => {
        async function fetchQuestionnaires() {
            const url = "http://localhost:8000/api/patient/"+patient_id+"/questionnaires";
            const response = await fetch(url)

            if(response.ok) {
                const data = await response.json()
                setQuestionnaires(data)
            }
        }
        fetchQuestionnaires();
    }, [patient_id])

    return (
        <div className="container">
        <h3 className="display-6 fw-bold">Questionnaire List</h3>
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
                  <Link to={`/questionnaire/${questionnaire.id}`}>{questionnaire.date}</Link>
                </td>
              </tr>
            );
            })}
        </tbody>
        </table>
    </div>
    )
}

export default QuestionnairesList
