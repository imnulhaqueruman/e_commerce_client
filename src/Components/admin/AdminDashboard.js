import React,{useState,useEffect} from 'react';
import AdminNav from './../Nav/AdminNav';
import {getOrders,changeStatus} from '../../functions/admin';
import{useSelector,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../order/Orders';


const AdminDashboard = () => {
    const[orders,setOrders] = useState([])

    const{user} = useSelector((state) =>({...state}))

    useEffect(() =>{
       loadOrders() 
    }, [])

    const loadOrders = () =>{ 
        getOrders(user.token).then(res =>{
             //console.log('admin', res)
         console.log(JSON.stringify(res.data,null, 4))
        setOrders(res.data)
    })}

    const handleStatusChange = (OrderId,OrderStatus) =>{
        changeStatus(OrderId,OrderStatus,user.token).then(res =>{
            toast.success('Status Update')
            loadOrders();
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <AdminNav></AdminNav>
                </div>
                
                 <div className="col-md-8">
                <h4>Admin Dashboard</h4>
                  {/* {JSON.stringify(orders)} */}
                  <Orders orders={orders} handleStatusChange={handleStatusChange} />
                 </div>
            </div>
            
        </div>
    );
};

export default AdminDashboard;