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
  InsuranceDueListService
} from '../../../services/ApiServices';

const InsuranceDueList = ({ open, setOpen, isAdd, editData, setRefresh }) => {
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
    InsuranceDueListService({}, )
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
    InsuranceDueListService({ 
      periodFrom:periodFrom,
      periodTo:periodTo,
    },handleAMCServiceDueList, handleAMCServiceDueListException)    
  }

  const handleAMCServiceDueList = (dataObject) => {
  
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
    { field: 'vendorName', headerName: 'Vendor Name', width: 200 },
    { field: 'insuranceDate', headerName: 'Insurance Date', width: 180 },
    { field: 'assetName', headerName: 'Asset Name', width: 200 },
    
    
  ];
  
  return (
    <form >
      <div style={{marginTop:'20px'}}>
        <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
          <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label >Insurance Date From : </label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
            <TextField
            fullWidth
            id="Vendor-Address"
            variant="outlined"
            type='date'
            value={periodFrom}
            onChange={(e) => { handleChangeperiodFrom(e) }}/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label > To </label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
            <TextField
            fullWidth 
            id="Vendor-Address" 
            variant="outlined" 
            type='date'
            value={periodTo}
            onChange={(e) => { handleChangeperiodTo(e) }}/>
          </Grid>
        </Grid>
        <Grid  container spacing={2} style={{ marginTop: '20px'}}>
          <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Department:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
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
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Section:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
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
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Asset Type</label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
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
        </Grid>
        <Button style={{marginLeft:'50px', marginBottom:'30px',marginTop:'20px'}} type='submit' variant="contained" onClick={onSubmit}>View</Button>
      </div>
      <form style={{border:'solid ' ,borderColor:'whitesmoke'}}>
        <div>
          <h3 style={{marginLeft:'30px'}}>INSURANCE DUE DATE</h3>
        </div>
        <hr/>
        <div style={{ height: '200px', width: '1000px', marginLeft: '40px', marginTop: '20px' }}>
          <DataGrid
          rows={rows}
          columns={columns}/>
        </div>
        <Button style={{marginLeft:'50px', marginBottom:'30px',marginTop:'20px'}} variant="contained">Export</Button>
      </form>
    </form>
    
      
  )
}

export default InsuranceDueList;
