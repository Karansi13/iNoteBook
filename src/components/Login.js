import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
// The useHistory() hook has been deprecated and replaced by the useNavigate() hook in React v6. 

export default function Login(props) {

    const[credentials, setcredentials] = useState({email: "", password: ""})
    let Navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();   // nhi krenge to page reload hoga

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authtoken)  
            Navigate("/");    
            props.showAlert("Logged in Successfully","success");         
          }
          else{
            props.showAlert("Invalid Details","danger");
          }
    }


    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }



    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password'/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
