const SearchReducer = (state={text:""}, action) =>{
    switch(action.type){
        case "SEARCH_QUERY":{
           
           return {...state,...action.payLoad}
        }
        
        default:
            return state

    }
}
export default SearchReducer