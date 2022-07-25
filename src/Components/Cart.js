import React,{useState} from 'react';
import{useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckOut from './Cards/ProductCardInCheckOut';
import { useHistory } from 'react-router';
import{userCart} from '../functions/user';


const Cart = () => {
    const{user,cart} = useSelector((state) =>({...state}));
    const dispatch = useDispatch()
    const history = useHistory()

    // [1 ,2] 100 + 200 = 300
    const getTotal = () =>{
        return cart.reduce((currentValue, nextValue) =>{
             return currentValue + nextValue.count * nextValue.price
        },0)
    }
    const saveOrderToDb = () =>{
            //console.log('cart', JSON.stringify(cart, null, 4))
            userCart(cart, user.token)
            .then(res =>{
                console.log('CART POST RES', res)
                if(res.data.ok){
                    history.push('/checkout');
                }
            })
            .catch ((err) => console.log('cart save err', err))
            

    }
    // saveCashOrderToDb
    const saveCashOrderToDb = () =>{
        //console.log('cart', JSON.stringify(cart, null, 4))
        dispatch({
            type:'COD',
            payLoad:true
        })
        userCart(cart, user.token)
        .then(res =>{
            console.log('CART POST RES', res)
            if(res.data.ok){
                history.push('/checkout');
            }
        })
        .catch ((err) => console.log('cart save err', err))
        

}

    const showCartItems = () =>{
       
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
                    :(
                        <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Color</th>
                                        <th scope="col">Count</th>
                                        <th scope="col">Shipping</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                {cart.map((p) =>(
                                    <ProductCardInCheckOut key={p._id} p={p}/>
                                ))}
                        </table>
                    )
                
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
                      <>
                        <button 
                         onClick={saveOrderToDb}
                         className="btn btn-sm btn-success mt-2"
                         disabled={!cart.length}
                        >
                            Proceed to checkout
                       </button>
                       <br/>
                       <button 
                         onClick={saveCashOrderToDb}
                         className="btn btn-sm btn-warning mt-2"
                         disabled={!cart.length}
                        >
                            Pay cash on delivery
                       </button>
                      </>
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