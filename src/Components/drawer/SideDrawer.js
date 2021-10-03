import React from 'react';
import{Drawer,Button} from 'antd';
import{useSelector,useDispatch} from 'react-redux';
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';

const SideDrawer = () => {
    // redux
    const dispatch = useDispatch()
    const{user,drawer,cart} = useSelector((state) =>({...state}))

    const imageStyle={
        width:"100%",
        height:"50px",
        objectFit:'cover'
    }
    return (
        <Drawer
         className="text-center"
         title={`Cart/${cart.length} Product`}
         placement="right"
         closeable={false}
         onClose={() =>{
            dispatch({
                type:"SET_VISIBLE",
                payLoad:false,
            })
            }} visible={drawer}
        >
            {cart.map((p) =>(
                <div  key={p._id} className="row">
                    <div className="col">
                        { p.images[0] ? (
                            <>
                                    <img src={p.images[0].url} alt="" style={imageStyle}/>
                                    <p className="text-center bg-secondary text-light">
                                        {p.title} x {p.count}
                                    </p>
                            </>
                            ) :(
                                <>
                                    <img src={laptop} alt="" style={imageStyle}/>
                                    <p className="text-center bg-secondary text-light">
                                        {p.title} x {p.count}
                                    </p>
                            </>
                            )
                        }
                    </div>
                </div>
            ))}

            <Link to="/cart" >
                <button 
                 onClick={() =>
                   dispatch({
                       type:'SET_VISIBLE',
                       payLoad:false,
                   })
                 }
                 className="text-center btn btn-success btn-raised btn-block"
                >
                    Go to cart 
                </button>
            </Link>
        </Drawer>
    );
};

export default SideDrawer;