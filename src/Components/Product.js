import React,{useState,useEffect} from 'react';
import {getProduct} from '../functions/Product';
import { useHistory, useParams,useRouteMatch } from "react-router-dom";
import SingleProduct from './Cards/SingleProduct';
const Product = () => {
    const[product,setProduct] = useState([])

    const {slug} = useParams()

    useEffect(() =>{
        loadSingleProduct()
    }, [slug])

    const loadSingleProduct = () =>
     getProduct(slug)
     .then(res => setProduct(res.data))
    return (
        <div className="container-fluid">
           <div className="row pt-4">
           <SingleProduct product={product}></SingleProduct>
           </div>
           <div className="row">
               <div>Related Products</div>
           </div>
        </div>
    );
};

export default Product;