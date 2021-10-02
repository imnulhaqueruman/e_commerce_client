let initialState = []
// load cart items from local storage 
if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
        initialState = JSON.parse(localStorage.getItem('cart'));
    }else{
        initialState = [];
    }
}

const CartReducer = (state=initialState, action) =>{
    switch(action.type){
        case "ADD_TO_CART":{
           return action.payLoad
        }
        default:
            return state
    }
}
export default CartReducer