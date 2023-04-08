import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import TokenVerify from "../../Hooks/tokenVerify";
import { useSelector } from "react-redux";
import { isUserLoggedIn } from "../../redux/actions/authActions";
export const PrivateRoutes = () => {
    const currState = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    useEffect(() =>{
          dispatch(isUserLoggedIn());
    },[])
    if(currState.authenticating) return <h1>Loading...</h1>
    return(
        currState.authenticated ?  <Outlet/> : <Navigate to ="/login"/>
    )
} 

