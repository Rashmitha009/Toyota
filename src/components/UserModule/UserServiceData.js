import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NotificationBar from '../../services/NotificationBar';
import { Grid, TextField } from '@mui/material';
import ImageList from '@mui/material/ImageList';

const UserServiceData = ({open2, setOpen2, editData, setRefresh}) => {
    const [bpImages1,setBpImages1]=useState('');
    const [bpImages2,setBpImages2]=useState('');
    const [assetName,setAssetName]=useState('');
    const [amcStatus,setAmcStatus]=useState('');
    const [warrentyStatus,setWarrentyStatus]=useState('');
    const [insuranceStatus,setInsuranceStatus]=useState('');
    const [problemNote,setProblemNote]=useState('');
    const url='https://varmatrix.com/AssetManagement/AssetManagement'
    useEffect(()=>{
        setBpImages1(editData?.image1 || '');
        setBpImages2(editData?.image2 ||'');
        setAssetName(editData?.assetName ||'');
        setAmcStatus(editData?.amcStatus || '');
        setWarrentyStatus(editData?.warrantyStatus || '');
        setInsuranceStatus(editData?.insuranceStatus || '');
        setProblemNote(editData?.problemNote ||'');
    },[editData])
  
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
      });
    
    const handleCloseNotify = () => {
        setOpen2(false);
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };


const onClickeCancel=()=>{
    setOpen2(false)
}

  return (
    <div>
      <Dialog
    open={open2}
    fullWidth
    maxWidth='lg' >
    <form >
      <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
      Service Request
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
       <div>
      <Grid container spacing={2} style={{marginTop:'20px'}}>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <label>Asset Name</label>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <TextField 
                id="outlined-basic" 
                label="Asset Name" 
                variant="outlined" 
                value={assetName}
            />
        </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <label>AMC Status</label>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <TextField 
                id="outlined-basic" 
                label="AMC Status" 
                variant="outlined" 
                value={amcStatus}
            />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{marginTop:'5px'}}>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <label>Warrenty Status</label>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <TextField 
                id="outlined-basic" 
                label="Warrenty Status" 
                variant="outlined" 
                value={warrentyStatus}
            />
        </Grid>
     
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <label>Insurance Status</label>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <TextField 
                id="outlined-basic" 
                label="Insurance Status" 
                variant="outlined" 
                value={insuranceStatus}
            />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{marginTop:'5px'}}>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <label>Problem Note</label>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
         style={{alignSelf:'center', textAlign:'center'}}
         >
            <TextField 
                id="outlined-basic" 
                label="Problem Note" 
                variant="outlined" 
                value={problemNote}
            />
        </Grid>
      </Grid>
     <Grid container style={{marginTop:'5px'}}>
        <Grid item xs={12} sm={12} md={12} lg={12}
         style={{alignSelf:'center', textAlign:'center'}}
        >
            <label>Break down images</label>
        </Grid>
     </Grid>
        <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{marginTop:'5px', }}>
        <ImageList style={{marginLeft:'20%'}} cols={4} colHeight={100} rowHeight={164}>
            <img style={{width:'200px',height:'180px'}}
            src={`${url}${bpImages1}`}
            />
            <img style={{width:'200px',height:'180px'}}
            src={`${url}${bpImages2}`}
        />
        </ImageList>
        </Grid>
    </Grid>

      </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className='addbutton'>
          <Button type='reset' onClick={onClickeCancel} >Cancel</Button>
          
        </div>
            <NotificationBar
                handleClose={handleCloseNotify}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
      </DialogActions>
    </form>
  </Dialog>
    </div>
  )
}

export default UserServiceData
