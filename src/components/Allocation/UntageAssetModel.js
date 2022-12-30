import React, { useEffect, useState } from 'react'
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
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { UserAddService, UserUpdateService,FetchDepaertmentService, FetchAssetNameService, FetchAssetTypeService, FetchSectionService, AlloctionUntageUpdate, UntagAssetService, FetchEmployeeNameService, FetchEmployeeIdService, FetchUserNameService } from '../../services/ApiServices';
import { Grid } from '@mui/material';
import { SentimentVerySatisfiedOutlined } from '@mui/icons-material';
import NotificationBar from '../../services/NotificationBar';

const UntageAssetModel = ({  open, setOpen, isAdd, editData, setRefresh  }) => {
    const [departmentList, setDepartmentList] = useState([])
    const [department, setDepartment] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [employeeName, setemployeeNamed] = useState('')
    const [designation, setdesignation] = useState('')
    const [mobile_number, setmobile_number] = useState('')
    const [emailId, setemailId] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setpassword] = useState('')
    const [ assetNameList, setAssetNameList]=useState([]);
    const [assetName,setAssetName]=useState('');
    const [section, setSection]=useState('');
    const [sectionList,setSectionList]=useState([]);
    const [assetType,setAssetType]=useState('');
    const [assetTypeList,setAssetTypeList]=useState([]);
    const [reason,setReason]=useState('');
    const [tag , setTag]=useState('');
    const [user, setUser]=useState('EmpId');
    const [userDepartment,setUserDepartment]=useState('');
    const [userDepartmentList, setUserDepartmentList]=useState([]);
    const [ userNameList,   setUserNameList]=useState([]);
    const [employeeIdList,setEmployeeIdList]=useState([]);
    
    const [openNotification, setNotification] = useState({
      status: false,
      type: 'error',
      message: '',
  });
  
  
    useEffect(() => {
      FetchDepaertmentService(handleFetchSuccess, handleFetchException);
      FetchEmployeeIdService(handleEmployeeSuccess, handleEmployeeException);
      setDepartment(editData?.departmentId|| '');
      setSection(editData?.sectionsId || '');
      setAssetType(editData?.assetTypesId || '');
      setAssetName(editData?.assetNameId  || '');
      setReason(editData?.reasonForUntag || '');
      
    }, [editData]);

    const handleEmployeeSuccess = (dataObject) =>{
      setEmployeeIdList(dataObject.data);
  
    }
    
    const handleEmployeeException = (errorStaus, errorMessage) =>{
      console.log(errorMessage);
    }
    const handleFetchSuccess = (dataObject) =>{
      setDepartmentList(dataObject.data);
      setUserDepartmentList(dataObject.data);
      if(editData?.departmentId){
        FetchSectionService({id:editData?.departmentId},handleSectionServiceSuccess, handleSectionServiceException);
      }
      
    }
    const handleFetchException = (errorStaus, errorMessage) =>{
      console.log(errorMessage);
    }
  
    const onDepartmentChange = (e) => {
      setDepartment(e.target.value);
      FetchSectionService({id:e.target.value},handleSectionServiceSuccess, handleSectionServiceException);
    }
  
    const handleSectionServiceSuccess = (dataObject) =>{
      setSectionList(dataObject.data);
      if(editData?.sectionsId ){
        FetchAssetTypeService({id: editData?.sectionsId},handleFetchAssetTypeSuccess, handleFetchAssetTypeException);
      }
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
        if(editData?.assetTypesId ){
          FetchAssetNameService({id: editData?.assetTypesId },handleAssetNameSuccess, handleAssetNameAssetException);
        }
       
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
        console.log("data"+e.target.value);
      }
 
    const handleClose = () => {
        setOpen(false);
    };
const onSubmit =(e)=>{
    e.preventDefault();
    isAdd === true ?
    (
      
      UntagAssetService({
        id:assetName, 
        department:department, 
        section:section,
        assetType:assetType,
        assetName:assetName,  
        reasonForUntag:reason,
        tag:tag,
    },handleUntagAssetService, handleUntagAssetExecption)
  
    ) : (
      AlloctionUntageUpdate({
        id:editData?.id,    
        department:department, 
        section:section,
        assetType:assetType,
        assetName:assetName,  
        reasonForUntag:reason,
        tag:tag,
      }, handleUntagAssetService, handleUntagAssetExecption)
    );
    
}
const handleUntagAssetService=(dataObject)=>{
    console.log(dataObject);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setDepartment('');
    setSection('');
    setAssetType('');
    setAssetName('');
    setReason('');
    
}
const handleUntagAssetExecption=(errorObject, errorMessage)=>{
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setDepartment('');
    setSection('');
    setAssetType('');
    setAssetName('');
    setReason('');

}
const handleCloseNotify = () => {
  setOpen(false);
  setNotification({
    status: false,
    type: '',
    message: '',
  });
};
 const onCancel=()=>{
  setOpen(false);
  setDepartment('');
  setSection('');
  setAssetType('');
  setAssetName('');
  setReason('');
 }
 const onChangeRedio = (event) => {
  setUser(event.target.value);
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

const  onUerChange = (e)=>
{
  setUserName(e.target.value);
}
return (
      <div>
      <Dialog 
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
            {"UNTAG ASSET"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <form onSubmit={onSubmit}>
                    <Grid container style={{marginTop:'10px'}}>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={6}>
                        <label>Department:</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="departmentlabel">Select Department</InputLabel>
                        <Select
                        labelId="departmentlabel"
                        id='department'
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
                    </Box>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop:'10px'}}>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={6}>
                        <label>Section : </label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="sectionList">Select section</InputLabel>
                        <Select
                        labelId="sectionList"
                        id='section'
                        label="Select section"
                        value={section}
                        onChange={(e) => onSectionChange(e)}>
                          { sectionList.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop:'10px'}}>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={6}>
                        <label>Asset Type :</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="assetTypeList">Select Asset Type</InputLabel>
                        <Select
                        labelId="assetTypeList"
                        id='assetType'
                        label="Select Asset Type"
                        value={assetType}
                        onChange={(e) => onAssetTypeChange(e)}>
                          {assetTypeList.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                        </Grid>
                        

                    </Grid>
                    <Grid container style={{marginTop:'10px'}}>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={6}>
                        <label>Asset Name : </label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="assetTypeList">Select Asset Name</InputLabel>
                        <Select
                        labelId="assetTypeList"
                        id='assetType'
                        label="Select Asset Name"
                        value={assetName}
                        onChange={(e) => onAssetNameChange(e)}>
                          {
                            assetNameList.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.assetName}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop:'10px'}}>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={6}>
                        <label>Reason For Untag:</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Reson</InputLabel>
                                <Select 
                                value={reason}
                                label="Select Reson"
                                onChange={(e)=>setReason(e.target.value)}>
                                    <MenuItem value="Scrap">Scrap</MenuItem>
                                    <MenuItem value="Defect">Defect</MenuItem>
                                    <MenuItem value="Stolen">Stolen</MenuItem>
                                    <MenuItem value="Sale">Sale</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop:'10px'}}>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={6}>
                        <label>Tag : </label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <FormControl >
                            <RadioGroup 
                            row
                            value={tag}
                            onChange={(e)=>setTag(e.target.value)}
                            >
                                <FormControlLabel style={{marginLeft:'20px'}} value="Block" control={<Radio />} label="Block" />
                                <FormControlLabel style={{marginLeft:'20px'}} value="Reuse" control={<Radio />} label="Reuse" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                    </Grid>
                    {
                      isAdd !== true &&
                      <>
                        <Grid container>
                          <Grid item xs={10} sm={10} md={10} lg={10} xl={10}
                            style={{alignSelf:'center', textAlign:'center'}}
                          >
                          <h3>User</h3>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid
                            item xs={10} sm={10} md={10} lg={10} xl={10}
                            style={{alignSelf:'center', textAlign:'center'}}
                          >
                            <FormControl>
                              <RadioGroup
                                row
                                onChange={onChangeRedio}
                                value={user}
                              >
                                <FormControlLabel value="EmpId" control={<Radio />} label="Emp Id" />
                                <FormControlLabel value="Department" control={<Radio />} label="Department" />
                            </RadioGroup>
                            </FormControl>
                          </Grid>
                          {
                              user ==='EmpId' &&
                              <>
                                  <Grid container style={{marginTop:'5px'}}>
                              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                              style={{alignSelf:'center', textAlign:'center'}}
                              >
                                <label >Emp Id: </label>
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                              style={{alignSelf:'center', textAlign:'center'}}
                              >
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
                              <Grid container style={{marginTop:'5px'}}>
                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                                style={{alignSelf:'center', textAlign:'center'}}
                                >
                              <label >Emp Name: </label>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                                style={{alignSelf:'center', textAlign:'center'}}
                                >
                                  <TextField 
                                  fullWidth
                                        variant="outlined" 
                                        value={employeeName}
                                  />
                                </Grid>
                                </Grid>

                              </>
                          }{
                            user !=='EmpId' &&
                            <>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                                style={{alignSelf:'center', textAlign:'center'}}
                                >
                                <label >Department: </label>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                            style={{alignSelf:'center', textAlign:'center'}}
                            >
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
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                            
                        <Grid container style={{marginTop:'10px'}}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                        style={{alignSelf:'center', textAlign:'center'}}
                        >
                        <label >Uesr: </label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                        style={{alignSelf:'center', textAlign:'center'}}
                        >
                          <FormControl fullWidth>
                            <InputLabel id="departmentlabel">Select User</InputLabel>
                            <Select
                            labelId="departmentlabel"
                            id='department'
                            label="Select user"
                            value={userName}
                            onChange={(e) => onUerChange(e)}>
                              {
                                  userNameList.map((data, index) => {
                                  return (
                                    <MenuItem value={data.id} key={index}>{data.user_name}</MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        </Grid>


                            </>
                          }
                        </Grid>
                      </>
                    }
                    <div style={{marginLeft:'10%'}}>
                        <Button style={{marginLeft:'60px', marginTop:'10px'}} type='submit' variant="contained">Untag</Button>
                        <Button style={{marginLeft:'60px', marginTop:'10px'}} onClick={onCancel} variant="contained">Cancel</Button>
                    </div>
                </form>
            </DialogContentText>
        </DialogContent>
      </Dialog> 
      <NotificationBar
          handleClose={handleCloseNotify}
          notificationContent={openNotification.message}
          openNotification={openNotification.status}
          type={openNotification.type}
      /> 
      </div>
  )
}

export default UntageAssetModel
