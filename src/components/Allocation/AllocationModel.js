import React, { useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NotificationBar from '../../services/NotificationBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {  UserUpdateService,FetchDepaertmentService,FetchAuditAssetTypeService, FetchSectionService, FetchAssetTypeService, FetchAssetNameService, AlloctionAddService, FetchEmployeeIdService, FetchEmployeeNameService, FetchUserNameService } from '../../services/ApiServices';
import { Grid } from '@mui/material';

const AllocationModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState(editData?.department || '');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setemployeeNamed] = useState('');
  const [employeeIdList,setEmployeeIdList] = useState([]);
  const [userName, setUserName] = useState('');
  const [sectionList, setSectionList]=useState([]);
  const [section, setSection]=useState('');
  const [assetTypeList, setAssetTypeList]=useState([]);
  const [assetType, setAssetType]=useState('');
  const [ assetNameList, setAssetNameList]=useState([]);
  const [assetName,setAssetName]=useState('');
  const [user, setuser] = useState("EmpId");
  const [temporary, setTemporary] = useState("temporary");
  const [tempFromDate , setTempFromDate] = useState('');
  const [tempToDate , setTempToDate] = useState('');
  const [userDepartmentList, setUserDepartmentList]=useState([]);
  const [ userNameList,   setUserNameList]=useState([]);
  const [userDepartment,setUserDepartment]=useState();
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  
  useEffect(() => {
    FetchDepaertmentService(handleFetchSuccess, handleFetchException);
    FetchEmployeeIdService(handleEmployeeSuccess, handleEmployeeException);
    setDepartment(editData?.departmentId || '');
    setSection(editData?.sectionsId || '');  
    setAssetType(editData?.assetTypesId || '');
    setAssetName(editData?.assetNameId  || '');
    setUserDepartment(editData?.departmentId || '');
    setEmployeeId(editData?.empId || '');
    setemployeeNamed(editData?.user || '' );
    setTempFromDate(editData?.fromDate || '');
    setTempToDate(editData?.toDate || '');
    console.log('data'+editData?.assetNameId);
  }, [editData]);
  
  const handleFetchSuccess = (dataObject) =>{
    setDepartmentList(dataObject.data);
    setUserDepartmentList(dataObject.data);
    if(editData?.departmentId)
    {
      FetchSectionService({
        id: editData?.departmentId
      }, handleFetchSectionEdit, handleFetchSectionEditException);
      
      FetchUserNameService({
        id: editData?.departmentId
      },UserNameService,UserNameServiceExeption);

    } 
  }

  const UserNameService=(dataObject)=>{
    setUserNameList(dataObject.data);
  }
  const UserNameServiceExeption=(errorStaus, errorMessage)=> {
    console.log(errorMessage);

  }
  const  handleFetchSectionEdit=(dataObject)=>{
    setSectionList(dataObject.data);
    if(editData?.sectionsId)
    {
      FetchAssetTypeService({ id:editData?.sectionsId}, handleFetchAssetTypeSectionEdit, handleFetchAssetTypeSectionEditException)    
    }  
  }
 
  const handleFetchAssetTypeSectionEdit = (dataObject) => {
    setAssetTypeList(dataObject.data);
    if(editData?.assetTypesId)
    {
      FetchAssetNameService({ id:editData?.assetTypesId}, handleFetchAssetNameServiceEdit, handleFetchAssetNameServiceException)    
    }
  }
  const handleFetchAssetNameServiceEdit=(dataObject)=>{   
    setAssetNameList(dataObject.data);
  }
 
  const handleFetchAssetNameServiceException=(errorStaus, errorMessage)=> {
    console.log(errorMessage);
  }
 
  const handleFetchAssetTypeSectionEditException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const handleFetchSectionEditException=(errorStatus , errorMassege)=>{   
    console.log(errorMassege);
  }

  const handleFetchException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const handleEmployeeSuccess = (dataObject) =>{
    setEmployeeIdList(dataObject.data);
  }
  
  const handleEmployeeException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onUerDepartmentChange=(e)=>{
    setUserDepartment(e.target.value);
    FetchUserNameService({id:e.target.value},handleUserNameSuccess, handleUserNameException);
  }

  const handleUserNameSuccess =(dataObject)=>{
    setUserNameList(dataObject.data);
  }

  const handleUserNameException=(errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onDepartmentChange = (e) => {
    setDepartment(e.target.value);
    FetchSectionService({id:e.target.value},handleSectionServiceSuccess, handleSectionServiceException);
  }

  const handleSectionServiceSuccess = (dataObject) =>{
    setSectionList(dataObject.data);
  }
  
  const handleSectionServiceException= (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onSectionChange = (e) => {
    setSection(e.target.value);
    FetchAssetTypeService({id: e.target.value},handleFetchAssetTypeSuccess, handleFetchAssetTypeException);
  }
  
  const handleFetchAssetTypeSuccess = (dataObject) =>{
    setAssetTypeList(dataObject.data);  
  }
  
  const handleFetchAssetTypeException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }
  
  const onAssetTypeChange = (e) => {
    setAssetType(e.target.value);
    FetchAssetNameService({id: e.target.value},handleAssetNameSuccess, handleAssetNameAssetException);
  }

  const handleAssetNameSuccess = (dataObject) =>{
    setAssetNameList(dataObject.data);  
  }
  
  const handleAssetNameAssetException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onAssetNameChange= (e) => {
    setAssetName(e.target.value);
  }

  const onChangeRedio = (event) => {
    setuser(event.target.value);
  };
  const onChangeTemporary = (event) => {
    setTemporary(event.target.value);
  };

  const onEmployeeChange=(e)=>{
    setEmployeeId(e.target.value);
    FetchEmployeeNameService({id:e.target.value},handelEmployeeName,handelEmployeeNameException)
  }

  const handelEmployeeName=(dataObject)=>{
    setemployeeNamed(dataObject.empName);
  }

  const handelEmployeeNameException=(errorObject, errorMessage) =>{
    console.log(errorMessage);
  }

  const handleClose = () => {
    setOpen(false); 
    setDepartment('');
    setSection('');  
    setAssetType('');
    setAssetName('');
    setUserDepartment('');
    setEmployeeId('');
    setUserName('');
    setTempFromDate('');
    setTempToDate(''); 
    setemployeeNamed('');
  };
  
  const onChangeUserName=(e)=>{
    setemployeeNamed(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    isAdd === true ?
    (
      AlloctionAddService({
        department:department,
        section:section,
        assetType:assetType,
        assetName:assetName,
        userType:user,
        user:employeeName,
        empId:employeeId,
        empName:employeeName,
        userDepartment:userDepartment,
        position:temporary,
        fromDate:tempFromDate,
        toDate:tempToDate,
      },handleSuccess, handleException)
    ) : (
      UserUpdateService({
        id: editData.id,
        department:department,
        section:section,
        assetType:assetType,
        assetName:assetName,
        userType:user,
        user:employeeName,
        empId:employeeId,
        empName:employeeName,
        userDepartment:userDepartment,
        position:temporary,
        fromDate:tempFromDate,
        toDate:tempToDate,
      }, handleSuccess, handleException)
    );
  }
  
  const handleSuccess = (dataObject) =>{
    console.log(dataObject);
    setRefresh(oldValue => !oldValue);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setDepartment('');
    setSection('');  
    setAssetType('');
    setAssetName('');
    setUserDepartment('');
    setEmployeeId('');
    setUserName('');
    setTempFromDate('');
    setTempToDate('');
    setemployeeNamed('');
  }
  
  const handleException = (errorObject, errorMessage) =>{
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message:errorMessage,
    });
    setDepartment('');
    setSection('');  
    setAssetType('');
    setAssetName('');
    setUserDepartment('');
    setEmployeeId('');
    setUserName('');
    setTempFromDate('');
    setTempToDate('');
    setemployeeNamed('');
  }

  const onUserChange=(e)=>{
    setemployeeNamed(e.target.value);
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
    <div>
      <Dialog
      open={open}
      fullScreen>
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            {isAdd === true ? 'Add ' : 'Edit '}User
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>
                <Grid container spacing={2} style={{display:'box', }}> 
                <Grid container item xs={12} sm={12} md={5} lg={5} xl={5}  style={{display:'box',border:'solid',marginTop:'30px',marginBottom:'20px'}}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{alignSelf:'center', textAlign:'center'}} >
                  <h2 >ASSET</h2>
                  <hr/>
                  </Grid>
                  <Grid container>
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                      <label >Department : </label>
                    </Grid>
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}}  >
                      <FormControl fullWidth>
                        <InputLabel id="departmentlabel">Select Department</InputLabel>
                        <Select
                        label="Select Department"
                        value={department}
                        onChange={(e) => onDepartmentChange(e)}>
                          {
                            departmentList.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container style={{marginTop:'10px'}}>
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                      <label >Section : </label>
                    </Grid>
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                      <FormControl fullWidth>
                        <InputLabel id="sectionList">Select section</InputLabel>
                        <Select
                        labelId="sectionList"
                        id='section'
                        label="Select section"
                        value={section}
                        onChange={(e) => onSectionChange(e)}>
                          {
                            sectionList.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container style={{marginTop:'10px'}}>
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                      <label >Asset Type : </label>
                    </Grid>
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                      <FormControl fullWidth>
                        <InputLabel id="assetTypeList">Select Asset Type</InputLabel>
                        <Select
                        labelId="assetTypeList"
                        id='assetType'
                        label="Select Asset Type"
                        value={assetType}
                        onChange={(e) => onAssetTypeChange(e)}>
                          {
                            assetTypeList.map((data, index) => {
                              return (
                                <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container style={{marginTop:'10px'}}>
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                      <label >Asset Name:</label>
                    </Grid>
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center', marginBottom:'20px'}} >
                      <FormControl fullWidth>
                        <InputLabel >Select Asset Name</InputLabel>
                        <Select
                        label="Select Asset Name"
                        value={assetName}
                        onChange={(e) => onAssetNameChange(e)}>
                          {
                            assetNameList.map((data, index) => {
                              return (
                                <MenuItem value={data.id} key={index}>{data.assetName}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  </Grid>
                  <Grid container spacing={2} item xs={12} sm={9} md={4} lg={4} xl={4}  style={{display:'box',marginLeft:'10%',border:'solid',marginTop:'30px',marginBottom:'20px'}}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{alignSelf:'center', textAlign:'center'}} >
                      <h2 style={{marginLeft:'100px'}}>User</h2>
                      <hr/>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{alignSelf:'center', textAlign:'center'}} >
                        <FormControl>
                          <RadioGroup
                          row
                          onChange={onChangeRedio}
                          value={user}>
                            <FormControlLabel value="EmpId" control={<Radio />} label="Emp Id" />
                            <FormControlLabel value="Department" control={<Radio />} label="Department" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      {
                        user ==='EmpId' &&
                        <>
                          <Grid container spacing={2} style={{marginTop:'5px',marginLeft:'10px'}}>
                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                              <label >Emp Id: </label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                            <FormControl fullWidth>
                              <InputLabel id="departmentlabel">Select Employee Id</InputLabel>
                              <Select
                              labelId="departmentlabel"
                              id='department'
                              label="Select Employee Id"
                              value={employeeId}
                              onChange={(e) => onEmployeeChange(e)}>
                                {
                                  employeeIdList?.map((data, index) => {
                                    return (
                                      <MenuItem value={data.employee_id} key={index}>{data.employee_id}</MenuItem>
                                    )
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Grid container style={{marginTop:'5px',marginLeft:'10px'}}>
                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                              <label >Emp Name: </label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center',marginLeft:'10px'}}  >
                              <TextField
                              fullWidth
                              label='Emp Name'
                              variant="outlined" 
                              value={employeeName}/>
                            </Grid>
                          </Grid>
                        </>
                      }
                      {
                        user !=='EmpId' &&
                        <>
                          <Grid container style={{marginTop:'5px',marginLeft:'10px'}}>
                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                              <label >Department: </label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                              <FormControl fullWidth>
                                <InputLabel id="departmentlabel">Select Department</InputLabel>
                                <Select
                                labelId="departmentlabel"
                                id='department'
                                label="Select Department"
                                value={userDepartment}
                                onChange={(e) => onUerDepartmentChange(e)}>
                                  {
                                    userDepartmentList.map((data, index) => {
                                      return (
                                        <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                                      )
                                    })
                                  }
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Grid container style={{marginTop:'10px',marginLeft:'10px'}}>
                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}}  >
                              <label >Uesr: </label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                              <FormControl fullWidth>
                                <InputLabel id="departmentlabel">Select User</InputLabel>
                                <Select
                                labelId="departmentlabel"
                                id='department'
                                label="Select user"
                                value={employeeName}
                                onChange={(e) => onUserChange(e)}>
                                  {
                                    userNameList.map((data, index) => {
                                      return (
                                        <MenuItem value={data.user_name} key={index}>{data.user_name}</MenuItem>
                                      )
                                    })
                                  }
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </>
                     }
                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{alignSelf:'center', textAlign:'center'}} >
                      <FormControl>
                        <RadioGroup
                        row   
                        onChange={onChangeTemporary}
                        value={temporary}>
                          <FormControlLabel value="temporary" control={<Radio />} label="Temporary" />
                          <FormControlLabel value="permanent" control={<Radio />} label="Permanent" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {
                      temporary === 'temporary' &&
                      <>
                        <Grid container style={{marginTop:'10px',marginLeft:'10px'}}>
                          <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                            <label >From:</label>
                          </Grid>
                          <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}} >
                            <TextField 
                            fullWidth
                            id="outlined-basic"  
                            type='date' 
                            variant="outlined" 
                            value={tempFromDate}
                            onChange={(e)=>setTempFromDate(e.target.value)}/>
                          </Grid>
                        </Grid>
                        <Grid container style={{marginTop:'10px',marginLeft:'10px',marginBottom:'20px'}}>
                          <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center'}}>
                            <label >to:</label>
                          </Grid> 
                          <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{alignSelf:'center', textAlign:'center',marginBotton:'20px'}} >
                            <TextField fullWidth 
                            id="outlined-basic"  
                            type='date' 
                            variant="outlined" 
                            value={tempToDate}
                            onChange={(e)=>setTempToDate(e.target.value)}/>
                          </Grid>
                        </Grid>
                      </>
                    }
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='addbutton'>
              <Button type='reset' onClick={handleClose}>Cancel</Button>
              <Button type='submit'>
                {isAdd === true ? 'Allocate' : 'Update Allocate'}
              </Button>
            </div>
            <NotificationBar
            handleClose={handleCloseNotify}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}/>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default AllocationModel
