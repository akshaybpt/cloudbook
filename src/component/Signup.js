import React, { useState,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import modeContext from '../context/mode/modeContext';

const Signup = (props) => {
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
    const [newCredentials, setNewCredentials] = useState({ name: "", email: "", password: "" })
    
    const handelSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'Post', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',

            },

            body: JSON.stringify({ name: newCredentials.name, email: newCredentials.email, password: newCredentials.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        console.log(json);
        if (json.sucess) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);  // store the authtoken locally
            navigate("/login"); // chnages page to the ./ i.e home page

        }
        else {
            props.showAlert("error: Invalid credentials", "danger");
        }

    }
    const onChange = (e) => {
        setNewCredentials({ ...newCredentials, [e.target.name]: e.target.value })

    }
    return (
        <div>
            <div className="container">
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={onChange} style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'}}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'}}  />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={onChange} id="password" style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'}}  />
                    </div>

                    <button type="submit" className={`btn btn-${mode==='dark'? 'secondary': 'primary'}`} >Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Signup