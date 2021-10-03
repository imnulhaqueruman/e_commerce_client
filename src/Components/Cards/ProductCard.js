import React,{useState} from 'react';
import {Card,Tooltip} from 'antd';
import laptop from '../../images/laptop.png';
import { EyeOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import {useSelector,useDispatch} from 'react-redux';

import _ from "lodash";
const{Meta} = Card;
const ProductCard = ({product}) => {
    const[toolTip, setToolTip] = useState('Click to add');
    const{images,title,description,slug,price} = product;
    // redux 
    const {user} = useSelector((state) =>({...state}))
    const dispatch = useDispatch()

    const handleAddToCart = () =>{

        // create cart array 
        let cart = []
        if(typeof window !== 'undefined'){
            // if cart is in local storage get it
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            // push new products to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual)
            // save to local storage 
            console.log('unique', unique)
            localStorage.setItem('cart', JSON.stringify(unique))
           // show tooltip 
           setToolTip('Added');
          // add to redux state 
          dispatch({
              type:"ADD_TO_CART",
              payLoad: unique,
          });
          // show cart items in side drawer
          dispatch({
            type:"SET_VISIBLE",
            payLoad:true,
        });
        }
    }
    return (
      <>
         {product && product.ratings && product.ratings.length > 0 ?
                showAverage(product)
                :<div className="text-center pt-2 pb-3">
                         No rating yet 
                </div>
               
               }
        <Card
            cover={
                <img 
                src={images && images.length ? images[0].url : laptop}
                alt=""
                style={{height:'150px',objectFit:'cover'}}
                className="p-1"
                
                />
            }
            actions={
                [
                <Link to={`/products-update/${slug}`}>
                        <EyeOutlined className="text-warning"/> <br/> View Product
                </Link>,
                    <Tooltip title={toolTip}>
                        <a onClick={handleAddToCart}>
                            <ShoppingCartOutlined  className="text-danger"/> 
                            <br/> Add to Cart</a>
                    </Tooltip>
                ]
            }
        >
            <Meta title={`${title}- $${price}`} description={`${description && description.substring(0,40)}...`} /> 

        </Card>
     </>
    );
};

export default ProductCard;