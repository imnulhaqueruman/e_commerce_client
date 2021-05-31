const initialState = {
    userLoginData:[],
    userLogoutData:[],
}
const userReducer = (state=initialState, action) =>{
    switch(action.type){
        case "LOGGED_IN_USER":{
           const newState = {
               ...state,
               userLoginData:[...state.userLoginData, action.payLoad]

           }
           return newState
        }
        case "LOGOUT":{
            return action.payLoad
        }
        default:
            return state

    }
}
export default userReducer