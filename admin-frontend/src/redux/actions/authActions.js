import { authConstants } from "../../constants/contants";
import { customInstance } from "../../helpers/axios";
export const authAction = (user , userAction) =>{
    return async (dispatch) => {
        const axios = customInstance();
        dispatch({type:authConstants.LOGIN_REQUEST});
        const payload = await axios.post(`/admin/${userAction}`, user);
        try{
            localStorage.setItem("token" , payload.data.token);
            localStorage.setItem("user",JSON.stringify(payload.data.user));
            dispatch({type:authConstants.LOGIN_DONE  , payload : payload.data.user});
        }catch(err){
            dispatch({type:authConstants.LOGIN_FAILED , payload : err.message});
            return err;
        }
       
    }
}

export const isUserLoggedIn = () => {
    return async(dispatch) => {
        const axios = customInstance();
        dispatch({type:authConstants.LOGIN_REQUEST});
        try{
            await axios.post("/admin/verify" );
            dispatch({type:authConstants.LOGIN_DONE  , payload :JSON.parse(localStorage.getItem("user"))});
        }
        catch(err){
            localStorage.setItem("token", null);
            localStorage.setItem("user",null);
            dispatch({type:authConstants.LOGOUT});
        }
        
    }
}

export const signout = () => {
    return async(dispatch) =>{
        localStorage.setItem("token",null);
        localStorage.setItem("user",null);
        dispatch({type:authConstants.LOGOUT});
    }
}