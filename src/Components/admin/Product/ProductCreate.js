import React from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import {createProduct,} from '../../../functions/Product';
import { toast } from 'react-toastify';

const ProductCreate = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-md-10">
                    Product Create
                </div>
            </div>
            
        </div>
    );
};

export default ProductCreate;