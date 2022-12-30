import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NotificationBar from '../../services/NotificationBar';
import { UserAddService, UserUpdateService, FetchDepaertmentService, FetchUserIdService } from '../../services/ApiServices';
import { Grid } from '@mui/material';

const UserModel = ({ open, setOpen, isAdd, editData, setRefresh,refresh }) => {
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState('');
  const [employeeId, setemployeeId] = useState('');
  const [employeeName, setemployeeNamed] = useState('');
  const [designation, setdesignation] = useState('');
  const [mobile_number, setmobile_number] = useState('');
  const [emailId, setemailId] = useState('');
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [userRole, setUserRole] = useState('');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const handleUserRole = (e) => {
    setUserRole(e.target.value);
  }

  useEffect(() => {
    FetchDepaertmentService(handleFetchSuccess, handleFetchException);
    FetchUserIdService(handleFetchUserIdService,handleFetchUserIdServiceException);
    setemployeeNamed(editData?.employee_name || '');
    setDepartment(editData?.departmentId || '');
    setdesignation(editData?.designation || '');
    setemailId(editData?.email || '');
    setmobile_number(editData?.mobile_number || '');
    setuserName(editData?.user_name || '');
    setpassword(editData?.password || '');
    setUserRole(editData?.userType || '');
  }, [editData,refresh]);

  const handleFetchSuccess = (dataObject) => {
    setDepartmentList(dataObject.data);
  }

  const handleFetchException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const handleFetchUserIdService = (dataObject)=>{
    if(editData?.employee_id)
    {
      setemployeeId(editData?.employee_id || '');
    }
    else
    {
      setemployeeId(dataObject.data);
    } 
  }

  const handleFetchUserIdServiceException=(errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const onDepartmentChange = (e) => {
    setDepartment(e.target.value);
  }

  const handleClose = () => {
    setOpen(false);
    setRefresh(oldValue => !oldValue);
    setemployeeId('');
    setemployeeNamed('');
    setDepartment('');
    setdesignation('');
    setemailId('');
    setmobile_number('');
    setuserName('');
    setpassword('');
    setUserRole('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    isAdd === true ?
    (
      UserAddService({
        employee_id: employeeId,
        employee_name: employeeName,
        department: department,
        designation: designation,
        mobile_number: mobile_number,
        email: emailId,
        user_name: userName,
        password: password,
        userType: userRole,
        }, handleSuccess, handleException)
    ) : (
      UserUpdateService({
        id: editData.id,
        employee_id: employeeId,
        employee_name: employeeName,
        department: department,
        designation: designation,
        mobile_number: mobile_number,
        email: emailId,
        user_name: userName,
        password: password
      }, handleSuccess, handleException)
    );
  }

  const handleSuccess = (dataObject) => {
    console.log(dataObject);
    setRefresh(oldValue => !oldValue);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setemployeeId('');
    setemployeeNamed('');
    setDepartment('');
    setdesignation('');
    setemailId('');
    setmobile_number('');
    setuserName('');
    setpassword('');
    setUserRole('');
  }
  const handleException = (errorObject, errorMessage) => {
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setemployeeNamed('');
    setDepartment('');
    setdesignation('');
    setemailId('');
    setmobile_number('');
    setuserName('');
    setpassword('');
    setUserRole('');
  }
  const handleCloseNotify = () => {
    setOpen(false)
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
  return (
    <Dialog
      open={open}
      maxWidth='lg' >
      <form onSubmit={onSubmit}>
        <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
          {isAdd === true ? 'Add ' : 'Edit '}User
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                  style={{
                    alignSelf: 'center',
                    textAlignLast: 'center'
                  }}>
                  <label>Employee ID :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} >
                  <TextField fullWidth id="employeeId" label="Employee ID" variant="outlined"
                  value={employeeId}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                  style={{
                    alignSelf: 'center',
                    textAlignLast: 'center',                
                  }}
                >
                  <label >Employee Name :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                >
                  <TextField fullWidth id="employeeName" label="Employee Name" variant="outlined"
                    onChange={(e) => { setemployeeNamed(e.target.value) }}
                    value={employeeName}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: '20px' }} >
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                  style={{
                    alignSelf: 'center',
                    textAlignLast: 'center'
                  }}
                >
                  <label >Department :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <InputLabel id="departmentlabel">Select Department</InputLabel>
                    <Select
                      label="Select Department"
                      value={department}
                      onChange={(e) => onDepartmentChange(e)}>
                      {departmentList.map((data, index) => {
                        return (
                          <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                  style={{
                    alignSelf: 'center',
                    textAlignLast: 'center',
                    
                  }}
                >
                  <label >Designation :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                  <TextField
                    fullWidth
                    id="designation"
                    label="Designation"
                    variant="outlined"
                    onChange={(e) => { setdesignation(e.target.value) }}
                    value={designation} />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                  style={{
                    alignSelf: 'center',
                    textAlignLast: 'center'
                  }}
                >
                  <label >Mobile Number :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                  <TextField fullWidth id="mobile_number" label="Mobile Number" variant="outlined"                 
                    onChange={(e) => { setmobile_number(e.target.value) }}
                    // onblur={NumberValid}
                    value={mobile_number}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                  style={{
                    alignSelf: 'center',
                    textAlignLast: 'center'
                  }}
                >
                  <label >Email ID :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                  <TextField
                    fullWidth
                    id="emailId"
                    label="Email ID"
                    variant="outlined"
                    onChange={(e) => { setemailId(e.target.value) }}
                    value={emailId} />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                  style={{
                    alignSelf: 'center',
                    textAlignLast: 'center'
                  }}
                >
                  <label >User Name:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                  <TextField 
                    fullWidth
                    id="userName"
                    label="User Name"
                    variant="outlined"
                    onChange={(e) => { setuserName(e.target.value) }}
                    value={userName} />

                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                  style={{
                    alignSelf: 'center',
                    textAlignLast: 'center'
                  }}
                >
                  <label >Password :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                  <TextField  fullWidth id="password" label="Password" variant="outlined"
                    onChange={(e) => { setpassword(e.target.value) }}
                    value={password}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: '20px' }} >
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}
                  style={{
                    alignSelf: 'center',
                    textAlignLast: 'center'
                  }}
                >
                  <label >User Role:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">User Role</InputLabel>
                    <Select
                      value={userRole}
                      label="User Role"
                      onChange={handleUserRole}
                    >
                      <MenuItem value={'Admin'}>Admin</MenuItem>
                      <MenuItem value={'User'}>User</MenuItem>

                    </Select>
                  </FormControl>


                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='addbutton'>
            <Button type='reset' onClick={handleClose}>Cancel</Button>
            <Button type='submit'>
              {isAdd === true ? 'Add' : 'Update'}
            </Button>
          </div>
          <NotificationBar
            handleClose={handleCloseNotify}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}
          />
        </DialogActions>
      </form>
    </Dialog>
  )
}
export default UserModel
