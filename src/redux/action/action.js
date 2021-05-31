export const logInUser = (payLoad) =>{
    return{
        type:'LOGGED_IN_USER',
        payLoad,
    }
}
export const logOut = (payLoad) =>{
    return{
        type:"LOGOUT",
        payLoad,
    }
}