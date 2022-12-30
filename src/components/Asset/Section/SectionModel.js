import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SectionAddService,SectionUpdateService,FetchDepaertmentService  } from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';
import { Grid } from '@mui/material';

const SectionModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [departmentList, setDepartmentList] = useState([])
    const [department,setDepartment]=useState("");
    const [section,setSection]=useState("");
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    
    
    const handleClose = () => {
        setOpen(false);
        setSection('');
        setDepartment('');
   
    };
    
    useEffect(() => {
        FetchDepaertmentService(handleFetchSuccess, handleFetchException);
        setSection(editData?.section || '');
        setDepartment(editData?.departmentId || '');
    }, [editData]);
    
    const handleFetchSuccess = (dataObject) =>{
        setDepartmentList(dataObject.data);
       
    }
    
    const handleFetchException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const onDepartmentChange = (e) => {
        setDepartment(e.target.value);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        isAdd === true ?
        (
            SectionAddService({
                department:department,
                section:section,
            
            },handleSuccess, handleException)
        ) : (
            SectionUpdateService({
            id: editData.id,
            department:department,
            section:section,
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
          setSection('');
          setDepartment('');
     

    }
    
    const handleException = (errorObject, errorMessage) =>{
        console.log(errorMessage);
        setSection('');
        setDepartment('');
   
    }
    const handleCloseNotify = () => {
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };
    
    return (
        <div>
            <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            >
                <form onSubmit={onSubmit}>
                    <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
                        {"ADD SECTION"}
                    </DialogTitle>
                    <div>
                        <Grid container spacing={2} style={{marginTop:'20px',marginLeft:'5px'}}>
                            <Grid item xs={10} sm={4} md={4} lg={4} xl={4}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                            <label>Department:</label>
                            </Grid>
                            <Grid item xs={10} sm={5} md={5} lg={5} xl={5}
                                style={{alignSelf:'center', }}
                            >
                            <FormControl 
                                    fullWidth>
                                    <InputLabel >Select Department</InputLabel>
                                    <Select
                                    label="Select Department"
                                    value={department}
                                    onChange={(e) => onDepartmentChange(e)}>
                                        {   
                                            departmentList.map((data, index) => {
                                            return (
                                                <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>x
                        <Grid container spacing={2} style={{marginTop:'20px',marginLeft:'5px'}}>
                            <Grid item xs={10} sm={4} md={4} lg={4} xl={4}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                            <label >Section:</label>
                            </Grid>
                            <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={section} 
                                onChange={(e) => {setSection(e.target.value)}}/>
                            </Grid>
                        </Grid>           
                        <div style={{marginLeft:'70%',marginTop:'20px'}}>
                            <Button type='reset' onClick={handleClose}>Cancel</Button>
                            <Button type='submit'>
                                {isAdd === true ? 'Add'   : 'Update'}
                            </Button>
                        </div>
                    </div>
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

export default SectionModel