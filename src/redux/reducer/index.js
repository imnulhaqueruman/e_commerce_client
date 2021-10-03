import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import userReducer from "./userReducer";
import CartReducer from "./CartReducer";
import drawerReducer from "./drawerReducer";
const rootReducer = combineReducers({
    user:userReducer,
    search:SearchReducer,
    cart:CartReducer,
    drawer:drawerReducer,
})

export default rootReducer