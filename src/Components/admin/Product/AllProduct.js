import React,{useState,useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import{getProductsByCount} from '../../../functions/Product';
import AdminProductCard from '../../Cards/AdminProductCard';


const AllProduct = () => {
    const[products,setProducts] = useState([])
    const[loading,setLoading]  = useState(false)

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
                            <div  key={product._id} className="col-md-4">
                                <AdminProductCard
                                product={product}
                            
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