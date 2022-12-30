import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, DialogContent, DialogContentText, DialogTitle ,IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';

const ServiceRequestView = ({ open, setOpen,  setRefresh , editData  }) => {
  const [rows, setRows]=useState([]);
  const [assetName ,setAssetName]=useState('');
  const [department,setDepartment]=useState('');
  const [assetType,setAssetType]=useState('');
  const [section,setSection]=useState('');
  const [amcStatus,setAmcStatus]=useState('');
  const [warrantyStatus,setwarrantyStatus]=useState('');
  const [insuranceStatus,setInsuranceStatus]=useState('');
  const [problemNote,setProblemNote]=useState('');
  const [bpImages1,setBpImages1]=useState('');
  const [bpImages2,setBpImages2]=useState('');
  
  useEffect(() => {
    setAssetName(editData.assetName || '');
    setDepartment(editData.department ||'');
    setAssetType(editData.assetType || '');
    setSection(editData.section ||'');
    setAmcStatus(editData.amcStatus ||'');
    setwarrantyStatus(editData.warrantyStatus||'');
    setInsuranceStatus(editData.insuranceStatus||'');
    setProblemNote(editData.problemNote||'');
    setBpImages1(editData.bpImages1 || '');
    setBpImages2(editData.bpImages2 || '');
  }, [editData]);
  
  const handleViewRequestServiceException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }
  
  const handleClose = () => { 
    setOpen(false);
  };

  return (
    <div>
      <Dialog 
      open={open}
      maxWidth='lg'>
        <form>
          <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
            {"Service View"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} style={{ marginTop: '20px'}}>
              <Grid  xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Asset Name:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField  fullWidth
                label=""
                variant="outlined"
                value={assetName}/>
              </Grid>
              <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Department:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField fullWidth
                label=""
                variant="outlined"
                value={department}/>
              </Grid>
              <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Asset Type:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField  fullWidth
                label=""
                variant="outlined"
                value={assetType}/>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '20px'}}>
              <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Section:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField fullWidth
                label=""
                variant="outlined"
                value={section}/>
              </Grid>
              <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Amc Status:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField fullWidth
                label=""
                variant="outlined"
                value={amcStatus}/>
              </Grid>
              <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Warranty Status:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField fullWidth
                label=""
                variant="outlined"
                value={warrantyStatus}/>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '20px'}}>
              <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Insurance Status:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField fullWidth
                label=""
                variant="outlined"
                value={insuranceStatus}/>
              </Grid>
              <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Problem Note:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField fullWidth
                label=""
                variant="outlined"
                value={problemNote}/>
              </Grid>
            </Grid>
            <div style={{ margin: '30px' , border:'solid', borderColor:'whitesmoke'}}>
              <h2>Break Down Images</h2>
              <hr />
              <Grid container spacing={2} style={{ marginTop: '20px'}}>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label>Image 1:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                  <AccordionDetails>
                    <Typography>
                      <ImageList x={{ width: 500, height: 450 }} cols={4} rowHeight={164}>
                        <img
                        style={{width:'50px',height:'50px'}}
                        src={`https://varmatrix.com/AssetManagement${bpImages1}`}/>
                      </ImageList>
                    </Typography>
                  </AccordionDetails> 
                </Grid>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label>Image 2:</label>
                </Grid>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <AccordionDetails>
                    <Typography>
                      <ImageList x={{ width: 500, height: 420 }} cols={4} rowHeight={164}>
                        <img  style={{width:'50px',height:'50px'}}
                        src={`https://varmatrix.com/AssetManagement${bpImages2}`}/>
                      </ImageList>
                    </Typography>
                  </AccordionDetails>
                </Grid>
              </Grid>
            </div>
            <div>
              <Button style={{marginLeft:'800px'}}type='reset' onClick={handleClose}>Cancel</Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}

export default ServiceRequestView;



