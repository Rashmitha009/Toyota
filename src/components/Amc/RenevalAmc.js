import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { AMCrenewalAmc } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';

const RenevalAmc = ({open , setOpen, editData }) => {
  const [amcStartDate,setamcStartDate] = useState('');
  const [amcEndDate,setamcEndDate] = useState('');
  const [servicePattern, setServicePattern] = useState(0);
  const [department,setdepartment] = useState(0);
  const [machine,setmachine] = useState(0);
  const [s1DateFrom, sets1DateFrom] = useState('');
  const [s1DateTo, sets1DateTo] = useState('');
  const [s1runHours, sets1runHours] = useState('');
  const [s2DateFrom, sets2DateFrom] = useState('');
  const [s2DateTo, sets2DateTo] = useState('');
  const [s2runHours, sets2runHours] = useState('');
  const [s3DateFrom, sets3DateFrom] = useState('');
  const [s3DateTo, sets3DateTo] = useState('');
  const [s3runHours, sets3runHours] = useState('');
  const [s4DateFrom, sets4DateFrom] = useState('');
  const [s4DateTo, sets4DateTo] = useState('');
  const [s4runHours, sets4runHours] = useState('');
  const [s5DateFrom, sets5DateFrom] = useState('');
  const [s5DateTo, sets5DateTo] = useState('');
  const [s5runHours, sets5runHours] = useState('');
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    setdepartment(editData.department || '');
    setmachine(editData.machineName  || '');
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

  const handleChanges1DateFrom = (e) => {
    sets1DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges1DateTo = (e) => {
    sets1DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges1runHours = (e) => {
    sets1runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges2DateFrom = (e) => {
    sets2DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges2DateTo = (e) => {
    sets2DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges2runHours = (e) => {
    sets2runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges3DateFrom = (e) => {
    sets3DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges3DateTo = (e) => {
    sets3DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges3runHours = (e) => {
    sets3runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges4DateFrom = (e) => {
    sets4DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges4DateTo = (e) => {
    sets4DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges4runHours = (e) => {
    sets4runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges5DateFrom = (e) => {
    sets5DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges5DateTo = (e) => {
    sets5DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges5runHours = (e) => {
    sets5runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChange = (event) => {
    setServicePattern(event.target.value);
  };

  const handleClose=()=>{
    setOpen(false);
  }

  const onSubmit=(e)=> 
  {
    e.preventDefault();
    alert("AMC Renewal successfull ")
    AMCrenewalAmc({
      id:editData.id,
      servicePattern:servicePattern,
      periodFrom:amcStartDate,
      periodTo:amcEndDate,
      s1DateFrom:s1DateFrom,
      s1DateTo:s1DateTo,
      s1runHours:s1runHours,
      s2DateFrom:s2DateFrom,
      s2DateTo:s2DateTo,
      s2runHours:s2runHours,
      s3DateFrom:s3DateFrom,
      s3DateTo:s3DateTo,
      s3runHours:s3runHours,
      s4DateFrom:s4DateFrom,
      s4DateTo:s4DateTo,
      s4runHours:s4runHours,
      s5DateFrom:s5DateFrom,
      s5DateTo:s5DateTo,
      s5runHours:s5runHours,
    },handleAmcRenewalAmc,handleAmcRenewalAmcException)
  };

  const handleAmcRenewalAmc=(dataObject)=>
  {
    console.log(dataObject);
  }

  const handleAmcRenewalAmcException=(errorStatus ,errorMessage)=>{
    console.log(errorMessage);
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
    <div>
      <Dialog
       open={open}
       fullWidth
       maxWidth='lg'>
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
            {"RENEVAL AMC"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
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
                  value={machine}/>
                </Grid>
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
              </Grid>
              <Grid  container spacing={2} style={{ marginTop: '20px'}}>
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
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label >Service Pattern:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2}xl={2}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label"></InputLabel>
                      <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={servicePattern}
                      label=""
                      onChange={handleChange}>
                        <MenuItem value={1}>Service 1</MenuItem>
                        <MenuItem value={2}>Service 2</MenuItem>
                        <MenuItem value={3}>Service 3</MenuItem>
                        <MenuItem value={4}>Service 4</MenuItem>
                        <MenuItem value={5}>Service 5</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              { servicePattern >=1 && (
                <Grid container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                  style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>1 Service: FROM: </label>
                  </Grid>
                  <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                    <TextField
                    fullWidth
                    id=""
                    variant="outlined"
                    type='date'
                    value={s1DateFrom}
                    onChange={(e) => { handleChanges1DateFrom(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                  style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                    <label>To:</label>
                  </Grid>
                  <Grid item xs={12}  sm={6} md={2} lg={2} xl={2}>
                    <TextField
                    fullWidth
                    id=""
                    variant="outlined"
                    type='date'
                    value={s1DateTo}
                    onChange={(e) => { handleChanges1DateTo(e) }}/>
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
                )
              }
              { servicePattern >=2 && (
                <Grid container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                  style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>2 Service: FROM: </label>
                  </Grid>
                  <Grid item xs={12} sm={6}  md={2} lg={2} xl={2} >
                    <TextField
                    fullWidth
                    id=""
                    variant="outlined"
                    type='date'
                    value={s2DateFrom}
                    onChange={(e) => { handleChanges2DateFrom(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                  style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                    <label>To:</label>
                  </Grid>
                  <Grid item xs={12}  sm={9} md={2} lg={2} xl={2}>
                    <TextField
                    fullWidth
                    id=""
                    variant="outlined"
                    type='date'
                    value={s2DateTo}
                    onChange={(e) => { handleChanges2DateTo(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={3} md={2} lg={2} xl={2}
                  style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                    <label>RunHours: </label>
                  </Grid>
                  <Grid item xs={12} sm={9} md={2} lg={1} xl={3}
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
                )
              }
              {servicePattern >=3 && (
                <Grid container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                  style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>3 Service: FROM: </label>
                  </Grid>
                  <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                    <TextField
                    fullWidth
                    id=""
                    variant="outlined"
                    type='date'
                    value={s3DateFrom}
                    onChange={(e) => { handleChanges3DateFrom(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                  style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                    <label>To:</label>
                  </Grid>
                  <Grid item xs={12}  sm={9} md={2} lg={2} xl={2}>
                    <TextField
                    fullWidth
                    id=""
                    variant="outlined"
                    type='date'
                    value={s3DateTo}
                    onChange={(e) => { handleChanges3DateTo(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={3} md={2} lg={2} xl={2}
                  style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                    <label>RunHours: </label>
                  </Grid>
                  <Grid item xs={12} sm={9} md={2} lg={1} xl={3}
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
                  )
              }
              {servicePattern >=4 && (
                <Grid container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                  style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>4 Service: FROM: </label>
                  </Grid>
                  <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                    <TextField
                    fullWidth
                    id=""
                    variant="outlined"
                    type='date'
                    value={s4DateFrom}
                    onChange={(e) => { handleChanges4DateFrom(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                  style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                    <label>To:</label>
                  </Grid>
                  <Grid item xs={12}  sm={9} md={2} lg={2} xl={2}>
                    <TextField
                    fullWidth
                    id=""
                    variant="outlined"
                    type='date'
                    value={s4DateTo}
                    onChange={(e) => { handleChanges4DateTo(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={3} md={2} lg={2} xl={2}
                  style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                    <label>RunHours: </label>
                  </Grid>
                  <Grid item xs={12} sm={9} md={2} lg={1} xl={3}
                  style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                    <TextField
                    fullWidth
                    id=""
                    label=""
                    variant="outlined"
                    onChange={(e) => { sets4runHours(e.target.value) }}
                    value={s4runHours}/>
                  </Grid>
                </Grid>
                )
              }
              { servicePattern >=5 && (
                <Grid container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                  style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>5 Service: FROM: </label>
                  </Grid>
                  <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}>
                    <TextField
                    fullWidth
                    id=""
                    variant="outlined"
                    type='date'
                    value={s5DateFrom}
                    onChange={(e) => { handleChanges5DateFrom(e) }}/>
                  </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                  <label>To:</label>
                </Grid>
                <Grid item xs={12}  sm={9} md={2} lg={2} xl={2}>
                  <TextField
                  fullWidth
                  id=""
                  variant="outlined"
                  type='date'
                  value={s5DateTo}
                  onChange={(e) => { handleChanges5DateTo(e) }}/>
                </Grid>
                <Grid item xs={12} sm={3} md={2} lg={2} xl={2}
                style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                  <label>RunHours: </label>
                </Grid>
                <Grid item xs={12} sm={9} md={2} lg={1} xl={3}
                style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                  <TextField
                  fullWidth
                  id=""
                  label=""
                  variant="outlined"
                  onChange={(e) => { sets5runHours(e.target.value) }}
                  value={s5runHours}/>
                </Grid>
               </Grid>
                )
              }
            </DialogContentText>
          </DialogContent>
          <div>
          <Button type="submit">Renew</Button>
            <Button onClick={handleClose}>close</Button>
            
          </div>
        </form>
      </Dialog>
      <NotificationBar
      handleClose={handleCloseNotify}
      notificationContent={openNotification.message}
      openNotification={openNotification.status}
      type={openNotification.type} />
    </div>
  )
}

export default RenevalAmc;
