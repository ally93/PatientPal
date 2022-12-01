import React, {useState} from 'react';

const ResgisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pid, setPid] = useState("");

    const clearRegisterForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPid("");
    }

    const handleSubmit = async (submit) => {
        submit.preventDefault();
        const authUrl = "http://localhost:8100/api/accounts";
        const fetchConfig ={
            method: "post",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                pid: pid
            }),
            headers: {
                "Content-type": "application/json"
            }
        };
        const response = await fetch(authUrl, fetchConfig);
        const data = await response.json();
        if (response.ok) {
            clearRegisterForm()
        };
    }

    return (
        <div>
            <h1>Create an Account</h1>
            <form id="new-user-form" onSubmit={handleSubmit}>
                <div>
                    <input required type="text" name="name" id="name" value={name} onChange={(event) => setName(event.target.value)}/>
                    <label>Name</label>
                </div>
                <div>
                    <input required type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <label>Email</label>
                </div>
                <div>
                    <input required type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <label>Password</label>
                </div>
                <div>
                    <input required type="number" name="pid" id="pid" value={pid} onChange={(event) => setPid(event.target.value)}/>
                    <label>PID</label>
                </div>
                <button>Create</button>
            </form>
        </div>
    );

}

export default ResgisterForm
