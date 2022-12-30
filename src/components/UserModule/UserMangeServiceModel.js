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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { FetchAddRequesService, FetchUserGetAssetNameService, FetchUserGetShowStatusService } from '../../services/ApiServices';

const UserMangeServiceModel = ({open, setOpen, isAdd, editData, setRefresh}) => {
    const [assetName, setAssetName] = useState('');
    const [assetNameList, setAssetNameList]=useState([]);
    const [problem,setProblem]=useState('');
    const [problemList,setProblemList]=useState('');
    const [image1,setImage1]=useState('');
    const [image2,setImage2]=useState('');
    const [amcStatus,setAmcStatus]=useState('');
    const [warrantyStatus, setWarrantyStatus]=useState('');
    const [insurance,setInsurance]=useState('');
    const [remark,setRemark]=useState('');
    const [problemNote,setproblemNote]=useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
      });

    const handleChange = (e) => {
      setAssetName(e.target.value);
      FetchUserGetShowStatusService({id:e.target.value},handleUserGetShowStat,handleUserGetShowException);
    };

    const handleUserGetShowStat=(dataObject)=>{
        setAmcStatus(dataObject?.data[0]?.amc);
        setWarrantyStatus(dataObject?.data[0]?.warranty);
        setInsurance(dataObject?.data[0]?.insurance);
    }
    const handleUserGetShowException=()=>{

    }

    const onChangeProblem=(e)=>{
        setproblemNote(e.target.value);
    }
    
      const handleCloseNotify = () => {
        setOpen(false)
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };
    const onSeletion=(e)=>{
        setProblem(e.target.value);
    }
   const onClickCancel=()=>{
    setOpen(false);
   }
   useEffect(()=>{
    FetchUserGetAssetNameService(handleFetchUserGetAssetName,handleFetchUserGetAssetNameException);
   },[]);

   const handleFetchUserGetAssetName=(dataObject)=>{
    setAssetNameList(dataObject?.data);
   }
const handleFetchUserGetAssetNameException=()=>{

}
const onSubmit=(e)=>{
    e.preventDefault();
    FetchAddRequesService({
        assetName:assetName,
        amcStatus:amcStatus,
        warrantyStatus:warrantyStatus,
        insuranceStatus:insurance,
        problem:problem,
        problemNote:problemNote,
        problemRemark:remark,
        image1:image1,
        image2:image2,
    },handleFetchAddReques,handleFetchAddRequesException);
}
const handleFetchAddReques=(dataObject)=>{
    console.log(dataObject);
    setNotification({
        status: true,
        type: 'success',
        message: dataObject.message,
      });

}
const handleFetchAddRequesException=( errorStatus,errorMessage)=>{
    setNotification({
        status: true,
        type: 'error',
        message: errorMessage,
      });
}

  return (
    <Dialog
    open={open}
    fullWidth
    maxWidth='lg' >
    <form onSubmit={onSubmit}>
      <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
         Add 
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        <div>
            
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                    style={{alignSelf:'center', textAlign:'center'}}
                >
                    <h3>Service Request</h3>
                </Grid>
            </Grid>
            <hr/>
            <Grid container spacing ={2} style={{marginTop:'10px'}}>
                <Grid  item xs={6} sm={6} md={1.5} lg={1.5} xl={1.5}
                 style={{alignSelf:'center', textAlign:'center'}}
                >
                    <label>Asset Name:</label>
                </Grid>
                <Grid  item xs={6} sm={6} md={2} lg={2} xl={2}
                 style={{alignSelf:'center', textAlign:'center'}}
                >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Asset Name</InputLabel>
                    <Select
                    value={assetName}
                    label="Select Asset Name"
                    onChange={(e)=>handleChange(e)}
                    >
                    {
                        assetNameList.map((data, index) => {
                        return (
                            <MenuItem value={data.id} key={index}>{data.assetName}</MenuItem>
                        )
                    })}
                    </Select>
                </FormControl>
                </Grid>
                <Grid  item xs={6} sm={6} md={1.5} lg={1.5} xl={1.5}
                 style={{alignSelf:'center', textAlign:'center'}}
                >
                    <label>AMC Status :</label>
                </Grid>
                <Grid  item xs={6} sm={6} md={2} lg={2} xl={2}
                 style={{alignSelf:'center', textAlign:'center'}}
                >
                <TextField 
                    fullWidth 
                    id="outlined-basic" 
                    label="AMC Status "
                    variant="outlined" 
                    value={amcStatus}
                />

                </Grid>
                <Grid  item xs={6} sm={6} md={1.5} lg={1.5} xl={1.5}
                 style={{alignSelf:'center', textAlign:'center'}}
                >
                    <label>Warranty Status:</label>
                </Grid>
                <Grid  item xs={6} sm={6} md={2} lg={2} xl={2}
                 style={{alignSelf:'center', textAlign:'center'}}
                >
                <TextField 
                    fullWidth 
                    id="outlined-basic" 
                    label="Warranty Status" 
                    variant="outlined" 
                    value={warrantyStatus}
                />

                </Grid>
            </Grid>
            <Grid container style={{marginTop:'10px'}}>
                <Grid item xs={6} sm={6} md={1.5} lg={1.5} xl={1.5}
                 style={{alignSelf:'center', textAlign:'center'}}>
                    <label>Insurance Status:</label>
                </Grid>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}
                 style={{alignSelf:'center', textAlign:'center'}}>
                <TextField 
                    fullWidth 
                    id="outlined-basic" 
                    label="Insurance Status" 
                    variant="outlined" 
                    value={insurance}
                />
                </Grid>
                <Grid item xs={6} sm={6} md={1.5} lg={1.5} xl={1.5}
                 style={{alignSelf:'center', textAlign:'center'}}>
                    <label>Problem Note :</label>
                </Grid>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}
                 style={{alignSelf:'center', textAlign:'center'}}>
                <FormControl>
                    <RadioGroup
                        row
                      onChange={onSeletion}
                      value={problem}
                    >
                        <FormControlLabel value="Select" control={<Radio />} label="Select" />
                        <FormControlLabel value="Others" control={<Radio />} label="Others" />
                    </RadioGroup>
                </FormControl>
                </Grid>
                </Grid>
            <Grid container spacing={2} style={{marginTop:'10px'}}>
            {
                problem === 'Select' &&
                <>
                
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <FormControl   fullWidth  >
                            <InputLabel id="demo-simple-select-label">Select Problem Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={problemNote}
                            label="Select Problem Category<"
                            onChange={onChangeProblem}
                            >
                            <MenuItem value={'Machine not Working'}>Machine not Working </MenuItem>
                            <MenuItem value={'Overheating of Machine Tool'}>Overheating of Machine Tool </MenuItem>
                            <MenuItem value={'Display Issue'}>Display Issue</MenuItem>
                            <MenuItem value={'Service Issue'}>Service Issue</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField 
                        fullWidth 
                        id="outlined-basic" 
                        label="Enter Problem Remark here.." 
                        variant="outlined" 
                        value={remark}
                        onChange={(e)=>setRemark(e.target.value)}
                        multiline
                    />
                    </Grid>
                </>
            }{
                problem !== 'Select' &&
                <>
                
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Enter Problem Note" 
                            variant="outlined" 
                            multiline
                            value={ problemNote}
                          onChange={(e)=> setproblemNote(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Enter Problem Remark here.." 
                            variant="outlined" 
                            multiline
                            value={remark}
                            onChange={(e)=>setRemark(e.target.value)}
                        />
                    </Grid>
                </>
            }
            
             </Grid>
             <Grid container style={{marginTop:'10px'}}>
                <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
                    style={{alignSelf:'center', textAlign:'center'}}
                >
                    <h3>Effected Asset</h3>
                </Grid>
             </Grid>
             <Grid container style={{marginTop:'10px'}}>
                <Grid item  xs={6} sm={6} md={2} lg={2} xl={2}
                  style={{alignSelf:'center', textAlign:'center'}}
                >
                    <label>Image1 :</label>
                </Grid>
                <Grid item  xs={6} sm={6} md={3} lg={3} xl={3}
                >
                    <TextField
                        fullWidth
                        label="Image1"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setImage1(reader.result);
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                        InputLabelProps={{ shrink: true }}
                        type="file"
                     />
                </Grid>
                <Grid item  xs={6} sm={6} md={2} lg={2} xl={2}
                  style={{alignSelf:'center', textAlign:'center'}}
                >
                    <label>Image2 :</label>
                </Grid>
                <Grid item  xs={6} sm={6} md={3} lg={3} xl={3}
                >
                    <TextField
                        fullWidth
                        label="Image2"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setImage2(reader.result);
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
          <Button type='reset' onClick={onClickCancel} >Cancel</Button>
          <Button type='submit'>
           Request
          </Button>
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
  )
}

export default UserMangeServiceModel
