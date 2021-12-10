import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import userReducer from "./userReducer";
import CartReducer from "./CartReducer";
import drawerReducer from "./drawerReducer";
import couponReducer from "./couponReducer";
const rootReducer = combineReducers({
    user:userReducer,
    search:SearchReducer,
    cart:CartReducer,
    drawer:drawerReducer,
    Coupons:couponReducer,
})

export default rootReducer