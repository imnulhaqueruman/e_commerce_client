import React,{useState,useEffect} from 'react';
import{useSelector,useDispatch} from 'react-redux';
import{getUserCart} from '../functions/user';

const CheckOut = () => {
    // redux 
    const dispatch = useDispatch();
    const {user} = useSelector((state) =>({...state}))

    const [products,setProducts] = useState([])
    const[total,setTotal] = useState(0)
    
    useEffect(() =>{
       getUserCart(user.token)
       .then(res =>{
           console.log('User cart res', JSON.stringify(res.data, null, 4))
           setProducts(res.data.products)
           setTotal(res.data.cartTotal)
       });
    },[]);

    const saveAddressToDb = () =>{

    }
    return (
        <div className="row">
            <div className="col-md-6">
               <h4>Delivery Address</h4>
               <hr/>

               <br/>
               <br/>
               textarea
               <button className="btn btn-sm btn-success mt-2" onClick={saveAddressToDb}>Save</button>
               <hr/>
               <h4>Got coupon</h4>
               <br/>

            </div>
            <div className="col-md-6">
               <h4>Order summary</h4>
                <hr/>
                <h4>Products {products.length}</h4>
                <hr/>
                {products.map((p,i) =>(
                    <div key={i}>
                        <p>
                           <b> {p.product.title} ({p.color}) x {p.count} = {" "}
                            {p.product.price * p.count}</b>
                        </p>
                    </div>
                ))}
                <hr/>
                <p><b>Cart total:{total}</b></p>
                <div className="row">
                    <div className="col-md-6">
                       <button className="btn btn-primary">Place order</button>
                    </div>
                    <div className="col-md-6">
                       <button className="btn btn-primary">Empty Cart</button>
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default CheckOut;