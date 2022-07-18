import React from 'react';
import {CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons"
import ShowPaymentInfo from './../user/ShowPaymentInfo';

const Orders = ({orders,handleStatusChange}) => {
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
               
            </div>
          )

          )}  
        </div>
    );
};

export default Orders;