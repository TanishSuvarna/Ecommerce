import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import { productReducer } from "./productsReducer.js";
import { categoryReducer } from "./categoryReducer.js";
import { orderReducer } from "./ordersReducer.js";
export const rootReducer = combineReducers({authReducer,product : productReducer,category : categoryReducer,orders : orderReducer});
