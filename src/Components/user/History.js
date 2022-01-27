import React,{useEffect, useState} from 'react';
import UserNav from '../Nav/UserNav';
import{getUserOrders} from '../../functions/user';
import{useSelector,useDispatch} from 'react-redux';
import{CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons";
import ShowPaymentInfo from './ShowPaymentInfo';
import { Document, Page, Text, View, StyleSheet,PDFDownloadLink,PDFViewer } from '@react-pdf/renderer';

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
        </>
        
    )
    
    const showDownloadLink = (order) =>(
        <>
          <PDFDownloadLink document={
                <Document>
                <Page size="A4">
                <View>
                    <Text>Section1</Text> 
                    <Text>Section1</Text> 
                </View>
                </Page>
                </Document>
          }
          fileName="invoice.pdf"
          className="btn btn-sm btn-block btn-outline-success"
          >
             DownLoad PDF
          </PDFDownloadLink>
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
                                   <ShowPaymentInfo order={order}/>
                                   {showOrderInTable(order)}
                                   <div className="row">
                                       <div className='col text center'>
                                       <div className="col">{showDownloadLink(order)}</div>
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