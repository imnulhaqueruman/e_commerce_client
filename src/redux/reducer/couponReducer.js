const couponReducer = (state=false, action) =>{
    switch(action.type){
        case "COUPON_APPLIED":{
           return action.payLoad
        }
        default:
            return state
    }
}
export default couponReducer;