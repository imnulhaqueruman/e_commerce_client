
const userReducer = (state=null, action) =>{
    switch(action.type){
        case "LOGGED_IN_USER":{
           
           return action.payLoad
        }
        case "LOGOUT":{
            return action.payLoad
        }
        default:
            return state

    }
}
export default userReducer