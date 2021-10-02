import React,{useState} from 'react';
import{useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';


const Cart = () => {
    const{user,cart} = useSelector((state) =>({...state}));
    const dispatch = useDispatch()

    // [1 ,2] 100 + 200 = 300
    const getTotal = () =>{
        return cart.reduce((currentValue, nextValue) =>{
             return currentValue + nextValue.count * nextValue.price
        },0)
    }
    const saveOrderToDb = () =>{

    }
    return (
        <div className="container-fluid pt-2">
        
            <div className='row'>
             <div className="col-md-8">
             <h4> Cart / {cart.length} products </h4>
               {!cart.length ?
                    <h4>No products in cart.
                        <Link to="/shop">
                            Continue shopping
                    </Link>
                    </h4>
                    :<h4>showed your items</h4>
                
                }
             </div>
             <div className="col-md-4">
               <h4>Order Summary </h4>
               <hr/>
               <p>products</p>
               {cart.map((c,i) =>(
                   <div key={i}>
                      <p>{c.title}x {c.count} = ${c.price * c.count} </p>
                   </div>
               ))}
               <hr/>
               Total:<b> ${getTotal()}</b>
               <hr/>
               {
                   user ? (
                       <button 
                         onClick={saveOrderToDb}
                         className="btn btn-sm btn-success mt-2"
                         disabled={cart.length}
                        >
                            Proceed to checkout
                       </button>
                     ) :
                        (<button
                            className="btn btn-sm btn-success mt-2"
                         >
                            <Link to={{
                                pathname:"/login",
                                state:{from:"cart"},
                                }}
                            >
                                Log in to checkout
                            </Link>
                        </button>)
               }
             </div>
            </div>
        </div>
    );
};

export default Cart;