import React from 'react';
import{useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import AdminNav from './../Nav/AdminNav';
import {getCoupons,removeCoupons,createCoupons} from './../../functions/coupon';
import {DeleteOutlined} from '@ant-design/icons';

const CreateCoupon = () => {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className='col-md-10'>
                <h4>Coupon</h4>
                </div>
            </div>
         
        </div>
    );
};

export default CreateCoupon;