import axios from 'axios'

export const getCoupons = async () => 
   await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupons = async (couponId, authtoken) => 
   await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`,{
       headers:{
           authtoken,
       },
   });

export const createCoupons = async (coupon, authtoken) => 
   await axios.post(`${process.env.REACT_APP_API}/coupon/`,{coupon},{
       headers:{
           authtoken,
       },
   });