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
import img from "./rdl.png"
import { TransferAssetGetAssetIdService, TransGetAssetIdService } from '../../services/ApiServices';

const Transferasset = ({ open, setOpen, isAdd, editData, setRefresh }) => { 
    const [unit, setUnit] = useState('');
    const [unitName, setUnitName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [lineName, setLineName] = useState('');
    const [remarks, setRemarks] = useState('');
    const [fileUpload, setFileUpload] = useState('');
    const [assetIdList,setAssetIdList]=useState([]);
    const [assetId,setAssetId]=useState([]);
    const [rows, setRows]=useState([]);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    const handleClose=()=>{
        setOpen(false);
        
    }

    const handleNotify = () => {
        setOpen(false)
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };
  useEffect(()=>{
    TransferAssetGetAssetIdService(handleTransferAssetGetAssetId,handleTransferAssetGetAssetException);
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
const handleTransGetAssetIdException=()=>{

}
    return(
        <div>
            <form >
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
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
                                <label>Unit:</label>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label=""
                                  >
                                            
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={10} sm={10} md={3} lg={3} xl={3}
                                style={{alignSelf:'center', textAlign:'center'}}
                            >
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
                                    >
                                         
                                
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
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label=""
                                    >
                                    

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
                                    >
                                    

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
                                    >
                                    

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
                       <img src={img} style={{alignSelf:'center',alignItems: 'center',}} height="40px" width="40px"/>
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
