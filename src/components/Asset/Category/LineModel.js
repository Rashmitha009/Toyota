import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Grid, InputLabel, Select } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { FetchGetUnitPlantService, LineAddService, LineUpdateService } from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';

const LineModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [unitPlant,setUnitPlant]=useState('');
    const [unitPlantList,setUnitPlantList]=useState([]);
    const [lineName,setLineName] = useState('');
    const[description,setDescription]=useState('')
    const [status,setStatus]=useState('');
    const[openNotification,setNotification]=useState({
        status: false,
        type: 'error',
        message:'',
    })

    useEffect(() => {
        FetchGetUnitPlantService(handleFetchUnitPlantSuccess, handleFetchUnitPlantException); 
        setUnitPlant(editData?.unitPlant || '');
        setLineName(editData?.lineName || '');
        setDescription(editData?.description || '');
    }, [editData]);

    const handleFetchUnitPlantSuccess = (dataObject) =>{
        setUnitPlantList(dataObject.data || []);
    }

    const handleFetchUnitPlantException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }

    const onUnitPlantChange = (e) => {
        setUnitPlant(e.target.value);
    }
 
    const onSubmit=(e)=>{
        e.preventDefault();
        isAdd === true ?
        (
            LineAddService({
                unitPlant:unitPlant,
                lineName:lineName,
                description:description,
            },handleSucess , handleException)
        ) : (
            LineUpdateService({
                id:editData.id,
                unitPlant:unitPlant,
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
        setUnitPlant([]);
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
        setUnitPlant('');
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
    
    

    const handleClose=()=>{
        setOpen(false);
        setUnitPlant('');
        setLineName('');
        setDescription('');
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
                                <Grid container spacing={2}  style={{marginTop:'10px'}}>

                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Unit/Plant"
                                            placeholder='Unit/Plant'
                                            value={unitPlant}
                                                onChange={(e) => onUnitPlantChange(e)}
                                                >
                                                    {
                                                       unitPlantList?.map((data, index) => {
                                                        return (
                                                            <MenuItem value={data.id} key={index}>{data.unitPlant}</MenuItem>
                                                        )
                                                    })} 
                                        </Select>
                                    </FormControl>
                                    
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField 
                                        fullWidth 
                                        placeholder='Line Name'
                                        label="Line Name"
                                        variant="outlined"
                                        onChange={((e)=>{setLineName(e.target.value)})}
                                        value={lineName}/>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField 
                                        fullWidth
                                        multiline
                                        label='Description'
                                        placeholder='Description'
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

export default LineModel
