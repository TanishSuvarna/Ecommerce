import { authConstants } from "../../constants/contants";
import { axiosInstance } from "../../helpers/axios.js";

export const authAction = (user , userAction) =>{
    return async (dispatch) => {
        dispatch({type:authConstants.LOGIN_REQUEST});
        const payload = await axiosInstance.post(`/admin/${userAction}` , user);
        if(payload.status === 201){
            localStorage.setItem("token" , payload.data.token);
            localStorage.setItem("user",JSON.stringify(payload.data.user));
            dispatch({type:authConstants.LOGIN_DONE  , payload : payload.data.user});
        }
        else{
            dispatch({type:authConstants.LOGIN_FAILED , payload : payload.data.message});
        }
    }
}

export const isUserLoggedIn = () => {
    return async(dispatch) => {
        dispatch({type:authConstants.LOGIN_REQUEST});
        const res = await axiosInstance.post("/admin/verify");
        if(res.status === 200){
            dispatch({type:authConstants.LOGIN_DONE  , payload :JSON.parse(localStorage.getItem("user"))});
        }else{
            localStorage.removeItem("token");
            dispatch({type:authConstants.LOGIN_FAILED , payload : res.data.message});
        }
    }
}