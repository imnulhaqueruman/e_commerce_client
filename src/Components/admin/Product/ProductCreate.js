import React, { useState,useEffect } from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import {createProduct} from '../../../functions/Product';
import { toast } from 'react-toastify';
import ProductCreateForm from '../../forms/ProductCreateForm';

import {getCategories,getCategorySubs } from '../../../functions/Category';
const ProductCreate = () => {
    const initialState = {
        title:'',
        description:"",
        price:"",
        categories:[],
        category:"",
        subs:[],
        shipping:'',
        quantity:'',
        images:[],
        colors:["Black","Brown","Silver","White","Blue"],
        brands:["Apple","Samsung","Microsoft","Lenovo","ASUS"],
        color:'',
        brand:'',
    }
    const[values,setValues] = useState(initialState)
    const[subOptions,setSubOptions] = useState([])
    //redux 
    const {user} = useSelector((state) =>({...state}))
    //destrucuture 
   
    useEffect(() =>{
        loadCategories();
    },[]);

    const loadCategories = () =>{
        getCategories().then((res) => setValues({...values,categories: res.data}));
        console.log('call back call')
     }
    const handleSubmit = (e) =>{
          e.preventDefault();
          createProduct(values,user.token)
          .then(res =>{
              console.log(res)
              window.alert(`${res.data.title} is created`);
              window.location.reload();
          })
          .catch(err =>{
              console.log(err)
              //if(err.response.status === 400) toast.error(err.response.data);
              toast.error(err.response.data.err)
          })
    }
    const handleChange = (e) =>{
      setValues({...values,[e.target.name]:e.target.value});
      console.log(e.target.name,'-----',e.target.value)
    }
    const handleCategoryChange = (e) =>{
        e.preventDefault();
        console.log('CLicked Category',e.target.value);
        setValues({...values,category: e.target.value});
        getCategorySubs(e.target.value)
        .then(res =>{
            console.log('Sub options on category click', res)
            setSubOptions(res.data)
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-md-10">
                <h4>Product Create</h4>
                <hr/>
                
                 <ProductCreateForm handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  values={values}
                  handleCategoryChange={handleCategoryChange}

                 
                 />
                </div>
            </div>
            
        </div>
    );
};

export default ProductCreate;