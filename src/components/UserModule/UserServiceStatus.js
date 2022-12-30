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

const UserServiceStatus = ({open3, setOpen3, editData, setRefresh}) => {
    const [vendor,setVendor]=useState('');
    const [vendorEmail,setVendorEmail]=useState('');
    const [assetName,setAssetName]=useState('');
    const [vendorGstNo,setVendorGstNo]=useState('');
    const [expreturnDate,setExpReturnDate]=useState('');
    const [vendorContactNo,setvendorContactNo]=useState('');
  
    useEffect(()=>{
        setVendor(editData?.vendorName  || '');
        setVendorEmail(editData?.vendorEmail ||'');
        setAssetName(editData?.assetName ||'');
        setVendorGstNo(editData?.gstNo || '');
        setExpReturnDate(editData?.updated_at || '');
        setvendorContactNo(editData?.vendorPhone || '');
    },[editData])

    const onClickeCancel=()=>{
        setOpen3(false);
    }
  return (
    <div>
    <Dialog
  open={open3}
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
          <label>Vendor</label>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
       style={{alignSelf:'center', textAlign:'center'}}
       >
          <TextField 
              id="outlined-basic" 
              label="Vendor" 
              variant="outlined" 
              value={vendor}
          />
      </Grid>
    </Grid>

    <Grid container spacing={2} style={{marginTop:'5px'}}>
    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}
       style={{alignSelf:'center', textAlign:'center'}}
       >
          <label>Vendor Email</label>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
       style={{alignSelf:'center', textAlign:'center'}}
       >
          <TextField 
              id="outlined-basic" 
              label="Vendor Email" 
              variant="outlined" 
              value={vendorEmail}
          />
      </Grid>
   
    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}
       style={{alignSelf:'center', textAlign:'center'}}
       >
          <label>Vendor ContactNo</label>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
       style={{alignSelf:'center', textAlign:'center'}}
       >
          <TextField 
              id="outlined-basic" 
              label="Vendor ContactNo" 
              variant="outlined" 
              value={vendorContactNo}
          />
      </Grid>
    </Grid>

    <Grid container spacing={2} style={{marginTop:'5px'}}>
    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}
       style={{alignSelf:'center', textAlign:'center'}}
       >
          <label>Vendor GST No</label>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
       style={{alignSelf:'center', textAlign:'center'}}
       >
          <TextField 
              id="outlined-basic" 
              label="Vendor GST No" 
              variant="outlined" 
              value={vendorGstNo}
          />
      </Grid>

      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}
       style={{alignSelf:'center', textAlign:'center'}}
      >
          <label>Exp.return Date</label>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
       style={{alignSelf:'center', textAlign:'center'}}
       >
          <TextField 
              id="outlined-basic" 
              label="Exp.return Date" 
              variant="outlined" 
              value={expreturnDate}
          />
   </Grid>
   </Grid>
 

    </div>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <div className='addbutton'>
        <Button type='reset' onClick={onClickeCancel} >Cancel</Button>
        
      </div>
   
    </DialogActions>
  </form>
</Dialog>
  </div>
  )
}

export default UserServiceStatus
