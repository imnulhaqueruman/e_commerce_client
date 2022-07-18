import React from 'react';
import {CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons"
import ShowPaymentInfo from './../user/ShowPaymentInfo';

const Orders = ({orders,handleStatusChange}) => {
    const showOrderInTable = (order) =>(
        <>
           <table className="table table-bordered">
               <thead className="thead-light">
                 <tr>
                     <th scope="col">Title</th>
                     <th scope="col">Price</th>
                     <th scope="col">Brand</th>
                     <th scope="col">Color</th>
                     <th scope="col">Count</th>
                     <th scope="col">Shipping</th>
                 </tr>
               </thead>
               <tbody>
                   {order.products.map((p,i) =>(
                       <tr key={i}>
                           <td>
                               <b>{p.product.title}</b>
                           </td>
                           <td>{p.product.price}</td>
                           <td>{p.product.Brand}</td>
                           <td>{p.color}</td>
                           <td>{p.count}</td>
                           <td>{p.product.shipping === "Yes" ? <CheckCircleOutlined style={{color:'green'}}/> : <CloseCircleOutlined style={{color:'red'}}/>}</td>
                       </tr>
                   ))}
               </tbody>
           </table>
        </>)
    return (
        <div>
          {orders.map((order) =>(
            <div key={order._id} className="row pb-5">
                <div className="btn btn-block bg-info">
                    <ShowPaymentInfo order={order} showStatus={false} />
                    <div className="row">
                        <div className="col-md-4">
                            Delivery status
                        </div>
                        <div className="col-md-8">
                            <select onChange={e =>handleStatusChange(order._id, e.target.value)} className="from-control" defaultValue={order.orderStatus}>
                                <option value="Not Processed"> Not Processed</option>
                                <option value="Processing"> Processing</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Complete</option>

                            </select>
                        </div>
                    </div>
                </div>
             {showOrderInTable(order)}  
            </div>
          )

          )}
        
        </div>
    );
};

export default Orders;