import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { auth } from './firebase.config';

const ForgotPassword = () => {
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useSelector((state) =>({...state}))

    useEffect(() =>{
        if(user && user.token){
            history.push('/')
        }
    },[user])

    const handlePassword = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };
        await auth.sendPasswordResetEmail(email,config)
        .then(() =>{
           setEmail('')
           setLoading(false)
           toast.success('Check your Email for password reset link');
        })
        .catch((error) =>{
            setLoading(false)
            toast.error(error.message)
        } )
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (<h4 className="text-danger">Loading</h4>) :(
                <h4>Forgot Password</h4>
              )
            } 
            <form onSubmit={handlePassword}>
                <input 
                type="email" 
                className="form-control"
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
                placeholder="type your email"
                autoFocus
                />
                 <br/>
                 <button className="btn btn-raised" disabled={!email}>Submit</button>
            </form> 
        </div>
    );
};

export default ForgotPassword;