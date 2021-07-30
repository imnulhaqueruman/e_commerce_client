import React,{useState,useEffect} from 'react';
import {getProduct} from '../functions/Product';
import {useParams } from "react-router-dom";
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
           <div className="row p-5">
               <div className="col text-center pt-5 mb-5">
                   <hr/>
                     <h4>Related Products</h4>
                   <hr/>
               </div>
           </div>
        </div>
    );
};

export default Product;