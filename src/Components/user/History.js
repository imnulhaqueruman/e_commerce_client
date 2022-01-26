import React,{useEffect, useState} from 'react';
import UserNav from '../Nav/UserNav';
import{getUserOrders} from '../../functions/user';
import{useSelector,useDispatch} from 'react-redux';
import{CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons";


const History = () => {
    const [orders,setOrders] = useState([])
    const {user} = useSelector((state) =>({...state}))


    useEffect(() =>{
        loadUserOrders()
    },[])

    const loadUserOrders = () =>
        getUserOrders(user.token).then(res =>{
            console.log(JSON.stringify(res.data, null,4))
            setOrders(res.data)
        })
    const showOrderInTable = (order) =>(
        <>
           <p>
            each order and it's products
          </p>
        </>
        
    )
    
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav></UserNav>
                </div>

                 <div className="col">
                   <h4>
                      {orders.length>0 ? "User Purchase order" : "No purchase order"}
                    </h4> 
                    {orders.map((order,i) =>
                            <div key={i} className="m-5 p-3 card">
                                   <p>show payment info </p>
                                   {showOrderInTable(order)}
                                   <div className="row">
                                       <div className='col'>
                                       <p>Pdf download</p>
                                       </div>
                                   </div>
                                   
                             </div>
                    )}
                 </div>
            </div>
            
        </div>
    );
};

export default History;