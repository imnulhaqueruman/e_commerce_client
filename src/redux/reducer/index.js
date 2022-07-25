import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import userReducer from "./userReducer";
import CartReducer from "./CartReducer";
import drawerReducer from "./drawerReducer";
import couponReducer from "./couponReducer";
import CODReducer from "./CODReducer";
const rootReducer = combineReducers({
    user:userReducer,
    search:SearchReducer,
    cart:CartReducer,
    drawer:drawerReducer,
    Coupons:couponReducer,
    COD:CODReducer
})

export default rootReducer