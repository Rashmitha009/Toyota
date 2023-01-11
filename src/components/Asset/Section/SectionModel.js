import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { SectionAddService, SectionUpdateService } from '../../../services/ApiServices'
import NotificationBar from '../../../services/NotificationBar';

const SectionModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [section,setSection]=useState("");
    const[description,setDescription]=useState("");
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    
    useEffect(() => {
        setSection(editData?.section || '');
        setDescription(editData?.description || '');
    }, [editData]);
    
    const onSubmit=(e)=>{
        e.preventDefault();
        isAdd === true ?
        (
            SectionAddService({
                section:section,
                description:description,
            }, handleAddSuccess, handleException)
        ) : (
            SectionUpdateService({
            id: editData.id,
            section:section,
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
        setSection('');
        setDescription('');
    }
    
    const clearForm = () => {
        setSection('');
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
        setSection('');
        setDescription('');
    }
    
    const handleNotify = () => {
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };
    
    const handleClose=()=>{
        setOpen(false);
        setSection('');
        setDescription('');
    }
  
    return (
        <div>
            <Dialog
            open={open}
            onClose={handleClose}
            fullWidth>
                <form onSubmit={onSubmit}> 
                <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
                    {"ADD SECTION"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div>
                            <Grid container spacing={2}  style={{marginTop:'10px'}}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <TextField fullWidth 
                                    variant="outlined"
                                    label="Section"
                                    placeholder='Section'
                                    onChange={((e)=>{setSection(e.target.value)})}
                                    value={section}/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <TextField 
                                    fullWidth
                                    label="Description"
                                    placeholder='Description'
                                    multiline
                                    onChange={((e)=>{setDescription(e.target.value)})}
                                    value={description}/>
                                </Grid>
                            </Grid>
                            
                            <div style={{marginLeft:'70%',marginTop:'10px'}}>
                                <Button type='reset' onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>
                                    {isAdd === true ? 'Add' : 'Update'}
                                </Button>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </form>
        </Dialog>

        <NotificationBar
        handleClose={handleNotify}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}/>  
    </div>

  )
}

export default SectionModel;
