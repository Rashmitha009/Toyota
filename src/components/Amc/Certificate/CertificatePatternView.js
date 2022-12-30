import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { UpdateCertificate } from '../../../services/ApiServices';

const CertificatePatternView = ({ open1, setOpen1,editData2}) => {
  const [rows, setRows] = useState([]);
  const [name,setName]=useState('')
  const [vendorName,setVendorName]=useState('');
  const [periodFrom,setPeriodFrom]=useState('');
  const [periodTo,setPeriodTo]=useState('');
  const [c1DateFrom,setc1DateFrom]=useState('');
  const [c1DateTo,setc1DateTo]=useState('');
  const [c2DateFrom,setc2DateFrom]=useState('');
  const [c2DateTo,setc2DateTo]=useState('');
  const [c3DateFrom,setc3DateFrom]=useState('');
  const [c3DateTo,setc3DateTo]=useState('');
  const [c4DateFrom,setc4DateFrom]=useState('');
  const [c4DateTo,setc4DateTo]=useState('');
  const [c5DateFrom,setc5DateFrom]=useState('');
  const [c5DateTo,setc5DateTo]=useState('');
  const [count,setCount]=useState('');
  const [notification,setNotification]=useState('');
  
  const handleClose = () => {
    setOpen1(false);
  };

  useEffect(()=>{
    setVendorName(editData2?.vendorName ||'');
    setPeriodFrom(editData2?.periodFrom   ||'');
    setPeriodTo(editData2?.periodTo || '');
    setc1DateFrom(editData2?.inspectionList?.c1startDate || '');
    setc1DateTo(editData2?.inspectionList?.c1endDate || '');
    setc2DateFrom(editData2?.inspectionList?.c2startDate || '');
    setc2DateTo(editData2?.inspectionList?.c2endDate  || '');
    setc3DateFrom(editData2?.inspectionList?.c3startDate || '');
    setc3DateTo(editData2?.inspectionList?.c3endDate || '');
    setc4DateFrom(editData2?.inspectionList?.c4startDate || '');
    setc4DateTo(editData2?.inspectionList?.c4endDate || '');
    setc5DateFrom(editData2?.inspectionList?.c5startDate || '');
    setc5DateTo(editData2?.inspectionList?.c5endDate || '');
    setCount(editData2?.inspectionPattern ||'0');
    console.log('data'+editData2?.lenght);
  },[editData2])

  const handleChangec1DateFrom =(e) => {
    setc1DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChangec1DateTo=(e)=>{
    setc1DateTo(e.target.value);
    console.log(e.target.value);
  }

  const handleChangec2DateFrom=(e)=>{
    setc2DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChangec2DateTo=(e)=>{
    setc2DateTo(e.target.value);
    console.log(e.target.value);
  }

  const handleChangec3DateFrom=(e)=>{
    setc3DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChangec3DateTo=(e)=>{
    setc3DateTo(e.target.value);
    console.log(e.target.value);
  }

  const handleChangec4DateFrom=(e)=>{
    setc4DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChangec4DateTo=(e)=>{
    setc4DateTo(e.target.value);
    console.log(e.target.value);
  }

  const handleChangec5DateFrom=(e)=>{
    setc5DateFrom(e.target.value);
    console.log(e.target.value);
  }

  const handleChangec5DateTo=(e)=>{
    setc5DateTo(e.target.value);
    console.log(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(editData2);
    UpdateCertificate({
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

  return (
    <div>
      <Dialog 
      open={open1}
      fullWidth
      maxWidth='lg'>
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            {"INSPECTION DETAILS"}
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
                    <Grid item  xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label>1 Inspection: FROM </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                      <TextField
                      fullWidth
                      id=""
                      variant="outlined"
                      type='date'
                      onChange={(e) => { handleChangec1DateFrom(e) }}
                      value={c1DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                      <label>1 Inspection: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                      <TextField
                      fullWidth
                      id=""
                      variant="outlined"
                      type='date'
                      onChange={(e) => { handleChangec1DateTo(e) }}
                      value={c1DateTo}/>
                    </Grid>
                  </Grid>
                  </>
                }
                {
                  count >= 2 &&
                  <>
                  <Grid container spacing={2} style={{ marginTop: '20px'}}>
                    <Grid item  xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label>2 Inspection: From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                      <TextField
                      fullWidth
                      id=""
                      variant="outlined"
                      type='date'
                      onChange={(e) => { handleChangec2DateFrom(e) }}
                      value={c2DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label> 2 Inspection: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChangec2DateTo(e) }}
                        value={c2DateTo}/>
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
                        <label>3 Inspection: From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChangec3DateFrom(e) }}
                        value={c3DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label> 3 Inspection: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChangec3DateTo(e) }}
                        value={c3DateTo}/>
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
                        <label>4 Inspection: From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChangec4DateFrom(e) }}
                        value={c4DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label> 4 Inspection: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChangec4DateTo(e) }}
                        value={c4DateTo}/>
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
                        <label>5 Inspection: From: </label>
                    </Grid>
                    <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChangec5DateFrom(e) }}
                        value={c5DateFrom}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label> 5 Inspection: To: </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        onChange={(e) => { handleChangec5DateTo(e) }}
                        value={c5DateTo}/>
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

export default CertificatePatternView;
                   