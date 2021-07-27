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
import ProductUpdateForm from '../../forms/ProductUpdateForm';

const initialState = {
    title:'',
    description:"",
    price:"",
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
    const[categories,setCategories] = useState([])
    const[subOptions,setSubOptions] = useState([])
    const[showSub,setShowSub] = useState(false);
    const[arrayOfSubId,setArrayOfSubId] = useState([])

    useEffect(() =>{
        loadProduct()
        loadCategories();
    },[])

    const loadProduct = () =>{
        getProduct(slug)
        .then((p) =>{
            // load single product 
            setValues({...values, ...p.data});
            // load single product category subs
            getCategorySubs(p.data.category._id)
            .then(res =>{
                setSubOptions(res.data); // on first Load show default sub 

            });
            // 3 prepare array of sub id to show as default sub value in nt design select 
            const arr = [] 
            p.data.subs.map(s => 
              arr.push(s._id)
            );
            console.log('Arr', arr);
            setArrayOfSubId(prev => arr); //require ant design for select work 

        })
    };

    const loadCategories= () =>{
        getCategories().then((res) => setCategories(res.data));
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    const handleChange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value});
        console.log(e.target.name,'-----',e.target.value)
    }
    const handleCategoryChange = (e) =>{
        e.preventDefault();
        console.log('CLicked Category',e.target.value);
        setValues({...values,subs:[],category: e.target.value});
        getCategorySubs(e.target.value)
        .then(res =>{
            console.log('Sub options on category click', res)
            setSubOptions(res.data)
        });
        //setShowSub(true);
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
                 <ProductUpdateForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  setValues={setValues}
                  values={values}
                  handleCategoryChange={handleCategoryChange}
                  categories={categories}
                  subOptions={subOptions}
                  arrayOfSubId={arrayOfSubId}
                  setArrayOfSubId={setArrayOfSubId}
                 
                 />
                <hr/>
                </div>
            </div>
            
        </div>
    );
};

export default ProductUpdate;