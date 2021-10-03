import React,{useState} from 'react';
import {Card,Tabs,Tooltip} from 'antd';
import{HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import laptop from '../../images/laptop.png';
import ProductListItem from './ProductListItem';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import {useSelector,useDispatch} from 'react-redux';

import _ from "lodash";

const{TabPane}= Tabs;
// this is children component of product page 
const SingleProduct = ({product,onStarClick,star}) => {
    const[toolTip, setToolTip] = useState('Click to add');
    const{title,images,description,_id} = product

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
            <div className="col-md-7">
                  { images && images.length ?
                      <Carousel showArrows={true}
                        autoPlay 
                        infiniteLoop
                      >
                         {images && images.map(i =>
                            <img src={i.url} key={i.public_id} alt=""/>)
                         }
                      </Carousel> : 
                    <Card
                        cover={
                            <img 
                                src={laptop}
                                alt=""
                                className="mb-3 card-image"
                            
                            />
                        }
                    >   
                    </Card>}
                    <Tabs type="card">
                        <TabPane tab="Description" key="1">
                             {description && description}
                        </TabPane>
                        <TabPane tab="More" key="2">
                           Call use on xxxx xxx xxx to learn more about this product.
                        </TabPane>
                    </Tabs>
            </div>

            <div className="col-md-5">
               <h1 className="bg-info p-3">{title}</h1>
               {product && product.ratings && product.ratings.length > 0 ?
                showAverage(product)
                :<div className="text-center pt-1 pb-3">
                       No rating Yet
                </div>
               
               }
               
                <Card
                    actions={[
                        <Tooltip title={toolTip}>
                           <a  onClick={handleAddToCart}>
                            <ShoppingCartOutlined  className="text-danger"/> 
                            <br/> Add to Cart</a>
                       </Tooltip>,
                        <Link to ='/'>
                        <HeartOutlined className="text-info"/> <br/> Add to Wishlist
                        </Link>,
                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating = {onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>
                    ]}
                
                >
                   
                   <ProductListItem product={product}/>   
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;