import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import NotificationBar from '../../../services/NotificationBar';
import { RequesterDepartmentAddService, RequesterDepartmentUpdateService } from '../../../services/ApiServices';

const RequesterModal = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [requesterDepartment,setRequesterDepartment] = useState('');
    const[description,setDescription]=useState('')
    const[openNotification,setNotification]=useState({
        status: false,
        type: 'error',
        message:'',
    })

    useEffect(() => {
        setRequesterDepartment(editData?.requesterDepartment || '');
        setDescription(editData?.description || '');
    }, [editData]);
 
    const handleClose=()=>{
        setOpen(false);
        setRequesterDepartment('');
        setDescription('');
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        isAdd === true ?
        (
            RequesterDepartmentAddService({
                requesterDepartment:requesterDepartment,
                description:description,
            },handleSucess , handleException)
        ) : (
            RequesterDepartmentUpdateService({
                id:editData.id,
                requesterDepartment:requesterDepartment,
                description:description,
            },handleSucess, handleException)
        );
    }

    const handleSucess = (dataObject) => {
        console.log(dataObject);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type:'success',
            message: dataObject.message,
        });
        setRequesterDepartment('');
        setDescription('');
    }

    const handleException = (errorObject, errorMessage) => {
        console.log(errorMessage);
        setNotification({
          status: true,
          type: 'error',
          message: errorMessage,
        });
        setRequesterDepartment('');
        setDescription('');
    }
    
    const handleNotify = () => {
        setOpen(false)
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };

    
  
    return (
        <div>
            <div>
                <Dialog 
                open={open}
                onClose={handleClose}
                fullWidth>
                    <form onSubmit={onSubmit} > 
                    <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
                      {"ADD REQUESTER DEPARTMENT"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div>
                                <Grid container  style={{marginTop:'20px'}}>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}} >
                                        <label >Requester Department:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <TextField 
                                        fullWidth 
                                        label=""
                                        variant="outlined"
                                        onChange={((e)=>{setRequesterDepartment(e.target.value)})}
                                        value={requesterDepartment}/>
                                    </Grid>
                                </Grid>
                                <Grid container  style={{marginTop:'20px'}}>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}}>
                                        <label>Description:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <TextField 
                                        fullWidth
                                        multiline
                                        onChange={((e)=>{setDescription(e.target.value)})}
                                        value={description}/>
                                    </Grid>
                                </Grid>
                                
                                <div style={{marginLeft:'70%',marginTop:'20px'}}>
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
        </div>
    )
}

export default RequesterModal
