import React, { useState } from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import {createProduct} from '../../../functions/Product';
import { toast } from 'react-toastify';
import ProductCreateForm from '../../forms/ProductCreateForm';

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
    //redux 
    const {user} = useSelector((state) =>({...state}))
    //destrucuture 
   

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
                  handleChange={handleChange} values={values}
                 
                 />
                </div>
            </div>
            
        </div>
    );
};

export default ProductCreate;