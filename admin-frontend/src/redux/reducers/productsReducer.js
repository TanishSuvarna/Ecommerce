import { productConstants } from "../../constants/contants";
const initState = {
    products:{
        
    },
    loading:false,
}

export const productReducer = (state = initState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_CATEGORIES_REQUEST: return {...state, loading : true};
        case productConstants.GET_ALL_CATEGORIES_SUCCESS: return {...state, products : action.payload , loadng:false};
        case productConstants.GET_ALL_CATEGORIES_FAILURE: return {...state , loading:false};
        case productConstants.ADD_ALL_CATEGORIES_REQUEST: return {...state , loading:false};
        case productConstants.ADD_ALL_CATEGORIES_SUCCESS: return {...state , loading:false};
        case productConstants.ADD_ALL_CATEGORIES_FAILURE: return {...state , loading:false};
        default : return state;                   
    }
}