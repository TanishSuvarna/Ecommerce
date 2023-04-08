import { orderConstants } from "../../constants/contants";
const initState = {
    orders:{
       
    },
    authenticating:false,
    authenticated:false
}
export const orderReducer = (state = initState , action) => {
    switch(action.type){
        case orderConstants.REQUEST: return {...state, loading : true};
        case orderConstants.DONE: return {...state, ...action.payload , authenticated: true , loadng:false};
        case orderConstants.FAILED: return {...state , loading:false};
        default : return state;                   
    }
}

