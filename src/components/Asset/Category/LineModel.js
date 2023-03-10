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
import { LineAddService, LineUpdateService } from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';

const LineModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [lineName,setLineName] = useState('');
    const[description,setDescription]=useState('')
    const [status,setStatus]=useState('');
    const[openNotification,setNotification]=useState({
        status: false,
        type: 'error',
        message:'',
    })

    useEffect(() => {
        setLineName(editData?.lineName || '');
        setDescription(editData?.description || '');
    }, [editData]);
 
    const handleClose=()=>{
        setOpen(false);
        setLineName('');
        setDescription('');
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        isAdd === true ?
        (
            LineAddService({
                lineName:lineName,
                description:description,
            },handleSucess , handleException)
        ) : (
            LineUpdateService({
                id:editData.id,
                lineName:lineName,
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
        setLineName('');
        setDescription('');
    }

    const handleException = (errorObject, errorMessage) => {
        console.log(errorMessage);
        setNotification({
          status: true,
          type: 'error',
          message: errorMessage,
        });
        setLineName('');
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

    const onStatus=(e)=>{
        setStatus(e.target.value);
      }
  
    return (
        <div>
            <div>
                <Dialog 
                open={open}
                onClose={handleClose}
                fullWidth>
                    <form  onSubmit={onSubmit}> 
                    <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
                      {"ADD LINE"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div>
                                <Grid container  style={{marginTop:'20px'}}>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}} >
                                        <label >Line Name:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <TextField 
                                        fullWidth 
                                        label=""
                                        variant="outlined"
                                        onChange={((e)=>{setLineName(e.target.value)})}
                                        value={lineName}/>
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
                                <Grid container  style={{marginTop:'10px'}}>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}}>
                                    <label>Status:</label>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}}>
                                    <FormControl>
                                        <RadioGroup
                                        row
                                        value={status}
                                        onChange={onStatus}>
                                            <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                            <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                                        </RadioGroup>
                                    </FormControl>
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

export default LineModel
