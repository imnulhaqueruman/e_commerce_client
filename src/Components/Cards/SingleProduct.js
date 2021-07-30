import React from 'react';
import {Card} from 'antd';
import{HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const {Meta} = Card
const SingleProduct = ({product}) => {
    const{title,description,images,slug} = product
    return (
        <>
            <div className="col-md-7">
                  Image Carousel
            </div>
            <div className="col-md-5">
               
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
                   <Meta title={title}
                    description={description}

                    />
                    <p>Price/category/subs/shipping/color/brand/quantity available/sold</p>
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;