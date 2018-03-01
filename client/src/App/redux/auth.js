import axios from "axios";

export function signup(credentials) {
    return dispatch => {
        axios.post("/auth/signup", credentials)
            .then(response => {
                const { token, user } = response.data;
                localStorage.token = token;
                localStorage.user = JSON.stringify(user);
                dispatch(
                    authenticate(user)
                );
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function login(credentials) {
    return dispatch => {
        axios.post("/auth/login", credentials)
            .then(response => {
                const { token, user } = response.data;
                localStorage.token = token;
                localStorage.user = JSON.stringify(user);
                dispatch(authenticate(user));
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

export function logout() {
    delete localStorage.token;
    delete localStorage.user;
    console.log(localStorage.token);
    return {
        type: "LOGOUT"
    }
}

export function authenticate(user) {
    return {
        type: "AUTHENTICATE",
        user
    }
}

const initialState = {
    username: "",
    isAdmin: false,
    isAuthenticated: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "AUTHENTICATE":
            return {
                ...state,
                ...action.user,
                isAuthenticated: true
            };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
}