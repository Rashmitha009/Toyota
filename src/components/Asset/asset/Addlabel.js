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
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                                        style={{alignSelf:'center', textAlign:'center'}}
                                    >
                                    <label >Department : </label>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <FormControl  fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                                            <Select 
                                            labelId="Department"
                                            id="Department"
                                            label="Select Department"
                                            value={department}
                                            onChange={(e) => onDepartmentChange(e)}>
                                            {departmentList.map((data, index) => {
                                                return (
                                                    <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                                                )
                                            })}                                                                                                                                                                                                                                                                                                     
                                            </Select>
                                        </FormControl>  
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{marginTop:'2px'}}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                                        style={{alignSelf:'center', textAlign:'center'}}
                                    >
                                        <label > Select Section : </label>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <FormControl fullWidth>
                                            <InputLabel  id="demo-simple-select-label">Select Section</InputLabel>
                                            <Select
                                            labelId="SelectSection"
                                            id="Select Section"
                                            value={section}
                                            label="Select Section"
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
                                <Grid container spacing={2} style={{marginTop:'2px'}}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                                        style={{alignSelf:'center', textAlign:'center'}}
                                    >
                                        <label >Asset Type : </label>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Asset Type</InputLabel>
                                            <Select 
                                            labelId="AssetType"
                                            id="AssetType"
                                            value={assetType}
                                            label="Select Asset Type"
                                            onChange={(e) => onAssetTypeChange(e)}>
                                            {assetTypeList.map((data, index) => {
                                                return (
                                                    <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                                                )
                                            })}   
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{marginTop:'2px'}}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                        style={{alignSelf:'center', textAlign:'center'}}
                                    >
                                        <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                                        <RadioGroup
                                        row aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={redio}
                                        onChange={onChangeRedio}>
                                            <FormControlLabel 
                                                style={{
                                                    marginLeft:'5px'
                                                }} 
                                                value="asset" 
                                                control={<Radio />
                                                } label="Select Asset"
                                            />
                                            <FormControlLabel 
                                            style={{
                                            marginLeft:'50px'
                                            }} 
                                            value="assetId"
                                            control={<Radio />
                                            } label="Select Asset Id"/>
                                        </RadioGroup>
                                    </FormControl>
                                    </Grid>
                                    
                                </Grid>
                                {
                                    redio=== "asset" &&
                                    <>
                                    <Grid container spacing={2} style={{marginTop:'2px'}}>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                                            style={{alignSelf:'center', textAlign:'center'}}
                                        >
                                            <label >Select Asset : </label>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                            <FormControl  fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select Asset Name</InputLabel>
                                                <Select 
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Select Asset Name"
                                                    value={assetName}
                                                    onChange={(e) => handleChange(e)}>
                                                        {
                                                            assetNameList.map((data, index) => {
                                                                return (
                                                                    <MenuItem value={data.id} key={index}>{data.assetName}</MenuItem>
                                                                )
                                                            })
                                                        }   
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    </>
                                }
                                {
                                    redio=== "assetId" &&
                                    <>
                                        <Grid container spacing={2} style={{marginTop:'2px'}}>
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
                                    </>
                                }
                                    <Grid container spacing={2} style={{marginTop:'2px'}}>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                            style={{alignSelf:'center', textAlign:'center'}}
                                        >
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                                            <RadioGroup
                                            row 
                                            onChange={onBarCodeChange}
                                            value={barCode}>
                                                <FormControlLabel style={{marginLeft:'5px'}} value="barCode" control={<Radio />} label="BARCODE" />
                                                <FormControlLabel style={{marginLeft:'50px'}} value="qrCode" control={<Radio />} label="QRCODE" />
                                            </RadioGroup>
                                        </FormControl>
                                        </Grid>
                                    </Grid>
                            </div>
                            <Grid container spacing={2} style={{maginTop:'20px'}}>
                                <Grid item xs={10} sm={6} md={6} lg={6} xl={6}
                                    style={{alignSelf:'center',textAlign:'center'}}
                                >
                                    <Button variant="contained" type="submit">Submit</Button>
                                </Grid>
                                <Grid item xs={10} sm={6} md={6} lg={6} xl={6} 
                                    style={{alignSelf:'center',textAlign:'center'}}
                                >
                                    <Button variant="contained" onClick={onClikCancel}>Cancel</Button>
                                </Grid>
                            </Grid>
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