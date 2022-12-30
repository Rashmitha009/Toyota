import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import {
  FetchDepaertmentService, 
  FetchSectionService ,
  FetchAssetTypeService, 
  FetchAssetNameService, 
  ViewInspection,
} from '../../../services/ApiServices';

const InspectionList = ({ open, setOpen, isAdd, editData, setRefresh,isService }) => {
  const [department  ,setDepartment]= useState();
  const [departmentList,setDepartmentList]= useState([]);
  const [section ,setSection]= useState();
  const [sectionList,setSectionList]=useState([]);
  const [assetList, setAssetList]= useState([]);
  const [assetType, setAssetType] = useState('');
  const [asset, setAsset] = useState('');
  const [ assetNameList, setAssetNameList] = useState([]);
  const [rows ,setRows]=useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  
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
  
  const onSubmit = (e) => {
    e.preventDefault();
    ViewInspection
    ({
      id:asset
    },handleSuccess, handleException)
  }
  
  const handleSuccess = (dataObject) =>{
    console.log(dataObject);
    setRows(dataObject.data)
   
  }
  
  const handleException = (errorObject, errorMessage) =>{
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message:errorMessage,
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
  
  const onAssetChange = (e) => {
    setAsset(e.target.value)
  }
  
  const onAssetTypeChange = (e) => {
    setAssetType(e.target.value);
    FetchAssetNameService({
      id: e.target.value
    }, handleFetchAssetNameServiceSuccess, handleFetchAssetNameServiceException);
  }
  
  const handleFetchAssetNameServiceSuccess = (dataObject) => {
    setAssetNameList(dataObject.data || []);
  }
  
  const handleFetchAssetNameServiceException= (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }
  
  const columns = [
    { field: 'vendorName', headerName: 'Vendor Name', width: 400 },
    { field: 'c1startDate', headerName: 'Inspection Date', width: 500 },
    // { field: 'Action', headerName: 'Action', width: 240 },  
  ];
  
  return (
    <form onSubmit={onSubmit}>
      <div>
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
          </Grid>
          <Grid  container spacing={2} style={{ marginTop: '20px'}}>
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
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Asset Name :</label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label=""
                onChange={(e) => onAssetChange(e)}>
                  {assetNameList?.map((data, index) => {
                    return (
                      <MenuItem value={data.id} key={index}>{data.assetName}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid item style={{
          textAlign: 'end', marginTop:'20px'
        }}>
          <Button style={{ marginBottom:'20px', marginTop:'20px',marginLeft:'50px',}}  type='submit' variant="contained" >View</Button>     
          
        </Grid>
      </div>
      <form style={{border:'solid', borderColor:'whitesmoke'}}>
        <div>
          <h3 style={{marginLeft:'30px',marginTop:'10px'}}>INSPECTION DATE</h3>
        </div>
        <hr/>
        <div style={{ height: 200, width: '80%', marginLeft:'40px' }}>
          <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5]}
          onRowAdd/>
        </div>
      </form>
    </form>
  )
}

export default InspectionList
