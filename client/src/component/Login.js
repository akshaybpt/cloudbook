import React, { useState,useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import modeContext from '../context/mode/modeContext';


const Login = (props) => {
    const newContext = useContext(modeContext);
  const { mode } = newContext;
    let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token'))
    {
           // eslint-disable-next-line
        props.showAlert("logout First", "danger");
        navigate('/')
     
    }
     
    }, [])
    
    const [credentials, setCredentials] = useState({ email: "", password: "" })
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
         const json= await response.json()
       
        if (json.sucess) {
            // Save the auth token and redirect
       
            localStorage.setItem("token", json.authToken);  // store the authtoken locally
           
         props.showAlert("आपका स्वागत है","success");
           
            navigate("/"); // chnages page to the ./ i.e home page

        }
        else {

           
            props.showAlert("अवैध प्रत्यय पत्र","danger");
            props.showAlert("error: Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'}}  />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'
                }}  />
                    </div>

                    <button type="submit" className={`btn btn-${mode==='dark'? 'secondary': 'primary'}`}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
