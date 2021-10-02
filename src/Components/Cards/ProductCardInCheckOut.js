import React from 'react';
import { Image } from 'antd';
import laptop from '../../images/laptop.png';

const ProductCardInCheckOut = ({p}) =>{
    
    return(
        <tbody>
            <tr>
                <td>
                    <div style={{width:"100px",height:"auto"}}>
                      {p.images.length ? (
                        <Image src={p.images[0].url} />
                      ):(<Image src={laptop}/>)}  
                    </div>
                </td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>shipping</td>
                <td>Remove</td>
            </tr>
        </tbody>
    )
}
export default  ProductCardInCheckOut