import { API } from "../api/api";

// Actions
const SET_PRODUCTS_W = 'SET-PRODUCTS-W';
const SET_PRODUCTS_C = 'SET-PRODUCTS-C';
const SET_CATEGORIES = 'SET-CATEGORIES';
const SET_PRELOAD_CATEGORY = 'SET-PRELOAD-CATEGORY';
const SET_PRELOAD_INPUT = 'SET-PRELOAD-INPUT';
const SET_LOADING = 'SET-LOADING';

let initialState = {
    productsW: [],
    productsC: [],
    // state: null
    preloadCategory: null,
    preloadInput: null,
    categories: [],

    loading: false,
};

const shopReduser = (state = initialState, action) => {

    switch (action.type) {
        case SET_PRODUCTS_W:
            return {
                ...state,
                productsW: action.newProducts,
            };
        case SET_PRODUCTS_C:
            return {
                ...state,
                productsC: action.newProducts,
            };

        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.newCategories,
            };

        case SET_PRELOAD_CATEGORY:
            return {
                ...state,
                preloadCategory: action.newCategory,
            };

        case SET_PRELOAD_INPUT:
            return {
                ...state,
                preloadInput: action.newState,
            };

        case SET_LOADING:
            return {
                ...state,
                loading: action.newState,
            };

        default: return state;
    }
};


// Action Creators
export const setProductsWAC = (newProducts) => ({ type: SET_PRODUCTS_W, newProducts });
export const setProductsCAC = (newProducts) => ({ type: SET_PRODUCTS_C, newProducts });
export const setPreloadCategoryAC = (newCategory) => ({ type: SET_PRELOAD_CATEGORY, newCategory });
export const setPreloadInputAC = (newState) => ({ type: SET_PRELOAD_INPUT, newState });
export const setCategoriesAC = (newCategories) => ({ type: SET_CATEGORIES, newCategories });
export const setLoadingAC = (newState) => ({ type: SET_LOADING, newState });
// export const appAC = (state) => ({ type: APP, state });

export const getProductsWThunkCreator = (searchWord) => {
    return (dispatch) => {
        dispatch(setLoadingAC(true))

        API.getProductsW(searchWord).then(response => {
            dispatch(setLoadingAC(false))
            dispatch(setProductsWAC(response))
        });
    }
}
export const getProductsCThunkCreator = (category) => {
    return (dispatch) => {
        dispatch(setLoadingAC(true))

        API.getProductsC(category).then(response => {
            dispatch(setLoadingAC(false))
            dispatch(setProductsCAC(response))
        });
    }
}
export const getNewProductsThunkCreator = () => {
    return (dispatch) => {
        dispatch(setLoadingAC(true))

        API.getNewProducts().then(response => {
            dispatch(setLoadingAC(false))
            dispatch(setProductsWAC(response))
        });
    }
}

// export const changeDataThunkCreator = (id, title, cost, tags, categories, date, isNew) => {
//     return (dispatch) => {
//         API.changeData(id, title, cost, tags, categories, date, isNew)
//     }
// }

export default shopReduser;