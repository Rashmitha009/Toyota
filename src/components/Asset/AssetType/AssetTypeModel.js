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
import { AssetTypeAddService, 
    AssetTypeUpdateService,
    FetchDepaertmentService,
    FetchSectionService , 
} from '../../../services/ApiServices';
import { Grid } from '@mui/material';
import NotificationBar from '../../../services/NotificationBar';

const AssetTypeModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [department,setdepartment]=useState("");
    const [departmentList, setDepartmentList] = useState([]);
    const [section,setSection]=useState("");
    const [sectionList,setSectionList]=useState([]);
    const [assetType,setAssetType]=useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    const handleClose = () => {
        setOpen(false);
        setAssetType('' );
        setdepartment('');
        setSection('');
    };
    
    const handleCloseNotify = () => {
        setOpen(false);
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };

    const handleClickOpen = () => {
        setOpen(true);
    };


    useEffect(() => {
        FetchDepaertmentService(handleFetchSuccess, handleFetchException);
        setAssetType(editData?.assetType || '' );
        setdepartment(editData?.departmentId || '');
        setSection(editData?.sectionId || '');
    }, [editData]);
    
    const handleFetchSuccess = (dataObject) =>{
        setDepartmentList(dataObject.data);
        if(editData?.departmentId ){
            FetchSectionService({id:editData?.departmentId},handleFetchSection,handleFetchSectionException );
        }
    }
    const handleFetchSection=(dataObject)=>{
        setSectionList(dataObject.data);
    }
    const handleFetchSectionException=(errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const handleFetchException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        isAdd === true ?
        (
            AssetTypeAddService({
                department:department,
                section:section,
                assetType:assetType,
            },handleSuccess, handleException)
        ) : (
            AssetTypeUpdateService({
                id: editData.id,
                department:department,
                section:section,
                assetType:assetType,
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
          setAssetType('' );
          setdepartment('');
          setSection('');
             
    }
    
    const handleException = (errorObject, errorMessage) =>{
        console.log(errorMessage);
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
          });
          setAssetType('' );
          setdepartment('');
          setSection('');
    }

    const onDepartmentChange = (e) => {
        setdepartment(e.target.value);
        FetchSectionService ({
            id: e.target.value
        },handleFetchDepartmentSuccess, handleFetchDepartmentException);
    
      }
      const handleFetchDepartmentSuccess = (dataObject) =>{
        setSectionList(dataObject.data);

      }
      const handleFetchDepartmentException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
      }

      const onSectionChange = (e) => {
        setSection(e.target.value);    
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
                        <div>
                            <Grid container style={{marginTop:"20px"}}>
                                <Grid item xs={10} sm={5} md={5} lg={5} xl={5}
                                 style={{alignSelf:'center', textAlign:'center',marginLeft:'10px'}}
                                >
                                <label>Depatmrent:</label>
                                </Grid>
                                <Grid item xs={10} sm={6} md={6} lg={6} xl={6}
                                style={{marginLeft:'10px'}}
                                >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
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
                            </Grid>

                            <Grid container style={{marginTop:"20px"}}>
                                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}
                                style={{alignSelf:'center', textAlign:'center',marginLeft:'10px'}}
                                >
                                <label>Section:</label>
                                </Grid>
                                <Grid item xs={10} sm={6} md={6} lg={6} xl={6}
                                 style={{marginLeft:'10px'}}
                                >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                                    <Select
                                    label="Select Section"
                                    value={section}
                                    onChange={(e) => onSectionChange(e)}>
                                        {sectionList.map((data, index) => {
                                            return (
                                                <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container style={{marginTop:"20px"}}>
                                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}
                                 style={{alignSelf:'center', textAlign:'center',marginLeft:'10px'}}
                                >
                                <label >Asset Type :</label>
                                </Grid>
                                <Grid item xs={10} sm={6} md={6} lg={6} xl={6}
                                    style={{marginLeft:'10px'}}
                                >
                                <TextField 
                                   fullWidth
                                    id="outlined-basic" label=""
                                    variant="outlined" 
                                    value={assetType}
                                    onChange={(e)=>{setAssetType(e.target.value)}}
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

export default AssetTypeModel;
