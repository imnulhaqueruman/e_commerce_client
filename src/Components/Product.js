import React,{useState,useEffect} from 'react';
import {getProduct,productStar,getRelated} from '../functions/Product';
import {useParams } from "react-router-dom";
import SingleProduct from './Cards/SingleProduct';
import {useSelector} from 'react-redux';
import ProductCard from './Cards/ProductCard';


const Product = () => {
    const[product,setProduct] = useState({});
    const[star,setStar] = useState(0);
    const[related,setRelated] = useState([]);

    //redux user 
    const{user} = useSelector((state) =>({...state}))

    const {slug} = useParams()

    useEffect(() =>{
        loadSingleProduct()
    }, [slug])
    
    useEffect(() =>{
        if(product.ratings && user){
            let existingRatingObject = product.ratings.find(
                (e)=> e.postedBy.toString() === user._id.toString()
                );
            existingRatingObject && setStar(existingRatingObject.star) // current user star
        }
    },[])

    const loadSingleProduct = () =>{
        getProduct(slug)
        .then(res =>{
            setProduct(res.data)
            console.log('getProduct', res.data)
            console.log(res.data._id)
            // load related product
            getRelated(res.data._id).then(res =>{
                 setRelated(res.data)
                 console.log(related)
                })
        } );
    }
    
    const onStarClick = (newRating,name) =>{
         setStar(newRating)
        console.log(newRating,name);
        productStar(name,newRating,user.token)
        .then(res =>{
            console.log('rating clicked',res.data);
            loadSingleProduct(); // if you want to show updated rating in real time
        })
     };
    return (
        <div className="container-fluid">
           <div className="row pt-4">
           <SingleProduct product={product} 
           onStarClick={onStarClick} 
           star={star}>
               
           </SingleProduct>
           </div>
           <div className="row p-5">
               <div className="col text-center pt-5 mb-5">
                   <hr/>
                     <h4>Related Products</h4>
                   <hr/>
               
               </div>
           </div>
           <div className="row pb-5">
              {related.length ? 
                related.map((r) => <div key={r._id} className="col-md-4">
                    <ProductCard
                     product={r}
                    />
                </div>)
                :<div className="text-center col">
                   No product Found
                </div>
              }
           </div>
        </div>
    );
};

export default Product;