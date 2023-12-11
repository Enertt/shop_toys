import { API } from "../api/api";

// Actions
const SET_TOKEN = 'SET-TOKEN';


let initialState = {
    isAuth: false,
    token: null
};

const authReduser = (state = initialState, action) => {

    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token,
                isAuth: true
            };
        default: return state;
    }
};


// Action Creators
export const setTokenAC = (token) => ({ type: SET_TOKEN, token });

export const setTokenThunkCreator = (password) => {
    return (dispatch) => {
        API.login(password).then(response => {
            dispatch(setTokenAC(response))
        });
    }
}



export default authReduser;