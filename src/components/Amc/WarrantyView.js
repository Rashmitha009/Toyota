import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ViewWarranty } from '../../services/ApiServices';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';

const WarrantyView = ({ open, setOpen,  setRefresh , editData,isAdd  }) => {
  const [rows, setRows]=useState([]);
  const[description,setDescription]=useState("");
  const[assetId,setAssetId]=useState("");
  const [assetType,setAssetType] = useState("");
  const [section,setSection] = useState("");
  const [manufacturer,setManufacturer]=useState("");
  const [assetModel,setAssetModel]=useState("");
  const [bpImages2,setBpImages2]=useState("");
  
  useEffect(() => {
    ViewWarranty({id:editData.id},handleViewAmcService, handleViewAmcServiceException)
  }, [editData]);
  
  const handleViewAmcService = (dataObject) => {
    setAssetId(editData?.id|| '');
    setAssetType(dataObject?.data[0]?.assetType|| '');
    setSection(dataObject?.data[0]?.section|| '');
    setManufacturer(dataObject?.data[0]?.manufacturer|| '');
    setAssetModel(dataObject?.data[0]?.manufacturer|| '');
    setDescription(dataObject?.data[0]?.description|| '');
    setBpImages2(editData.bpImages2 || '');
  }
  
  const handleViewAmcServiceException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }
  
  const handleClose = () => { 
    setOpen(false);
    setDescription('');
  };
  
  return (
    <div>
      <Dialog  
      open={open}
      maxWidth='lg'>
        <form>
          <DialogTitle style={{background:'whitesmoke'}}>
            {"VIEW ASSET DETAILS"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form>
                <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>Asset Id: </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <TextField style={{marginLeft:'20px', width:'250px'}}
                    label=""
                    variant="outlined"
                    value={assetId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label>Asset Type:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                      <TextField style={{marginLeft:'20px', width:'250px'}}
                      label=""
                      variant="outlined"
                      value={assetType}/>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label>Section: </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                      <TextField style={{marginLeft:'20px', width:'250px'}}
                      label=""
                      variant="outlined"
                      value={section}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label>Manufacture:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                      <TextField style={{marginLeft:'20px', width:'250px'}}
                      label=""
                      variant="outlined"
                      value={manufacturer}/>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>Asset Model: </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                  <TextField style={{marginLeft:'20px', width:'250px'}}
                    label=""
                    variant="outlined"
                    value={assetModel}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>Description:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <TextField style={{marginLeft:'20px', width:'250px'}}
                    label=""
                    variant="outlined"
                    value={description}/>
                    
                    </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                        <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                            <label>Asset Image</label>
                        </Grid>
                        <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <AccordionDetails>
                    <Typography>
                      <ImageList x={{ width: 500, height: 450 }} cols={4} rowHeight={164}>
                        <img  style={{width:'50px',height:'50px'}}
                        src={`https://varmatrix.com/AssetManagement${bpImages2}`}/>
                      </ImageList>
                    </Typography>
                  </AccordionDetails>
                </Grid>
                    </Grid>

                    <div>
                    <Button type='reset' onClick={handleClose}>Cancel</Button>
                    <Button type='submit'></Button>
                    </div>

                     </form>
                            
                        </DialogContentText>
                    </DialogContent>
                </form>
            </Dialog>  
        </div>
    )
}
export default WarrantyView;




