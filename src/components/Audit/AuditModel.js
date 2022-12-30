import React, {useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import { Grid } from '@mui/material';
import NotificationBar from '../../services/NotificationBar';
import {
  FetchDepaertmentService,
  FetchSectionService,
  FetchAssetTypeService,
  AuditAddService, 
  AuditUpdateService 
} from '../../services/ApiServices';

const AuditModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [auditdate,setAuditDate] = useState('');
  const [departmentList, setDepartmentList] =useState([]);
  const [department, setDepartment]=useState('');
  const [sectionList, setSectioonList]=useState([]);
  const [section, setSection]=useState('');
  const [assetTypeList, setAssetTypeList]=useState([]);
  const [assetType, setAssetType]=useState('');
  const [auditName,setAuditName]=useState('');
  const [auditDate, setauditDate] = useState('');
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  
  const handleClose = () => {
    setOpen(false);
  };
  
   
  useEffect(() => {
    FetchDepaertmentService(handleFetchSuccess, handleFetchException);
    setAuditDate(editData?.auditDate || '');
    setDepartment(editData?.departmentId || '');
    setSection(editData?.sectionsId || '' );
    setAssetType(editData?.assetTypesId|| '');
    setAuditName(editData?.auditName || '');
    setauditDate(editData?.auditDate || '');
  }, [editData]);

  const handleFetchSuccess = (dataObject) =>{
    setDepartmentList(dataObject.data);
      if(editData?.departmentId){
        FetchSectionService({
          id:editData?.departmentId
        },handleFetchSectionSuccess, handleFetchSectionException);
      }
  }

  const handleChangeauditDate = (e) => {
    setauditDate(e.target.value);
    console.log(e.target.value);
  };

  const handleFetchException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onDepartmentChange = (e,) => {
    setDepartment(e.target.value);
    FetchSectionService({
      id: e.target.value
    },handleFetchSectionSuccess, handleFetchSectionException);
  }

  const handleFetchSectionSuccess = (dataObject) =>{
    setSectioonList(dataObject.data);
    if(editData?.sectionsId ){
      FetchAssetTypeService({id: editData?.sectionsId},handleFetchAssetTypeSuccess, handleFetchAssetTypeException);
    }
  }
   

  const handleFetchSectionException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onSectionChange = (e) => {
    setSection(e.target.value);
    FetchAssetTypeService({id: e.target.value},handleFetchAssetTypeSuccess, handleFetchAssetTypeException);
  }

  const handleFetchAssetTypeSuccess = (dataObject) =>{
    setAssetTypeList(dataObject.data);
    console.log(dataObject.data);  
  }

  const handleFetchAssetTypeException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onAssetTypeChange = (e) => {
    setAssetType(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    isAdd === true ?
    (
      AuditAddService({
        auditDate:auditDate,
        department:department,
        section:section,
        assetType:assetType,
        auditName:auditName,
      },handleSuccess, handleException)
    ) : (
      AuditUpdateService({
        id: editData.id,
        auditDate:auditDate,
        department:department,
        section:section,
        assetType:assetType,
        auditName:auditName,
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
  }

  const handleException = (errorObject, errorMessage) =>{
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
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
      onClose={handleClose}
      maxWidth='lg'>
        <form onSubmit={onSubmit}>
          <DialogTitle style={{background:'whitesmoke'}}>
            {"AUDIT ASSETS"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form>
                <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>Audit Date : </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <TextField
                    style={{width:'200px'}}
                    id="Vendor-Address"
                    variant="outlined"
                    type='date'
                    value={auditDate}
                    onChange={(e) => { handleChangeauditDate(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>Department : </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl style={{width:'200px'}}>
                        <InputLabel id="departmentlabel">Select Department</InputLabel>
                        <Select
                        label="Select Department"
                        onChange={(e) => onDepartmentChange(e)}
                        value={department}
                        >
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
                <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>Section : </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl style={{width:'200px'}}>
                        <InputLabel id="sectionList">Select section</InputLabel>
                        <Select
                        value={section}
                        label="Select section"
                        onChange={(e) => onSectionChange(e)}>
                        {sectionList.map((data, index) => {
                          return (
                            <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>Asset Type : </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl style={{width:'200px'}}>
                      <InputLabel id="assetTypeList">Select Asset Type</InputLabel>
                      <Select
                      value={assetType}
                      label="Select Asset Type"
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
                  <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}} >
                      <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label style={{marginLeft:'25px'}}>Audit Name:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}xl={4}>
                    <TextField 
                  style={{width:'200px'}}
                  label="Audit Name" 
                  variant="outlined" 
                  value={auditName}
                  onChange={(e)=>{setAuditName(e.target.value) }} />
                    </Grid>
                    </Grid>
              </form>                     
              
                              
               </DialogContentText>
               </DialogContent>
               <DialogActions>
               <div style={{marginLeft:'20px' , marginTop:'20px'}}>
                  <Button type='reset' onClick={handleClose}>Cancel</Button>
                  <Button type='submit'>
                    {isAdd === true ? 'Add' : 'Update'}
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

export default AuditModel;