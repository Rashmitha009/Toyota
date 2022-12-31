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
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import {
    AssetAddService,
    AssetUpdateService,
    FetchDepaertmentService,
    FetchVenderService,
    FetchSectionService,
    FetchAssetTypeService,
    FetchVenderDataService,
    FetchAssetIdService,
} from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';

const AssetModel = ({ open, setOpen, isAdd, editData, setRefresh, refresh }) => {
    const [assetId, setAssetId] = useState();
    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState(editData?.department || '');
    const [section, setSection] = useState('');
    const [sectionList, setSectionList] = useState([]);
    const [assetName, setAssetName] = useState('');
    const [financialAssetId, setFinancialAssetId] = useState('');
    const [vendorName, setVendorName] = useState(editData?.vendorName ||'');
    const [vendorNameList, setVendorNameList] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailId, setEmailId] = useState('');
    const [assetTypeList, setAssetTypeList] = useState([]);
    const [assetType, setAssetType] = useState('');
    const [vendorAddress, setVendorAddress] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [assetModel, setAssetModel] = useState('');
    const [poNo, setpoNo] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [warrantyStartDate, setWarrantyStartDate] = useState('');;
    const [warrantyEndDate, setwarrantyEndDate] = useState('');;
    const [warrantyDocument, setWarrantyDocument] = useState('');
    const [uploadDocument, setUploadDocument] = useState('');
    const [description, setDescription] = useState('');
    const [assetImage, setAssetImage] = useState('');
    const [vendorData, setVendorData] = useState([]);
    const [unit,setUnit]=useState('');
    const [unitList, setUnitList]=useState([]);
    const [project,setProject]=useState('');
    const [projectList,setProjectList]=useState([]);
    const [line,setLine]=useState('');
    const [lineList,setLineList]=useState([]);
    const [usedNew,setUsedNew]=useState('');
    const [manufacturerNo,setManufacturerNo]=useState('');
    const [warranty, setWarranty] = useState("warranty");
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
      });

    const handleChangeWarrantyStartDate = (e) => {
        setWarrantyStartDate(e.target.value);
        console.log(e.target.value);
    };

    const handleChangeWarrantyEndDate = (e) => {
        setwarrantyEndDate(e.target.value);
    };

    const handleClose = () => {
        setOpen(false);
        setAssetId('');
        setDepartment('');
        setSection('');
        setAssetName('');
        setFinancialAssetId('');
        setVendorName('');
        setPhoneNumber('');
        setEmailId('');
        setAssetType('');
        setVendorAddress('');
        setManufacturer('');
        setAssetModel('');
        setpoNo('');
        setInvoiceNo('');
        setDescription('');
    };

    useEffect(() => {
        FetchDepaertmentService(handleFetchSuccess, handleFetchException);
        FetchVenderService(handleFetchVender, handleFetchVenderException);
        setDepartment(editData?.department || '');
        setSection(editData?.section ||'');
        setAssetName(editData?.assetName || '');
        setFinancialAssetId(editData?.financialAssetId || '');
        setVendorName(editData?.vendorName || '');
        setPhoneNumber(editData?.phoneNumber || '');
        setEmailId(editData?.email || '');
        setAssetType(editData?.assetType || '');
        setVendorAddress(editData?.vendorAddress || '');
        setManufacturer(editData?.manufacturer || '');
        setAssetModel(editData?.assetModel || '');
        setpoNo(editData?.poNo || '');
        setInvoiceNo(editData?.invoiceNo || '');
        setWarrantyStartDate(editData?.warrantyStartDate || '');
        setwarrantyEndDate(editData?.warrantyEndDate || '');
        setDescription(editData?.description || '');
        
    }, [editData, refresh]);

    const handleFetchSuccess = (dataObject) => {
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
       setAssetTypeList(dataObject.data)
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

    const handleFetchVender = (dataObject) => {
        setVendorNameList(dataObject.data); 
    }
    
    const handleFetchVenderException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
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

    const onSubmit = (e) => {
        e.preventDefault();
        isAdd === true ?
        (
            AssetAddService({
                assetId: assetId,
                department: department,
                section: section,
                assetName: assetName,
                financialAssetId: financialAssetId,
                vendorName: vendorName,
                phoneNumber: phoneNumber,
                email: emailId,
                assetType: assetType,
                vendorAddress: vendorAddress,
                manufacturer: manufacturer,
                assetModel: assetModel,  
                poNo: poNo,
                invoiceNo: invoiceNo,
                warrantyStartDate: warrantyStartDate,
                warrantyEndDate: warrantyEndDate,
                warrantyDocument: warrantyDocument,
                uploadDocument: uploadDocument,
                description: description,
                assetImage: assetImage,
                typeWarranty: warranty,
            }, handleSuccess, handleException)
        ) : (
            AssetUpdateService({
                id: editData.id,
                assetId: assetId,
                department: department,
                section: section,
                assetName: assetName,
                financialAssetId: financialAssetId,
                vendorName: vendorName,
                phoneNumber: phoneNumber,
                email: emailId,
                assetType: assetType,
                vendorAddress: vendorAddress,
                manufaturer: manufacturer,
                assetModel: assetModel,
                poNo: poNo,
                invoiceNo: invoiceNo,
                warrantyStartDate: warrantyStartDate,
                warrantyEndDate: warrantyEndDate,
                warrantyDocument: warrantyDocument,
                uploadDocument: uploadDocument,
                description: description,
                assetImage: assetImage,
                typeWarranty: warranty,

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
        setAssetId('');
        setDepartment('');
        setSection('');
        setAssetName('');
        setFinancialAssetId('');
        setVendorName('');
        setPhoneNumber('');
        setEmailId('');
        setAssetType('');
        setVendorAddress('');
        setManufacturer('');
        setAssetModel('');
        setpoNo('');
        setInvoiceNo('');
        setDescription('');
    }

    const handleException = (errorObject, errorMessage) => {
        console.log(errorMessage);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
          });
          setAssetId('');
        setDepartment('');
        setSection('');
        setAssetName('');
        setFinancialAssetId('');
        setVendorName('');
        setPhoneNumber('');
        setEmailId('');
        setAssetType('');
        setVendorAddress('');
        setManufacturer('');
        setAssetModel('');
        setpoNo('');
        setInvoiceNo('');
        setDescription('');
      
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
                                        <label> Asset ID : </label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}
                                    >
                                        <TextField
                                            id="Asset Id "
                                            fullWidth
                                            label="Asset Id"
                                            variant="outlined"
                                            value={assetId}
                                            onChange={(e) => { setAssetId(e.target.value) }}
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
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
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
                                    <Grid item xs={12} sm={3}  md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }}>
                                        <label style={{}}>User Department:</label>
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
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
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
                                   
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
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
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
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
                                                {/* {unitList.map((data, index) => {
                                                    return (
                                                        <MenuItem value={data.unitId} key={index}>{data.unitName}</MenuItem>
                                                    )
                                                })} */}
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
                                                {/* {projectList.map((data, index) => {
                                                    return (
                                                        <MenuItem value={data.projectId} key={index}>{data.projectName}</MenuItem>
                                                    )
                                                })} */}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
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
                                                {/* {lineList.map((data, index) => {
                                                    return (
                                                        <MenuItem value={data.lineId} key={index}>{data.lineName}</MenuItem>
                                                    )
                                                })} */}
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
                                        label="Vendor Address "
                                        variant="outlined"
                                        value={vendorAddress}/>
                                    </Grid>
                                   
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                    <Grid item xs={12}  sm={3}  md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                                        <label style={{}}>Usage Code:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                        fullWidth
                                        id="AssetModel"
                                        label="Asset Model"
                                        variant="outlined"
                                        value={assetModel}
                                        onChange={(e) => { setAssetModel(e.target.value) }}/>
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
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                    <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
                                        <label>Manufacturer No: </label>
                                    </Grid>
                                    <Grid item xs={12} sm={9}  md={4} lg={3.5}  xl={3} >
                                        <TextField
                                        fullWidth
                                        id="Manufacturer"
                                        label="Manufacturer"
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
                                        id="PONo"
                                        label="PO No:"
                                        variant="outlined"
                                        value={poNo}
                                        onChange={(e) => { setpoNo(e.target.value) }}/>
                                    </Grid>
                                    
                                </Grid>
                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                    <Grid item xs={12} sm={3} md={2}  lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
                                        <label style={{}}>Country of Mfg:</label>
                                    </Grid>
                                    <Grid item  xs={12} sm={9} md={4} lg={3.5} xl={3} >
                                        <TextField
                                        fullWidth
                                        id="InvoiceNo"
                                        label="Invoice No"
                                        variant="outlined"
                                        value={invoiceNo}
                                        onChange={(e) => { setInvoiceNo(e.target.value) }}/>
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
                                        <MenuItem value='used'>Used</MenuItem>
                                        <MenuItem value='new'>New</MenuItem>
                                        
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                  
                                </Grid>
                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
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
