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
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import {
    AssetAddService,
    AssetUpdateService,
    AssetIdShow,
    RequesterDepartment,
    FetchGetUnitPlantService,
    FetchGetLineService,
   
} from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';

const AssetModel = ({ open, setOpen, isAdd, editData, setRefresh, refresh }) => {
    const [assetNo,setAssetNo]=useState('');
    const [projectName,setProjectName]=useState('');
    const [requesterDepartment,setRequesterDepartment]=useState('');
    const [requesterDepartmentList,setRequesterDepartmentList]=useState([]);
    const [unitPlant,setUnitPlant]=useState('');
    const [unitPlantList,setUnitPlantList]=useState([]);
    const [line,setLine]=useState('');
    const [lineList,setLineList]=useState([]);
    const [component,setComponent]=useState('');
    const [operationNo,setOperationNo]=useState('');
    const [assetName,setAssetName]=useState('');
    const [operationName,setOperationName]=useState('');
    const [equipmentType,setEquipmentType]=useState('');
    const [dateOfRequest,setDateOfRequest]=useState('');
    const [requesterName,setRequesterName]=useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        RequesterDepartment(handleRequesterDepartment,handleRequesterDepartmentException); 
        FetchGetUnitPlantService(handleFetchUnitPlantSuccess, handleFetchUnitPlantException);    
        setLine(editData?.line || '');
        setProjectName(editData?.projectName || '');
        setRequesterDepartment(editData?.requesterDepartment || '');
        setUnitPlant(editData?.unitPlantId || '');
        setComponent(editData?.component || '');
        setOperationNo(editData?.operationNo || '');
        setAssetName(editData?.assetName || '');
        setAssetNo(editData?.assetNo || '');
        setOperationName(editData?.operationName || '');
        setEquipmentType(editData?.equipmentType || '');
        setDateOfRequest(editData?.dateOfRequest || '');
        setRequesterName(editData?.requesterName || '');
    }, [editData]);

    const handleRequesterDepartment=(dataObject)=>{
        setRequesterDepartmentList(dataObject.data || []);
    }

    const handleRequesterDepartmentException=(error,errorMessage)=>{
        console.log(errorMessage);
    }

    const handleFetchUnitPlantSuccess = (dataObject) =>{
        setUnitPlantList(dataObject.data || []);
        if(editData?.unitPlantId){
            FetchGetLineService({id:editData?.unitPlantId},handleFetchGetLine,handleFetchGetLineException ); 
        }
    }

   

    const handleFetchUnitPlantException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        isAdd === true ?
        (
            AssetAddService({
                assetNo:assetNo,
                projectName:projectName,
                requesterDepartment:requesterDepartment,
                unitPlant:unitPlant,
                line:line,
                component:component,
                operationNo:operationNo,
                assetName:assetName,
                operationName:operationName,
                equipmentType:equipmentType,
                dateOfRequest:dateOfRequest,
                requesterName:requesterName,
               
            }, handleAddSuccess, handleException)
        ) : (
            AssetUpdateService({
                id:editData.id,
                assetNo:assetNo,
                projectName:projectName,
                requesterDepartment:requesterDepartment,
                unitPlant:unitPlant,
                line:line,
                component:component,
                operationNo:operationNo,
                assetName:assetName,
                operationName:operationName,
                equipmentType:equipmentType,
                dateOfRequest:dateOfRequest,
                requesterName:requesterName,

                }, handleUpdateSuccess, handleException)
            );
    }
    
    const handleAddSuccess = (dataObject) => {
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
          });  
        clearForm();       
    }

    const clearForm = () => {
        setLine('');
        setProjectName('');
        setRequesterDepartment('');
        setUnitPlant('');
        setComponent('');
        setOperationNo('');
        setAssetName('');
        setAssetNo('');
        setOperationName('');
        setEquipmentType('');
        setDateOfRequest('');
        setRequesterName('');
        setLineList([]);
    }

    const handleUpdateSuccess = (dataObject) => {
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });  
        setOpen(false);       
    }

    const handleException = (errorObject, errorMessage) => {
        console.log(errorMessage);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
          });
       
      
    }
    const handleCloseNotify = () => {
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };
    

    const onAssetMasterChange = (e) => {
       
        AssetIdShow(handleAssetId,handleAssetIdException);
    }

    const handleAssetId=(dataObject)=>{
        
    }
    const handleAssetIdException=(errorObject, errorMessage) => {
        console.log(errorMessage);

    }
    const onRequesterDepartmentChange=(e)=>{
        setRequesterDepartment(e.target.value);      
    }

    const onUnitPlantChange = (e) => {
        setUnitPlant(e.target.value);
        // API {id:e.target.value}
        FetchGetLineService({
            id: e.target.value
          },handleFetchGetLine, handleFetchGetLineException);
        }

        const handleFetchGetLine=(dataObject)=>{
            setLineList(dataObject.data || []);
        }
        const handleFetchGetLineException=(errorStaus, errorMessage) =>{
            console.log(errorMessage);
        }
      
        
    const onLineChange = (e) => {
        setLine(e.target.value);    
      }
    
    return (
        <div>
            <Dialog
                open={open}
                fullWidth
                maxWidth='lg'
            >
                <form onSubmit={onSubmit}>
                    <DialogTitle style={{ background: 'whitesmoke' }}>
                        {"ADD ASSET"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <form>
                                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <TextField 
                                        fullWidth 
                                        label="Project Name"
                                        placeholder='Project Name'
                                        variant="outlined"
                                        value={projectName}
                                        onChange={(e)=>{setProjectName(e.target.value)}}
                                    />
                                </Grid>
                                    
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Request Department</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Request Department"
                                            placeholder='Request Department'
                                            value={requesterDepartment}
                                                onChange={(e) => onRequesterDepartmentChange(e)}
                                                >
                                                    {
                                                       requesterDepartmentList?.map((data, index) => {
                                                        return (
                                                            <MenuItem value={data.id} key={index}>{data.requesterDepartment}</MenuItem>
                                                        )
                                                    })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Unit/Plant</InputLabel>
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
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Line</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Line"
                                            placeholder='Line'
                                            value={line}
                                                onChange={(e) => onLineChange(e)}
                                                >
                                                    {
                                                       lineList?.map((data, index) => {
                                                        return (
                                                            <MenuItem value={data.id} key={index}>{data.lineName}</MenuItem>
                                                        )
                                                    })} 
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <TextField 
                                        fullWidth 
                                        label="Component"
                                        placeholder='Component'
                                        variant="outlined"
                                        value={component}
                                        onChange={(e)=>{setComponent(e.target.value)}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <TextField 
                                        fullWidth 
                                        label="Operation No"
                                        placeholder='Operation No'
                                        variant="outlined"
                                        value={operationNo}
                                        onChange={(e)=>{setOperationNo(e.target.value)}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <TextField 
                                        fullWidth 
                                        label="Machine Name"
                                        placeholder='Machine Name'
                                        variant="outlined"
                                        value={assetName}
                                        onChange={(e)=>{setAssetName(e.target.value)}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <TextField 
                                        fullWidth 
                                        label="Operation Name"
                                        placeholder='Operation Name'
                                        variant="outlined"
                                        value={operationName}
                                        onChange={(e)=>{setOperationName(e.target.value)}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <TextField 
                                        fullWidth 
                                        label="Equipment Type"
                                        placeholder='Equipment Type'
                                        variant="outlined"
                                        value={equipmentType}
                                        onChange={(e)=>{setEquipmentType(e.target.value)}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <TextField 
                                        fullWidth 
                                        label="Asset No"
                                        placeholder='Asset No'
                                        variant="outlined"
                                        value={assetNo}
                                        onChange={(e)=>{setAssetNo(e.target.value)}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <TextField 
                                        fullWidth 
                                        label="Date of Request"
                                        placeholder='Date of Request'
                                        variant="outlined"
                                        type='date'
                                        value={dateOfRequest}
                                        onChange={(e)=>{setDateOfRequest(e.target.value)}}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <TextField 
                                        fullWidth 
                                        label="Name of Request"
                                        placeholder='Name of Request'
                                        variant="outlined"
                                        value={requesterName}
                                        onChange={(e)=>{setRequesterName(e.target.value)}}/>
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

//  <Grid container spacing={2} style={{ marginTop: '20px' }}>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}
//                                         style={{
//                                             alignSelf: 'center',
//                                             textAlignLast: 'center'
//                                         }}
//                                     >
//                                         <label> Asset Master: </label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}
//                                     >
//                                         <FormControl style={{}} fullWidth>
//                                             <InputLabel id="demo-simple-select-label">Select Asset Master</InputLabel>
//                                             <Select
//                                                 label="Select Asset Master"
//                                                 value={assetMaster}
//                                                 onChange={(e) => onAssetMasterChange(e)}>
//                                                     {
//                                                         assetMasterList.map((data, index) => {
//                                                         return (
//                                                             <MenuItem value={data.id} key={index}>{data.assetMasterName}</MenuItem>
//                                                         )
//                                                     })}
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3}  md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }}>
//                                         <label style={{}}>Id:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}>
//                                     <TextField
//                                             id="Asset Id "
//                                             fullWidth
//                                             label="Asset Id"
//                                             variant="outlined"
//                                             value={assetId}
//                                     />  
//                                     </Grid>
//                                     <Grid item xs={12} sm={3}  md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }}>
//                                         <label style={{}}>Department:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}>
//                                         <FormControl style={{}} fullWidth>
//                                             <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
//                                             <Select
//                                             labelId="department"
//                                             id="department"
//                                             label="Select Department"
//                                             value={department}
//                                             onChange={(e) => onDepartmentChange(e)}>
//                                                 {
//                                                     departmentList.map((data, index) => {
//                                                     return (
//                                                         <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
//                                                     )
//                                                 })}
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}
//                                         style={{
//                                             alignSelf: 'center',
//                                             textAlignLast: 'center'
//                                         }}
//                                     >
//                                         <label>Control Department: </label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}
//                                     >
//                                         <FormControl style={{}} fullWidth>
//                                             <InputLabel id="demo-simple-select-label">Select Control Department</InputLabel>
//                                                 <Select
//                                                     labelId="department"
//                                                     id="department"
//                                                     label="Select Control Department"
//                                                     value={controlDepartment}
//                                                     onChange={(e) => onContralDepartmentChange(e)}>
//                                                         {
//                                                             contralDepartmentList.map((data, index) => {
//                                                             return (
//                                                                 <MenuItem value={data.id} key={index}>{data.controlDepartment}</MenuItem>
//                                                             )
//                                                         })}
//                                                 </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3}  md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }}>
//                                         <label style={{}}>User Department:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}>
//                                         <FormControl style={{}} fullWidth>
//                                             <InputLabel id="demo-simple-select-label">Select User Department</InputLabel>
//                                             <Select
//                                             labelId="department"
//                                             id="department"
//                                             label="Select User Department"
//                                             value={userDepartment}
//                                             onChange={(e) =>  onUserDepartmentChange(e)}>
//                                                 {
//                                                     userDepartmentList.map((data, index) => {
//                                                     return (
//                                                         <MenuItem value={data.id} key={index}>{data.userDepartment}</MenuItem>
//                                                     )
//                                                 })}
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3}  md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label >Section:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <FormControl fullWidth style={{}}>
//                                             <InputLabel id="demo-simple-select-label">Select Section </InputLabel>
//                                             <Select
//                                             labelId="section"
//                                             id="section"
//                                             label="Select Section"
//                                             value={section}
//                                             onChange={(e) => onSectionChange(e)}>
//                                                 {sectionList.map((data, index) => {
//                                                     return (
//                                                         <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
//                                                     )
//                                                 })}
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label>Asset Type :</label>
//                                     </Grid>
//                                     <Grid item  xs={12} sm={9} md={4}lg={3.5}xl={3}
//                                     >
//                                         <FormControl fullWidth>
//                                             <InputLabel id="demo-simple-select-label">Select Asset Type</InputLabel>
//                                             <Select
//                                                 labelId="Vendor Name"
//                                                 id="Vendor-Name"
//                                                 label="Select Asset Type"
//                                                 value={assetType}
//                                                 onChange={(e) => onAssetTypeChange(e)}>
//                                                 {assetTypeList.map((data, index) => {
//                                                     return (
//                                                         <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
//                                                     )
//                                                 })}

//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item  xs={12} sm={3} md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label>Asset Name : </label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
//                                         <TextField
//                                         fullWidth
//                                         id="Asset-Name"
//                                         label="Asset Name"
//                                         variant="outlined"
//                                         onChange={(e) => { setAssetName(e.target.value) }}
//                                         value={assetName}/>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
//                                         <label> Financial Asset ID :</label>
//                                     </Grid>
//                                     <Grid item xs={12}  sm={9}  md={4} lg={3.5} xl={3}>
//                                         <TextField
//                                         fullWidth
//                                         id="FinancialAssetID "
//                                         label="Financial Asset ID  "
//                                         variant="outlined"
//                                         onChange={(e) => { setFinancialAssetId(e.target.value) }}
//                                         value={financialAssetId}/>
//                                     </Grid>
//                                     <Grid item xs={12}  sm={3} md={2} lg={2.5} xl={3} style={{  alignSelf: 'center',  textAlignLast: 'center' }}>
//                                         <label style={{}}>Unit:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5}  xl={3} >
//                                         <FormControl fullWidth >
//                                             <InputLabel >Select Unit</InputLabel>
//                                             <Select
//                                             labelId="vendor"
//                                             id="vendor"
//                                             label="Select Unit"
//                                             value={unit}
//                                             onChange={(e) => onUnitChange(e)}>
//                                                 {
//                                                     unitList.map((data, index) => {
//                                                         return (
//                                                             <MenuItem value={data.id} key={index}>{data.unitName}</MenuItem>
//                                                     )
//                                                 })}
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label>Project :</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9}  md={4}  lg={3.5}  xl={3}  >
//                                     <FormControl fullWidth >
//                                             <InputLabel >Select Project</InputLabel>
//                                             <Select
//                                             labelId="vendor"
//                                             id="vendor"
//                                             label="Select Unit"
//                                             value={project}
//                                             onChange={(e) => onProjectChange(e)}>
//                                                 {projectList.map((data, index) => {
//                                                     return (
//                                                         <MenuItem value={data.id} key={index}>{data.projectName}</MenuItem>
//                                                     )
//                                                 })}
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label style={{}}>Line :</label>
//                                     </Grid>
//                                     <Grid item  xs={12} sm={9} md={4} lg={3.5}  xl={3} >
//                                     <FormControl fullWidth >
//                                             <InputLabel >Select Line</InputLabel>
//                                             <Select
//                                             labelId="vendor"
//                                             id="vendor"
//                                             label="Select Unit"
//                                             value={line}
//                                             onChange={(e) => onLineChange(e)}>
//                                                 {
//                                                     lineList.map((data, index) => {
//                                                         return (
//                                                             <MenuItem value={data.id} key={index}>{data.lineName}</MenuItem>
//                                                         )
//                                                 })}
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label>Operation No : </label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
//                                         <TextField
//                                         fullWidth
//                                         id="Vendor-Address"
//                                         label="Operation No "
//                                         variant="outlined"
//                                         value={operationNo}
//                                         onChange={(e) => { setOperationNo(e.target.value) }}
//                                     />
//                                     </Grid>
//                                     <Grid item xs={12}  sm={3}  md={2} lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label style={{}}>Usage Code:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
//                                         <TextField
//                                         fullWidth
//                                         id="AssetModel"
//                                         label="Usage Code"
//                                         variant="outlined"
//                                         value={usageCode}
//                                         onChange={(e) => { setUsageCode(e.target.value) }}/>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
//                                         <label>Manufacturer: </label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9}  md={4} lg={3.5}  xl={3} >
//                                         <TextField
//                                         fullWidth
//                                         id="Manufacturer"
//                                         label="Manufacturer"
//                                         variant="outlined"
//                                         value={manufacturer}
//                                         onChange={(e) => { setManufacturer(e.target.value) }}/>
//                                     </Grid>   
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
//                                         <label>Manufacturer No: </label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9}  md={4} lg={3.5}  xl={3} >
//                                         <TextField
//                                         fullWidth
//                                         id="Manufacturer"
//                                         label="Manufacturer No"
//                                         variant="outlined"
//                                         value={manufacturerNo}
//                                         onChange={(e) => { setManufacturerNo(e.target.value) }}/>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3}  md={2}  lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label>Year of Mfg: </label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
//                                         <TextField
//                                         fullWidth
//                                         label="Year of Mfg:"
//                                         variant="outlined"
//                                         value={yearOfMfg}
//                                         onChange={(e) => { setYearOfMfg(e.target.value) }}/>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2}  lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
//                                         <label style={{}}>Country of Mfg:</label>
//                                     </Grid>
//                                     <Grid item  xs={12} sm={9} md={4} lg={3.5} xl={3} >
//                                         <TextField
//                                         fullWidth
                                        
//                                         label="Country of Mfg"
//                                         variant="outlined"
//                                         value={countryOfMfg}
//                                         onChange={(e) => { setCountryOfMfg(e.target.value) }}/>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2}  lg={2.5} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'  }} >
//                                         <label style={{}}>Weight:</label>
//                                     </Grid>
//                                     <Grid item  xs={12} sm={9} md={4} lg={3.5} xl={3} >
//                                         <TextField
//                                         fullWidth
//                                         id="Weight"
//                                         label="Weight"
//                                         variant="outlined"
//                                         value={weight}
//                                         onChange={(e) => { setWeight(e.target.value) }}/>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3}  style={{ alignSelf: 'center', textAlignLast: 'center'}}
//                                     >
//                                         <label>Used/New:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9}  md={4} lg={3.5} xl={3} >
//                                     <FormControl fullWidth>
//                                         <InputLabel id="demo-simple-select-label">Used/New</InputLabel>
//                                         <Select
//                                             value={usedNew}
//                                             label="Used/New"
//                                             onChange={handleChange}
//                                         >
//                                         <MenuItem value='Used'>Used</MenuItem>
//                                         <MenuItem value='New'>New</MenuItem>
                                        
//                                         </Select>
//                                     </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label>Description:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
//                                         <TextField
//                                         fullWidth
//                                         id="Description"
//                                         label="Description"
//                                         variant="outlined"
//                                         value={description}
//                                         onChange={(e) => { setDescription(e.target.value) }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5} xl={3} style={{  alignSelf: 'center', textAlignLast: 'center' }} >
//                                         <label>Requestor Name:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3} >
//                                         <TextField
//                                         fullWidth
//                                         id="Description"
//                                         label="Requestor Name"
//                                         variant="outlined"
//                                         value={requestorName}
//                                         onChange={(e) => { setRequestorName(e.target.value) }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5}  xl={3} style={{ alignSelf: 'center',  textAlignLast: 'center'  }} >
//                                         <label> Requester Department:</label>
//                                     </Grid>
//                                     <Grid item xs={12} sm={9} md={4} lg={3.5} xl={3}>
//                                         <FormControl style={{}} fullWidth>
//                                             <InputLabel id="demo-simple-select-label">Select Requester Department</InputLabel>
//                                             <Select
//                                             labelId="department"
//                                             id="department"
//                                             label="Select Requester Department"
//                                             value={requestor}
//                                             onChange={(e) => onRequestorChange(e)}>
//                                                 {
//                                                     requestorList.map((data, index) => {
//                                                     return (
//                                                         <MenuItem value={data.id} key={index}>{data.requesterDepartment}</MenuItem>
//                                                     )
//                                                 })}
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12} sm={3} md={2} lg={2.5}  xl={3} style={{ alignSelf: 'center',  textAlignLast: 'center'  }} >
//                                         <label>Asset Image:</label>
//                                     </Grid>
//                                     <Grid item xs={12}  sm={9} md={4} lg={3.5} xl={3} >
//                                         <TextField
//                                             fullWidth
//                                             onChange={(e) => {
//                                                 if (e.target.files && e.target.files.length > 0) {
//                                                     const reader = new FileReader();
//                                                     reader.onload = () => {
//                                                         if (reader.readyState === 2) {
//                                                             setAssetImage(reader.result);
//                                                         }
//                                                     };
//                                                     reader.readAsDataURL(e.target.files[0]);
//                                                 }
//                                             }}
//                                             InputLabelProps={{ shrink: true }}
//                                             type="file"
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}  sm={10} md={8} lg={8} xl={8} style={{ alignSelf: 'center',  textAlignLast: 'center'  }} >
//                                         <FormControl>
//                                             <RadioGroup
//                                                 row
//                                                value={activeStatus}
//                                                onChange={onChangeSatus}
//                                             >
//                                                 <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
//                                                 <FormControlLabel value="Active" control={<Radio />} label="Active" />
//                                             </RadioGroup>
//                                         </FormControl>
//                                     </Grid>
//                                 </Grid>
