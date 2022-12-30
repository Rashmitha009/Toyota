import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { DepartmentAddService, DepartmentUpdateService } from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';
import { Grid } from '@mui/material';

const DepartmentModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [departmentName,setDepartmentName]=useState("")
    const[description,setDescription]=useState("")
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    useEffect(() => {
        setDepartmentName(editData.department_name|| '');
        setDescription(editData.description || '');
    }, [editData]);

    const handleClose = () => {              
        setOpen(false);
        setDepartmentName('');
        setDescription('');
    };

      const handleCloseNotify = () => {
        setOpen(false);
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };
    
    const onSubmit = (e) => {
        e.preventDefault();
        isAdd === true ?
        (
            DepartmentAddService({
                department_name:departmentName,
                description:description,
            },handleSuccess, handleException)
        ) : (
                DepartmentUpdateService({
                    id: editData.id,
                    department_name:departmentName,
                    description:description,
                }, handleSuccess, handleException)
            );
    }
    const handleSuccess = (dataObject) =>{
        console.log(dataObject);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
          });
        
          
    }
    
    const handleException = (errorObject, errorMessage) =>{
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
            open={open}
            onClose={handleClose}
            fullWidth
            >
                <form onSubmit={onSubmit}> 
                    <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
                      {"ADD DEPARTMENT"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div>
                                <Grid container  style={{marginTop:'20px'}}>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                                     style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}}
                                    >
                                    <label >Department Name:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <TextField fullWidth 
                                        label=""
                                        variant="outlined"
                                        onChange={((e)=>{setDepartmentName(e.target.value)})}
                                        value={departmentName}
                                    />
                                    </Grid>
                                </Grid>

                                <Grid container  style={{marginTop:'20px'}}>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                                     style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}}
                                    >
                                   <label>Description:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <TextField 
                                        fullWidth
                                        multiline
                                        onChange={((e)=>{setDescription(e.target.value)})}
                                        value={description}
                                    />
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
                    handleClose={handleCloseNotify}
                    notificationContent={openNotification.message}
                    openNotification={openNotification.status}
                    type={openNotification.type}
                />
        </div>
    )
}

export default DepartmentModel
