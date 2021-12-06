import React,{useState,useEffect} from 'react';
import{useSelector,useDispatch} from 'react-redux';
import{getUserCart,emptyUserCart,saveUserAddress,applyCoupon} from '../functions/user';
import { toast } from 'react-toastify';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
const CheckOut = () => {
    // redux 
    const dispatch = useDispatch();
    const {user} = useSelector((state) =>({...state}))

    const [products,setProducts] = useState([])
    const[total,setTotal] = useState(0)
    const[address,setAddress] = useState(" ")
    const[addressSaved,setAddressSaved] = useState(false)
    const[coupon,setCoupon] = useState('')
    // discount price 
    const[totalAfterDiscount, setTotalAfterDiscount] = useState('')
    const[discountError, setDiscountError] = useState('')
    
    useEffect(() =>{
       getUserCart(user.token)
       .then(res =>{
           console.log('User cart res', JSON.stringify(res.data, null, 4))
           setProducts(res.data.products)
           setTotal(res.data.cartTotal)
       });
    },[]);

    const emptyCart = () =>{
        // remove from local storage
       if(typeof window !== 'undefined'){
           localStorage.removeItem("cart")
       }
       // remove from redux 
       dispatch({
           type:"ADD_TO_CART",
           payLoad:[]
       })
       // remove from backend storage
          emptyUserCart(user.token)
          .then(res =>{
              console.log('deleted cart')
              setProducts([])
              setTotal(0)
              toast.success('Cart is empty . Continue shopping')
          })
    }
    const saveAddressToDb = () =>{
      //console.log('address',editorState)
      //console.log(address)
      saveUserAddress(user.token,address).then(res =>{
        if(res.data.ok){
            setAddressSaved(true);
            toast.success('Address saved')
        }
      })
    };
    const applyDiscountCoupon = () =>{
        console.log('send coupon to backend',coupon);
        applyCoupon(user.token, coupon) 
        .then(res =>{
            console.log('RES on COUPON APPLIED', res.data)
            if(res.data){
                setTotalAfterDiscount(res.data)
                // push the total after discount to redux 
            }
            // error
            if(res.data.err){
                setDiscountError(res.data.err);
                // update redux coupon applied
            }

        })

    }
    const showAddress = () => (
     <>
       <div class="form-floating">
            <textarea class="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
            <label for="floatingTextarea"></label>
        </div>
        <br/>
        <br/>
               
        <button className="btn btn-sm btn-success  mt-2" onClick={saveAddressToDb}>Save</button>
     </>);
    const showProductSummary = () =>
        <> 
            {products.map((p,i) =>(
                    <div key={i}>
                        <p>
                           <b> {p.product.title} ({p.color}) x {p.count} = {" "}
                            {p.product.price * p.count}</b>
                        </p>
                    </div>
            ))}
        </>
    
    const showApplyCoupon = () => (
        <>
           <input onChange={(e) => setCoupon(e.target.value)} value={coupon} type="text" className="form-control"/>
           <button onClick={applyDiscountCoupon} className="btn btn-success mt-2">
             Apply
           </button>
        </>
    )
    return (
        <div className="row">
            <div className="col-md-6">
               <h4>Delivery Address</h4>
               <br/>
               {showAddress()}
               <hr/>
               <h4>Got coupon</h4>
                {showApplyCoupon()}
               <br/>

            </div>
            <div className="col-md-6">
               <h4>Order summary</h4>
                <hr/>
                <h4>Products {products.length}</h4>
                <hr/>
                 {showProductSummary()}
                <hr/>
                <p><b>Cart total:{total}</b></p>
                <div className="row">
                    <div className="col-md-6">
                       <button className="btn btn-primary" disabled={!addressSaved || !products.length}>Place order</button>
                    </div>
                    <div className="col-md-6">
                       <button
                         disabled={!products.length}
                         onClick={emptyCart}
                          className="btn btn-primary"
                        >
                            Empty Cart
                        </button>
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default CheckOut;