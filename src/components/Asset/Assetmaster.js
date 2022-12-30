import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, MenuItem } from '@mui/material';
import { FetchAssetMasterService, FetchAssetTypeService, FetchDepaertmentService, FetchSectionService } from '../../services/ApiServices';
import { DownloadAssetMaster } from '../../services/DownloadService';

export default function Assetmaster() {
  const [departmentList, setDepartmentList] = useState([]);
  const [sectionList,setSectionList] = useState([]);
  const [department,setDepartment]=useState("");
  const [section,setSection]=useState("");
  const [assetTypeList,setAssetTypeList] = useState([]);
  const [assetType,setAssetType] = useState('');
  const [rows, setRows ]= useState([]);
  const [loading, setLoading]=useState(false);

  const columns = [
    { field: 'id', headerName: 'Serial No', width: 40 },
    { field: 'department', headerName: 'Department', width: 100 },
    { field: 'Section', headerName: 'Section', width: 100 },
    { field: 'assetName', headerName: 'Machine Name', width: 100 },
    { field: 'assetype', headerName: 'Asset Type', width: 100 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 100 },
    { field: 'assetModel', headerName: 'Asset Model', width: 100 },
    { field: 'poNo', headerName: 'PO Details', width: 100 },
    { field: 'invoiceNo', headerName: 'Invoice Details', width: 120 },
    { field: 'warrantyStartDate', headerName: 'Waranty Start Date', width: 140 },
    { field: 'warrantyEndDate', headerName: 'Waranty End Date', width: 140 },
  ];
 
    useEffect(() => {
        FetchDepaertmentService(handleFetchSuccess, handleFetchException);

    }, []);
    
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
        FetchAssetTypeService({
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
        
    };
       
  const onSubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  FetchAssetMasterService({id:assetType},handleAssetMasterService,handleAssetMasterServiceException)
 }
 const handleAssetMasterService=(dataObject)=>{
  setLoading(false);
  setRows(dataObject.data);
 }
 const handleAssetMasterServiceException=(errorStaus, errorMessage) => {
  console.log(errorMessage);
 }
 const onClickExport=(e)=>{
  e.preventDefault();
  DownloadAssetMaster(assetType,handleAlloctionExport,handleAlloctionExportException)
}
const handleAlloctionExport=()=>{ 
        
}
const handleAlloctionExportException=()=>{   }

  return(
    <div>
      <form onSubmit={onSubmit}>
        <Grid container style={{marginBottom:'10px'}}>
          <Grid item xs={12} sm={6} md={3} lg={1} xl={1} 
          style={{alignSelf:"center", textAlign:'center'}}
          >
          <label>Department:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                  <Select
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
          <Grid item xs={12} sm={6} md={3} lg={1} xl={1}
             style={{alignSelf:"center", textAlign:'center' ,marginTop:'10px'}}
          >
          <label >Section:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
              <FormControl fullWidth
                style={{marginTop:'10px'}}
              >
                  <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                  <Select
                
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
          <Grid item xs={12} sm={6} md={3} lg={1} xl={1}
             style={{alignSelf:"center", textAlign:'center'}}
          >
          <label >Asset Type:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} xl={2} style={{marginTop:'10px'}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Asset Type</InputLabel>
                <Select
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
            <Grid item xs={12} sm={6} md={3} lg={2} xl={2}
               style={{alignSelf:"center", textAlign:'center'}}
            >
            <Button  variant="contained" type="submit">Submit</Button>
          </Grid>
        </Grid>
       
        </form>
        <hr />
        <Grid container style={{marginTop:'5px'}}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
           style={{alignSelf:"center", textAlign:'center'}}
          >
          <h3 >VIEW ASSET</h3>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
           style={{alignSelf:"center", textAlign:'center'}}
          >
          <Button  variant="contained" onClick={onClickExport}>Export</Button>
          </Grid>
        </Grid>
          
          <hr/>
          <div style={{ height: 300, width: '100%' , marginTop:'20px'}}>
            <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowsPerPageOptions={[5]}
            onRowAdd/>
          </div>
        
    </div>
  )
}