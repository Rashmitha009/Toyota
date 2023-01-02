import React, { useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { AssetLabelAddService, FetchAssetNameService, FetchAssetTypeService, FetchDepaertmentService, FetchSectionService, UserAddService, UserUpdateService } from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';

export default function Addlabel({ open, setOpen, isAdd, editData, setRefresh }) {
    const [departmentList, setDepartmentList] = useState([]);
    const [ sectionList,  setSectionList] = useState([]);
    const [ section,  setSection] = useState('');
    const [department, setDepartment] = useState('');
    const [ assetTypeList,  setAssetTypeList] = useState([]);
    const [ assetType,  setAssetType] = useState('');
    const [ assetId,  setAssetId] = useState('');
    const [redio, setRedio] = useState("asset");
    const [assetNameList , setAssetNameList]=useState([]);
    const [assetName , setAssetName]=useState('');
    const [barCode , setBarCode]=useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    useEffect(() => {
        FetchDepaertmentService(handleFetchSuccess, handleFetchException);
    }, [editData]);

    const handleFetchSuccess = (dataObject) =>{
        setDepartmentList(dataObject.data);
    }

    const handleFetchException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }

    const onChangeRedio = (event) => {
        setRedio(event.target.value);
    };

    const onDepartmentChange = (e) => {
        setDepartment(e.target.value);
        FetchSectionService({
            id: e.target.value
        }, handleFetchSection, handleFetchSectionException)
    }

    const handleFetchSection = (dataObject) => {
        setSectionList(dataObject.data);
    }

    const handleFetchSectionException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }

    const onSectionChange = (e) => {
        setSection(e.target.value);
        FetchAssetTypeService({ id: e.target.value }, handleFetchAssetType, handleFetchAssetTypeException)
    }

    const handleFetchAssetType = (dataObject) => {
        setAssetTypeList(dataObject.data);
    }

    const handleFetchAssetTypeException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }

    const onAssetTypeChange = (e) => {
        setAssetType(e.target.value);
        FetchAssetNameService({id:e.target.value},handleAssetNameService, handleAssetNameServiceException)
    }

    const handleAssetNameService=(dataObject)=>{
        setAssetNameList(dataObject.data);
    }

    const  handleAssetNameServiceException=(erroeStatus , errorMessage)=>{
        console.log(errorMessage);
    }
  
    const handleClose = () => {
        setOpen(false); 
    };
  
    const onSubmit = (e) => {
        e.preventDefault();
        AssetLabelAddService({
            department:department,
            selectSection:section,
            assetType:assetType,
            selectAssetType : redio,
            selectAsset:assetName,
            selectAssetId:assetId,
            code : barCode,   
        },handleSuccess, handleException)
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
        setAssetType('');
        setAssetId('');
        setRedio('');
        setAssetName('');
        setBarCode('');
    }
  
    const handleException = (errorObject, errorMessage) =>{
        console.log(errorMessage);
        setNotification({
            status: true,
            type: 'error',
            message:errorMessage,
        });
        setSection('');
        setDepartment('');
        setAssetType('');
        setAssetId('');
        setRedio('');
        setAssetName('');
        setBarCode('');
    }
 
    const handleCloseNotify = () => {
        setOpen(false)
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };
    
    const handleChange = (event) => {
        setAssetName(event.target.value);
    };
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } 
    };

    const onBarCodeChange=(e)=>{
        setBarCode(e.target.value);
    }
    const onClikCancel=()=>{
        setOpen(false);
        setSection('');
        setDepartment('');
        setAssetType('');
        setAssetId('');
        setRedio('');
        setAssetName('');
        setBarCode('');
    }

    return (
        <div>            
            <Dialog 
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
                    {"ADD Label"} 
                </DialogTitle>  
                 <form onSubmit={onSubmit}>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div>
                                <Grid container spacing={2} style={{marginTop:'0px'}}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                                        style={{alignSelf:'center', textAlign:'center'}}
                                    >
                                    <label >Asset ID : </label>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <TextField
                                        id="Vendor-Address"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => { setAssetId(e.target.value) }}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{marginTop:'5px'}}>
                                    <Grid item xs={10} sm={6} md={6} lg={6} xl={6}
                                        style={{alignSelf:'center',textAlign:'center'}}
                                    >
                                        <Button variant="contained" type="submit">Generate QRcode</Button>
                                    </Grid>
                                    <Grid item xs={10} sm={6} md={6} lg={6} xl={6} 
                                        style={{alignSelf:'center',textAlign:'center'}}
                                    >
                                        <Button variant="contained" onClick={onClikCancel}>Cancel</Button>
                                    </Grid>
                                </Grid>
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