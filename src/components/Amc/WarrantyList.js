import React, { useState , useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import FileDownload from '@mui/icons-material/FileDownload';
import { FetchWarrantyService } from '../../services/ApiServices';
import WarrantyView from './WarrantyView';

const WarrantyList = () => {
  const [rows, setRows] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [warrantyStartDate, setwarrantyStartDate] = useState('');
  const [warrantyEndDate, setwarrantyEndDate] = useState('');
  const [refresh , setRefresh]=useState(false);
  const [isView, setIsView] = useState(false);
  const [editData, setEditData] = useState('');
  const [openView, setOpenView] = useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    FetchWarrantyService({ 
      warrantyStartDate: warrantyStartDate,
      warrantyEndDate:warrantyEndDate,
    },handleFetchWarrantyService, handleFetchWarrantyServiceException)    
  }

  const handleFetchWarrantyService =(dataObject)=>{
    setRows(dataObject.data)
  }

  const handleFetchWarrantyServiceException=(errorObject, errorMessage)=>{
    console.log(errorMessage)
  }
  
  const handleChangewarrantyStartDate = (e) => {
    setwarrantyStartDate(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangewarrantyEndDate = (e) => {
    setwarrantyEndDate(e.target.value);
    console.log(e.target.value);
  };
  
  const columns = [
    { field: 'department', headerName: 'Department	', width: 200 },
    { field: 'assetName', headerName: 'Machine', width: 200 },
    { field: 'warrantyStartDate', headerName: '	Warranty start date	', width: 300 },
    {field: 'warrantyEndDate', headerName: 'Warranty end date	', width: 280 },
    {field: 'action', headerName: 'Action', width: 180, sortable: false,
    cellClassname: 'actions',
    type: 'actions',
    getActions: (params) => [
      <VisibilityData selectedRow={params.row} />,
      <FileDownloadData selectedRow={params.row} />,
    ],
    }
  ];
  
  function VisibilityData({ selectedRow }) {
    return (
      <Visibility 
      onClick={() => {
        setEditData(selectedRow);
        setOpenView(true);
      }}/>
    )
  }
  
  function FileDownloadData({ selectedRow }) {
    return (
      <FileDownload />
    )
  }

  return (
    <form>
      <Grid container spacing={2} style={{marginTop:'20px'}}>
        <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{alignSelf:'center',textAlignLast:'center'}}>
          <label>Date From:</label>
        </Grid>
        <Grid item xs={12} sm={6} md={2} xl={2} style={{alignSelf:'center', textAlignLast:'center'}}>
          <TextField
          fullWidth
          id="Vendor-Address"
          variant="outlined"
          type='date'
          value={warrantyStartDate}
          onChange={(e) => { handleChangewarrantyStartDate(e) }}/>
        </Grid>
        <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{alignSelf:'center',textAlignLast:'center'}}>
          <label>To:</label>
        </Grid>
        <Grid item xs={12} sm={6} md={2} xl={2} style={{alignSelf:'center', textAlignLast:'center'}}>
          <TextField
          fullWidth
          id="Vendor-Address"
          variant="outlined"
          type='date'
          value={warrantyEndDate}
          onChange={(e) => { handleChangewarrantyEndDate(e) }}/>
        </Grid>
        <Grid item xs={12} sm={6} md={2} xl={2} style={{alignSelf:'center', textAlignLast:'center'}}>
          <Button style={{marginLeft:'50px', marginBottom:'20px'}} type='submit' variant="contained" onClick={onSubmit}>View</Button>       
        </Grid>
      </Grid>
      <Grid  container spacing={2} style={{ marginTop: '20px'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h3 >View Warranty</h3>
        </Grid>
      </Grid>
      <hr/>
      <Grid  container spacing={2} style={{ marginTop: '20px'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ height: '300px',  marginTop: '20px' }}>
          <DataGrid
          rows={rows}
          columns={columns}/>
        </Grid>
      </Grid>
      
      <WarrantyView
      open={openView}
      setOpen={setOpenView}
      editData={editData}
      setRefresh={setRefresh}/>
    </form>
  )
}

export default WarrantyList;

