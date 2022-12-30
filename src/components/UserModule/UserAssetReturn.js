import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NotificationBar from '../../services/NotificationBar';
import { Grid } from '@mui/material';
import { FetchUpdateReturnAssetService } from '../../services/ApiServices';

const UserAssetReturn = ({ open, setOpen, isAdd, editData, setRefresh }) => {
const [reson, setReson]=useState('');
const [requestedReturnAsset,setRequestedReturnAsset]=useState('');
const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

    const handleClose=()=>{
        setOpen(false);
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        setRequestedReturnAsset(1);
        FetchUpdateReturnAssetService({
            id:editData.id,
            updateReturnAsset:reson,
            requestedReturnAsset:requestedReturnAsset,
        },handleFetchUpdateReturnAsset,handleFetchUpdateReturnException);
    }

const handleFetchUpdateReturnAsset=(dataObject)=>{
    setRefresh(oldValue => !oldValue);
    console.log(dataObject);
    setNotification({
        status: true,
        type: 'success',
        message: dataObject.message,
      });
  
}
const handleFetchUpdateReturnException=(errorStatus,errorMessage)=>{
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
    <Dialog
      open={open}
      maxWidth='lg' >
      <form onSubmit={onSubmit}>
        <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            Asset Return
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
                <Grid container spacing={2} style={{marginTop:'20px'}}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                         style={{alignSelf:'center',textAlign:'center'}}
                    >
                        <label>Reason</label>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <TextField 
                        id="outlined-basic" 
                        label="Reason" 
                        variant="outlined" 
                        multiline
                        value={reson}
                        onChange={(e)=>setReson(e.target.value)}
                    />
                    </Grid>
                </Grid>
                
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='addbutton'>
            <Button type='reset' onClick={handleClose}>Cancel</Button>
            <Button type='submit'>
             Return
            </Button>
          </div>
         
        </DialogActions>
      </form>
        <NotificationBar
            handleClose={handleCloseNotify}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}
        />
    </Dialog>
  )
}

export default UserAssetReturn
