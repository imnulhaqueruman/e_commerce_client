import React from 'react';
import { Image } from 'antd';
import laptop from '../../images/laptop.png';
import{useDispatch} from 'react-redux'

const ProductCardInCheckOut = ({p}) =>{
    const colors = ["Black","Brown","Silver","White","Blue"]
    let dispatch = useDispatch()
    const handleColorChange = (e) =>{
     console.log(e.target.value)
     let cart = []
     if(typeof window !== 'undefined'){
         if(localStorage.getItem('cart')){
             cart = JSON.parse(localStorage.getItem('cart'));
         }
         cart.map((product,i) =>{
             if(product._id === p._id){
                 cart[i].color = e.target.value;
             }
         });
         console.log('update', cart)
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
           type:'ADD_TO_CART',
           payLoad:cart
        })
     }
    }
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
                <td>
                    <select 
                        onChange ={handleColorChange}
                        className="form-control"
                        name="color"
                        id=""
                    >
                      { p.color ? <option value={p.color}>{p.color}</option>
                       :<option>select</option>
                      }
                      {colors.filter((c) =>c !==p.color)
                        .map((c) =>
                         <option key={c}value={c}>{c}</option>)
                      }
                    </select>
                </td>
                <td>{p.count}</td>
                <td>shipping</td>
                <td>Remove</td>
            </tr>
        </tbody>
    )
}
export default  ProductCardInCheckOut