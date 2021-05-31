import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from 'react';
import {auth} from './firebase.config';

import {toast} from 'react-toastify';
import{Button} from 'antd';
import {MailOutlined} from '@ant-design/icons';
const Login = () => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState("");
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.table(email,password)
        
    }
    const handleChangeEmail = (e) =>{
        setEmail(e.target.value)
        console.log(e.target.value)
    }
    const handleChangePass = (e) =>{
        setPassword(e.target.value)

    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
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
                       disable={!email || password.length<6}
                     >
                         Login with Email/password
                     </Button>
                    </form>
                </div>

            </div>
            
        </div>
    );
};

export default Login;