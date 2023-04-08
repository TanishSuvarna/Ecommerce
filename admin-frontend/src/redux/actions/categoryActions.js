
import { customInstance } from "../../helpers/axios"
import { categoryConstants } from "../../constants/contants";
const getUpdatedState = (category , payload) => {
    for(let i = 0 ; i < category.length && payload ; i++){
        
        if(category[i]._id === payload.parentID){
            console.log(category[i] , payload);
            category[i].children = [...category[i].children , payload];
            payload = null; 
        }
        else{
            if(category[i].children && category[i].children.length > 0) getUpdatedState(category[i].children  ,payload);
        }
    }
}
export const getCategories = () => {
    return async(dispatch)=>{
        const axios = customInstance();
        dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST});
        let allCategories
        try{
            allCategories = await axios.get("/category/getCategory");
            dispatch({type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS , payload : allCategories.data.orderedCategories});
        }
        catch{
            dispatch({type:categoryConstants.GET_ALL_CATEGORIES_FAILURE , payload:"ERROR"});
        }
        
    }
}

export const addCategory = (payload,state) =>{
    return async(dispatch) => {
        const axios = customInstance();
        dispatch({type:categoryConstants.ADD_NEW_CATEGORY_REQUEST});
        
        try{
            const added = await axios.post("/category/create" ,payload);
            
            let newState = state.categories;
            let newPayload =  added.data.newCategory
            console.log(added,newState);
            newPayload.children = [];
            if(newPayload.parentID) getUpdatedState(newState ,newPayload) 
            else newState = [...state , added.data.newCategory];
                     
            dispatch({type:categoryConstants.ADD_NEW_CATEGORY_SUCCESS ,payload:newState});
          
        }
        catch(err){
            console.log(err);
            dispatch({type:categoryConstants.ADD_NEW_CATEGORY_FAILURE , payload:"ERROR"});
        }
        
    }
}