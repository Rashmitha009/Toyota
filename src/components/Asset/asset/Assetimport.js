import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { AssetImportService } from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';
import { DownloadTemplate } from '../../../services/DownloadService';


export default function Assetimport() {
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const [importFile, setImportFile] = useState('');
  const onSubmit=(e)=>{
    e.preventDefault();
    AssetImportService({file:importFile},handleAssetImportService,handleAssetImportException);
  }
const handleAssetImportService=(dataObject)=>{
  console.log(dataObject);
  setNotification({
    status: true,
    type: 'success',
    message: dataObject.message,
  });
}
const handleAssetImportException=(errorStastus, errorMessage)=>{
 
  setNotification({
    status: true,
    type: 'error',
    message: errorMessage,
  });
}

const handleCloseNotify = () => {
 
  setNotification({
    status: false,
    type: '',
    message: '',
  });
};

const onDownload=()=>{
  DownloadTemplate(handleDownloadTemplate,handleDownloadTemplateException);
}
const handleDownloadTemplate=()=>{}
const handleDownloadTemplateException=()=>{}
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} style={{border:'solid', borderColor:'whitesmoke', width:'100%'}} >
          <Grid container >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
              {"IMPORT"} 
            </DialogTitle>
            </Grid>
            </Grid>
                <Grid container  style={{marginTop:'30px'}}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                style={{
                alignSelf: 'center',
                textAlignLast: 'center'
              }}
              >
              <label > Import CSV File : </label>
                </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setImportFile(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                      type="file"
                    />
                  </Grid>
                </Grid>
                <Grid container  style={{marginTop:'30px', marginBottom:'30px'}}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                style={{
                alignSelf: 'center',
                textAlignLast: 'center'

            }}
              >
              <Button variant="contained" onClick={onDownload} component="label">
                Download Templete
              </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                <Button style={{marginLeft:'20px'}} type="submit" variant="contained">Import</Button>
              </Grid>
                
        </Grid>
          
        </Grid>
      </form>
      <NotificationBar
        handleClose={handleCloseNotify}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </div>
      
  )
}