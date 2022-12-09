import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "./useToken";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function BootstrapInput(props){
  const { id, placeholder, labelText, value, onChange, type } = props;

  return(
    <div className='mb-4'>
      <label htmlFor={id} className="form-label">{labelText}</label>
      <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder}/>
    </div>
  );
}

function PatientForm(props) {
  const [name, setName] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [doctor_id, setDoctor] = useState("");
  const {token} = useAuthContext();
  const navigate = useNavigate();

  const submitNewPatient = async (event) => {
    event.preventDefault();
    const data = {
      "name": name,
      "birth_date": birth_date,
      "email": email,
      "address": address,
      "gender": gender,
      "doctor_id": doctor_id
    };

    const url = `${process.env.REACT_APP_PATIENTS_API_HOST}/api/patients/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newPatient = await response.json();
      navigate('/patient/' + newPatient.id);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={submitNewPatient}>
        <BootstrapInput
          id="name"
          placeholder="Full Name"
          labelText="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <BootstrapInput
          id="birth_date"
          placeholder="YYYY-MM-DD"
          labelText="Date of Birth"
          value={birth_date}
          onChange={(e) => setBirthDate(e.target.value)}
          type="date"
        />
        <BootstrapInput
          id="email"
          placeholder="Email"
          labelText="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <BootstrapInput
          id="address"
          placeholder="Address"
          labelText="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
        />
        <BootstrapInput
          id="doctor_id"
          placeholder="Doctor ID"
          labelText="Doctor ID"
          value={doctor_id}
          onChange={(e) => setDoctor(e.target.value)}
          type="text"
        />
        <div className="mb-4">
          {" "}
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-select"
            id="gender"
            aria-label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Select option</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="transgender">Transgender</option>
            <option value="non-binary">Non-binary / Non-conforming</option>
            <option value="n/a">Prefer not to answer</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
      <Footer />
    </>
  );
}

export default PatientForm;
