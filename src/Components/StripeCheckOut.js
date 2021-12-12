import React, { useEffect } from 'react';
import{CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import { useSelector,useDispatch } from 'react-redux';
import {createPaymentIntent} from '../functions/stripe';
import { useHistory } from 'react-router';
import { useState } from 'react';

const StripeCheckOut = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const{user} = useSelector((state) =>({...state}))

    const[succeeded,setSucceeded] = useState(false)
    const[error,setError] = useState(false)
    const[processing,setProcessing] = useState('')
    const[disabled,setDisabled] = useState(true)
    const[clientSecret,setClientSecret] = useState('');
    
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() =>{
         createPaymentIntent(user.token)
         .then((res) =>{
             //console.log('createPaymentIntent',res.data.clientSecret)
             setClientSecret(res.data.clientSecret)
         })
    },[]);

    const handleSubmit = async (e) =>{
        //
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
        <>
            <from 
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
            </from>
            
        </>
    );
};

export default StripeCheckOut;