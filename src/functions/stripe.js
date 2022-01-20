import axios from 'axios'

export const createPaymentIntent = (authtoken,Coupons) =>
    axios.post(`${process.env.REACT_APP_API}/create-payment-intent`,{couponApplied:Coupons},{
        headers:{
            authtoken
        },
    })
