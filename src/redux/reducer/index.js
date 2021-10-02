import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import userReducer from "./userReducer";
import CartReducer from "./CartReducer";
const rootReducer = combineReducers({
    user:userReducer,
    search:SearchReducer,
    cart:CartReducer,
})

export default rootReducer