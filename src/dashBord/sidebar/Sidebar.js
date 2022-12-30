import "./Sidebar.css";
import React, { useEffect } from 'react'
import PieChartIcon from '@mui/icons-material/PieChart';
import AddchartIcon from '@mui/icons-material/Addchart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HandymanIcon from '@mui/icons-material/Handyman';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { LogoutService } from "../../services/ApiServices";
import { useState } from "react";
import NotificationBar from "../../services/NotificationBar";
import ApplicationStore from '../../utils/ApplicationStore';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ReplayIcon from '@mui/icons-material/Replay';
import { Grid } from "@mui/material";

const Sidebar = ({ toggleFunction, sidebarOpen }) => {
  const [user ,setUser]=useState(false);
  useEffect(()=>{
    const {userDetails} = ApplicationStore().getStorage("userDetails");
    const {userRole} =userDetails;
    if(userRole==='Admin')
    {
      setUser(true);
    }
  },[]);

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const onClickLogOut = (e) => {
    e.preventDefault();
    LogoutService(handleLogoutService, handleLogoutServiceExeption)
  }
  const handleLogoutService = (dataObject) => {
    console.log(dataObject);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setTimeout(()=>{
      sessionStorage.clear();
      window.location.reload(true);
    },3000);
  }

  const handleLogoutServiceExeption = (errorObject, errorMessage) => {
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  }

  const handleCloseNotify = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const onFullScreen =()=>{
    // document.body.requestFullscreen(); 
    if(isFullscreen === true){
      document.body.requestFullscreen();
      setIsFullscreen(false); 
    }
    if(isFullscreen === false){
      document.exitFullscreen();
      setIsFullscreen(true);
    }
  }


return (
        <div 
            style={{
                height: '12  0vh', 
                width: '11vh',
                background:'#57595D',
            }}
        >    
        <Grid container>
           <Grid item xs={10} sm={10} style={{}}>
                <FullscreenIcon onClick={onFullScreen} className='icon' />
           </Grid>
           <Grid item xs={10} sm={10}>
                <Link to='/main'><PieChartIcon className='icon' /></Link>
           </Grid>
           {
             user===true &&
                <>
                  <Grid item xs={10} sm={10}>
                <Link to='/asset'><AddchartIcon className='icon' /></Link>
                  </Grid>
                  <Grid item xs={10} sm={10}>
                <Link to='/audit'><AssignmentIcon className='icon' /></Link>
                  </Grid>
                  <Grid item xs={10} sm={10}>
                <Link to='/Amc'><HandymanIcon className='icon' /></Link>
                  </Grid>
                  <Grid item xs={10} sm={10}>
                <Link to='/maintenanceschedule'><ManageAccountsIcon className='icon' /></Link>
                  </Grid>
                  <Grid item xs={10} sm={10}>
                <Link to='/maintainceaproval'><CheckCircleIcon className='icon' /></Link>
                  </Grid>
                  <Grid item xs={10} sm={10}>
                <Link to='/maintaincestatus'><QueryStatsIcon className='icon' /></Link>
                  </Grid>        
                  <Grid item xs={10} sm={10}>
                <Link to='/alloction'><AccountTreeIcon className='icon' /></Link> 
                  </Grid>      
                  <Grid item xs={10} sm={10}>
                <Link to='/servicerequest'><SettingsIcon className='icon' /></Link>
                  </Grid>
                  <Grid item xs={10} sm={10}>
                <Link to='/vender'><GroupAddIcon className='icon' /></Link>
                  </Grid>
                  <Grid item xs={10} sm={10}>
                <Link to='/user'><PersonIcon className='icon' /></Link>  
                  </Grid>
                </>
           }
           {
            user !== true &&
               <>
                <Grid item xs={10} sm={10}>
                  <Link to='/userAssetList'><RemoveRedEyeIcon className='icon' /></Link>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <Link to='/UserManageServiceList'><SettingsSuggestIcon className='icon' /></Link>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <Link to='/UserRetureAsset'><ReplayIcon className='icon' /></Link>
                </Grid>
               </>  
           }
           
           <Grid item xs={10} sm={10}>
                <LogoutIcon className='icon' onClick={onClickLogOut} />
           </Grid>
        </Grid>
        <NotificationBar
            handleClose={handleCloseNotify}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}
           
        />
</div>
)
}

export default Sidebar;