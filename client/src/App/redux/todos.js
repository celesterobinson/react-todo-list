import axios from "axios";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

const todoUrl = `/api/todo`;

export const getTodos = () => {
    return dispatch => {
        axios.get(todoUrl)
            .then(response => {
                let { data } = response;
                dispatch({
                    type: "GET_TODO",
                    data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const addTodo = (inputs) => {
    return dispatch => {
        axios.post(todoUrl, inputs)
            .then(response => {
                let { data } = response;
                dispatch({
                    type: "ADD_TODO",
                    data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const editTodo = (updatedTodo, id) => {
    return dispatch => {
        axios.post(todoUrl + id, updatedTodo)
            .then(response => {
                let { data } = response;
                dispatch({
                    type: "EDIT_TODO",
                    updatedTodo: data,
                    id
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const deleteTodo = (id) => {
    return dispatch => {
        axios.post(todoUrl + id, id)
            .then(response => {
                dispatch({
                    type: "DELETE_TODO",
                    id
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const todoReducer = (prevState = { loading: true, data: [] }, action) => {
    switch (action.type) {
        case "GET_TODO":
            return {
                ...prevState,
                loading: false,
                data: action.data,
            }
        case "ADD_TODO":
            return {
                ...prevState,
                loading: false,
                data: [...prevState.data, action.data],
            }
        case "EDIT_TODO":
            return {
                ...prevState,
                loading: false,
                data: prevState.data.map((todo) => {
                    if (todo._id === action.id) {
                        return action.updatedTodo
                    } else {
                        return todo
                    }
                })
            }
        case "DELETE_TODO":
            return {
                ...prevState,
                loading: false,
                data: prevState.data.filter((todo) => {
                    return todo._id !== action.id
                })
            }
        default:
            return prevState;
    }
}

export default todoReducer;