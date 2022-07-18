import React from 'react';

const ShowPaymentInfo = ({order,showStatus = true}) => {
    return (
        <div className="container-fluid">
            <p>
                <span>Order Id:{order.paymentIntent.id}</span>{" /"}
                <span>Amount:{(order.paymentIntent.amount /=100).toLocaleString('en-US',{
                    style:'currency',
                    currency:'USD',
                })}</span>{' /'}
                 <span>Order Id:{order.paymentIntent.currency.toUpperCase()}</span>{' /'}
                 <span>Method:{order.paymentIntent.payment_method_types[0]}</span>{' /'}
                 <span>Payment:{order.paymentIntent.status.toUpperCase()}</span>{'/ '}
                 <span>Ordered on :{new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>{'/ '}
                 <br/>
                {showStatus && (<span className="badge bg-primary text-white">Status:{order.orderStatus}</span>)} 
                 
            </p>
        </div>
    );
};

export default ShowPaymentInfo;