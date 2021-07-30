import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItem = ({product}) => {
    const{price,category,subs,shipping,color,brand, quantity,sold} = product
    return (
       <ul className="list-group">
            <li className="list-group-item">
                Price {" "}
                <span className="label  float-end">
                   $ {price}
                </span>
            </li>
           {category && <li className="list-group-item">
                Category {" "}
                <Link to={`/category/${category.slug}`}  className="label  float-end">
                    {category.name}
                </Link>
            </li> }
            {subs && (
                 <li className="list-group-item">
                     Sub categories 
                     {subs.map((s) => 
                        <Link key={s._id} to={`/sub/${s.slug}`} className="label  float-end">
                           {s.name}
                       </Link>
                     )}
                 </li>
            )}
           
            <li className="list-group-item">
                Shipping {" "}
                <span className="label  float-end">
                    {shipping}
                </span>
            </li>
            <li className="list-group-item">
                Color {" "}
                <span className="label  float-end">
                    {color}
                </span>
            </li>
            <li className="list-group-item">
                Brand {" "}
                <span className="label  float-end">
                    {brand}
                </span>
            </li>
            <li className="list-group-item">
                Available {" "}
                <span className="label  float-end">
                   {quantity}
                </span>
            </li>
            <li className="list-group-item">
                Sold {" "}
                <span className="label  float-end">
                   {sold}
                </span>
            </li>
       </ul>
    );
};

export default ProductListItem;