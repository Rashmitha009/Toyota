import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { FetchAssetTypeService, FetchDepaertmentService, FetchSectionService} from '../../services/ApiServices';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ViewAuditViewModal =({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [departmentList,setDepartmentList]= useState([]);
  const [section ,setSection]= useState('');
  const [department,setDepartment]=useState('');
  const [sectionList,setSectionList]=useState([]);
  const [assetList, setAssetList]= useState([]);
  const [assetType, setAssetType] = useState('');
  const [auditName,setAuditName]=useState('');
  const [ assetNameList, setAssetNameList] = useState([]);
  const [asset, setAsset] = useState('');
  const [rows ,setRows]=useState([]);


    const [openNotification, setNotification] = useState({
      status: false,
      type: 'error',
      message: '',
    });

    const columns = [
        { field: 'department', headerName: 'Department', width: 260 },
        { field: 'section', headerName: 'Section', width: 260 },
        { field: 'assetType', headerName: 'Asset Type', width: 260 },
        { field: 'machineName', headerName: 'Machine Name', width: 260 },
      ]

    useEffect(() => {
        FetchDepaertmentService(handleFetchSuccess, handleFetchException);
        setAuditName(editData?.auditName ||'');
        setDepartment(editData.department ||'');
        setSection(editData?.section ||'');
        setAssetType(editData?.assetType ||'');
    
      }, [editData]);
      
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
        },handleFetchDepartmentSuccess, handleFetchDepartmentException);
        
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
        
      }
      
      const handleFetchAssetNameServiceSuccess = (dataObject) => {
        setAssetNameList(dataObject.data || []);
      }
      
      const handleFetchAssetNameServiceException= (errorStaus, errorMessage) => {
        console.log(errorMessage);
      }

      const handleClose = () => {
        setOpen(false)
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };
      
      
      return (
        <div>
        <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='lg'>
          <form >
            <DialogTitle style={{background:'whitesmoke'}}>
              {"AUDIT ASSETS"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
              <form>
              <Grid  container spacing={2} style={{ marginTop: '20px'}}>
              <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Audit Name:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}  xl={2} >
          <TextField
              fullWidth
              id=""
              label=""
              variant="outlined"
              value={auditName}
          />

      </Grid>
          <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Department:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField fullWidth
                label=""
                variant="outlined"
                value={department}/>
              </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Section:</label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField fullWidth
                label=""
                variant="outlined"
                value={section}/>
              </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
            <label>Asset Type</label>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
          <TextField fullWidth
                label=""
                variant="outlined"
                value={assetType}/>
              </Grid>
                </Grid>
                <Grid container style={{display:'inline'}}> 
                <Grid>
                    <h3>Existing Asset</h3>
                </Grid>
                <Grid>
                <DataGrid style={{height:'200px'}}
                rows={rows}
                columns={columns} />
                <Button style={{marginTop:'20px'}} variant="contained" >Export</Button>
                </Grid>
                </Grid>
                <Grid container style={{display:'inline'}}> 
                <Grid>
                  <h3>Missing Asset</h3>
                </Grid>
                <Grid>
                <DataGrid style={{height:'200px'}}
                rows={rows}
                columns={columns} 
                />
                <Button style={{marginTop:'20px'}} variant="contained" >Export</Button>
                </Grid>
                </Grid>
                <Grid container style={{display:'inline'}}> 
                <Grid>
                    <h3>Additional Added Asset</h3>
                </Grid>
                <Grid>
                <DataGrid style={{height:'200px'}}
                rows={rows}
                columns={columns} />
                <Button style={{marginTop:'20px'}} variant="contained" >Export</Button>
                </Grid>
                </Grid>
              </form>
            </DialogContentText>
          </DialogContent>   
        </form>                         
      </Dialog>
    </div>
  )
}

export default ViewAuditViewModal
