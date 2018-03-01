import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import todos from "./todos";
import user from "./auth";

const rootReducer = (
    combineReducers({
        todos,
        user
    })
);

let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

const token = localStorage.token;
const userInfo = JSON.parse(localStorage.getItem("user"));
if (userInfo && token) {
    store.dispatch({
        type: "AUTHENTICATE", user: userInfo
    })
}

store.subscribe(() => {
    console.log(store.getState());
})

export default store;