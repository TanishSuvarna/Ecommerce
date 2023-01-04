import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {isUserLoggedIn } from "../redux/actions/authActions.js"  
const TokenVerify = () =>{
    let authorization = useSelector(state => state.authReducer.authenticated)
    const dispatch = useDispatch();
    useEffect(() =>{
        if(!authorization) dispatch(isUserLoggedIn());
    },[])
    return authorization;
}

export default TokenVerify;