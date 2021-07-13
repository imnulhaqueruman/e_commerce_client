import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';
import {currentAdmin} from '../../functions/auth';

const AdminRoute = ({ children, ...rest }) => {
    const {user} = useSelector((state) =>({...state}));
    const[ok,setOk] = useState(false)
    useEffect(() =>{
       if(user && user.token){
           currentAdmin(user.token)
           .then(res =>{
               console.log("CURRENT ADMIN RESPONSE",res)
               setOk(true);
           })
           .catch(err =>{
               console.log('admin route error',err)
               setOk(false)
           })
       }
    },[user])
    return ok  ? (
        <Route
        {...rest}
        render={() => children}
            />
      )
         
    : (
      <LoadingToRedirect></LoadingToRedirect>
    );
   
};

export default AdminRoute;