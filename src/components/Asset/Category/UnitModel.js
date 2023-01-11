import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { UnitAddService, UnitUpdateService } from '../../../services/ApiServices'
import NotificationBar from '../../../services/NotificationBar';

const UnitModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [unitPlant,setUnitPlant]=useState("");
    const[description,setDescription]=useState("");
    const [status,setStatus]=useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    
    useEffect(() => {
        setUnitPlant(editData?.unitPlant || '');
        setDescription(editData?.description || '');
    }, [editData]);

    const handleClose=()=>{
        setOpen(false);
        setUnitPlant('');
        setDescription('');
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        isAdd === true ?
        (
            UnitAddService({
                unitName:unitPlant,
                description:description,
            }, handleAddSuccess, handleException)
        ) : (
            UnitUpdateService({
            id: editData.id,
            unitName:unitPlant,
            description:description,
          }, handleUpdateSuccess, handleException)
        );
    }
    
    const handleAddSuccess = (dataObject) => {
        console.log(dataObject);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
          type: 'success',
          message: dataObject.message,
        });
        clearForm();
        setUnitPlant('');
        setDescription('');
    }

    const clearForm = () => {
        setUnitPlant('');
        setDescription('');
    } 

    const handleUpdateSuccess = (dataObject) => {
        console.log(dataObject);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
          type: 'success',
          message: dataObject.message,
        });
        setOpen(false)
        
    }
    
    const handleException = (errorObject, errorMessage) => {
        console.log(errorMessage);
        setNotification({
          status: true,
          type: 'error',
          message: errorMessage,
        });
        setUnitPlant('');
        setDescription('');
    }
    
    const handleNotify = () => {
       
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };
    
    const onStatus=(e)=>{
        setStatus(e.target.value);
    }
  
    return (
        <div>
            <Dialog 
            open={open}
            onClose={handleClose}
            fullWidth>
                <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
                    {"ADD UNIT"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form onSubmit={onSubmit}> 
                            <div>
                                <Grid container spacing={2}  style={{marginTop:'10px'}}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField 
                                        fullWidth 
                                        label="Unit/Plant"
                                        placeholder='Unit/Plant'
                                        variant="outlined"
                                        required
                                        onChange={((e)=>{setUnitPlant(e.target.value)})}
                                        value={unitPlant}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField 
                                        fullWidth
                                        multiline
                                        required
                                        label='Description'
                                        placeholder='Description'
                                        onChange={((e)=>{setDescription(e.target.value)})}
                                        value={description}/>
                                    </Grid>
                                </Grid>
                                {/* <Grid container  style={{marginTop:'10px'}}>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                                        style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}}
                                    >
                                        <label>Status:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                                        style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}}
                                    >
                                        <FormControl>
                                        <RadioGroup
                                            row
                                            value={status}
                                            onChange={onStatus}
                                        >
                                            <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                            <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                                        </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid> */}
                                <div style={{marginLeft:'70%',marginTop:'10px'}}>
                                <Button type='reset' onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>
                                    {isAdd === true ? 'Add' : 'Update'}
                                </Button>
                                </div>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
        </Dialog>
        <NotificationBar
        handleClose={handleNotify}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}/>  
    </div>

  )
}

export default UnitModel;
