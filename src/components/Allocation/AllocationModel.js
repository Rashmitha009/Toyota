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
import {  UserUpdateService,FetchDepaertmentService,FetchAuditAssetTypeService, FetchSectionService, FetchAssetTypeService, FetchAssetNameService, AlloctionAddService, FetchEmployeeIdService, FetchEmployeeNameService, FetchUserNameService, FetcUnitShowData, FetcLineShowData, FetchUserDepartmentService, ControlDepartmentShow, FetcSectionShowData } from '../../services/ApiServices';
import { Grid } from '@mui/material';

const AllocationModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setemployeeNamed] = useState('');
  const [employeeIdList,setEmployeeIdList] = useState([]);
  const [userName, setUserName] = useState('');
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

  const [unit,setUnit]=useState('');
  const [unitList,setUnitList]=useState([]);
  const [line,setLine]=useState('');
  const [lineList,setLineList]=useState([]);
  const [assetNo,setAssetNo]=useState('');
  const [yearOfMgf,setYearOfMgf]=useState('');
  const [countryOfMgf,setCountryOfMgf]=useState('');
  const [yearofInstall,setYearofInstall]=useState('');
  const [usageCode,setUsageCode]=useState('');
  const [assetWeight,setAssetWeight]=useState('');
  const [controlDept,setControlDept]=useState('');
  const [controlDeptList,setControlDeptList]=useState([]);
  const [userDep,setUserDep]=useState('');
  const [userDepList,setUserDepList]=useState([]);
  const [section,setSection]=useState('');
  const [sectionList,setSectionList]=useState([]);
  const [activeInactive,setActiveInactive]=useState('');
  const [assetMfgSlNo,setAssetMfgSlNo]=useState('');
  const [useNew,setUseNew]=useState('');
  const [userDepartment,setUserDepartment]=useState();
  const [assetImg,setAssetImg] =useState('');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  
  useEffect(() => {
    FetcUnitShowData(handleFetchSuccess, handleFetchException);
    FetchUserDepartmentService(handleUserDepartment,handleUserDepartmentException);
    ControlDepartmentShow(handleControlDepartment,handleControlDepartmentExeption);
    FetcSectionShowData(handleSectionShow,handleSectionException);
    setAssetNo(editData?.assetNo || '');
    setUnit(editData?.unitPlantId || '');
    setLine(editData?.line || '');
  }, [editData]);
  
  const handleFetchSuccess = (dataObject) =>{
    setUnitList(dataObject.data);
  
    if(editData?.unitPlantId)
    {
      FetcLineShowData({
        id: editData?.unitPlantId
      }, handleLineSuccess, handleLineException);
      
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

  const handleUserDepartment=(dataObject)=>{
      setUserDepList(dataObject.data);
  }
  const handleUserDepartmentException=(errorStaus, errorMessage)=> {
    console.log(errorMessage);

  }

const handleSectionShow=(dataObject)=>{
  console.log("test")
  setSectionList(dataObject?.data);
}

const handleSectionException=(errorStaus, errorMessage)=> {
  console.log(errorMessage);

}
  const handleControlDepartment=(dataObject)=>{
    setControlDeptList(dataObject.data);
  }
const handleControlDepartmentExeption=(errorStaus, errorMessage)=> {
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

  const onUnitChange = (e) => {
    setUnit(e.target.value);
    FetcLineShowData({id:e.target.value},handleLineSuccess, handleLineException);
  }

  const handleLineSuccess = (dataObject) =>{
    setLineList(dataObject.data);
  }
  
  const handleLineException= (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onLineChange = (e) => {
    setLine(e.target.value);
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

  const onControlChange=(e)=>{

    setControlDept(e.target.value);
    
  }

  const handleClose = () => {
    setOpen(false); 
 
    setYearOfMgf('');
    setCountryOfMgf('');
    setYearofInstall('');
    setUsageCode('');
    setAssetWeight('');
    setControlDept('');
    setUserDep('');
    setSection('');
    setActiveInactive('');
    setAssetMfgSlNo('');
    setUseNew('');
    setUserDepartment('');
    setAssetImg('');
  };
  
  const onChangeUserName=(e)=>{
    setemployeeNamed(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    isAdd === true ?
    (
      AlloctionAddService({
        id: assetNo,
        unitPlant:unit,
        line:line,
        assetNo:assetNo,
        yearOfMfg:yearOfMgf,
        countryOfMfg:countryOfMgf,
        yearOfInstallTKAP:yearofInstall,
        usedOrNew:useNew,
        usagecode:usageCode,
        assetWeight:assetWeight,
        controlDepartment:controlDept,
        userDepartment:userDep,
        section:section,
        assetImage:assetImg,
        mfgSlNo:assetMfgSlNo,
        status:activeInactive,

      },handleSuccess, handleException)
    ) : (
      AlloctionAddService({
        id: editData?.id,
        unitPlant:unit,
        line:line,
        assetNo:assetNo,
        yearOfMfg:yearOfMgf,
        countryOfMfg:countryOfMgf,
        yearOfInstallTKAP:yearofInstall,
        usedOrNew:useNew,
        usagecode:usageCode,
        assetWeight:assetWeight,
        controlDepartment:controlDept,
        userDepartment:userDep,
        section:section,
        assetImage:assetImg,
        mfgSlNo:assetMfgSlNo,
        status:activeInactive,
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
  setYearOfMgf('');
  setCountryOfMgf('');
  setYearofInstall('');
  setUsageCode('');
  setAssetWeight('');
  setControlDept('');
  setUserDep('');
  setSection('');
  setActiveInactive('');
  setAssetMfgSlNo('');
  setUseNew('');
  setUserDepartment('');
  setAssetImg('');

  }
  
  const handleException = (errorObject, errorMessage) =>{
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message:errorMessage,
    });

      setYearOfMgf('');
      setCountryOfMgf('');
      setYearofInstall('');
      setUsageCode('');
      setAssetWeight('');
      setControlDept('');
      setUserDep('');
      setSection('');
      setActiveInactive('');
      setAssetMfgSlNo('');
      setUseNew('');
      setUserDepartment('');
      setAssetImg('');
  }

  const onUserChange=(e)=>{
    setemployeeNamed(e.target.value);
  }
  
  const handleCloseNotify = () => {
    // setOpen(false)
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  }; 

  const onUseNewChange=(e)=>{
    setUseNew(e.target.value);
  }
 const onSectionChange=(e)=>{
  setSection(e.target.value);
 }
 const onUserDpChange=(e)=>{
  setUserDep(e.target.value);
 }
  return (
    <div>
      <Dialog
      open={open}
      maxWidth>
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            {isAdd === true ? 'Add ' : 'Edit '}Allocation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>
              <Grid container spacing={2} style={{marginTop:'20px'}} >
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4} >
                          <FormControl fullWidth>
                            <InputLabel id="departmentlabel">Select Unit</InputLabel>
                            <Select
                            label="Select Unit"
                            value={unit}
                            onChange={(e) => onUnitChange(e)}>
                              {
                                unitList.map((data, index) => {
                                return (
                                  <MenuItem value={data.unitPlantId} key={index}>{data.unitPlant}</MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4} >
                          <FormControl fullWidth>
                            <InputLabel id="departmentlabel">Select Line</InputLabel>
                            <Select
                            label="Select Line"
                            value={line}
                            onChange={(e) => onLineChange(e)}>
                              {
                                lineList.map((data, index) => {
                                return (
                                  <MenuItem value={data.lineId} key={index}>{data.lineName}</MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                      <TextField
                      fullWidth
                      label='Asset No'
                      placeholder='Asset No'
                      variant="outlined" 
                      value={assetNo}
                      // onChange={(e)=>{setAssetNo(e.target.value)}}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                      <TextField
                      fullWidth
                      label=' YEAR OF MFG'
                      placeholder='YEAR OF MFG'
                      variant="outlined" 
                      type='number'
                      value={yearOfMgf}
                      onChange={(e)=>{setYearOfMgf(e.target.value)}}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                      <TextField
                      fullWidth
                      label=' COUNTRY OF MFG'
                      placeholder='COUNTRY OF MFG'
                      variant="outlined" 
                      value={countryOfMgf}
                      onChange={(e)=>{setCountryOfMgf(e.target.value)}}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                      <TextField
                      fullWidth
                      label=' YEAR OF INSTALL AT TKAP'
                      placeholder='YEAR OF INSTALL AT TKAP'
                      variant="outlined" 
                      type='number'
                      value={yearofInstall}
                      onChange={(e)=>{setYearofInstall(e.target.value)}}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                      <InputLabel id="departmentlabel">Used/New</InputLabel>
                        <Select
                          label="Used/New"
                            value={useNew}
                            onChange={(e) => onUseNewChange(e)}
                          
                          >
                            <MenuItem value={'Used'}>Used</MenuItem>
                            <MenuItem value={'New'}>New</MenuItem>
                        </Select>
                  </FormControl>
                             
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        label=' 	USAGE CODE'
                        placeholder='	USAGE CODE'
                        variant="outlined" 
                        value={usageCode}
                        onChange={(e)=>{setUsageCode(e.target.value)}}
                      />
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                      <TextField
                      fullWidth
                      label='Asset Weight'
                      placeholder='Asset Weight'
                      variant="outlined" 
                      value={assetWeight}
                      onChange={(e)=>{setAssetWeight(e.target.value)}}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                        <InputLabel id="	Controling Dept">	Select Controling Department</InputLabel>
                          <Select
                            label="Select Controling Department"
                            value={controlDept}
                            onChange={(e) => onControlChange(e)}>
                              {
                                controlDeptList?.map((data, index) => {
                                  return (
                                    <MenuItem value={data.id} key={index}>{data.controlDepartment}</MenuItem>
                              )
                            })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                        <InputLabel id="	Controling Dept">	Select User Department</InputLabel>
                          <Select
                            labelId="UserDept"
                            id='department'
                            label="Select User Department"
                            value={userDep}
                              onChange={(e) => onUserDpChange(e)}>
                              {
                              userDepList?.map((data, index) => {
                              return (
                                <MenuItem value={data.id} key={index}>{data.userDepartment}</MenuItem>
                              )
                            })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                        <InputLabel id="	Controling Dept">	Select Section</InputLabel>
                          <Select
                            labelId="Select Section"
                            id='Select Section'
                            label="Select Section"
                            value={section}
                            onChange={(e) => onSectionChange(e)}>
                              {
                              sectionList?.map((data, index) => {
                              return (
                                <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                              )
                            })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                  <TextField
                      fullWidth
                      label="Asset Image"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setAssetImg(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                      type="file"
                  />
                  </Grid>
                  <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                    <FormControl>
                    
                          <RadioGroup
                            row
                            value={activeInactive}
                            onChange={(e)=>{setActiveInactive(e.target.value)}}
                          >
                            <FormControlLabel value="Active" control={<Radio />} label="Active" />
                            <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                          
                          </RadioGroup>
                    </FormControl>
                  </Grid>
                   <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                      <TextField
                      fullWidth
                      label='Asset Mfg.Sl.No'
                      placeholder='Asset Mfg.Sl.No'
                      variant="outlined" 
                      value={assetMfgSlNo}
                      onChange={(e)=>{setAssetMfgSlNo(e.target.value)}}
                    />
                  </Grid>
                  {/* <Grid container  item xs={10} sm={10} md={5} lg={5} xl={5}
                    style={{border:'solid',borderColor:'whitesmoke',marginTop:'20px',marginLeft:'70px'}}
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{alignSelf:'center', textAlign:'center'}}
                        >
                        <h3>User</h3>
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
                          <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                              <label >Emp Id: </label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px'}}
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
                          <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                              <label >Emp Name: </label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px'}}
                            >
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
                          <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                              <label >Department: </label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px'}}
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
                                    })
                                  }
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                              <label >User: </label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px'}}
                            >
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
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                            <label >From:</label>
                          </Grid>
                          <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px',marginBotton:'10px'}}
                            >
                            <TextField 
                            fullWidth
                            id="outlined-basic"  
                            type='date' 
                            variant="outlined" 
                            value={tempFromDate}
                            onChange={(e)=>setTempFromDate(e.target.value)}/>
                          </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                            <label >To:</label>
                          </Grid> 
                          <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px',marginBotton:'10px'}}
                            >
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
                  </Grid> */}
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='addbutton'>
              <Button type='reset' onClick={handleClose}>Cancel</Button>
              <Button type='submit'>
                {isAdd === true ? 'Allocate' : 'Add Allocate'}
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
