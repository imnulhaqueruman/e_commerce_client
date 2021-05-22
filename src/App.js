import React from 'react';
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

function App() {
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
          <Route exact path="/">
             <Home></Home>
          </Route>
        </Switch>
    </>
  );
}

export default App;
