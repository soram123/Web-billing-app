import { createStore, combineReducers } from "redux"
import customerReducer from "../Reducers/customerReducer"
import productReducer from "../Reducers/productReducer"
import loggedInReducer from "../Reducers/loggedInReducer"

const configureStore = ()=>{
    const store = createStore(combineReducers({
        customers : customerReducer,
        products : productReducer,
        loggedIn : loggedInReducer
    }))
    return store
}
export default configureStore