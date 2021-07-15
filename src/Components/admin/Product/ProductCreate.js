import React, { useState } from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import {createProduct,} from '../../../functions/Product';
import { toast } from 'react-toastify';

const ProductCreate = () => {
    const initialState = {
        title:'',
        description:"",
        price:"",
        categories:[],
        category:"",
        subs:[],
        shipping:'',
        quantity:'',
        images:[],
        colors:["Black","Brown","Silver","White","Blue"],
        brands:["Apple","Samsung","Microsoft","Lenovo","ASUS"],
        color:'',
        brand:'',
    }
    const[values,setValues] = useState(initialState)
    //destrucuture 
    const{title,description,price,categories,category,subs,shipping,quantity,images,colors,brands,color,brand} = values
    

    const handleSubmit = (e) =>{
          e.preventDefault();
    }
    const handleChange = (e) =>{

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-md-10">
                <h4>Product Create</h4>
                <hr/>
                <form onSubmit={handleSubmit}>
                   <div className="form-group">
                      <label>Title</label>
                      <input type="text" name="title" 
                        className="form-control" 
                        value={title}
                        onChange={handleChange}
                      />
                   </div>
                   <div className="form-group">
                      <label>Description</label>
                      <input type="text" name="description" 
                        className="form-control" 
                        value={description}
                        onChange={handleChange}
                      />
                   </div>
                   <div className="form-group">
                      <label>Price</label>
                      <input type="number" name="price" 
                        className="form-control" 
                        value={price}
                        onChange={handleChange}
                      />
                   </div>
                   <div className="form-group">
                      <label>Shipping</label>
                      <select name="shipping"
                       className="form-control"
                       onChange={handleChange}
                       >
                           <option value="No">No</option>
                           <option value="Yes">Yes</option>

                      </select>
                     
                   </div>
                   <div className="form-group">
                      <label>Quantity</label>
                      <input type="number" name="quantity" 
                        className="form-control" 
                        value={quantity}
                        onChange={handleChange}
                      />  
                   </div>  
                   <div className="form-group">
                      <label>Color</label>
                      <select name="color"
                       className="form-control"
                       onChange={handleChange}
                       >
                           <option>Please Select</option>
                          {colors.map((c) => 
                               <option key={c} value={c}>
                                   {c}
                               </option>
                          )}
                      </select> 
                   </div>
                   <div className="form-group">
                      <label>Brands</label>
                      <select name="brands"
                       className="form-control"
                       onChange={handleChange}
                       >
                           <option>Please Select</option>
                          {brands.map((b) => 
                               <option key={b} value={b}>
                                   {b}
                               </option>
                          )}
                      </select> 
                   </div>   
                  <button className="btn btn-outline-info mt-2">Save</button>
                </form>
                </div>
            </div>
            
        </div>
    );
};

export default ProductCreate;