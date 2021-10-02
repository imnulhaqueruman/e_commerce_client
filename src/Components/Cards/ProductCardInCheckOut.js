import React from 'react';

const ProductCardInCheckOut = ({p}) =>{
    return(
        <tbody>
            <tr>
                <td>images</td>
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