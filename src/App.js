import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
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
import ForgotPassword from './Components/auth/ForgotPassword';
import { currentUser } from './functions/auth';
import History from './Components/user/History';
import UserRoute from './Components/routes/UserRoute';
import AdminRoute from './Components/routes/AdminRoute';
import Password from './Components/user/Password';
import Wishlist from './Components/user/Wishlist';
import AdminDashboard from './Components/admin/AdminDashboard';
import CategoryCreate from './Components/admin/Category/CategoryCreate';
import CategoryUpdate from './Components/admin/Category/CategoryUpdate';
import SubCreate from './Components/admin/Sub/SubCreate';
import SubUpdate from './Components/admin/Sub/SubUpdate';
import ProductCreate from './Components/admin/Product/ProductCreate';
import AllProduct from './Components/admin/Product/AllProduct';
import ProductUpdate from './Components/admin/Product/ProductUpdate';
import Product from './Components/Product';
import CategoryHome from './Components/categoryHome/CategoryHome';

function App() {
  const dispatch = useDispatch()

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(async(user) =>{
      if(user){
        const idTokenResult = await user.getIdTokenResult();
            //console.log(user)
            currentUser(idTokenResult.token)
            .then((res) =>{
             const payLoad = {
                 email:res.data.email,
                 name:res.data.name,
                 id:res.data._id,
                 role:res.data.role,
                 token:idTokenResult.token
               }
               dispatch(logInUser(payLoad))
            } )
            .catch(err => console.log(err));
      }
    })
    return () => unsubscribe();

  },[dispatch])
  return (
    <Router>
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
          <Route path="/forgot/password">
            <ForgotPassword></ForgotPassword>
          </Route>
          <Route path = '/products-update/:slug'>
            <Product></Product>
          </Route>
          <UserRoute path="/user/history">
            <History></History>
          </UserRoute>
          <UserRoute path="/user/password">
            <Password></Password>
          </UserRoute>
          <UserRoute path="/user/wishlist">
            <Wishlist></Wishlist>
          </UserRoute>
          <AdminRoute path="/admin/dashboard">
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
          <AdminRoute path="/admin/category">
            <CategoryCreate></CategoryCreate>
          </AdminRoute>
          <AdminRoute path="/admin/sub">
            <SubCreate></SubCreate>
          </AdminRoute>
          <AdminRoute path ="/admin/product">
            <ProductCreate></ProductCreate>
          </AdminRoute>
          <AdminRoute path ="/admin/products-update/:slug">
           <ProductUpdate></ProductUpdate>
          </AdminRoute>
          <AdminRoute path ="/admin/products">
            <AllProduct></AllProduct>
          </AdminRoute>
          <AdminRoute path="/adminSub/:slug">
            <SubUpdate></SubUpdate>
          </AdminRoute>
          <AdminRoute path="/admin/:slug">
            <CategoryUpdate></CategoryUpdate>
          </AdminRoute>
          
          <Route exact path="/category/:slug">
            <CategoryHome/>
          </Route>
          <Route path="/">
             <Home></Home>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
