import React, { useState ,useEffect} from 'react';
import {auth} from './firebase.config';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';


const Register = () => {
    const[email,setEmail] = useState('')
    const history = useHistory();
    const {user} = useSelector((state) =>({...state}))

    useEffect(() =>{
        if(user && user.token){
            history.push('/')
        }
    },[user])
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Email is sent to ${email}. Click the link to complete your registration`);
        window.localStorage.setItem('emailForRegistration',email);
        setEmail("");

    }
    const handleChange = (e) =>{
        setEmail(e.target.value)
        console.log(e.target.value)
    }
    
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <form onSubmit={handleSubmit}>
                      <input type="email" className="form-control" value={email}
                       onChange={handleChange} placeholder="your email" autoFocus/>
                       <br/>
                      <button type="submit" className="btn btn-primary my-3">Register</button>
                    </form>
                </div>

            </div>
            
        </div>
    );
};

export default Register;