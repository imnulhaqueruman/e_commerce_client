import React from 'react';
import { Image } from 'antd';
import laptop from '../../images/laptop.png';
import{useDispatch} from 'react-redux'
import { toast } from 'react-toastify';

const ProductCardInCheckOut = ({p}) =>{
    const colors = ["Black","Brown","Silver","White","Blue"]
    let dispatch = useDispatch()


    // color change function 
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
    // count function 
    const handleQuantityCount = (e) =>{
        console.log('quantity',p.quantity)
        
        let count = e.target.value < 1 ? 1:e.target.value;
        if(count > p.quantity){
            toast.error(`Max available quantity:${p.quantity}`)
            return;
        }

        let cart = []
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product,i) => {
               if(product._id === p._id){
                cart[i].count = count;
               }
            });
            localStorage.setItem('cart', JSON.stringify(cart))
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
                <td className="text-center">
                    <input
                      type="number"
                      className="form-control" 
                      value={p.count}
                      onChange={handleQuantityCount}
                    />
                </td>
                <td>shipping</td>
                <td>Remove</td>
            </tr>
        </tbody>
    )
}
export default  ProductCardInCheckOut