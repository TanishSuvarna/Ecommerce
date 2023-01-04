import { authConstants } from "../../constants/contants.js";
const initState = {
    user:{
        firstName:"",
        lastName:"",
        picture:"",
        email:"",
    },
    authenticating:false,
    authenticated:false
}
const authReducer = ( state =  initState, action) => {
    switch(action.type){
        case authConstants.LOGIN_REQUEST: return {...state, authenticating : true};
        case authConstants.LOGIN_DONE: return {...state, ...action.payload , authenticated: true , authenticating:false};
        case authConstants.LOGIN_FAILED: return {...state, authenticating : false};
        default : return state;                   
    }
}
export default authReducer;