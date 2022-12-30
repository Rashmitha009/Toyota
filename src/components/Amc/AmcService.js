import React,{useState,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import { 
  FetchDepaertmentService, 
  FetchSectionService ,
  FetchAssetTypeService, 
  FetchAssetNameService,
  ViewAmcService,
} from '../../services/ApiServices';

const AmcService = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [department  ,setDepartment]= useState();
  const [departmentList,setDepartmentList]= useState([]);
  const [section ,setSection]= useState();
  const [sectionList,setSectionList]=useState([]);
  const [assetList, setAssetList]= useState([]);
  const [assetType, setAssetType] = useState('');
  const [ assetNameList, setAssetNameList] = useState([]);
  const [asset, setAsset] = useState('');
  const [rows ,setRows]=useState([]);
  const [loading,setLoading]=useState(false);
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
    
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    ViewAmcService
    ({
      id:asset
    },handleSuccess, handleException)
  }
  
  const handleSuccess = (dataObject) =>{
    console.log(dataObject);
    setRows(dataObject.data);
    setLoading(false);
   
  }
  
  const handleException = (errorObject, errorMessage) =>{
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message:errorMessage,
    });
  }
  
  const handleCloseNotify = () => {
    setOpen(false)
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
  
  const handleFetchDepartmentSuccess = (dataObject) =>{
    setSectionList(dataObject.data);
  }
  
  const handleFetchDepartmentException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }
  
  const onSectionChange = (e) => {
    setSection(e.target.value);
    FetchAssetTypeService({
      id: e.target.value
    }, handleFetchAssetTypeServiceSuccess, handleFetchAssetTypeServiceException);
  }
  
  const handleFetchAssetTypeServiceSuccess = (dataObject) => {
    setAssetList(dataObject.data);
  }
  
  const handleFetchAssetTypeServiceException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }
  
  const onAssetChange = (e) => {
    setAsset(e.target.value)
  }
  
  const onAssetTypeChange = (e) => {
    setAssetType(e.target.value);
    FetchAssetNameService({
      id: e.target.value
    }, handleFetchAssetNameServiceSuccess, handleFetchAssetNameServiceException);
  }
  
  const handleFetchAssetNameServiceSuccess = (dataObject) => {
    setAssetNameList(dataObject.data || []);
  }
  
  const handleFetchAssetNameServiceException= (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }
  
  
  const columns = [
    { field: 'vendorName', headerName: 'Vendor Name', width: 300 },
    { field: 'assetName', headerName: 'Asset Name', width: 300 },
    { field: 's1startDate', headerName: 'Service Due Date', width: 300 },
    // { field: 'Action', headerName: 'Action', width: 240 },   
  ];
  
  return (
    <form onSubmit={onSubmit}>
      <div>
        <Grid  container spacing={2} style={{ marginTop: '20px'}}>
          <Grid item xs={12} sm={6} md={6} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Department:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3} >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label=""
              onChange={(e) => onDepartmentChange(e)}>
                {departmentList.map((data, index) => {
                  return (
                    <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={2} xl={2}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Section:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label=""
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
        </Grid>
          <Grid  container spacing={2} style={{ marginTop: '10px'}}>
            <Grid item xs={12} sm={6} md={6} lg={2} xl={2}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Asset Type</label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"    
                label=""
                onChange={(e) => onAssetTypeChange(e)}>
                  {assetList.map((data, index) => {
                    return (
                      <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Asset Name :</label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label=""
                onChange={(e) => onAssetChange(e)}>
                  {assetNameList?.map((data, index) => {
                    return (
                      <MenuItem value={data.id} key={index}>{data.assetName}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item style={{
          textAlign: 'end', marginTop:'10px'
        }}>
          <Button variant="contained" type='submit' >View</Button>
        </Grid>
        </Grid>
      </div>
      <Grid container spacing={2} style={{marginTop:'10px'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
          <h3>Service DATE</h3>
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={12} xl={12} style={{height:'200px',marginTop:'20px'}}>
          <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5]}
          onRowAdd/>
        </Grid> 
      </Grid>
    </form>
  )
}

export default AmcService;
