import React,{useState,useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import{getProductsByCount} from '../../../functions/Product';
import AdminProductCard from '../../Cards/AdminProductCard';
import {removeProduct} from '../../../functions/Product';
import { toast } from 'react-toastify';
import{useSelector} from 'react-redux';

const AllProduct = () => {
    const[products,setProducts] = useState([])
    const[loading,setLoading]  = useState(false)
    //redux 
    const{user} = useSelector((state) =>({...state}))

    useEffect(() =>{
         loadAllProducts()
    },[])

    const loadAllProducts = () =>{
        setLoading(true)
        getProductsByCount(100)
        .then((res) =>{
            setProducts(res.data)
            setLoading(false)
        })
        .catch((err) =>{
            console.log(err)
            setLoading(false)
        } );
    };

    const handleRemove = (slug) =>{
        let answer = window.confirm('Delete?')
           if(answer){
               console.log("send delete request ", slug)
               removeProduct(slug,user.token)
               .then((res) =>{
                    loadAllProducts();
                    toast.error(`${res.data.title} is deleted`)
               })
               .catch(err =>{
                  console.log(err)
                  if(err.status === 400){
                    toast.error(err.response.data);
                } 
               })
           }

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                
                 <div className="col">
                 {loading ?
                 (<h4 className="text-danger">Loading..</h4>) :
                  (<h4>All Products...</h4>)}
                  <div className="row">
                    {products.map((product) => 
                            <div  key={product._id} className="col-md-4 pb-3">
                                <AdminProductCard
                                product={product}
                                handleRemove={handleRemove}
                            
                            />
                        
                            </div>
                    )
                    } 
                  </div>
                 </div>
            </div>
            
        </div>
    );
};

export default AllProduct;