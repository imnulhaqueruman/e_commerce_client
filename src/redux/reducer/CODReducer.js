const CODReducer = (state=false, action) =>{
    switch(action.type){
        case "COD":{
           return action.payLoad
        }
        default:
            return state
    }
}
export default CODReducer;