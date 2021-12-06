import React,{useState,useEffect} from 'react';
import{useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import AdminNav from './../Nav/AdminNav';
import {getCoupons,removeCoupons,createCoupons} from './../../functions/coupon';
import {DeleteOutlined} from '@ant-design/icons';
import DatePicker from 'react-date-picker';

const CreateCoupon = () => {
    const [name,setName] = useState('')
    const [expiry,setExpiry] = useState('')
    const [discount,setDiscount] = useState('')
    const [loading,setLoading] = useState('')
    const[coupons,setCoupons] = useState([])

    //redux 
    const {user} = useSelector((state) =>({...state}))
     
    useEffect(() =>{
       loadAllCoupons();
    },[])
    const loadAllCoupons = () =>getCoupons().then(res =>setCoupons(res.data))
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name, expiry, discount)
        createCoupons({name, expiry,discount}, user.token)
        .then((res) =>{
            setLoading(false)
            loadAllCoupons()
            setName(' ')
            setExpiry('')
            toast.success(`"${res.data.name}" is created`)
        }).catch(err =>console.log('create coupon err', err))
    }
    /// remove function 
    const handleRemove = couponId =>{
        if(window.confirm('Delete?')){
            setLoading(true)
            removeCoupons(couponId, user.token).then(res =>{
               loadAllCoupons()
                setLoading(false)
                toast.error(`"Coupon ${res.data.name}" Deleted"`)
            }).catch((err) => console.log(err))
        }
    }
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className='col-md-10'>
                  {loading ? <h4 className="text-danger">Loading..</h4>:<h4>Coupon</h4>}
                  <form onSubmit={handleSubmit}>
                     <div className="form-group p-2">
                        <label className="text-muted">Name</label>
                        <input 
                           type='text'
                           className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            autoFocus
                            required
                        />
                     </div>
                     <div className="form-group p-2">
                        <label className="text-muted">Expiry</label>
                        <br/>
                         <DatePicker 
                          className="form-control" 
                          selected={new Date()}
                          onChange={(date)=> setExpiry(date)}
                          value={expiry}
                          required
                        />
                     </div>
                     <div className="form-group p-2">
                        <label className="text-muted">Discount %</label>
                        <input 
                           type='text'
                           className="form-control"
                            onChange={(e) => setDiscount(e.target.value)}
                            value={discount}
                            required
                        />
                     </div>
                     <button className="btn btn-primary" >Save</button>
                  </form>
                  <br/>
                  <h4>{coupons.length}Coupons</h4>
                  <table className="table table-bordered">
                     <thead className="thead-light">
                       <tr>
                           <th scope="col">Name</th>
                           <th scope="col">Expiry</th>
                           <th scope="col">Discount</th>
                           <th scope="col">Action</th>
                       </tr>
                     </thead>
                     <tbody>
                         {coupons.map((c) => 
                           <tr key={c._id}>
                               <td>{c.name}</td>
                               <td>{new Date(c.expiry).toLocaleString()}</td>
                               <td>{c.discount}</td>
                               <td>
                                   <DeleteOutlined onClick={() =>handleRemove(c._id)} className="text-danger pointer"/>
                               </td>
                               
                           </tr>
                             
                         )}
                     </tbody>
                  </table>
                </div>
            </div>
         
        </div>
    );
};

export default CreateCoupon;