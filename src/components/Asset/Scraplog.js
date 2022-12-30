import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FetchScrapAssetShowDataService } from '../../services/ApiServices';
import { DownloadScrapAsset, DownloadScrapDetails } from '../../services/DownloadService';

const ScrapLog = ({open,setOpen }) => {
  const [rows, setRows] = useState([]);
  const [loading,setLoading]=useState(true);
  const columns = [
    { field: 'id', headerName: 'Serial No', width: 100 },
    { field: 'department', headerName: 'Department Name', width: 150 },
    { field: 'section', headerName: 'Section Same', width: 150 },
    { field: 'assetType', headerName: 'Asset Type', width: 150 },
    { field: 'assetName', headerName: 'Asset Name', width: 150 },
    { field: 'dateAndTime', headerName: 'Date & Time', width: 150 },
    { field: 'user', headerName: 'User', width: 150 },
  ];
  
  const onCancel=()=>{
    setOpen(false);
  }
  
  useEffect(() => {
    FetchScrapAssetShowDataService(handleFetchScrapAsset,handleFetchScrapAssetException);
  }, []);
  
  const handleFetchScrapAsset=(dataObject) => {
    setLoading(false);
    setRows(dataObject.data);
  }
  
  const handleFetchScrapAssetException=(errorStaus, errorMessage) => {
    console.log(errorMessage);
  }
  
  const onClickExport=(e)=>{
    e.preventDefault();
    DownloadScrapAsset(handleDownloadScrapAsset,handleDownloadScrapAssetException);
  }

  const handleDownloadScrapAsset=()=>{}
  const handleDownloadScrapAssetException=()=>{}
      
  return (
    <div>
      <Dialog
      open={open}
      fullScreen
      maxWidth='lg'>
        <DialogTitle style={{ background: 'whitesmoke' }}>
          ASSET SCRAP LOG
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            <div style={{marginLeft:'50px'}}>
              <Grid >
                <div style={{ height: '350px', width:'90%',marginTop:'30px'}}>
                  <DataGrid
                  loading={loading}
                  rows={rows}
                  columns={columns} />
                </div>
              </Grid>
              <Grid container style={{marginTop:'20px'}}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{alignSelf:'center',textAlign:'center'}}>
                  <Button variant="contained" onClick={onClickExport} >Export</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{alignSelf:'center',textAlign:'center'}}>
                  <Button variant="contained" onClick={onCancel}>Cancel</Button>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ScrapLog
