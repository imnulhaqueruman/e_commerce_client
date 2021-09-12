import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user:userReducer,
    search:SearchReducer,
})

export default rootReducer