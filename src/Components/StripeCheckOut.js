import React, { useEffect } from 'react';
import{CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import { useSelector,useDispatch } from 'react-redux';
import {createPaymentIntent} from '../functions/stripe';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {Card} from "antd"
import { DollarOutlined,CheckOutlined } from '@ant-design/icons';
import Laptop from '../images/laptop.png';



const StripeCheckOut = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const{user,Coupons} = useSelector((state) =>({...state}))

    const[succeeded,setSucceeded] = useState(false)
    const[error,setError] = useState(false)
    const[processing,setProcessing] = useState(false)
    const[disabled,setDisabled] = useState(true)
    const[clientSecret,setClientSecret] = useState('');

    const[cartTotal,setCartTotal] = useState(0)
    const[totalAfterDiscount,setTotalAfterDiscount] = useState(0);
    const[payable,setPayable] = useState(0)
    
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() =>{
         createPaymentIntent(user.token,Coupons)
         .then((res) =>{
             console.log('createPaymentIntent',res.data)
             setClientSecret(res.data.clientSecret);
             // additional response received on successfull payment
             console.log(res.data.cartTotal)
             setCartTotal(res.data.cartTotal);
             setTotalAfterDiscount(res.data.totalAfterDiscount)
             setPayable(res.data.payable)
         })
    },[]);

const handleSubmit = async (e) =>{
        e.preventDefault()
         setProcessing(true)

        const payLoad = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card:elements.getElement(CardElement),
            billing_details:{
              name:e.target.name.value,
            },
          },
        })
        if(payLoad.error){
            setError(`Payment Failed ${payLoad.error.message} `)
            setProcessing(false)
        }else{
                   // here you get result after successfull payment 
                   // create order and save in database for admin to process
                   // empty user cart from redux store and local storage 
           console.log(JSON.stringify(payLoad,null,4))
           console.log(payLoad)
           setError(null)
           setProcessing(false)
           setSucceeded(true)
        }
    }
    const handleChange = async (e) =>{
        // listen for changes in the card element
        // display the errors  
        setDisabled(e.empty) // display pay button if errors 
        setError(e.error ? e.error.message : ""); // show error message 

    }
    const cartStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

    return (
        <div>
           {
             !succeeded && <div>
               {Coupons && totalAfterDiscount !== undefined ? (
                 <p className="alert alert-success">{`TotalAfterDiscount:$${totalAfterDiscount}`}</p>
               ) :
               (<p className="alert alert-danger">No coupon Applied</p>)}
             </div>
           }
          <div className="text-center pb-5">
               <Card 
                cover={
                  <img alt="" src={Laptop} style={{height:'200px',objectFit:'cover',marginBottom:'-50px' }} />
                }
                actions={[
                  <>
                    <DollarOutlined className="text=info" /> <br/> Total :$ {cartTotal}
                  </>,
                  <>
                    <CheckOutlined className="text=info" /> <br/> Total Payable :$ {(payable/100).toFixed(2)}
                 </>
                ]}
               />
          </div>
          
            <form
                id="payment-from" 
                className="stripe-from" 
                onSubmit={handleSubmit}
            >
               <CardElement 
                id="card-element" 
                options={cartStyle}
                onChange={handleChange}
               />
               <button className="stripe-button" disabled={processing || disabled || succeeded }>
                        <span id="button-text">
                            {processing ? <div className='spinner' id="spinner"></div>:'Pay'}
                        </span>
               </button>
               <br/>
               {error && <div className="card-error" role="alert">{error}</div>}
               <br/>
               <p className={succeeded ? 'result-message' :'result-message hidden'}>
                Payment SuccessFull <Link to="/user/history">See it in your purchase history</Link>
              </p>
            </form>
            
        </div>
    );
};

export default StripeCheckOut;