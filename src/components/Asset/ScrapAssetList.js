import Radio from '@mui/material/Radio';
import { Button, 
        FormControl, 
        FormControlLabel, 
        Grid, 
        InputLabel, 
        MenuItem, 
        RadioGroup, 
        Select, 
        TextField,} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { 
    FetchDepaertmentService, 
    FetchSectionService,
    FetchAssetTypeService,
    FetchAssetNameService,
    ScrapAssetAddService, 
} from '../../services/ApiServices';

import ScrapLog from '../Asset/Scraplog'
import NotificationBar from '../../services/NotificationBar';

const ScrapAssetList = () => {
const [departmentList,setDepartmentList] =useState([]);
const [department, setDepartment] = useState('');
const [sectionList,setSectionList] =useState([]);
const [section, setSection] = useState('');
const [assetTypeList,setAssetTypeList] =useState([]);
const [assetType, setAssetType] = useState('');
const [assetNameList,setAssetNameList] =useState([]);
const [assetName, setAssetName] = useState('');
const [scrapAprovalLetter,setScrapAprovalLetter]=useState('');
const [open,setOpen]=useState(false);

const [tagAssetType, setTageAssetType] = useState("Scrap");
const onTagAssetType = (event) => {
    setTageAssetType(event.target.value);
};
const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
});


useEffect(() => {
    FetchDepaertmentService(handleFetchSuccess, handleFetchException);
   
}, []);

const handleCloseNotify = () => {
    setOpen(false);
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };


const handleFetchSuccess = (dataObject) =>{
    setDepartmentList(dataObject.data);
}

const handleFetchException = (errorStaus, errorMessage) =>{
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

const onSectionChange = (e)=>{
    setSection(e.target.value);
    FetchAssetTypeService({id:e.target.value},handleAssetTypeService,handleAssetTypeException)
}
const handleAssetTypeService = (dataObject) => {
    setAssetTypeList(dataObject.data);
}

const handleAssetTypeException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
}

const onAssetTypeChange = (e)=>{
    setAssetType(e.target.value);
    FetchAssetNameService({id:e.target.value},handleAssetNameService,handleAssetNameServiceException)
}
const handleAssetNameService = (dataObject) => {
    setAssetNameList(dataObject.data);
}

const handleAssetNameServiceException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
}
const onAssetNameChange = (e)=>{
    setAssetName(e.target.value);
}

const onSubmit=(e)=>{
    e.preventDefault();
    ScrapAssetAddService({
        scrapType:tagAssetType,
        department:department,
        section:section,
        assetType:assetType,
        assetName:assetName,
        scrapAprovalLetter:scrapAprovalLetter,
        
    },handleScrapAsset,handleScrapAssetException)
}
const handleScrapAsset=(dataObject)=>{
    console.log(dataObject);
    
  setNotification({
    status: true,
    type: 'success',
    message: dataObject.message,
  });
     
}

const handleScrapAssetException=(errorStaus, errorMessage)=>{
    console.log(errorMessage);
    setNotification({
        status: true,
        type: 'error',
        message: errorMessage,
      });

}

const onClick=()=>{
    setOpen(true);
}
  return (
    <div>
    <form onSubmit={onSubmit}>
        <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} 
            style={{alignSelf:'center',textAlign:'center'}}
            >
            <h3> SCRAP ASSET </h3>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} 
            style={{alignSelf:'center',textAlign:'center'}}
            >
            <Button variant="contained" onClick={onClick}>SCRAP LOG</Button>
            </Grid>
        </Grid>
        <hr style={{bottom:'solid'}}/>
        <Grid container style={{marginTop:'20px'}}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
            style={{ alignSelf: 'center',
                    textAlignLast: 'center'}}
            >
                <label>Scrap Type:</label>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <FormControl>
                <RadioGroup
                row
                value={tagAssetType}
                onChange={onTagAssetType}>
               <FormControlLabel value="Scrap" control={<Radio />} label="Scrap" />
              <FormControlLabel  value="EOL" control={<Radio />} label="EOL" />
                </RadioGroup>
            </FormControl>     
            </Grid>
        </Grid>
        <Grid container style={{marginTop:'10px'}}>
            <Grid item xs={10} sm={6} md={6} lg={6} xl={6}
            style={{ alignSelf: 'center',  textAlignLast: 'center'}}
            >
            <label>Department :</label>
            </Grid>
            <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
            <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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
        <Grid container style={{marginTop:'10px'}}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
            style={{alignSelf: 'center',  textAlignLast: 'center'}}
            >
            <label>Section:</label>
            </Grid>
            <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
            <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Section:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Department"
                            value={section}
                            onChange={(e) => onSectionChange(e)}>
                            {
                                sectionList.map((data, index) => {
                                return (
                                    <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                                )
                            })}
                        </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container style={{marginTop:'10px'}}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
            
            style={{alignSelf: 'center',  textAlignLast: 'center'}}
            >
            <label>Asset Type :</label>
            </Grid>
            <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
            <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Asset Type :</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Department"
                            value={assetType}
                            onChange={(e) => onAssetTypeChange(e)}>
                            {
                                assetTypeList.map((data, index) => {
                                return (
                                    <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                                )
                            })}
                        </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container style={{marginTop:'10px'}}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
            
            style={{alignSelf: 'center',  textAlignLast: 'center'}}>
            <label>Asset Name :</label>
            </Grid>
            <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
            <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Asset Name :</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Department"
                            value={assetName}
                            onChange={(e) => onAssetNameChange(e)}>
                            {
                                assetNameList.map((data, index) => {
                                return (
                                    <MenuItem value={data.id} key={index}>{data.assetName}</MenuItem>
                                )
                            })}
                        </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container style={{marginTop:'10px'}}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
            style={{alignSelf: 'center',  textAlignLast: 'center'}}
            >
            <label>Scrap Aproval Letter :</label>
            </Grid>
            <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
            <TextField
                    fullWidth
                    label="Canceled Cheque"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            if (reader.readyState === 2) {
                            setScrapAprovalLetter(reader.result);
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

        <Grid container style={{marginTop:'10px'}}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
            style={{alignSelf: 'center',  textAlignLast: 'center'}}
            >
            <Button variant="contained" type='submit'>Scrap</Button>
            </Grid>
          
        </Grid>
        <div>
       
        </div>
    </form>
    <ScrapLog
    open={open}
    setOpen={setOpen}
    />
    
 <NotificationBar
    handleClose={handleCloseNotify}
    notificationContent={openNotification.message}
    openNotification={openNotification.status}
    type={openNotification.type}
/>

    </div>
  )
}

export default ScrapAssetList
