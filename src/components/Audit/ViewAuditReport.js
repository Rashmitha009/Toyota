import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Grid } from '@mui/material';
import {
  FetchDepaertmentService,
  FetchSectionService,
  FetchAssetTypeService,
  ViewAuditReportService,
} from '../../services/ApiServices';
import ViewAuditViewModal from './ViewAuditViewModal';
import { Downloadaudit } from '../../services/DownloadService';

const ViewAuditReport = () => {
  const [department, setDepartment] = useState();
  const [section, setSection] = useState();
  const [sectionList, setSectionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [assetType, setAssetType] = useState();
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [viewReport,setViewReport] = useState([]);
  const [fromDate, setfromDate] = useState('');
  const [toDate, settoDate] = useState('');
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true); 
  const [editData, setEditData] = useState('');
  const [refresh , setRefresh]=useState(false);
  const [rows, setRows] = useState([]);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  
  const handleChangefromDate = (e) => {
    setfromDate(e.target.value);
    console.log(e.target.value);
  };

  const handleChangetoDate = (e) => {
    settoDate(e.target.value);
    console.log(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    FetchAssetTypeService({ id: e.target.value },handleFetchAssetType, handleFetchAssetTypeException)   
  }

  const handleFetchAssetType = (dataObject) => {
    setAssetTypeList(dataObject.data);
  }

  const handleFetchAssetTypeException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    ViewAuditReportService({ 
      id:assetType ,
      fromDate:fromDate,
      toDate:toDate,
    },handleViewAuditReport, handleViewAuditReportException)    
  }

  const handleViewAuditReport = (dataObject) => {
    setViewReport(dataObject.data);
    setRows(dataObject.data);
    console.log(dataObject.data);
  }

  const handleViewAuditReportException = (errorStaus, errorMessage) => {
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
    { field: 'id', headerName: 'Serial No', 
    minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'auditName', headerName: 'Audit Name',
    minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
    { field: 'department', headerName: 'Department', 
    minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'section', headerName: 'Section', 
    minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'assetType', headerName: 'Asset Type',
    minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
    {field: 'action', headerName: 'Action',
    minWidth: 100, flex: 1, align: 'center', headerAlign: 'center', sortable: false,
    cellClassname: 'actions',
    type: 'actions',
    getActions: (params) => [
      <ViewData selectedRow={params.row} />  
      
    ]},
  ];

  function ViewData({ selectedRow }) {
    return (
      <VisibilityIcon
      onClick={() => {
        setIsAdd(false);
        setEditData(selectedRow);
        setOpen(true);
      }}/>
    )
  }

  const AuditDownload=()=> {
    Downloadaudit( assetType,fromDate,toDate,handleDownloadaudit,handleDownloadauditException);  
  }

  const handleDownloadaudit =()=> {
  }

  const handleDownloadauditException =()=>{
  }
   
  return (
    <div style={{}}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{}}>
          <h3 style={{marginTop:'0'}}>VIEW AUDITED REPORT</h3>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{}}>
        <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{alignself:'center' , textAlign:'center'}} >
          <label>Audited Date From :</label>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
          <TextField
          fullWidth
          id="Vendor-Address"
          variant="outlined"
          type='date'
          value={fromDate}
          onChange={(e) => { handleChangefromDate(e) }}/>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{alignself:'center' , textAlign:'center'}} >
          <label > To</label>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
          <TextField
          fullWidth
          id="Vendor-Address"
          variant="outlined"
          type='date'
          value={toDate}
          onChange={(e) => { handleChangetoDate(e) }}/>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop:'5px'}} >
        <Grid item xs={12} sm={6} md={2} lg={1.5} xl={2} style={{alignSelf:'center', textAlign:'center'}}>
          <label>Department :</label>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
          <FormControl fullWidth>
            <InputLabel id="departmentlabel">Select Department</InputLabel>
            <Select
            label="Select Department"
            onChange={(e) => onDepartmentChange(e)}>
              {departmentList.map((data, index) => {
                return (
                  <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={1} xl={2} style={{alignSelf:'center', textAlign:'center'}}>
          <label>Section:</label>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
            <Select
            label="Select Section"
            onChange={(e) => onSectionChange(e)}>
              {sectionList.map((data, index) => {
                return (
                  <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
          <Grid item xs={12} sm={6} md={2} lg={1.5} xl={2} style={{alignSelf:'center', textAlign:'center'}}>
            <label >Asset Type :</label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Asset Type</InputLabel>
            <Select
            label="Select Asset Type "
            onChange={(e) => onAssetTypeChange(e)}>
              {assetTypeList.map((data, index) => {
                return (
                  <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
          <Button variant="contained" style={{marginLeft:'50px', marginBottom:'30px'}} type='submit'  onClick={onSubmit}>View</Button>
        </Grid>
      </Grid>
      <Grid container style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:'10px'}}>
          <Grid item  style={{}}>
            <h3 style={{marginTop:'0px'}}>AUDITED REPORT</h3>
          </Grid>    
      </Grid>
      <Grid item xs={10} sm={10} md={10} lg={10} lx={10}>
        <DataGrid
        style={{ height: 270,width:'100%' }}
        rows={rows}
        columns={columns} />
      </Grid>
      <Button style={{marginTop:'5px'}} variant="contained" onClick={AuditDownload}>Export</Button>
      <ViewAuditViewModal
      open={open}
      setOpen={setOpen}
      isAdd={isAdd}
      editData={editData}
      setRefresh={setRefresh}/>
    </div>
  )
}

export default ViewAuditReport;
