import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import shopReduser from "./shopReduser";
import authReduser from "./authReduser";
import thunkMiddleware from "redux-thunk";


let redusers = combineReducers({
    shopReduser,
    authReduser
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;