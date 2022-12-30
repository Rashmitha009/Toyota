import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

const RenevalInsurance = ({open , setOpen, editData }) => {
  const [department,setdepartment] = useState(0);
  const [assetName,setassetName] = useState(0);
  const [amcStartDate,setamcStartDate] = useState('');
  const [amcEndDate,setamcEndDate] = useState('');
  
  useEffect(() => {
    setdepartment(editData.department || '');
    setassetName(editData.assetName || '');
    setamcStartDate(editData.amcStartDate || '');
    setamcEndDate(editData.amcEndDate || ''); 
  }, [editData]);

  const handleChangeamcStartDate = (e) => {
    setamcStartDate(e.target.value);
    console.log(e.target.value);
  }; 

  const handleChangeamcEndDate = (e) => {
    setamcEndDate(e.target.value);
    console.log(e.target.value);
  }; 

  const handleClose=()=>{
    setOpen(false);
  }

  return (
    <div>
      <Dialog
      open={open}
      fullWidth
      maxWidth='lg'>
        <form >
          <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
            {"Renewal Certificate"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form>
                <Grid  container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >Department: </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                    <TextField id="" 
                    fullwidth
                    label="" 
                    variant="outlined" 
                    value={department} />
                  </Grid>
                  <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >Machine: </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                    <TextField id="" 
                    fullwidth
                    label="" 
                    variant="outlined" 
                    value={assetName}/>
                  </Grid>
                </Grid>
                <Grid  container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > AMC Start Date:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                    <TextField 
                    fullWidth 
                    id="Vendor-Address" 
                    variant="outlined" 
                    type='date'
                    value={amcStartDate}
                    onChange={(e) => { handleChangeamcStartDate(e) }}/>
                  </Grid>
                  <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > AMC End Date:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                    <TextField 
                    fullWidth 
                    id="Vendor-Address" 
                    variant="outlined" 
                    type='date'
                    value={amcEndDate}
                    onChange={(e) => { handleChangeamcEndDate(e) }}/>
                  </Grid>
                </Grid>
              </form>
            </DialogContentText>
          </DialogContent>
          <div>
            <Button type="submit">Renew</Button>
            <Button onClick={handleClose}>close</Button>
          </div>
        </form>     
      </Dialog>
    </div>
  )
}

export default RenevalInsurance;
