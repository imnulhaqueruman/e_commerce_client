import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home/Home';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Header from './Components/Nav/Header';
import RegisterComplete from './Components/auth/RegisterComplete';
import { useDispatch } from 'react-redux';
import { auth } from './Components/auth/firebase.config';
import { logInUser } from './redux/action/action';

function App() {
  const dispatch = useDispatch()

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(async(user) =>{
      if(user){
        const idTokenResult = user.getIdTokenResult();
        console.log(user)
       const payLoad = {
          email:user.email,
          token:idTokenResult.token
        }
        dispatch(logInUser(payLoad))
      }
    })
    return () => unsubscribe();

  },[])
  return (
    <>
        <Header></Header>
        <ToastContainer/>
        <Switch>
         
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
             <Register></Register>
          </Route>
          <Route path="/complete">
              <RegisterComplete></RegisterComplete>
          </Route>
          <Route path="/">
             <Home></Home>
          </Route>
        </Switch>
    </>
  );
}

export default App;
