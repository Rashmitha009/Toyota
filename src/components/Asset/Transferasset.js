import React,{useState,useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Grid, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import img from "./images.png"
import { FetchDepaertmentService, FetchSectionService, LineShow, ProjectShow, TransferAsset, TransferAssetGetAssetIdService, TransGetAssetIdService, UnitShow } from '../../services/ApiServices';

const Transferasset = () => { 
    const [unit, setUnit] = useState('');
    const [unitList,setUnitList] = useState([]);
    const [unitName, setUnitName] = useState('');
    const [project,setProject] = useState('');
    const [projectList,setProjectList] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [department,setDepartment]=useState("");
    const [departmentList, setDepartmentList] = useState([])
    const [departmentName, setDepartmentName] = useState('');
    const [section,setSection]=useState("");
    const [sectionList,setSectionList]=useState([]);
    const [sectionName, setSectionName] = useState('');
    const [line,setLine]=useState("");
    const [lineList,setLineList]=useState([]);
    const [lineName, setLineName] = useState('');
    const [remarks, setRemarks] = useState('');
    const [fileUpload, setFileUpload]= useState(img)
    const [assetIdList,setAssetIdList]=useState([]);
    const [assetId,setAssetId]=useState([]);
    const [imageUpload,setImageUpload]= useState(img);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });


    useEffect(()=>{
        TransferAssetGetAssetIdService(handleTransferAssetGetAssetId,handleTransferAssetGetAssetException);
        UnitShow(handleUnitShow,handleUnitShowException);
        ProjectShow(handleProjectShow,handleProjectShowException);
        FetchDepaertmentService(handleFetchDepaertmentSuccess, handleFetchDepaertmentException);
       
        LineShow(handleLineShow,handleLineShowException);
    },[])

    const handleTransferAssetGetAssetId=(dataObject)=>
    {
        setAssetIdList(dataObject.data);
       
    }
    const handleTransferAssetGetAssetException=()=>{

    }
    const onAssetIdChange=(e)=>{
        setAssetId(e.target.value);
        TransGetAssetIdService({id:e.target.value},handleTransGetAssetIdService,handleTransGetAssetIdException);
    }
const handleTransGetAssetIdService=(dataObject)=>{
    setUnitName(dataObject?.data[0]?.unitName || '');
    setProjectName(dataObject?.data[0]?.projectName || '');
    setDepartmentName(dataObject?.data[0]?.departmentName || '');
    setSectionName(dataObject?.data[0]?.sectionName  || '');
    setLineName(dataObject?.data[0]?.lineName  || '');
}
const handleTransGetAssetIdException=(error,errorMessage)=>{
   console.log(errorMessage);
}

const handleUnitShow=(dataObject)=>{
    setUnitList(dataObject.data);
}
const handleUnitShowException=(error,errorMessage)=>{
    console.log(errorMessage);
}

const handleProjectShow=(dataObject)=>{
    setProjectList(dataObject.data);
}

const handleProjectShowException=(error,errorMessage)=>{
    console.log(errorMessage);
}

const handleFetchDepaertmentSuccess=(dataObject)=>{
    setDepartmentList(dataObject.data);
}

 const handleFetchDepaertmentException=(error,errorMessage)=>{
    console.log(errorMessage);
 }

 const handleFetchSectionSuccess=(dataObject)=>{
    setSectionList(dataObject.data);
 }
 
 const handleFetchSectionException=(error,errorMessage)=>{
    console.log(errorMessage);
 }

 const handleLineShow=(dataObject)=>{
    setLineList(dataObject.data);
 }
 
 
 const handleLineShowException=(error,errorMessage)=>{
    console.log(errorMessage);
 }

const onUnitChange=(e)=>{
    setUnit(e.target.value);
}

const onProjectChange=(e)=>{
    setProject(e.target.value);
}

const onDepartmentChange = (e) => {
    setDepartment(e.target.value);
    FetchSectionService({id:e.target.value},handleFetchSectionSuccess, handleFetchSectionException);
}

const onSectionChange = (e) => {
    setSection(e.target.value);    
  }

 const onLineChange= (e) => {
    setLine(e.target.value);    
  }

  const onSubmit = (e) => {
    e.preventDefault();
    TransferAsset({
        id:assetId,
        unit:unit,
        project:project,
        department:department,
        section:section,
        line:line,
        remarks:remarks,
        fileUpload:fileUpload,
        
    },handleFetchTransferAssetSuccess, handleFetchTransferAssetException)
}

const handleFetchTransferAssetSuccess = (dataObject) =>{
    setUnit('');
    setProject('');
    setDepartment('');
    setSection('');
    setLine('');
    setFileUpload('');
    setNotification({
        status: true,
        type: 'success',
        message: dataObject.massage,
    });
}

const handleFetchTransferAssetException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
    setNotification({
        status: true,
        type: 'error',
        message: errorMessage,
    });
    setUnit('');
    setProject('');
    setDepartment('');
    setSection('');
    setLine('');
    setFileUpload('');

}

  
    return(
        <div>
            <form onSubmit={onSubmit} >
                <Grid container spacing={2} style={{display:'flex'}}>
                    <Grid container  item xs={10} sm={10} md={5} lg={5} xl={5}
                    style={{border:'solid',borderColor:'whitesmoke',marginTop:'20px',marginLeft:'60px'}}
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{alignSelf:'center', textAlign:'center'}}
                        >
                        <h3>From</h3>
                        <hr />
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center' }}
                            >
                                <label>Asset Id:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{marginTop:'10px',marginBotton:'10px'}}>
                                <FormControl 
                                        fullWidth>
                                        <InputLabel >Select AssetId</InputLabel>
                                        <Select
                                        label="Select Department"
                                        value={assetId}
                                        onChange={(e) => onAssetIdChange(e)}>
                                            {   
                                                assetIdList.map((data, index) => {
                                                return (
                                                    <MenuItem value={data.id} key={index}>{data.assetId}</MenuItem>
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
                                <label>Unit:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{marginTop:'10px',marginBotton:'10px'}}>
                                        <TextField 
                                        fullWidth 
                                        label=""
                                        variant="outlined"
                                        value={unitName}/>
                                    </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                    <label>Project:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{marginTop:'10px',marginBotton:'10px'}}>
                                        <TextField 
                                        fullWidth 
                                        label=""
                                        variant="outlined"
                                        value={projectName}/>
                                    </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label >Department:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{marginTop:'10px',marginBotton:'10px'}}>
                                        <TextField 
                                        fullWidth 
                                        label=""
                                        variant="outlined"
                                        value={departmentName}/>
                                    </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label >Section:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{marginTop:'10px',marginBotton:'10px'}}>
                                        <TextField 
                                        fullWidth 
                                        label=""
                                        variant="outlined"
                                        value={sectionName }/>
                                    </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label >Line:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{marginTop:'10px',marginBotton:'10px'}}>
                                        <TextField 
                                        fullWidth 
                                        label=""
                                        variant="outlined"
                                        value={lineName}/>
                                    </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label> Remarks:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{marginTop:'10px',marginBotton:'10px'}}>
                                        <TextField 
                                        fullWidth
                                        multiline/>
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
                    style={{border:'solid',borderColor:'whitesmoke',marginTop:'20px',marginLeft:'60px'}}
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{alignSelf:'center', textAlign:'center'}}
                        >
                        <h3>To</h3>
                            <hr />
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3} style={{alignSelf:'center', textAlign:'center'}}>
                                <label>Unit:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label=""
                                    value={unit}
                                    onChange={(e) => onUnitChange(e) }>
                                        {
                                            unitList.map((data, index) => {
                                                return (
                                                    <MenuItem value={data.id} key={index}>{data.unitName}</MenuItem>
                                                )
                                            })

                                        }                                           
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3} style={{alignSelf:'center', textAlign:'center'}}>
                                <label>Project:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px'}}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label=""
                                    value={project}
                                    onChange={(e) => onProjectChange(e) }>
                                    {
                                        projectList.map((data, index) => {
                                            return (
                                                <MenuItem value={data.id} key={index}>{data.projectName}</MenuItem>
                                            )
                                        })

                                    }
                                
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                    <label>Department:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px',marginBotton:'10px'}}
                            >
                                <FormControl fullWidth>
                                    <Select
                                    label=""
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
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                    <label>Section:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px',marginBotton:'10px'}}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label=""
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
                                    <label>Line:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}
                            style={{marginTop:'10px',marginBotton:'10px'}}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label=""
                                    value={line}
                                    onChange={(e) => onLineChange(e)}>
                                        {lineList.map((data, index) => {
                                            return (
                                                <MenuItem value={data.id} key={index}>{data.lineName}</MenuItem>
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
                                    <label>Remarks:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{marginTop:'10px',marginBotton:'10px'}}>
                                        <TextField 
                                        fullWidth
                                        multiline/>
                                    </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                    <label>File Upload:</label>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{marginTop:'20px',marginBotton:'10px'}}>
                            <TextField 
                                fullWidth
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                setFileUpload(reader.result);
                                            }
                                        };
                                        reader.readAsDataURL(e.target.files[0]);
                                        }
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    type="file"/> 
                            </Grid>
                           
                            <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label>View:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                  <AccordionDetails>
                    <Typography>
                      <ImageList x={{ width: 400, height: 450 }} cols={4} rowHeight={164}>
                        {/* <img
                        style={{width:'50px',height:'50px'}}/> */}
                       <img src={fileUpload} style={{alignSelf:'center',alignItems: 'center',}} height="40px" width="40px"/>
                      </ImageList>

                    </Typography>
                  </AccordionDetails> 
                  
                </Grid>
                            </Grid>
                        
                    </Grid>
                </Grid>
            </form> 
           
        </div>     
    )
}

export default Transferasset;       
