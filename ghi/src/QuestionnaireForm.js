import {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function BootstrapInput(props){
  const { id, placeholder, labelText, value, onChange, type } = props;

  return(
    <div className='mb-4'>
      <label htmlFor={id} className="form-label">{labelText}</label>
      <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder}/>
    </div>
  );
}

function QuestionnaireForm() {
  const [medications, setMedications] = useState("");
  const [surgeries, setSurgeries] = useState("");
  const [concerns, setConcerns] = useState("");
  const [weight, setWeight] = useState("");
  const [blood_pressure, setBloodPressure] = useState("");
  const [date, setDate] = useState("");
  const { patient_id } = useParams()

  const navigate = useNavigate();

  const submitQuestionnaire = async (event) => {
    event.preventDefault();
    const data = {
      "medications": medications,
      "surgeries": surgeries,
      "concerns": concerns,
      "weight": weight,
      "blood_pressure": blood_pressure,
      "date": date,
      "patient_id": patient_id,
    };

    const url = "http://localhost:8000/api/patient/"+patient_id+"/questionnaire/create";
    const fetchConfig = {
      method: "post",
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
    <h3 className="display-6 fw-bold">Create a Questionnaire</h3>
    <form onSubmit={submitQuestionnaire}>
      <BootstrapInput
        id="medications"
        placeholder="Medications"
        labelText="medications"
        value={medications}
        onChange={(e) => setMedications(e.target.value)}
        type="text"
      />
      <BootstrapInput
        id="date"
        placeholder="YYYY-MM-DD"
        labelText="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
      />
      <BootstrapInput
        id="surgeries"
        placeholder="surgeries"
        labelText="surgeries"
        value={surgeries}
        onChange={(e) => setSurgeries(e.target.value)}
        type="text"
      />
      <BootstrapInput
        id="concerns"
        placeholder="concerns"
        labelText="concerns"
        value={concerns}
        onChange={(e) => setConcerns(e.target.value)}
        type="text"
      />
      <BootstrapInput
        id="weight"
        placeholder="weight"
        labelText="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        type="number"
      />
     <BootstrapInput
        id="blood_pressure"
        placeholder="blood_pressure"
        labelText="blood_pressure"
        value={blood_pressure}
        onChange={(e) => setBloodPressure(e.target.value)}
        type="text"
      />
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
    </>
  );
}

export default QuestionnaireForm;
