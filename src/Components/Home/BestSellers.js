import React,{useState,useEffect} from 'react';
import{getProducts,getProductsCount} from '../../functions/Product';
import LoadingCard from '../Cards/LoadingCard';
import ProductCard from '../Cards/ProductCard';
import {Pagination} from 'antd';

const BestSellers = () => {

    const[products,setProducts] = useState([])
    const[loading,setLoading] = useState(false)
    const[productsCount,setProductsCount] = useState(0);
    const[page,setPage] = useState(1);
    
    useEffect(() =>{
      loadAllProducts()
    },[page])

    useEffect(() =>{
        getProductsCount()
        .then(res => setProductsCount(res.data))
     },[])
    
    const loadAllProducts = () =>{
        setLoading(true)
        // sort order limit 
        getProducts('sold','desc', page)
        .then(res =>{
            setProducts(res.data);
            setLoading(false)
        })
    }

    return (
       <div>
        <div className="container">
           {loading ?(<LoadingCard count={3}/>) : <div className="row">
              {products.map((product) =>
                   <div key={product._id} className="col-md-4">
                        <ProductCard product={product} />
                   </div>
              )}
           </div>}
        </div>
        <div className="row">
            <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
            <Pagination 
                current={page} 
                total={(productsCount / 3) *10} 
                onChange={value => setPage(value)}/>
            </nav>

        </div>
       </div>
    );
};

export default BestSellers;