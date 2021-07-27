import React, { useState,useEffect } from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import {getProduct,updateProduct} from '../../../functions/Product';
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
    const history = useHistory()
    const match = useRouteMatch("/admin/products-update/:slug");


    //redux 
    const {user} = useSelector((state) =>({...state}))
    // state 
    const[values,setValues] = useState(initialState)
    const[categories,setCategories] = useState([])
    const[subOptions,setSubOptions] = useState([])
    const[showSub,setShowSub] = useState(false);
    const[arrayOfSubId,setArrayOfSubId] = useState([])
    const[selectedCategory,setSelectedCategory] = useState('')
    const[loading,setLoading] = useState(false)


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
        setLoading(true)

        values.subs = arrayOfSubId
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug,values,user.token)
        .then(res =>{
            setLoading(false)
            toast.success(`${res.data.title} is updated`)
            history.push('/admin/products')
        })
        .catch(err =>{
            console.log(err)
            setLoading(false)
            //toast.error(err.response.data.err)
        })
    }

    const handleChange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value});
        console.log(e.target.name,'-----',e.target.value)
    }
    const handleCategoryChange = (e) =>{
        e.preventDefault();
        console.log('CLicked Category',e.target.value);
        setValues({...values,subs:[]});

        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value)
        .then(res =>{
            console.log('Sub options on category click', res)
            setSubOptions(res.data)
        });
        console.log(' Existing Category',values.category);
        // if user click back to the original category 
        // show it subs categories in default
        if(values.category._id === e.target.value){
            loadProduct();
        }
        // clear old sub categories
        setArrayOfSubId([]);
        //setShowSub(true);
    }
    return (
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-md-10">
                {loading? <LoadingOutlined className="text-danger h1"/> : <h4>Product Update</h4>}
                <hr/>
                 {/*JSON.stringify(values)*/}
                 <div className="p-3 ">
                   <FileUpload
                    values={values}
                    setValues={setValues}
                    setLoading={setLoading}
                   />
                </div>
                
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
                  selectedCategory={selectedCategory}
                 
                 />
                <hr/>
                </div>
            </div>
            
        </div>
    );
};

export default ProductUpdate;