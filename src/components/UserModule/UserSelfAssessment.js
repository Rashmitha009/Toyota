import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NotificationBar from '../../services/NotificationBar';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FetchUpdateSelfAssessmentService } from '../../services/ApiServices';

const UserSelfAssessment = ({ open2, setOpen2,  editData, setRefresh }) => {
  const [selectStatus, setselectStatus] = useState('');
  const [other, setOther] = useState('');
  const [image1, setImge1] = useState('');
  const [image2, setImge2] = useState('');

  const handleChange = (e) => {
    setselectStatus(e.target.value);
  };

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
      });

      const handleCloseNotify = () => {
        setOpen2(false)
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };
const handleClose=()=>{
  setOpen2(false);
}
    const onSubmit = (e) => {

        e.preventDefault();
        FetchUpdateSelfAssessmentService({
          id:editData.id,
          selfAssessmentStatus :selectStatus,
          assetImage1:image1,
          assetImage2 :image2,
          other:other,
        },handleFetchUpdateSelfAssessment,handleFetchUpdateSelfAssessmentException);
    }
const handleFetchUpdateSelfAssessment=(dataObject)=>{
    console.log(dataObject);
    setRefresh(oldValue => !oldValue);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
  });
}
const handleFetchUpdateSelfAssessmentException=(errorStatus, errorMessage)=>{
  console.log(errorMessage);
  setNotification({
    status: true,
    type: 'error',
    message: errorMessage,
  });

}

  return (
    <Dialog
      open={open2}
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
                   style={{alignSelf:'center', textAlign:'center'}}
                  >
                    <label>Asset Status:</label>
                  </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectStatus}
                          label="Select Status"
                          onChange={handleChange}
                        >
                          <MenuItem value={"This Asset with Me with Good Working Condition"}>This Asset with Me with Good Working Condition</MenuItem>
                          <MenuItem value={'No isuue in Machine'}>No isuue in Machine</MenuItem>
                          <MenuItem value={'Other'}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {
                    selectStatus === 'Other' &&
                    <>
                    <Grid container spacing={2} style={{marginTop:'10px'}}>
                    <Grid item xs={0} sm={0} md={4} lg={4} xl={4}/>
                    <Grid item xs={12} sm={10} md={6} lg={5} xl={5}
                    
                    >
                    <TextField 
                        fullWidth
                        id="outlined-basic" 
                        label="Other" 
                        variant="outlined" 
                        onChange={(e)=>setOther(e.target.value)}
                    />
                    </Grid>
                    </Grid>
                    </>
                  }
                </Grid>
                <Grid container spacing={2} style={{marginTop:'10px'}} >
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                  style={{alignSelf:'center', textAlign:'center'}}
                  >
                    <label>Imge1</label>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                      fullWidth
                      label="Imge1"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setImge1(reader.result);
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
                <Grid container spacing={2} style={{marginTop:'10px'}}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                  style={{alignSelf:'center', textAlign:'center'}}
                  >
                  <label>Imge2</label>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                      fullWidth
                      label="Imge2"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setImge2(reader.result);
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
              
            </div>         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='addbutton'>
            <Button type='reset' onClick={handleClose}>Cancel</Button>
            <Button type='submit'>
            Submit
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

export default UserSelfAssessment
