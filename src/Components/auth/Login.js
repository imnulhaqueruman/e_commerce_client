import firebase from "firebase/app";
import "firebase/auth";
import React, { useEffect, useState } from 'react';
import {auth, googleAuthProvider} from './firebase.config';

import {toast} from 'react-toastify';
import{Button} from 'antd';
import {MailOutlined,GoogleOutlined} from '@ant-design/icons';
import { useDispatch,useSelector } from "react-redux";
import { logInUser } from "../../redux/action/action";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = () => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState("");
    const[loading, setLoading] = useState(false);
    
    const {user} = useSelector((state) =>({...state}))
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() =>{
        let intended = history.location.state;
        if(intended){
            return 
        }else{

            if(user && user.token){
                history.push('/')
            }
        }

    },[user,history]);
    const roleBasedRedirect = (res) =>{
        //check if intended
        let intended = history.location.state;
        if(intended){
            history.push(intended.from)
        }
        else{
            if(res.data.role ==='admin'){
                history.push('/admin/dashboard')
            } else{
                history.push('/user/history')
            }
        }
       
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
           const result = await auth.signInWithEmailAndPassword(email, password);
           //console.log(result)
           const{user} = result;
           const idTokenResult = await user.getIdTokenResult();
           createOrUpdateUser(idTokenResult.token)
           .then((res) =>{
            const payLoad = {
                email:res.data.email,
                name:res.data.name,
                id:res.data._id,
                role:res.data.role,
                token:idTokenResult.token
              }
              dispatch(logInUser(payLoad))
              roleBasedRedirect(res)
           } )
           .catch(err => console.log(err));
            //history.push('/');
        } 
        catch(error){
           console.log(error);
           toast.error(error.message)
           setLoading(false)
        }
        
    }
    const handleChangeEmail = (e) =>{
        setEmail(e.target.value)
        console.log(e.target.value)
    }
    const handleChangePass = (e) =>{
        setPassword(e.target.value)

    }
    const googleLogin = async() =>{
        auth.
        signInWithPopup(googleAuthProvider).
        then(async(result) =>{
            const{user} = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
            .then((res) =>{
             const payLoad = {
                 email:res.data.email,
                 name:res.data.name,
                 id:res.data._id,
                 role:res.data.role,
                 token:idTokenResult.token
               }
               dispatch(logInUser(payLoad))
               roleBasedRedirect(res)
            } )
            .catch(err => console.log(err));
            history.push('/');
        })
        .catch(err =>{
            console.log(err)
            toast.error(err.message)
        })

    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                   {
                       loading ?   <div class="spinner-border" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                  </div> : <h4>Login</h4>
                       
                   }
                    <form onSubmit={handleSubmit}>
                      <div className="from-group">
                       <input type="email" className="form-control" value={email}
                       onChange={handleChangeEmail} placeholder="your email" autoFocus/>
                      </div>
                       <br/>
                       <div className="from-group">
                            <input type="password" className="form-control" value={password}
                            onChange={handleChangePass} placeholder="your password" />
                      </div>
                      <br/>
                     <Button
                      onClick={handleSubmit}
                       type="primary"
                       block
                       shape="round"
                       className="mb-3"
                       icon={<MailOutlined/>}
                       size="large"
                       disabled={!email || password.length < 6}
                     >
                         Login with Email/password
                     </Button>
                     <br/>
                     <Button
                      onClick={googleLogin}
                       type="default"
                       block
                       shape="round"
                       className="mb-3"
                       icon={<GoogleOutlined/>}
                       size="large"
                     
                     >
                         Login with Google
                     </Button>
                     <Link to="/forgot/password" className="float-right text-danger">
                         Forgot Password
                     </Link>
                    </form>
                </div>

            </div>
            
        </div>
    );
};

export default Login;