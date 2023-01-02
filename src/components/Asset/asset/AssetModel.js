import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import {
    AssetAddService,
    AssetUpdateService,
    FetchDepaertmentService,
    FetchVenderService,
    FetchSectionService,
    FetchAssetTypeService,
    AssetMasterShow,
    ControlDepartmentShow,
    UserDepartmentShow,
    RequesterDepartmentShow,
    AssetIdShow,
    UnitShow,
    ProjectShow,
    LineShow,
} from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';

const AssetModel = ({ open, setOpen, isAdd, editData, setRefresh, refresh }) => {
    const [ assetMasterList,  setAssetMasterList] = useState([]);
    const [ assetMaster,  setAssetMaster] = useState('');
    const [ assetId, setAssetId] = useState('');
    const [assetIdList, setAssetIdList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState(editData?.department || '');
    const [section, setSection] = useState('');
    const [sectionList, setSectionList] = useState([]);
    const [assetName, setAssetName] = useState('');
    const [financialAssetId, setFinancialAssetId] = useState('');
    const [assetTypeList, setAssetTypeList] = useState([]);
    const [assetType, setAssetType] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [description, setDescription] = useState('');
    const [assetImage, setAssetImage] = useState('');
    const [unit,setUnit]=useState('');
    const [unitList, setUnitList]=useState([]);
    const [project,setProject]=useState('');
    const [projectList,setProjectList]=useState([]);
    const [line,setLine]=useState('');
    const [lineList,setLineList]=useState([]);
    const [usedNew,setUsedNew]=useState('');
    const [manufacturerNo,setManufacturerNo]=useState('');
    const [userDepartmentList, setUserDepartmentList] = useState([]);
    const [userDepartment,setUserDepartment] = useState("");
    const [contralDepartmentList, setContralDepartmentList] = useState([]);
    const [controlDepartment,setControlDepartment]=useState('');
    const [requestorList,setRequestorList]=useState([]);
    const [operationNo,setOperationNo]=useState('');
    const [requestor,setRequestor]=useState('');
    const [usageCode,setUsageCode]=useState('');
    const [yearOfMfg,setYearOfMfg]=useState('');
    const [countryOfMfg,setCountryOfMfg]=useState('');
    const [weight,setWeight]=useState('');
    const [requestorName,setRequestorName]=useState('');
    const [activeStatus,setActiveStatus]=useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
      });
    const handleClose = () => {
        setOpen(false);
        setAssetMaster('');
        setAssetId('');
        setDepartment('');
        setSection('');
        setAssetName('');
        setFinancialAssetId('');
        setAssetType('');
        setManufacturer('');
        setDescription('');
        setAssetImage('');
        setUnit('');
        setProject('');
        setLine('');
        setUsedNew('');
        setManufacturerNo('');
        setUserDepartment("");
        setControlDepartment('');
        setOperationNo('');
        setRequestor('');
        setUsageCode('');
        setYearOfMfg('');
        setCountryOfMfg('');
        setWeight('');
        setRequestorName('');
        setActiveStatus('');
 
    };

    useEffect(() => {
        FetchDepaertmentService(handleFetchSuccess, handleFetchException);
        AssetMasterShow(handleAssetMaster,handleAssetMasterException);
        UserDepartmentShow(handleUserDepartment,handleUserDepartmentException);
        ControlDepartmentShow(handleControlDepartment,handleControlDepartmentException);
        RequesterDepartmentShow(handleRequesterDepartment,handleRequesterDepartmentException);
        UnitShow(handleUnitShow,handleUnitShowException);
        ProjectShow(handleProjectShow,handleProjectShowException);
        LineShow(handleLineShow,handleLineShowException);
        // setDepartment(editData?.department || '');
        // setSection(editData?.section ||'');
        // setAssetName(editData?.assetName || '');
        // setFinancialAssetId(editData?.financialAssetId || '');
        // setPhoneNumber(editData?.phoneNumber || '');
        // setEmailId(editData?.email || '');
        // setAssetType(editData?.assetType || '');
        // setVendorAddress(editData?.vendorAddress || '');
        // setManufacturer(editData?.manufacturer || '');
        // setAssetModel(editData?.assetModel || '');
        // setpoNo(editData?.poNo || '');
        // setInvoiceNo(editData?.invoiceNo || '');
        // setWarrantyStartDate(editData?.warrantyStartDate || '');
        // setwarrantyEndDate(editData?.warrantyEndDate || '');
        // setDescription(editData?.description || '');
        
    }, [editData, refresh]);

   
    const handleAssetMaster = (dataObject)=>{
        setAssetMasterList(dataObject.data);   
    }

    const handleAssetMasterException=(errorStaus, errorMessage)=>{
        console.log(errorMessage);
    }

    const handleUserDepartment=(dataObject)=>{
        setUserDepartmentList(dataObject.data);
    }
    const handleUserDepartmentException=(errorStaus, errorMessage)=>{
        console.log(errorMessage);
    }
    const handleControlDepartment=(dataObject)=>{
        setContralDepartmentList(dataObject.data);
    }
    const handleControlDepartmentException=(errorStaus, errorMessage)=>{
        console.log(errorMessage);
    }

    const handleRequesterDepartment=(dataObject)=>{
        setRequestorList(dataObject.data);
    }
    const handleRequesterDepartmentException=(errorStaus, errorMessage)=>{
        console.log(errorMessage);
    }

    const handleFetchSuccess = (dataObject) => {
        console.log('data'+dataObject.data);
        setDepartmentList(dataObject.data);
       
        if (editData?.department) {
            FetchSectionService({
                id: editData?.department
            }, handleFetchSectionEdit, handleFetchSectionEditException)
        }
    }
    
    const handleFetchSectionEdit = (dataObject) => {
        setSectionList(dataObject.data);
        if (editData?.section) {
            FetchAssetTypeService({ id:editData?.section}, handleFetchAssetTypeSectionEdit, handleFetchAssetTypeSectionEditException)
        }
    }

    const handleFetchAssetTypeSectionEdit = (dataObject) => {
       setAssetTypeList(dataObject?.data)
    }

    const handleFetchAssetTypeSectionEditException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }

    const handleFetchSectionEditException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }

    const handleFetchException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }

    
    const handleFetchVenderException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }

    const onContralDepartmentChange=(e)=>{
        setControlDepartment(e.target.value);
    }
    const onUserDepartmentChange=(e)=>{
        setUserDepartment(e.target.value);
    }
    // department on change and section API call//    
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
    }

    const onUnitChange = (e) => {
        setUnit(e.target.value);
    }

     const onProjectChange = (e) => {
        setProject(e.target.value);
    }

    const onLineChange = (e) => {
        setLine(e.target.value);
    }
    const onRequestorChange=(e)=>{
        setRequestor(e.target.value);
    }

    const handleUnitShow=(dataObject)=>{
        setUnitList(dataObject.data);
    }
    const handleUnitShowException=(errorStaus, errorMessage) => {
        console.log(errorMessage);
    }

    const handleProjectShow=(dataObject)=>{
        setProjectList(dataObject.data);
    }
    const handleProjectShowException= (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }
    const handleLineShow=(dataObject)=>{
        setLineList(dataObject.data);
    }
    const handleLineShowException=(errorStaus, errorMessage) => {
        console.log(errorMessage);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        isAdd === true ?
        (
            AssetAddService({
                assetMaster:assetMaster,
                assetId:assetId,
                department:department,
                controlDepartment:controlDepartment,
                userDepartment:userDepartment,
                section:section,
                assetType:assetType,
                assetName:assetName,
                financialAssetId:financialAssetId,
                unit:unit,
                project:project,
                line:line,
                operationNo:operationNo,
                manufacturer: manufacturer,
                manufacturerNo:manufacturerNo,
                yearOfMfg:yearOfMfg,
                countryOfMfg:countryOfMfg,
                weight:weight,
                usedNew:usedNew,
                description:description,
                requestorName:requestorName,
                requesterDepartment:requestor,
                assetImage:assetImage,
                activeStatus:activeStatus,
              
            }, handleSuccess, handleException)
        ) : (
            AssetUpdateService({
        

                }, handleSuccess, handleException)
            );
    }
    
    const handleSuccess = (dataObject) => {
        console.log(dataObject);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
          });
        
        setAssetMaster('');
        setAssetId('');
        setDepartment('');
        setSection('');
        setAssetName('');
        setFinancialAssetId('');
        setAssetType('');
        setManufacturer('');
        setDescription('');
        setAssetImage('');
        setUnit('');
        setProject('');
        setLine('');
        setUsedNew('');
        setManufacturerNo('');
        setUserDepartment("");
        setControlDepartment('');
        setOperationNo('');
        setRequestor('');
        setUsageCode('');
        setYearOfMfg('');
        setCountryOfMfg('');
        setWeight('');
        setRequestorName('');
        setActiveStatus('');
     
    }

    const handleException = (errorObject, errorMessage) => {
        console.log(errorMessage);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
          });
          setAssetMaster('');
          setAssetId('');
          setDepartment('');
          setSection('');
          setAssetName('');
          setFinancialAssetId('');
          setAssetType('');
          setManufacturer('');
          setDescription('');
          setAssetImage('');
          setUnit('');
          setProject('');
          setLine('');
          setUsedNew('');
          setManufacturerNo('');
          setUserDepartment("");
          setControlDepartment('');
          setOperationNo('');
          setRequestor('');
          setUsageCode('');
          setYearOfMfg('');
          setCountryOfMfg('');
          setWeight('');
          setRequestorName('');
          setActiveStatus('');
      
    }
    const handleCloseNotify = () => {
        setOpen(false)
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };
    const handleChange=(e)=>{
        setUsedNew(e.target.value);
    }

    const onAssetMasterChange = (e) => {
        setAssetMaster(e.target.value);
        AssetIdShow(handleAssetId,handleAssetIdException);
    }

    const handleAssetId=(dataObject)=>{
        setAssetId(dataObject.data);
    }
    const handleAssetIdException=(errorObject, errorMessage) => {
        console.log(errorMessage);

    }
    const onChangeSatus=(e)=>{
        setActiveStatus(e.target.value);
    }
    return (
        <div>
            <Dialog
                open={open}
                maxWidth='xl'>
                <form onSubmit={onSubmit}>
                    <DialogTitle style={{ background: 'whitesmoke' }}>
                        {"ADD ASSET"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <form>
                                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        <label> Asset Master: </label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}
                                    >
                                        <FormControl style={{}} fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Asset Master</InputLabel>
                                            <Select
                                                label="Select Asset Master"
                                                value={assetMaster}
                                                onChange={(e) => onAssetMasterChange(e)}>
                                                    {
                                                        assetMasterList.map((data, index) => {
                                                        return (
                                                            <MenuItem value={data.id} key={index}>{data.assetMasterName}</MenuItem>
                                                        )
                                                    })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}  md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }}>
                                        <label style={{}}>Id:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}>
                                    <TextField
                                            id="Asset Id "
                                            fullWidth
                                            label="Asset Id"
                                            variant="outlined"
                                            value={assetId}
                                    />  
                                    </Grid>
                                    <Grid item xs={12} sm={3}  md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }}>
                                        <label style={{}}>Department:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}>
                                        <FormControl style={{}} fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                                            <Select
                                            labelId="department"
                                            id="department"
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
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        <label>Control Department: </label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}
                                    >
                                        <FormControl style={{}} fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Control Department</InputLabel>
                                                <Select
                                                    labelId="department"
                                                    id="department"
                                                    label="Select Control Department"
                                                    value={controlDepartment}
                                                    onChange={(e) => onContralDepartmentChange(e)}>
                                                        {
                                                            contralDepartmentList.map((data, index) => {
                                                            return (
                                                                <MenuItem value={data.id} key={index}>{data.controlDepartment}</MenuItem>
                                                            )
                                                        })}
                                                </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}  md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }}>
                                        <label style={{}}>User Department:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}>
                                        <FormControl style={{}} fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select User Department</InputLabel>
                                            <Select
                                            labelId="department"
                                            id="department"
                                            label="Select User Department"
                                            value={userDepartment}
                                            onChange={(e) =>  onUserDepartmentChange(e)}>
                                                {
                                                    userDepartmentList.map((data, index) => {
                                                    return (
                                                        <MenuItem value={data.id} key={index}>{data.userDepartment}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}  md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label >Section:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                                        <FormControl fullWidth style={{}}>
                                            <InputLabel id="demo-simple-select-label">Select Section </InputLabel>
                                            <Select
                                            labelId="section"
                                            id="section"
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
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label>Asset Type :</label>
                                    </Grid>
                                    <Grid item  xs={12} sm={9} md={4}lg={3.5}xl={3}
                                    >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Asset Type</InputLabel>
                                            <Select
                                                labelId="Vendor Name"
                                                id="Vendor-Name"
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
                                    <Grid item  xs={12} sm={3} md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label>Asset Name : </label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
                                        <TextField
                                        fullWidth
                                        id="Asset-Name"
                                        label="Asset Name"
                                        variant="outlined"
                                        onChange={(e) => { setAssetName(e.target.value) }}
                                        value={assetName}/>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
                                        <label> Financial Asset ID :</label>
                                    </Grid>
                                    <Grid item xs={12}  sm={9}  md={4} lg={3.5} xl={3}>
                                        <TextField
                                        fullWidth
                                        id="FinancialAssetID "
                                        label="Financial Asset ID  "
                                        variant="outlined"
                                        onChange={(e) => { setFinancialAssetId(e.target.value) }}
                                        value={financialAssetId}/>
                                    </Grid>
                                    <Grid item xs={12}  sm={3} md={2} lg={2.5} xl={3} style={{  alignSelf: 'center',  textAlignLast: 'center' }}>
                                        <label style={{}}>Unit:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5}  xl={3} >
                                        <FormControl fullWidth >
                                            <InputLabel >Select Unit</InputLabel>
                                            <Select
                                            labelId="vendor"
                                            id="vendor"
                                            label="Select Unit"
                                            value={unit}
                                            onChange={(e) => onUnitChange(e)}>
                                                {
                                                    unitList.map((data, index) => {
                                                        return (
                                                            <MenuItem value={data.id} key={index}>{data.unitName}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label>Project :</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9}  md={4}  lg={3.5}  xl={3}  >
                                    <FormControl fullWidth >
                                            <InputLabel >Select Project</InputLabel>
                                            <Select
                                            labelId="vendor"
                                            id="vendor"
                                            label="Select Unit"
                                            value={project}
                                            onChange={(e) => onProjectChange(e)}>
                                                {projectList.map((data, index) => {
                                                    return (
                                                        <MenuItem value={data.id} key={index}>{data.projectName}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label style={{}}>Line :</label>
                                    </Grid>
                                    <Grid item  xs={12} sm={9} md={4} lg={3.5}  xl={3} >
                                    <FormControl fullWidth >
                                            <InputLabel >Select Line</InputLabel>
                                            <Select
                                            labelId="vendor"
                                            id="vendor"
                                            label="Select Unit"
                                            value={line}
                                            onChange={(e) => onLineChange(e)}>
                                                {
                                                    lineList.map((data, index) => {
                                                        return (
                                                            <MenuItem value={data.id} key={index}>{data.lineName}</MenuItem>
                                                        )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label>Operation No : </label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                        fullWidth
                                        id="Vendor-Address"
                                        label="Operation No "
                                        variant="outlined"
                                        value={operationNo}
                                        onChange={(e) => { setOperationNo(e.target.value) }}
                                    />
                                    </Grid>
                                    <Grid item xs={12}  sm={3}  md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label style={{}}>Usage Code:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                        fullWidth
                                        id="AssetModel"
                                        label="Usage Code"
                                        variant="outlined"
                                        value={usageCode}
                                        onChange={(e) => { setUsageCode(e.target.value) }}/>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
                                        <label>Manufacturer: </label>
                                    </Grid>
                                    <Grid item xs={12} sm={9}  md={4} lg={3.5}  xl={3} >
                                        <TextField
                                        fullWidth
                                        id="Manufacturer"
                                        label="Manufacturer"
                                        variant="outlined"
                                        value={manufacturer}
                                        onChange={(e) => { setManufacturer(e.target.value) }}/>
                                    </Grid>   
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
                                        <label>Manufacturer No: </label>
                                    </Grid>
                                    <Grid item xs={12} sm={9}  md={4} lg={3.5}  xl={3} >
                                        <TextField
                                        fullWidth
                                        id="Manufacturer"
                                        label="Manufacturer No"
                                        variant="outlined"
                                        value={manufacturerNo}
                                        onChange={(e) => { setManufacturerNo(e.target.value) }}/>
                                    </Grid>
                                    <Grid item xs={12} sm={3}  md={2}  lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label>Year of Mfg: </label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                        fullWidth
                                        label="Year of Mfg:"
                                        variant="outlined"
                                        value={yearOfMfg}
                                        onChange={(e) => { setYearOfMfg(e.target.value) }}/>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2}  lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
                                        <label style={{}}>Country of Mfg:</label>
                                    </Grid>
                                    <Grid item  xs={12} sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                        fullWidth
                                        
                                        label="Country of Mfg"
                                        variant="outlined"
                                        value={countryOfMfg}
                                        onChange={(e) => { setCountryOfMfg(e.target.value) }}/>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2}  lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
                                        <label style={{}}>Weight:</label>
                                    </Grid>
                                    <Grid item  xs={12} sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                        fullWidth
                                        id="Weight"
                                        label="Weight"
                                        variant="outlined"
                                        value={weight}
                                        onChange={(e) => { setWeight(e.target.value) }}/>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center'}}
                                    >
                                        <label>Used/New:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9}  md={4} lg={3.5} xl={3} >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Used/New</InputLabel>
                                        <Select
                                            value={usedNew}
                                            label="Used/New"
                                            onChange={handleChange}
                                        >
                                        <MenuItem value='Used'>Used</MenuItem>
                                        <MenuItem value='New'>New</MenuItem>
                                        
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label>Description:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                        fullWidth
                                        id="Description"
                                        label="Description"
                                        variant="outlined"
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label>Requestor Name:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                        fullWidth
                                        id="Description"
                                        label="Requestor Name"
                                        variant="outlined"
                                        value={requestorName}
                                        onChange={(e) => { setRequestorName(e.target.value) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5}  xl={3} style={{ alignSelf: 'center',  textAlignLast: 'center'  }} >
                                        <label> Requester Department:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}>
                                        <FormControl style={{}} fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Requester Department</InputLabel>
                                            <Select
                                            labelId="department"
                                            id="department"
                                            label="Select Requester Department"
                                            value={requestor}
                                            onChange={(e) => onRequestorChange(e)}>
                                                {
                                                    requestorList.map((data, index) => {
                                                    return (
                                                        <MenuItem value={data.id} key={index}>{data.requesterDepartment}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5}  xl={3} style={{ alignSelf: 'center',  textAlignLast: 'center'  }} >
                                        <label>Asset Image:</label>
                                    </Grid>
                                    <Grid item xs={12}  sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                            fullWidth
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files.length > 0) {
                                                    const reader = new FileReader();
                                                    reader.onload = () => {
                                                        if (reader.readyState === 2) {
                                                            setAssetImage(reader.result);
                                                        }
                                                    };
                                                    reader.readAsDataURL(e.target.files[0]);
                                                }
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                            type="file"
                                        />
                                    </Grid>
                                    <Grid item xs={12}  sm={10} md={8} lg={8} xl={8} style={{ alignSelf: 'center',  textAlignLast: 'center'  }} >
                                        <FormControl>
                                            <RadioGroup
                                                row
                                               value={activeStatus}
                                               onChange={onChangeSatus}
                                            >
                                                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                                                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <div>
                            <Button type='reset' onClick={handleClose}>Cancel</Button>
                            <Button type='submit'>
                                {isAdd === true ? 'Add' : 'Update'}
                            </Button>
                        </div>
                    </DialogActions>
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

export default AssetModel
