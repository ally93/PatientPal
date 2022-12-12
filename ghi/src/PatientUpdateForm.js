import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "./useToken";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function BootstrapInput(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function PatientUpdate(props) {
  const defaultVal = "";
  const [name, setName] = useState(defaultVal);
  const [birth_date, setBirthDate] = useState(defaultVal);
  const [email, setEmail] = useState(defaultVal);
  const [address, setAddress] = useState(defaultVal);
  const [gender, setGender] = useState(defaultVal);
  const [doctor_id, setDoctor] = useState(defaultVal);
  const token = getToken();

  const navigate = useNavigate();
  const { patient_id } = useParams();

  const url = `${process.env.REACT_APP_PATIENTS_API_HOST}/api/patients/${patient_id}`;

  useEffect(() => {
    async function fetchPatient() {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setBirthDate(data.birth_date);
        setEmail(data.email);
        setAddress(data.address);
        setGender(data.gender);
        setDoctor(data.doctor_id);
      }
    }
    if (token) {
      fetchPatient();
    }

  }, [url, token]);

  const updatePatient = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      birth_date: birth_date,
      email: email,
      address: address,
      gender: gender,
      doctor_id: doctor_id,
    };

    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const updatedPatient = await response.json();
      navigate("/patient/" + updatedPatient.id);
    }
  };

  return (
    <>
      <Navbar />
      <h3 className="display-6 fw-bold">Update {name}'s Details</h3>
      <form onSubmit={updatePatient}>
        <BootstrapInput
          id="name"
          placeholder={name}
          labelText="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <BootstrapInput
          id="birth_date"
          placeholder={birth_date}
          labelText="Date of Birth"
          value={birth_date}
          onChange={(e) => setBirthDate(e.target.value)}
          type="date"
        />
        <BootstrapInput
          id="email"
          placeholder={email}
          labelText="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <BootstrapInput
          id="address"
          placeholder={address}
          labelText="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
        />
        <BootstrapInput
          id="doctor_id"
          placeholder={doctor_id}
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
            <option>{gender}</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="transgender">Transgender</option>
            <option value="non-binary">Non-binary / Non-conforming</option>
            <option value="n/a">Prefer not to answer</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
      <Footer />
    </>
  );
}

export default PatientUpdate;
