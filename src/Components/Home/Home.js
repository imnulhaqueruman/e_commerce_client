import React,{useState,useEffect} from 'react';
import{getProductsByCount} from '../../functions/Product';
import Jumbotron from '../Cards/Jumbotron';
import LoadingCard from '../Cards/LoadingCard';
import ProductCard from '../Cards/ProductCard';
const Home = () => {

    const[products,setProducts] = useState([])
    const[loading,setLoading] = useState(false)
    
    useEffect(() =>{
      loadAllProducts()
    },[])
    
    const loadAllProducts = () =>{
        setLoading(true)
        getProductsByCount(3)
        .then(res =>{
            setProducts(res.data);
            setLoading(false)
        })
    }

    return (
       <div>
        <div className="jumbotron jumbotron-fluid bg-secondary my-2 py-5 text-info h1 font-weight-bold text-center">
          <Jumbotron text={['Latest Products', 'New Arrivals', "Best Sellers"]}/>
          
        </div>
        <div className="container">
           {loading ?(<LoadingCard count={3}/>) : <div className="row">
              {products.map((product) =>
                   <div key={product._id} className="col-md-4">
                        <ProductCard product={product} />
                   </div>
              )}
           </div>}
        </div>
       </div>
    );
};

export default Home;