import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
    const auth  = localStorage.getItem("token");
    return(
        auth ?  <Outlet/> : <Navigate to ="/login"/>
    )
} 

