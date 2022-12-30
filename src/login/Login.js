import React, { useEffect, useState, } from 'react'
import { Grid,  Avatar, TextField,  Button } from '@mui/material'
import HttpsIcon from '@mui/icons-material/Https';

import {  useNavigate, } from 'react-router-dom';
import { LoginService } from '../services/ApiServices';
import ApplicationStore from '../utils/ApplicationStore';
import NotificationBar from '../services/NotificationBar';

const Login = () => {
  const navigate = useNavigate();
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(()=>{
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    return userDetails?.access_token? navigate("/main") : navigate("/login")
  },[]);

  const successCaseCode = [200, 201];
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  function submit(e) {
    e.preventDefault();
    LoginService({ email: data.email, password: data.password })
      .then((response) => {
        if (successCaseCode.indexOf(response.status) > -1) {
          console.log('Login Succesfull..!');
          setNotification({
            status: true,
            type: 'success',
            message: 'Login Succesfull..!',
          });
      
          return response.json();
        }
        throw {
          errorStatus: response.status,
          errorObject: response.json(),
        };
      }).then((data) => {
        ApplicationStore().setStorage('userDetails', data);
        setTimeout(()=>{
          navigate("/main");
        },3000);      
      }).catch((error) => {
        error?.errorObject?.then((errorResponse) => {
          console.log(errorResponse.error ? errorResponse.error : errorResponse.message);
          setNotification({
            status: true,
            type: 'error',
            message: errorResponse.error,
          });
        });
      });
        
  }

  const handleLogin = (e) => {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }
  const avatarStyle = { backgroundColor: 'blue' }
  const handleCloseNotify = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  return (

    <Grid container sapcing={2} >
      <Grid style={{ margin:"0px auto",  backgroundColor: 'lightgrey', padding: 40,}} 
      xs={12} sm={12} md={6} lg={3} xl={3} >
      <form onSubmit={submit}>
        
        <Grid align='center'>
          <Avatar style={avatarStyle}><HttpsIcon /></Avatar>
          <h3> Login In </h3>
        </Grid>
        <TextField
        type='email'
        id="email"
        label="Email"
        variant="outlined"
        placeholder='Enter User Email'
        required
        fullWidth
        name='email'
          //  value={user}
        onChange={(e) =>
            handleLogin(e)
          }
          value={data.username}/>
          <TextField
          id="password"
          margin="normal"
          label="Password"
          variant="outlined"
          placeholder='Enter password'
          required
          fullWidth
          type='password'
          name='password'
          onChange={(e) =>
            handleLogin(e)
          }
          value={data.password}/>
        
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary">
          Sign In
        </Button>      
      </form>
      </Grid>
      <NotificationBar
            handleClose={handleCloseNotify}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}
      />
      </Grid>
   
  )
}

export default Login