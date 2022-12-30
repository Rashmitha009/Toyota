import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { UpdateAmc } from '../../services/ApiServices';

const AmcServicePatternView = ({ open1, setOpen1,editData2,rows}) => {
 
  const [name,setName]=useState('');
  const [vendorName,setVendorName]=useState('');
  const [periodFrom,setPeriodFrom]=useState('');
  const [periodTo,setPeriodTo]=useState('');
  const [s1DateFrom,sets1DateFrom]=useState('');
  const [s1DateTo,sets1DateTo]=useState('');
  const [s1runHours, sets1runHours] = useState('');
  const [s2DateFrom,sets2DateFrom]=useState('');
  const [s2DateTo,sets2DateTo]=useState('');
  const [s2runHours, sets2runHours] = useState('');
  const [s3DateFrom,sets3DateFrom]=useState('');
  const [s3DateTo,sets3DateTo]=useState('');
  const [s3runHours, sets3runHours] = useState('');
  const [s4DateFrom,sets4DateFrom]=useState('');
  const [s4DateTo,sets4DateTo]=useState('');
  const [s4runHours, sets4runHours] = useState('');
  const [s5DateFrom,sets5DateFrom]=useState('');
  const [s5DateTo,sets5DateTo]=useState('');
  const [s5runHours, sets5runHours] = useState('');
  const [count,setCount]=useState('');
  const [notification,setNotification]=useState('');
  const [servicePattern,setServicePattern]=useState('');
  const handleClose = () => {
    setOpen1(false);
  };


  useEffect(()=>{
    setVendorName(editData2?.vendorName ||'');
    setPeriodFrom(editData2?.periodFrom ||'');
    setPeriodTo(editData2?.periodTo || '');
    sets1DateFrom(editData2?.serviceList?.s1startDate || '');
    sets1DateTo(editData2?.serviceList?.s1endDate || '');
    sets1runHours(editData2?.serviceList?.s1runHours|| '');
    sets2DateFrom(editData2?.serviceList?.s2startDate || '');
    sets2DateTo(editData2?.serviceList?.s2endDate|| '');
    sets2runHours(editData2?.serviceList?.s2runHours|| '');
    sets3DateFrom(editData2?.serviceList?.s3startDate || '');
    sets3DateTo(editData2?.serviceList?.s3endDate || '');
    sets3runHours(editData2?.serviceList?.s3runHours|| '');
    sets4DateFrom(editData2?.serviceList?.s4startDate || '');
    sets4DateTo(editData2?.serviceList?.s4endDate|| '');
    sets4runHours(editData2?.serviceList?.s4runHours|| '');
    sets5DateFrom(editData2?.serviceList?.s5startDate || '');
    sets5DateTo(editData2?.serviceList?.s5endDate || '');
    sets5runHours(editData2?.serviceList?.s5runHours|| '');
    setCount(editData2?.servicePattern ||'0');
    
  },[editData2])

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(editData2);
    UpdateAmc({
      id: editData2.id,
      
    },handleSuccess, handleException)
  }

  const handleSuccess = (dataObject) => {
    console.log(dataObject);
    
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    
  }

  const handleException = (errorObject, errorMessage) => {
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  }
 
  

  const handleChanges1DateFrom =(e) => {
    sets1DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges1DateTo=(e)=>{
    sets1DateTo(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges1runHours = (e) => {
    sets1runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges2DateFrom=(e)=>{
    sets2DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges2DateTo=(e)=>{
    sets2DateTo(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges2runHours = (e) => {
    sets2runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges3DateFrom=(e)=>{
    sets3DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges3DateTo=(e)=>{
    sets3DateTo(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges3runHours = (e) => {
    sets3runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges4DateFrom=(e)=>{
    sets4DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges4DateTo=(e)=>{
    sets4DateTo(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges4runHours = (e) => {
    sets4runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges5DateFrom=(e)=>{
    sets5DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges5DateTo=(e)=>{
    sets5DateTo(e.target.value);
    console.log(e.target.value);
  }

  const handleChanges5runHours = (e) => {
    sets5runHours(e.target.value);
    console.log(e.target.value);
  };
 
  return (
    <div>
      <Dialog 
      open={open1}
   
      fullWidth
      maxWidth='lg'>
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            {"SERVICE DETAILS"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form>
                <Grid  container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid xs={12} sm={6} md={1} lg={1} xl={1} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >Name: </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                      <TextField id="" 
                      fullwidth
                      label="" 
                      variant="outlined" 
                      value={vendorName} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label >Date From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                      <TextField id="" 
                      fullwidth
                      label="" 
                      variant="outlined" 
                      value={periodFrom} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label >Date To :</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                      <TextField id="" 
                      fullwidth
                      label="" 
                      variant="outlined" 
                      value={periodTo} />
                    </Grid>
                  </Grid>
                  {
                    count >= 1 &&
                    <>
                    <Grid container spacing={2} style={{ marginTop: '20px'}}>
                      <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>1 Service: From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChanges1DateFrom(e) }}
                        value={s1DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label>1 Service: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChanges1DateTo(e) }}
                        value={s1DateTo}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                        <label>RunHours: </label>
                      </Grid>
                      <Grid item xs={12} sm={6} md={1} lg={1} xl={1}
                      style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                        <TextField
                        fullWidth
                        id=""
                        label=""
                        variant="outlined"
                        onChange={(e) => { sets1runHours(e.target.value) }}
                        value={s1runHours}/>
                      </Grid>
                    </Grid>
                    </>
                  }
                  {
                    count >= 2 &&
                    <>
                    <Grid container spacing={2} style={{ marginTop: '20px'}}>
                      <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>2 Service: From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChanges2DateFrom(e) }}
                        value={s2DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label> 2 Service: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChanges2DateTo(e) }}
                        value={s2DateTo}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                        <label>RunHours: </label>
                      </Grid>
                      <Grid item xs={12} sm={6} md={1} lg={1} xl={1}
                      style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                        <TextField
                        fullWidth
                        id=""
                        label=""
                        variant="outlined"
                        onChange={(e) => { sets2runHours(e.target.value) }}
                        value={s2runHours}/>
                      </Grid>
                    </Grid>
                    </>
                  }
                  {
                    count >=3 &&
                    <>
                    <Grid container spacing={2} style={{ marginTop: '20px'}}>
                      <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>3 Service: From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChanges3DateFrom(e) }}
                        value={s3DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label> 3 Service: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChanges3DateTo(e) }}
                        value={s3DateTo}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                        <label>RunHours: </label>
                      </Grid>
                      <Grid item xs={12} sm={6} md={1} lg={1} xl={1}
                      style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                        <TextField
                        fullWidth
                        id=""
                        label=""
                        variant="outlined"
                        onChange={(e) => { sets3runHours(e.target.value) }}
                        value={s3runHours}/>
                      </Grid>
                    </Grid>
                    </>
                  }
                  {
                    count >= 4 &&
                    <>
                   <Grid container spacing={2} style={{ marginTop: '20px'}}>
                      <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>4 Service: From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChanges4DateFrom(e) }}
                        value={s4DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label> 4 Service: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChanges4DateTo(e) }}
                        value={s4DateTo}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                        <label>RunHours: </label>
                      </Grid>
                      <Grid item xs={12} sm={6} md={1} lg={1} xl={1}
                      style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                        <TextField
                        fullWidth
                        id=""
                        label=""
                        variant="outlined"
                        onChange={(e) => { sets5runHours(e.target.value) }}
                        value={s4runHours}/>
                      </Grid>
                    </Grid>
                    </>
                  }
                  {
                    count >= 5 &&
                    <>
                    <Grid container spacing={2} style={{ marginTop: '20px'}}>
                      <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>5 Service: From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        value={s5DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label> 5 Service: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        value={s5DateTo}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                        <label>RunHours: </label>
                      </Grid>
                      <Grid item xs={12} sm={6} md={1} lg={1} xl={1}
                      style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                        <TextField
                        fullWidth
                        id=""
                        label=""
                        variant="outlined"
                        value={s5runHours}/>
                      </Grid>
                    </Grid>
                    </>
                  }
                 
                </form>
              </DialogContentText>
            </DialogContent>
          <DialogActions>
            <div className='addbutton'>
              <Button type="submit" style={{ border: 'solid', width: '150px' }}  autoFocus>
                Update
              </Button>
              <Button type='reset' onClick={handleClose}>Cancel</Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default AmcServicePatternView
