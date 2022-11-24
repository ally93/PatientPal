import {React, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";

function QuestionnaireDetail () {
    const navigate = useNavigate();

    const [questionnaire, setQuestionnaire] = useState([]);
    const { questionnaire_id } = useParams()

    useEffect ( () => {
        async function fetchQuestionnaire() {
            const url = "http://localhost:8000/questionnaire/"+questionnaire_id;
            const response = await fetch(url)

            if(response.ok) {
                const data = await response.json()
                setQuestionnaire(data)
            }
        }
        fetchQuestionnaire()
    }, [questionnaire_id])

    async function deleteQuestionnaire() {
        const deleteUrl = "http://localhost:8000/questionnaire/"+questionnaire_id;
        const fetchConfig = {
        method: "delete"
        }

        const response = await fetch(deleteUrl,fetchConfig)
        if(response.ok) {
            navigate(-1)
        }


    }
    return (
        <div>
          <p></p>
          <h1>Questionnaire Detail</h1>
          <h2>{questionnaire.date}</h2>
            <table className="table table-striped">
                <tbody>
                <tr>
                    <th>Medications</th>
                    <td>{ questionnaire.medications }</td>
                </tr>
                <tr>
                    <th>Surgeries</th>
                    <td>{ questionnaire.surgeries }</td>
                </tr>
                <tr>
                    <th>Concerns</th>
                    <td>{ questionnaire.concerns }</td>
                </tr>
                <tr>
                    <th>Blood Pressure</th>
                    <td>{ questionnaire.blood_pressure }</td>
                </tr>
                <tr>
                    <th>Weight(lbs)</th>
                    <td>{ questionnaire.weight }</td>
                </tr>
                </tbody>
            </table>
                <button onClick= {() => deleteQuestionnaire()}>Delete</button>
            </div>
    )
}

export default QuestionnaireDetail
