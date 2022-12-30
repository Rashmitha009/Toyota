import { TurnedIn } from '@mui/icons-material'
import {Outlet, Navigate, useNavigate} from 'react-router-dom'

const PrivateRoutes =()=>{
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
    const navigate = useNavigate();
    //  let auth={'token': false}
    // return(
    //     userDetails?.access_token? <Outlet/>: <Navigate to ="/login"/>
    //     )
    return !userDetails?.access_token? navigate('/login' ) : <Outlet/>        
}
export default PrivateRoutes
