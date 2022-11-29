import {React, useEffect, useState} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function QuestionnairesList() {
    const [questionnaires, setQuestionnaires] = useState([]);
    const { patient_id } = useParams()
    const navigate = useNavigate();


    useEffect ( () => {
        fetchQuestionnaires();
    }, [patient_id])

    async function fetchQuestionnaires() {
        const url = "http://localhost:8000/api/patient/"+patient_id+"/questionnaires";
        const response = await fetch(url)

        if(response.ok) {
            const data = await response.json()
            setQuestionnaires(data)
        }
    }

    async function deleteQuestionnaire(questionnaire_id) {
        const deleteUrl = "http://localhost:8000/questionnaire/"+questionnaire_id;
        const fetchConfig = {
        method: "delete"
        }

        const response = await fetch(deleteUrl,fetchConfig)
        if(response.ok) {
            fetchQuestionnaires()
    }
}

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
                  <button onClick= {() => deleteQuestionnaire(questionnaire.id)}>Delete</button>
                  <button><Link to={`/patient/${questionnaire.patient_id}/questionnaire/${questionnaire.id}/edit`}>Edit</Link></button>
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
