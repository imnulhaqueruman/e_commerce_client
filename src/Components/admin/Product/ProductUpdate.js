import React, { useState,useEffect } from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import {getProduct} from '../../../functions/Product';
import { toast } from 'react-toastify';
import ProductCreateForm from '../../forms/ProductCreateForm';

import {getCategories,getCategorySubs } from '../../../functions/Category';
import FileUpload from '../../forms/FileUpload';
import{LoadingOutlined} from '@ant-design/icons';
import { useHistory, useParams,useRouteMatch } from "react-router-dom";

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
const ProductUpdate = () => {
   // Router
    const{slug} = useParams()
    const match = useRouteMatch("/admin/products-update/:slug");


    //redux 
    const {user} = useSelector((state) =>({...state}))
    // state 
    const[values,setValues] = useState(initialState)

    useEffect(() =>{
        loadProduct()
    },[])

    const loadProduct = () =>{
        getProduct(slug)
        .then((res) =>{
            setValues({...values, ...res.data});
        })
    }
   
    return (
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-md-10">
                 <h4>Product Update</h4>
                 {JSON.stringify(values)}
                <hr/>
                </div>
            </div>
            
        </div>
    );
};

export default ProductUpdate;