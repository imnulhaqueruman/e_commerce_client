import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {auth} from './firebase.config';
import {toast} from 'react-toastify';
const RegisterComplete = () => {
    const history = useHistory()
    console.log(history)

    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem("emailForRegistration"));
      }, []);
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }
    
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        try {
          const result = await auth.signInWithEmailLink(email, window.location.href)
          console.log('result', result)
          if (result.user.emailVerified) {
            // remove user email fom local storage
            window.localStorage.removeItem("emailForRegistration");
            // get user id token
            let user = auth.currentUser;
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult();
            // redux store
            console.log("user", user, "idTokenResult", idTokenResult);
            // redirect
             history.push("/");
          }
        }
      
        catch(error){
            console.log(error);
            toast.error(error.message)
            console.log(error.message)
        };
        

    }
    const handleChange = (e) =>{
        setPassword(e.target.value)
        console.log(e.target.value)
    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    <form onSubmit={handleSubmit}>
                      <input type="email" className="form-control" value={email} disabled/>

                      <input type="password" className="form-control" value={password} placeholder="Enter your password" onChange={handleChange}/>

                      <button type="submit" className="btn btn-primary my-3">Complete Registration</button>
                    </form>
                </div>

            </div>
            
        </div>
    );
};

export default RegisterComplete;