import React,{useState,useEffect}from 'react';
import UserNav from '../Nav/UserNav';
import { getWishList,removeWishList } from '../../functions/user';
import{useSelector,useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

const Wishlist = () => {
    const [userWishlist,setUserWishlist] = useState([ ])

    const{user} = useSelector((state) =>({...state}))

    useEffect(() =>{
    loadWishList()
    },[])

    const loadWishList = () =>{
        getWishList(user.token).then(res =>{
            // console.log(res.data)
            setUserWishlist(res.data.wishlist)
            // console.log('afterset',userWishlist)
        })
    }
    const handleRemove = productId => removeWishList(productId, user.token).then(res =>{
        loadWishList();
    })
    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-2">
                    <UserNav></UserNav>
                </div> 
                <div className="col">
                  <h4>  WishList of User</h4> 
                    {userWishlist.map((p)=> {
                        
                        <div key={p._id} className="alert alert-secondary">
                            {console.log('title',p.title)}
                                    <p>{p.title}</p>
                                    <Link to={`/product/${p.slug}`}>{p} </Link>
                                    <span onClick={() =>handleRemove(p._id)} className="btn btn-sm float-right"> <DeleteOutlined className="text-danger"/></span>
                        </div>
                    })
                  }
                </div>   
            </div>
            
            
        </div>
    );
};

export default Wishlist;