import React from 'react';
import {Card} from 'antd';
import{HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import laptop from '../../images/laptop.png';
import ProductListItem from './ProductListItem';

const SingleProduct = ({product}) => {
    const{title,images} = product
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
                     </Card>
                  }
            </div>
            <div className="col-md-5">
               <h1 className="bg-info p-3">{title}</h1>
                <Card
                    actions={[
                        <>
                        <ShoppingCartOutlined className="text-success"/>  Add to Cart
                        </>,
                        <Link to ='/'>
                        <HeartOutlined className="text-info"/> <br/> Add to Wishlist
                        </Link>,
                    ]}
                
                >
                   
                   <ProductListItem product={product}/>   
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;