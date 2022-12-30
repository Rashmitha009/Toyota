import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {  Grid, MenuItem, OutlinedInput, } from '@mui/material';
import { 
    FetchAssetNameService, 
    FetchAssetTypeService, 
    FetchDepaertmentService, 
    FetchSectionService, 
    MaintenanceAddService,
    FetchMachineService,
    FetchGetMaintenanceId,
    FetchMaintenanceSchedule,
} from '../../services/ApiServices';
import Maintenance from './MaintenanceTable';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import NotificationBar from '../../services/NotificationBar';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const steps = ['Step 1', 'Step 2', 'Step 3', 'Complete'];

export default function HorizontalLinearStepper() {
    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState('');
    const [section, setSection] = useState('');
    const [sectionList, setSectionList] = useState([]);
    const [assetNameList, setAssetNameList] = useState([]);
    const [assetTypeList, setAssetTypeList] = useState([]);
    const [assetType, setAssetType] = useState('');
    const [name, setName] = useState('');
    const [partid, setPartid] = useState('');
    const [quantity, setQuantity] = useState('');
    const [UOM, setUOM] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [maintenance, setMaintenance] = useState([]);
    const [unitId, setUnitId] = useState('');
    const [canceledCheque, setcanceledCheque] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [targetForm, setTargetFrom] = useState('');
    const [isAddUnit, setIsAddUnit] = useState(true);
    const [affectedMachineList,setAffectedMachineList]=useState([]);
    const [affectedMachine,setAffectedMachine]=useState([]);
    const [shutDown,setShutDown]=useState('ShutDown');
    const [shutOff,setShutOff]=useState('Off')
    const [maintenanceId, setMaintenanceId]=useState('');
    const [assetName, setAssetName]=useState('');
    const [maintenanceType, setMaintenanceType]=useState('');
    const [severity, setSeverity]=useState('');
    const [problemNote, setProblemNote]=useState('');
    const [bpImages1, setBpImages1]=useState('');
    const [bpImages2, setBpImages2]=useState('');
    const [bpImages3, setBpImages3]=useState('');
    const [bpImages4, setBpImages4]=useState('');
    const [partsOrConsumable,setPartsOrConsumable]=useState('');
    const [partOption,setPartOption]=useState('');
    const [affectedManHours,setAffectedManHours]=useState('');
    const [dateFrom,setDateFrom]=useState('');
    const [dateTo,setDateTo]=useState('');
    const [timeFrom,setTimeFrom]=useState('');
    const [timeTo, setTimeTo]=useState('');
    const [machineDetails,setMachineDetails]=useState('');
    const [manHoursDetails,setSmanHoursDetails]=useState('');
    const [rows , setRows]=useState([]);
    const [amcStatus,setAmcStatus]=useState('');
    const [warrantyStatus,setWarrantyStatus]=useState('');
    const [warrantyType,setWarrantyType]=useState('');
    const [refresh , setRefresh]=useState(false);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
      });

    const columns = [
        { field: 'amc', headerName: 'AMC Status', width: 300 },
        { field: 'warranty', headerName: 'Warranty Status', width: 300 },
        { field: 'warrantyType', headerName: 'Warranty Type', width: 290 },
    ];
    

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setAffectedMachine(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };
    
    useEffect(() => {
        FetchDepaertmentService(handleFetchSuccess, handleFetchException);
        FetchMachineService(handleFetchMachineSuccess, handleFetchMachineException);
        FetchGetMaintenanceId(handleGetMaintenanceId,handleGetMaintenanceIdException);
       

    }, [refresh]);
    
    const handleFetchSuccess = (dataObject) => {
        setDepartmentList(dataObject.data);
        
    }

    const handleFetchException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }

    const handleFetchMachineSuccess = (dataObject) => {
        setAffectedMachineList(dataObject.data);
    }

    const handleFetchMachineException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }
   
    const handleGetMaintenanceId=(dataObject)=>{
        setMaintenanceId(dataObject.data)
    }
    const handleGetMaintenanceIdException=(errorStaus, errorMessage)=>{
        console.log(errorMessage);
    }

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
        FetchAssetNameService({ id: e.target.value }, handleFetchAssetNameService,  handleFetchAssetNameException)
    }

    const handleFetchAssetNameService= (dataObject) => {
        setAssetNameList(dataObject.data);
    }

    const handleFetchAssetNameException = (errorStaus, errorMessage) => {
        setAssetNameList("No Data ");
        console.log(errorMessage);
    }

    const onAssetNameChange = (e) => {
        setAssetName(e.target.value);
        FetchMaintenanceSchedule({ id: e.target.value },handleFetchMaintenanceSchedule,handleFetchMaintenanceScheduleExeption)
    }
    const handleFetchMaintenanceSchedule=(dataObject)=>{
        setRows(dataObject?.data || []);
        setAmcStatus(dataObject?.data[0]?.amc);
        setWarrantyStatus(dataObject?.data[0]?.warranty);
        setWarrantyType(dataObject?.data[0]?.warrantyType);
        console.log("dadta"+amcStatus);
    }
    const handleFetchMaintenanceScheduleExeption=(errorStaus, errorMessage)=>{
        console.log(errorMessage);
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if(activeStep === steps.length - 1 ){
        MaintenanceAddService({ 
        maintenanceId:maintenanceId,
        assetName: assetName,
        maintenanceType:maintenanceType,
        severity:severity,
        problemNote: problemNote,
        bpImages1: bpImages1,
        bpImages2:bpImages2,
        bpImages3:bpImages3,
        bpImages4:bpImages4,
        partsOrConsumable:JSON.stringify(maintenance),
        affectedMachine: JSON.stringify(affectedMachine),
        affectedManHours:affectedManHours,
        shutdownOrUtilization:shutDown,
        machineDetails:machineDetails,
        offOrUtilization:shutOff,
        manHoursDetails:manHoursDetails,
        dateFrom:dateFrom,
        dateTo:dateTo,
        timeFrom: timeFrom,
        timeTo: timeTo,
        department:department,
        section:section,
        assetType:assetType,
        amcStatus: amcStatus,
        warrantyStatus: warrantyStatus,
        warrantyType: warrantyType,
       
    }, handleMaintenanceAddService,  handleMaintenanceAddServiceException)

        }
    };
    
    const handleMaintenanceAddService= (dataObject) => {
        console.log(dataObject.data);
        setRefresh(oldValue => !oldValue);
        setDepartment('');
        setSection('');
        setAssetType('');
        setName('');
        setPartid('');
        setQuantity('');   
        setUnitPrice('');
        setUnitId('');
        setcanceledCheque('');
        setMaintenanceId('');
        setAssetName('');
        setMaintenanceType('');
        setSeverity('');
        setProblemNote('');
        setBpImages1('');
        setBpImages2('');
        setBpImages3('');
        setBpImages4('');
        setPartsOrConsumable('');
        setPartOption('');
        setAffectedManHours('');
        setDateFrom('');
        setDateTo('');
        setTimeFrom('');
        setTimeTo('');
        setMachineDetails('');
        setSmanHoursDetails('');
        setRows([]);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
    }

    const handleMaintenanceAddServiceException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setDepartment('');
        setSection('');
        setAssetType('');
        setName('');
        setPartid('');
        setQuantity('');   
        setUnitPrice('');
        setUnitId('');
        setcanceledCheque('');
        setMaintenanceId('');
        setAssetName('');
        setMaintenanceType('');
        setSeverity('');
        setProblemNote('');
        setBpImages1('');
        setBpImages2('');
        setBpImages3('');
        setBpImages4('');
        setPartsOrConsumable('');
        setPartOption('');
        setAffectedManHours('');
        setDateFrom('');
        setDateTo('');
        setTimeFrom('');
        setTimeTo('');
        setMachineDetails('');
        setSmanHoursDetails('');
        setRows([]);
  }

  const handleCloseNotify = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    
    const handleMaintenanceTypeChange = (e) => {
        setMaintenanceType(e.target.value);
    };

    const handleUOMChange = (e) => {
        setUOM(e.target.value);
    };

    const setTagAssetType = (event) => {
        setTagAssetType(event.target.value);
    };

    const addMaintenance=()=>{
    if(name === ''){
        alert("Enter name");
    }else if(partid === ''){
        alert("Enter part Id");
    }
    else if(quantity=== ''){
        alert("Enter quantity");
    }
    else if(UOM === ''){
        alert("Enter UOM");
    }
    else if(unitPrice === ''){
        alert("Enter unit price");
    }
    else if (unitId === '') {
        
        const newMaintenance = [...maintenance, { name, partid,quantity ,UOM,unitPrice,partOption }];
        setMaintenance(newMaintenance);
        setName('');
        setPartid('');
        setQuantity('');
        setUOM('');
        setUnitPrice('');
        setUnitId('');
        
    }
    else {
        const newMaintenance = [...maintenance];
        newMaintenance[unitId].name = name;
        newMaintenance[unitId].partid = partid;
        newMaintenance[unitId].quantity = quantity;
        newMaintenance[unitId].UOM = UOM;
        newMaintenance[unitId].unitPrice = unitPrice;
        setMaintenance(newMaintenance);
        // clear textboxes
        setName('');
        setPartid('');
        setQuantity('');
        setUOM('');
        setUnitPrice('');
        setUnitId('');
        setIsAddUnit(false);
        setIsAddUnit(true);
    }
}

const removeMaintenance= (index) => {
    const newMaintenance = [...maintenance];
    newMaintenance.splice(index, 1);
    setMaintenance(newMaintenance);  
 };
const onChangeSeverity=(e)=>{
    setSeverity(e.target.value)
}
const updateMaintenance= (index) => {
        setUnitId(index);
        setName(maintenance[index].name);
        setPartid(maintenance[index].partid);
        setQuantity(maintenance[index].quantity);
        setUOM(maintenance[index].UOM);
        setUnitPrice(maintenance[index].unitPrice);
        setIsAddUnit(false);
        
}
const onChangeShutDown=(e)=>{
    setShutDown(e.target.value);

}
const onChangeShutOff=(e)=>{
    setShutOff(e.target.value);

}
const onOptionChange=(e)=>{
    const NA =e.target.value;
  if(NA==='NA'){
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }else{
    setPartOption(e.target.value);
  }
}

    return (
        <div>
            <Grid>
            <h2 style={{ marginLeft: '40px' }}>Maintenance Schedule</h2>
            </Grid>
            <hr />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                    style={{alignSelf:'center',textAlign:'center'}}
                >
                    <h3 >Create Maintenance Schedule</h3>
                    
                </Grid>
                <Grid container spacing={2}
                     style={{ marginLeft: '40px' }}
                >
                <Box sx={{ width: '85%', marginLeft: '80px', marginTop: '10px' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption"></Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {
                        activeStep === 0 &&
                        <>
                            <Grid container spacing={2} style={{ marginLeft: '50px' }}>
                                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}
                                >
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                     style={{alignSelf:'center',textAlign:'center'}}
                                    >
                                        <h3 >Select Asset</h3>
                                        
                                    </Grid>
                                    <hr/>
                                </Grid>
                                
                                <Grid container spacing={2}   
                                >
            
                                    <Grid item xs={12} sm={5} md={5} lg={2.5} xl={2.5}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label='Select Department'
                                                    value={department}
                                                onChange={(e) => onDepartmentChange(e)}>
                                                {departmentList?.map((data, index) => {
                                                    return (
                                                        <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                                                    )
                                                })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item  xs={12} sm={5} md={5} lg={2.5} xl={2.5}
                                        style={{
                                            alignSelf: 'center',
                                            width: '300px'
                                        }}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label='Select Section'
                                                    value={section}
                                                    onChange={(e) => onSectionChange(e)}>
                                                    {sectionList.map((data, index) => {
                                                        return (
                                                            <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item  xs={12} sm={5} md={5} lg={2.5} xl={2.5}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Selectn Asset Type</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label='Selectn Asset Type'
                                                    value={assetType}
                                                    onChange={(e) => onAssetTypeChange(e)}>
                                                    {assetTypeList.map((data, index) => {
                                                        return (
                                                            <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item  xs={12} sm={5} md={5} lg={2.5} xl={2.5}
                                        style={{
                                            alignSelf: 'center',

                                            width: '300px'
                                        }}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select Asset Name</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label='Select Asset Name'
                                                    value={assetName}
                                                    onChange={(e) => onAssetNameChange(e)}>
                                                    {assetNameList.map((data, index) => {
                                                        return (
                                                            <MenuItem value={data.id} key={index}>{data.assetName}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                   
                                </Grid>
                                <Grid container spacing={2} style={{ marginTop:'10px'}} >
                                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <DataGrid
                                    style={{ background: 'whitesmoke',height: 200 }}
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    }
                    {
                        activeStep === 1 &&
                        <>
                            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        alignSelf: 'center',
                                        textAlignLast: 'center'
                                    }}
                                >
                                    <label>Maintenance Id:</label>
                                </Grid>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        alignSelf: 'center',
                                        width: '300px'
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="Vendor-Address"
                                        variant="outlined"
                                        value={maintenanceId}
                                        
                                    />

                                </Grid>
                                
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        alignSelf: 'center',
                                        textAlignLast: 'center'
                                    }}
                                >
                                    <label>Maintenance Type:</label>
                                </Grid>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        alignSelf: 'center',

                                        width: '300px'
                                    }}
                                >
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Maintenance Type</InputLabel>
                                            <Select
                                          
                                            value={maintenanceType}
                                            label="Maintenance Type"
                                            onChange={handleMaintenanceTypeChange}
                                            >
                                            <MenuItem value={10}>Major</MenuItem>
                                            <MenuItem value={20}>Minor</MenuItem>
                                            <MenuItem value={30}>AMC</MenuItem>
                                            <MenuItem value={40}>Breakdown</MenuItem>
                                            </Select>
                                        </FormControl>
                                        </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{ marginTop: '20px' }}>

                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        alignSelf: 'center',
                                        textAlignLast: 'center'
                                    }}
                                >
                                    <label>Severity:</label>
                                </Grid>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        alignSelf: 'center',

                                        width: '300px'
                                    }}
                                >
                                    <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={onChangeSeverity}
                                        value={severity}
                                    >
                                        <FormControlLabel value="Critical" control={<Radio />} label="Critical" />
                                        <FormControlLabel value="Emergency" control={<Radio />} label="Emergency" />
                                    </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        alignSelf: 'center',
                                        textAlignLast: 'center'
                                    }}
                                >
                                    <label>Problem Note:</label>
                                </Grid>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        alignSelf: 'center',
                                        width: '300px'
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="Vendor-Address"
                                        variant="outlined"
                                        multiline
v                                       value={problemNote}
                                        onChange={(e)=>{setProblemNote(e.target.value)}}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style= {{ marginTop: '20px' }}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                    style={{
                                        alignSelf: 'center',
                                        textAlignLast: 'center'
                                    }}
                                >
                                    <label>Breakdown Parts Images:</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                       width: '200px',
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                          onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    if (reader.readyState === 2) {
                                                        setBpImages1(reader.result);
                                                    }
                                                };
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        type="file"
                                    />
                                </Grid>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        width: '200px',
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    if (reader.readyState === 2) {
                                                        setBpImages2(reader.result);
                                                    }
                                                };
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        type="file"
                                    />
                                </Grid>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        width: '200px',
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    if (reader.readyState === 2) {
                                                        setBpImages3(reader.result);
                                                    }
                                                };
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        type="file"
                                    />
                                </Grid>
                                <Grid item xs={10} sm={10} md={5} lg={3} xl={3}
                                    style={{
                                        width: '200px',
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    if (reader.readyState === 2) {
                                                        setBpImages4(reader.result);
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
                        </>

                    }
                    {
                        activeStep === 2 &&
                        <>
                            <form >
                                <Grid container spacing={2} style={{ marginTop: '10px', marginLeft: '20px' }}>
                                    <Grid tem xs={12} sm={12} md={12} lg={12} xl={12}
                                        style={{
                                            width: '200px',

                                        }}
                                    >
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={partOption}
                                                onChange={onOptionChange}
                                            >
                                                <FormControlLabel value="Parts" control={<Radio />} label="Parts" />
                                                <FormControlLabel value="Consumable" control={<Radio />} label="Consumable" />
                                                <FormControlLabel value="NA" control={<Radio />} label="NA" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ display: 'box', marginTop: '10px' }}>
                                    <Grid container item xs={12} sm={12} md={6} lg={4} xl={4} style={{ display: 'inline' }} >
                                        <Grid container >
                                            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}
                                                style={{
                                                    alignSelf: 'center',
                                                    textAlignLast: 'center'
                                                }}
                                            >
                                                <label>Name:</label>
                                            </Grid>
                                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                                                style={{
                                                    alignSelf: 'center',

                                                }}
                                            >
                                                <TextField 
                                                    fullWidth  
                                                    label="Enter Name:" 
                                                    variant="outlined" 
                                                    value={name}
                                                    onChange={(e)=>{setName(e.target.value)}} 
                                                />

                                            </Grid>
                                        </Grid>
                                        <Grid container style={{ marginTop: '10px' }} >
                                            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}
                                                style={{
                                                    alignSelf: 'center',
                                                    textAlignLast: 'center'
                                                }}
                                            >
                                                <label>Partid:</label>
                                            </Grid>
                                            <Grid item  xs={10} sm={10} md={6} lg={6} xl={6}
                                                style={{
                                                    alignSelf: 'center',

                                                }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label='Enter Partid'
                                                    variant="outlined"
                                                    value={partid}
                                                    onChange={(e)=>{setPartid(e.target.value)}} 
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container style={{ marginTop: '10px' }}  >
                                            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}
                                                style={{
                                                    alignSelf: 'center',
                                                    textAlignLast: 'center'
                                                }}
                                            >
                                                <label>Quantity:</label>
                                            </Grid>
                                            <Grid item  xs={10} sm={10} md={6} lg={6} xl={6}
                                                style={{
                                                    alignSelf: 'center',

                                                }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label='Enter Quantity'
                                                    variant="outlined"
                                                    value={quantity}
                                                    onChange={(e)=>{setQuantity(e.target.value)}} 
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container style={{ marginTop: '10px' }}  >
                                            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}
                                                style={{
                                                    alignSelf: 'center',
                                                    textAlignLast: 'center'
                                                }}
                                            >
                                                <label>UOM:</label>
                                            </Grid>
                                            <Grid item  xs={10} sm={10} md={6} lg={6} xl={6}
                                                style={{
                                                    alignSelf: 'center',

                                                }}
                                            >
                                         <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">UOM</InputLabel>
                                                <Select
                                                value={UOM}
                                                label="UOM"
                                                onChange={handleUOMChange}
                                                >
                                                <MenuItem value={10}>Liter</MenuItem>
                                                <MenuItem value={20}>Kg</MenuItem>
                                                <MenuItem value={30}>NOS</MenuItem>
                                                </Select>
                                            </FormControl>
                                            </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid container style={{ marginTop: '10px' }} >
                                            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}
                                                style={{
                                                    alignSelf: 'center',
                                                    textAlignLast: 'center'
                                                }}
                                            >
                                                <label>Unit price:</label>
                                            </Grid>
                                            <Grid  xs={10} sm={10} md={6} lg={6} xl={6}
                                                style={{
                                                    alignSelf: 'center',

                                                }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label='Enter Unit price'
                                                    variant="outlined"
                                                    value={unitPrice}
                                                    onChange={(e)=>{setUnitPrice(e.target.value)}} 
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Button  onClick={addMaintenance} style={{ marginTop: '10px' }} variant="contained">
                                                 {isAddUnit ? 'Add ' : 'Update '}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={12} md={6} lg={8} xl={8} style={{ display: 'inline', }} >
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                            style={{
                                                alignSelf: 'center',
                                                textAlignLast: 'center'
                                                , marginLeft: '20px'
                                            }}
                                        >
                                            {
                                                maintenance.length > 0
                                                    ? maintenance?.map((maintenance, index) => (
                                                   
                                                    <Maintenance maintenance={maintenance} index={index}   key={index}
                                                        removeMaintenance={removeMaintenance}
                                                        updateMaintenance={updateMaintenance}
                                                    />
                                                    )) : ''
                                                }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </>
                    }
                    {
                        activeStep === 3 &&
                        <>
                            <Grid container spacing={2} style={{ border: 'solid', borderColor: 'whitesmoke',marginTop: '20px' }}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
                                style={{ marginTop: '20px', marginLeft: '30px', marginRight: '20px',alignSelf:'center', textAlign:'center' }}>
                                    <h3>Schedule</h3>
                                </Grid>
                                <hr />
                                <Grid container spacing={2} style={{ marginRight: '20px' }}>
                                    <Grid item xs={12} sm={10} md={5} lg={3} xl={3}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        <label>Affected Machine</label>
                                    </Grid>
                                    <Grid item xs={12} sm={10} md={5} lg={3} xl={3}>
                                      
                                    <FormControl fullWidth>
                                        <InputLabel >Affected MachineList</InputLabel>
                                            <Select
                                           
                                            multiple
                                            label='Affected MachineList'
                                            value={affectedMachine}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Affected MachineList" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                            >
                                            {
                                                affectedMachineList.map((data, index) => (
                                                <MenuItem key={index} value={data.assetName}>
                                                <Checkbox checked={affectedMachine.indexOf(data.assetName) > -1} />
                                                <ListItemText primary={data.id+' '+data.assetName} />
                                                
                                                </MenuItem>
                                            ))}
                                            </Select>
                                     </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={10} md={5} lg={3} xl={3}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        Affected Man Hours
                                    </Grid>
                                    <Grid item xs={12} sm={10} md={5} lg={3} xl={3}>
                                        <TextField
                                            fullWidth
                                            id="Vendor-Address"
                                            variant="outlined"
                                            value={affectedManHours}
                                            onChange={(e)=>{setAffectedManHours(e.target.value)}}
                                        />
                                    </Grid>

                                </Grid>
                                <Grid container spacing={2} style={{ marginTop: '20px', marginRight: '20px' }} >
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <FormControl style={{ marginLeft: '100px' }}>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={shutDown}
                                                onChange={onChangeShutDown}
                                            >
                                                <FormControlLabel value="ShutDown" control={<Radio />} label="ShutDown" />
                                                <FormControlLabel style={{ marginLeft: '100px' }} value="MachineUtilization" control={<Radio />} label="Machine Utilization" />

                                            </RadioGroup>
                                        </FormControl>
                                       
                                        { 
                                             shutDown !== 'ShutDown' &&
                                             <>
                                             <Grid style={{marginLeft:'300px',marginTop:'10px'}} item xs={12} sm={12} md={6} lg={6} xl={6}>
                                             <TextField
                                                 fullWidth
                                                 multiline
                                                 id="Vendor-Address"
                                                 variant="outlined"
                                                 value={machineDetails}
                                                 onChange={(e)=>{setMachineDetails(e.target.value)}}
     
                                             />
                                         </Grid>
                                         </>
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={shutOff}
                                                onChange={onChangeShutOff}
                                            >
                                                <FormControlLabel style={{ marginLeft: '100px' }} value="Off" control={<Radio />} label="Off" />
                                                <FormControlLabel style={{ marginLeft: '100px' }} value="Man Hours Utilization" control={<Radio />} label="Man Hours Utilization" />

                                            </RadioGroup>
                                        </FormControl>
                                        {
                                            shutOff !=='Off' &&
                                            <>
                                            <Grid style={{marginLeft:'300px',marginTop:'10px'}} item xs={12} sm={12} md={6} lg={6} xl={6}>
                                            <TextField
                                                fullWidth
                                                id="Vendor-Address"
                                                variant="outlined"
                                                multiline
                                                value={manHoursDetails}
                                               onChange={(e)=>{setSmanHoursDetails(e.target.value)}}
                                            />
                                        </Grid>
                                        </>

                                        } 
                                    </Grid>
                                </Grid>
                            
                                       
                                <Grid container spacing={2} style={{ marginTop: '10px', marginRight: '20px' }}>
                                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        <label>Date: From:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                        <TextField
                                            fullWidth
                                            id="Vendor-Address"
                                            variant="outlined"
                                            type='date'
                                            value={dateFrom}
                                            onChange={(e)=>{setDateFrom(e.target.value)}}

                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        To
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                        <TextField
                                            fullWidth
                                            id="Vendor-Address"
                                            variant="outlined"
                                            type='date'
                                            value={dateTo}
                                            onChange={(e)=>{setDateTo(e.target.value)}}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginTop: '10px', marginBottom: '40px', marginRight: '20px' }}>
                                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        <label>  Time: From</label>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                        <TextField
                                            fullWidth
                                            id="Vendor-Address"
                                            variant="outlined"
                                            type='time'
                                            value={timeFrom}
                                            onChange={(e)=>{setTimeFrom(e.target.value)}}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}
                                        style={{
                                            alignSelf: 'center',
                                            textAlignLast: 'center'
                                        }}
                                    >
                                        To
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                        <TextField
                                            fullWidth
                                            id="Vendor-Address"
                                            variant="outlined"
                                            type='time'
                                            value={timeTo}
                                            onChange={(e)=>{setTimeTo(e.target.value)}}

                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    }
                    {
                        activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>

                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>

                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}>
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />

                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>

                            </Box>
                        </React.Fragment>
                    )}
                </Box>
                </Grid>
            </Grid>
            <NotificationBar
                handleClose={handleCloseNotify}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </div>
    );

}
