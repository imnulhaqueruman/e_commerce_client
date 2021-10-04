import React from 'react';

const CheckOut = () => {
    const saveAddressToDb = () =>{

    }
    return (
        <div className="row">
            <div className="col-md-6">
               <h4>Delivery Address</h4>
               <br/>
               <br/>
               textarea
               <button className="btn btn-sm btn-success mt-2" onClick={saveAddressToDb}>Save</button>
               <hr/>
               <h4>Got coupon</h4>
               <br/>

            </div>
            <div className="col-md-6">
               <h4>Order summary</h4>
                <hr/>
                <p>products x</p>
                <hr/>
                <p>List of Products</p>
                <hr/>
                <p>Cart total:$x</p>
                <div className="row">
                    <div className="col-md-6">
                       <button className="btn btn-primary">Place order</button>
                    </div>
                    <div className="col-md-6">
                       <button className="btn btn-primary">Empty Cart</button>
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default CheckOut;