import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import {
  FetchDepaertmentService,
  FetchSectionService,
  FetchAssetTypeService,
  AMCServiceDueListService
} from '../../services/ApiServices';

const AmcServiceDueList = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [department, setDepartment] = useState();
  const [section, setSection] = useState();
  const [sectionList, setSectionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [assetType, setAssetType] = useState();
  const [assetList, setAssetList]= useState([]);
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [serviceDue,setserviceDue] = useState([]);
  const [periodFrom, setperiodFrom] = useState('');
  const [periodTo, setperiodTo] = useState('');
  const [rows, setRows] = useState([]);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  
  const handleChangeperiodFrom = (e) => {
    setperiodFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeperiodTo = (e) => {
    setperiodTo(e.target.value);
    console.log(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    AMCServiceDueListService({}, )
  }, []);
  useEffect(() => {
    FetchDepaertmentService(handleFetchSuccess, handleFetchException);
  }, [editData]);

  const handleFetchSuccess = (dataObject) =>{
    setDepartmentList(dataObject.data);
  }

  const handleFetchException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onDepartmentChange = (e) => {
    setDepartment(e.target.value);
    FetchSectionService ({
      id: e.target.value
    },handleFetchDepartmentSuccess, handleFetchDepartmentException);
  }

  const handleFetchDepartmentSuccess = (dataObject) =>{
    setSectionList(dataObject.data);
  }
  
  const handleFetchDepartmentException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const onSectionChange = (e) => {
    setSection(e.target.value);
    FetchAssetTypeService({
      id: e.target.value
    }, handleFetchAssetTypeServiceSuccess, handleFetchAssetTypeServiceException);
  }

  const handleFetchAssetTypeServiceSuccess = (dataObject) => {
    setAssetList(dataObject.data);
   
  }
  
  const handleFetchAssetTypeServiceException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    AMCServiceDueListService({ 
      id:assetType ,
      periodFrom:periodFrom,
      periodTo:periodTo,
    },handleAMCServiceDueList, handleAMCServiceDueListException)    
  }

  const handleAMCServiceDueList = (dataObject) => {
    setserviceDue(dataObject.data);
    setRows(dataObject.data);
    console.log(dataObject.data);
  }

  const handleAMCServiceDueListException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
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

  const onAssetTypeChange = (e) => {
    setAssetType(e.target.value);
  }
 
  const columns = [
    { field: 'vendorName', headerName: 'Vendor Name', width: 300 },
    { field: 'assetName', headerName: 'Asset Name', width: 300 },
    { field: 'serviceDueDate', headerName: 'Service Due Date', width: 300 },
    
  ];
  
  return (
    <form >
      <div style={{marginTop:'20px'}}>
        <Grid container spacing={2} style={{ marginTop: '10px', marginRight:'30px'}}>
          <Grid xs={12} sm={2.5} md={6} lg={3} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label > AmcService Date From :</label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <TextField
            fullWidth
            id="Vendor-Address"
            variant="outlined"
            type='date'
            value={periodFrom}
            onChange={(e) => { handleChangeperiodFrom(e) }}/>
          </Grid>
          <Grid item xs={12} sm={6} md={1} lg={1} xl={1}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label > To:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <TextField
            fullWidth 
            id="Vendor-Address" 
            variant="outlined" 
            type='date'
            value={periodTo}
            onChange={(e) => { handleChangeperiodTo(e) }}/>
          </Grid>
        </Grid>
        <Grid  container spacing={2} style={{ marginTop: '10px'}}>
          <Grid xs={12} sm={2.5} md={6} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Department:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={2} xl={2} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label=""
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
          <Grid item xs={12} sm={6} md={6} lg={1} xl={1}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Section:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label=""
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
          <Grid item xs={12} sm={6} md={2} lg={2} xl={1}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Asset Type:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"    
                label=""
                onChange={(e) => onAssetTypeChange(e)}>
                  {assetList.map((data, index) => {
                    return (
                      <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={1} xl={1} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <Button  type='submit' variant="contained" onClick={onSubmit}>View</Button>
          </Grid> 
        </Grid>
        <Grid  container spacing={2} style={{ marginTop: '10px'}}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
          style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <h3 >INSPECTION DUE DATE</h3>
            </Grid>
          </Grid>
          <hr/>
          <Grid  container spacing={2} style={{ marginTop: '10px'}}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
            style={{ height: '200px',  marginTop: '20px' }}>
              <DataGrid
              rows={rows}
              columns={columns}/>
          </Grid>
        </Grid>
        <Button style={{marginLeft:'50px', marginBottom:'30px',marginTop:'20px'}} variant="contained">Export</Button>
      </div>
    </form>   
  )
}

export default AmcServiceDueList;
