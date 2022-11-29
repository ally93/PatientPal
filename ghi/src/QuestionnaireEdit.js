import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function BootstrapInput(props){
  const { id, placeholder, labelText, value, onChange, type } = props;

  return(
    <div className='mb-4'>
      <label htmlFor={id} className="form-label">{labelText}</label>
      <input value={value} onChange={onChange} type={type} className="form-control" id={id} placeholder={placeholder}/>
    </div>
  );
}

function QuestionnaireEdit() {
  const defaultVal =""
  const [medications, setMedications] = useState(defaultVal);
  const [surgeries, setSurgeries] = useState(defaultVal);
  const [concerns, setConcerns] = useState(defaultVal);
  const [weight, setWeight] = useState(defaultVal);
  const [blood_pressure, setBloodPressure] = useState(defaultVal);
  const { patient_id,questionnaire_id } = useParams()

  const navigate = useNavigate();

  useEffect ( () => {
    async function fetchQuestionnaire() {
        const url = "http://localhost:8000/questionnaire/"+questionnaire_id;
        const response = await fetch(url)

        if(response.ok) {
            const data = await response.json()
            setMedications(data.medications)
            setSurgeries(data.surgeries)
            setConcerns(data.concerns)
            setWeight(data.weight)
            setBloodPressure(data.blood_pressure)
        }
    }
    fetchQuestionnaire()
}, [questionnaire_id])

  const editQuestionnaire = async (event) => {
    event.preventDefault();
    const data = {
      "medications": medications,
      "surgeries": surgeries,
      "concerns": concerns,
      "weight": weight,
      "blood_pressure": blood_pressure,
      "patient_id": patient_id,
      "questionnaire_id": questionnaire_id
    };

    const url = "http://localhost:8000/api/patient/"+patient_id+"/questionnaire/"+questionnaire_id;
    console.log("edit data", data)
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newQuestionnaire = await response.json();
      navigate('/questionnaire/' + newQuestionnaire.id);
    }
  };

  return (
    <>
    <h3 className="display-6 fw-bold">Edit Questionnaire</h3>
    <form onSubmit={editQuestionnaire}>
      <BootstrapInput
        id="medications"
        placeholder={medications}
        labelText="medications"
        value={medications}
        onChange={(e) => setMedications(e.target.value)}
        type="text"
      />
      <BootstrapInput
        id="surgeries"
        placeholder={surgeries}
        labelText="surgeries"
        value={surgeries}
        onChange={(e) => setSurgeries(e.target.value)}
        type="text"
      />
      <BootstrapInput
        id="concerns"
        placeholder={concerns}
        labelText="concerns"
        value={concerns}
        onChange={(e) => setConcerns(e.target.value)}
        type="text"
      />
      <BootstrapInput
        id="weight"
        placeholder={weight}
        labelText="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        type="number"
      />
     <BootstrapInput
        id="blood_pressure"
        placeholder={blood_pressure}
        labelText="blood_pressure"
        value={blood_pressure}
        onChange={(e) => setBloodPressure(e.target.value)}
        type="text"
      />
      <button type="submit" className="btn btn-primary">
        Edit
      </button>
    </form>
    </>
  );
}

export default QuestionnaireEdit;
