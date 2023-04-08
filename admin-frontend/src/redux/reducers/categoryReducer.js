import { categoryConstants } from "../../constants/contants";
const initState = {
    categories :[],
    loading:false,
    error:"",
}
export const categoryReducer = (state = initState , action) =>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST: return {...state, loading : true};
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS: return {...state, categories: action.payload , loading:false , error : ""};
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE: return {...state , loading:false , error:action.payload};
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST: return {...state , loading:true};
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS: return {...state , loading:false , categories : action.payload , error:""};
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE: return {...state , loading:false , error:action.payload};
        default : return state;                   
    }
}