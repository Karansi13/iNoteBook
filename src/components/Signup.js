import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let Navigate = useNavigate();

    const handleSubmit = async (e) => {
        props.setProgress(0)
        e.preventDefault();   // nhi krenge to page reload hoga

        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password }),
        });
        props.setProgress(40)
        const json = await response.json();
        console.log(json)
        if (json.success) {
            props.setProgress(60)
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken)  // changed
            props.showAlert("Account created successfully","success");
            Navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials","danger");
        }
        props.setProgress(100)
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h2 className='mt-3 text-center'>Signup to use iNoteBook</h2>
        <div className='container my-5' style={{width: '35vw'}}>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="cpassword" name='cpassword' minLength={5} required/>
                </div>

                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
        </>
    )
}
