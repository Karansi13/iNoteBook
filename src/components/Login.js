import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
// The useHistory() hook has been deprecated and replaced by the useNavigate() hook in React v6. 

export default function Login(props) {

    const[credentials, setcredentials] = useState({email: "", password: ""})
    let Navigate = useNavigate();
    const handleSubmit = async (e) =>{
      props.setProgress(0)

        e.preventDefault();   // nhi krenge to page reload hoga

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          props.setProgress(40)
          const json = await response.json();
          // console.log(json)
          if(json.success){
            props.setProgress(60)
            // Save the auth token and redirect
            localStorage.setItem('token',json.authToken)  //Abhi change kiya hu
            props.showAlert("Logged in Successfully","success");         
            Navigate("/");    
          }
          else{
            props.showAlert("Invalid Details","danger");
          }
          props.setProgress(100)

    }


    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }



    return (
      <>
          <h2 className='mt-3 text-center'>Login to use iNoteBook</h2>
          <div className='container my-5' style={{width: '35vw'}}>
        <form onSubmit={handleSubmit}>
            <div className="my-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password'/>
            </div>

            <button type="submit" className="btn my-3">Submit</button>
        </form>
        </div>
        </>
    )
}
