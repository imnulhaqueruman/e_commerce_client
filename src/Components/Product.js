import React,{useState,useEffect} from 'react';
import {getProduct,productStar} from '../functions/Product';
import {useParams } from "react-router-dom";
import SingleProduct from './Cards/SingleProduct';
import {useSelector} from 'react-redux';
import LoadingToRedirect from './routes/LoadingToRedirect';

const Product = () => {
    const[product,setProduct] = useState([])
    const[star,setStar] = useState(0);

    //redux user 
    const{user} = useSelector((state) =>({...state}))

    const {slug} = useParams()

    useEffect(() =>{
        loadSingleProduct()
    }, [slug])

    const loadSingleProduct = () =>
     getProduct(slug)
     .then(res => setProduct(res.data));
     const onStarClick = (newRating,name) =>{
         setStar(newRating)
        // console.log(newRating,name);
        productStar(name,star,user.token)
        .then(res =>{
            console.log('rating clicked',res.data);
            loadSingleProduct(); // if you want to show updated rating in real time
        })
     };
    return (
        <div className="container-fluid">
           <div className="row pt-4">
           <SingleProduct product={product} onStarClick={onStarClick} star={star}></SingleProduct>
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