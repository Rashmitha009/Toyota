import React,{useState,useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {
        FetchDepaertmentService,
        FetchSectionService,
        FetchAssetTypeService , 
        FetchAssetNameService,
        FetchAsstTransferService
     } from '../../services/ApiServices';
import { Grid, MenuItem } from '@mui/material';
import NotificationBar from '../../services/NotificationBar';

const Transferasset = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [departmentList, setDepartmentList] = useState([]);
    const [sectionList,setSectionList] = useState([]);
    const [departmentListMove, setDepartmentListMove] = useState([]);
    const [sectionListMove,setSectionListMove] = useState([]);
    const [assetTypeListMove,setAssetTypeListMove] = useState([]);
    const [assetNameList,setAssetNameList] = useState([]);
    const [assetName,setAssetName] = useState('');
    const [department,setDepartment]=useState("");
    const [departmentMove,setDepartmentMove]=useState("");
    const [section,setSection]=useState("");
    const [sectionMove,setSectionMove]=useState("");
    const [assetTypeList,setAssetTypeList] = useState([]);
    const [assetType,setAssetType] = useState('');
    const [assetTypeMove,setAssetTypeMove] = useState('');
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
    
    const onDepartmentChange = (e) => {
        setDepartment(e.target.value);
        FetchSectionService ({
            id: e.target.value
        },handleFetchDepartmentSuccess, handleFetchDepartmentException);
    };

    const handleFetchDepartmentSuccess = (dataObject) =>{
        setSectionList(dataObject.data);
    }
    
    const handleFetchDepartmentException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const onSectionChange = (e) => {
        setSection(e.target.value);
        FetchAssetTypeService ({
            id: e.target.value
        },handleFetchAssetTypeSuccess, handleFetchAssetTypeException);
    };

    const handleFetchAssetTypeSuccess = (dataObject) =>{
        setAssetTypeList(dataObject.data);
    }
    
    const handleFetchAssetTypeException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }

    const onAssetTypeChange = (e)=>{
        setAssetType(e.target.value);
        FetchAssetNameService ({
            id: e.target.value
        },handleFetchAssetNameSuccess , handleFetchAssetNameException);
    };

    const handleFetchAssetNameSuccess = (dataObject) =>{
        setAssetNameList(dataObject.data);
    }
    
    const handleFetchAssetNameException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const onAssetNameChange = (e)=>{
        setAssetName(e.target.value);
    }
    
    const onDepartmentMoveChange = (e) => {
        setDepartmentMove(e.target.value);
        FetchSectionService ({
            id: e.target.value
        },handleFetchDepartmentMoveSuccess, handleFetchDepartmentMoveException);
    };
    
    const handleFetchDepartmentMoveSuccess = (dataObject) =>{
        setSectionListMove(dataObject.data);
    }
    
    const handleFetchDepartmentMoveException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const onSectionMoveChange = (e) => {
        setSectionMove(e.target.value);
        FetchAssetTypeService ({
            id: e.target.value
        },handleFetchAssetTypeMoveSuccess, handleFetchAssetTypeMoveException);
    };
    
    const handleFetchAssetTypeMoveSuccess = (dataObject) =>{
        setAssetTypeListMove(dataObject.data);
    }
    
    const handleFetchAssetTypeMoveException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const onAssetTypeMoveChange = (e)=>{
        setAssetTypeMove(e.target.value);
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
        FetchAsstTransferService({
            id:assetName ,
            department:departmentMove,
            section:sectionMove,
            assetType:assetTypeMove,
        },handleFetchAsstTransferServiceSuccess, handleFetchAsstTransferServiceException)
    }

    const handleFetchAsstTransferServiceSuccess = (dataObject) =>{
        setAssetTypeMove('');
        setSectionMove('');
        setDepartmentMove('');
        setAssetType('');
        setAssetName('');
        setSection('');
        setDepartment('');
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.massage,
        });
    }
    
    const handleFetchAsstTransferServiceException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setAssetTypeMove('');
        setSectionMove('');
        setDepartmentMove('');
        setAssetType('');
        setAssetName('');
        setSection('');
        setDepartment('');
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <Grid container spacing={2} style={{display:'flex'}}>
                    <Grid container  item xs={10} sm={10} md={5} lg={5} xl={5}
                    style={{border:'solid',borderColor:'whitesmoke',marginTop:'20px',marginLeft:'10px'}}
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{alignSelf:'center', textAlign:'center'}}
                        >
                        <h3>From</h3>
                        <hr />
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label>Department:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
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
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label>Section:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px'}}
                            >
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                                    <Select
                                    labelId="Select Section"
                                    id="Select Sectiont"
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
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                    <label>Asset Type:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px'}}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Asset Type</InputLabel>
                                    <Select
                                    labelId="Select Asset Type"
                                    id="Select Asset Type"
                                    label="Select Asset Type"
                                    value={assetType}
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
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label >Asset Name:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px'}}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Asset Name</InputLabel>
                                    <Select
                                    labelId="Select Asset Name"
                                    id="Select Asset Name"
                                    value={assetName}
                                    label="Select Asset Name"
                                    onChange={(e) => onAssetNameChange(e)}>
                                    {assetNameList.map((data, index) => {
                                        return (
                                            <MenuItem value={data.id} key={index}>{data.assetName}</MenuItem>
                                        )
                                    })}
                                    
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={10} sm={10} md={4} lg={4} xl={4}
                            style={{marginTop:'10px',marginLeft:'10px', marginBottom:'10px'}}
                            >
                                <Button
                                    variant="contained"
                                    type='submit'>
                                    Move
                                </Button>
                        </Grid>
                    </Grid>
                    <Grid container  item xs={10} sm={10} md={5} lg={5} xl={5}
                        style={{border:'solid',borderColor:'whitesmoke',marginLeft:'10px',marginTop:'20px'}}
                    >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{alignSelf:'center', textAlign:'center'}}
                        >
                            <h3>To</h3>
                            <hr />
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label>Department:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Department"
                                    value={departmentMove}
                                    onChange={(e) => onDepartmentMoveChange(e)}>
                                            {departmentList.map((data, index) => {
                                                return (
                                                    <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                                                )
                                            })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label>Section:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px'}}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Section"
                                    value={sectionMove}
                                    onChange={(e) => onSectionMoveChange(e)}>
                                            {sectionListMove.map((data, index) => {
                                                return (
                                                    <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                                                )
                                            })}
                                
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                    <label>Asset Type:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px',marginBotton:'10px'}}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Asset Type</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Asset Type"
                                    value={assetTypeMove}
                                    onChange={(e) => onAssetTypeMoveChange(e)}>
                                    {assetTypeListMove.map((data, index) => {
                                        return (
                                            <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                                        )
                                    })}

                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form> 
            <NotificationBar
                handleClose={handleCloseNotify}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            /> 
        </div>     
    )
}

export default Transferasset;       
