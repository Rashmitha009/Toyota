import React, { useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import { InsuranceAddService ,
  InsuranceUpdateService,
  FetchDepaertmentService,
  FetchSectionService,
  FetchAssetTypeService,
  FetchVenderService,
  FetchVenderDataService,
  FetchAssetNameService,
} from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';

const InsuranceModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [vendorName, setVendorName] = useState('');
  const [vendorNameList, setVendorNameList] = useState([]);
  const [venderAddress ,setVenderAddress]= useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [premiumCost ,setpremiumCost]= useState('');
  const [insuranceDoc,setinsuranceDoc]= useState('');
  const [department, setDepartment] = useState('');
  const [section, setSection] = useState('');
  const [sectionList, setSectionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [assetType, setAssetType] = useState('');
  const [periodFrom, setperiodFrom] = useState('');
  const [periodTo, setperiodTo] = useState('');
  const [assetList, setAssetList] = useState([]);
  const [asset, setAsset] = useState('');
  const [assetName,setAssetName]=useState('');
  const [vendorData, setVendorData] = useState([]);
  const [assetNameList, setAssetNameList] = useState([]);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChangeperiodFrom= (e) => {
    setperiodFrom(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangeperiodTo = (e) => {
    setperiodTo(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    FetchDepaertmentService(handleFetchSuccess, handleFetchException);
    FetchVenderService(handleFetchVender, handleFetchVenderException);
    setVendorName(editData?.vendorId || '');
    setVenderAddress(editData?.venderAddress || '');
    setPhoneNumber(editData?.phoneNumber || '');
    setEmailId(editData?.emailId || '');
    setpremiumCost(editData?.premiumCost || '');
    setinsuranceDoc(editData?.insuranceDoc || '');
    setDepartment(editData?.department || '');
    setSection(editData?.sectionsId|| '');
    setSectionList(editData?.sectionList || []);
    setDepartmentList(editData?.departmentList || []);
    setAssetType(editData?.assetTypesId|| '');
    setperiodFrom(editData?.periodFrom || '');
    setperiodTo(editData?.periodTo || '');
    setAssetList(editData?.assetList || []);
    setAsset(editData?.asset || '');
    setVendorData(editData?.vendorData || '');
    setAssetNameList(editData?.assetNameList|| []);
    

  }, [editData]);

  const handleFetchSuccess = (dataObject) => {
    setDepartmentList(dataObject.data);
    setDepartment(editData?.departmentId || '');
    if(editData?.departmentId)
    {
      FetchSectionService({
        id:editData?.departmentId 
      }, handleFetchDepartmentSuccess, handleFetchDepartmentException);
    }
  }
  

  const handleFetchException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const handleFetchVender = (dataObject) => {
    setVendorNameList(dataObject.data);
    if(editData?.vendorId){
      FetchVenderDataService({ id: editData?.vendorId }, handleFetchVenderDataService, handleFetchVenderDataServiceException)

    }

  }

  const handleFetchVenderException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const onDepartmentChange = (e) => {
    setDepartment(e.target.value);
    FetchSectionService({
      id: e.target.value
    }, handleFetchDepartmentSuccess, handleFetchDepartmentException);
  }

  const handleFetchDepartmentSuccess = (dataObject) => {
    setSectionList(dataObject.data);
    if(editData?.sectionId){
      FetchAssetTypeService({
        id: editData?.sectionId
      }, handleFetchAssetTypeServiceSuccess, handleFetchAssetTypeServiceException);
    }
  }

  const handleFetchDepartmentException = (errorStaus, errorMessage) => {
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
    if(editData?.assetTypesId)
    {
      FetchAssetNameService({
        id: editData?.assetTypesId
      }, handleFetchAssetNameServiceSuccess, handleFetchAssetNameServiceException);
    }
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
    setAssetNameList(dataObject.data);
    
  }
  
  const handleFetchAssetNameServiceException= (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const onVenderChange = (e) => {
    setVendorName(e.target.value);
    FetchVenderDataService({ id: e.target.value }, handleFetchVenderDataService, handleFetchVenderDataServiceException)
  }

  const handleFetchVenderDataService = (dataObject) => {
    setVendorData(dataObject.data);
    setPhoneNumber(dataObject?.data[0]?.contactNo || '');
    setEmailId(dataObject?.data[0]?.email || '');
    setVenderAddress(dataObject?.data[0]?.address || '');
  }

  const handleFetchVenderDataServiceException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    isAdd === true ?
    (
      InsuranceAddService({
        department: department,
        section: section,
        vendorName: vendorName,
        phoneNumber: phoneNumber,
        email: emailId,
        periodFrom:periodFrom,
        periodTo:periodTo,
        premiumCost:premiumCost,
        insuranceDoc:insuranceDoc,
        assetType:assetType,
        assetName:asset,
      }, handleSuccess, handleException)
    ) : (
      InsuranceUpdateService({
        id: editData.id,
        department: department,
        section: section,
        vendorName: vendorName,
        phoneNumber: phoneNumber,
        email: emailId,
        periodFrom:periodFrom,
        periodTo:periodTo,
        premiumCost:premiumCost,
        insuranceDoc:insuranceDoc,
        assetType:assetType,
        assetName:asset,
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
  }
  
  const handleException = (errorObject, errorMessage) => {
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
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
  
  return (
    <div>
      <Dialog
      open={open}
      maxWidth='lg'>
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            {'VENDER DETAILS'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form>
                <Grid  container spacing={2} style={{ marginTop: '10px'}}>
                  <Grid xs={12} sm={6} md={1} lg={1} xl={1} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >Name: </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label=""
                        value={vendorName}
                        onChange={(e) => onVenderChange(e)}>
                          {vendorNameList.map((data, index) => {
                            return (
                              <MenuItem value={data.vendorId} key={index}>{data.vendorName}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={1} lg={1} xl={1}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >E-mail: </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                    <TextField id="Email" 
                    fullwidth
                    label="" 
                    variant="outlined" 
                    value={emailId} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={1} lg={1} xl={1}    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >Address :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                    <TextField fullwidth id="" label="" variant="outlined"  value={venderAddress} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={1} lg={1} xl={1} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >  Phone : </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                    <TextField fullWidth
                    id=" Phone" label="" 
                    variant="outlined" 
                    value={phoneNumber}/>
                  </Grid>
                </Grid>
                <div style={{ margin: '20px' }}>
                  <h2>INSURANCE DETAILS</h2>
                  <hr />
                </div>
                <Grid container spacing={2} style={{ marginTop: '5px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > Period : FROM</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <TextField 
                    fullWidth 
                    id="Vendor-Address" 
                    variant="outlined" 
                    type='date'
                    value={periodFrom}
                    onChange={(e) => { handleChangeperiodFrom(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >TO</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <TextField
                    style={{ alignSelf: 'left',}}
                    fullWidth 
                    id="Vendor-Address" 
                    variant="outlined" 
                    type='date'
                    value={periodTo}
                    onChange={(e) => { handleChangeperiodTo(e) }}/>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > Premium Cost </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <TextField 
                    fullWidth
                    id="premium"
                    label="Premium Cost" 
                    variant="outlined"
                    onChange={(e) => { setpremiumCost(e.target.value) }}
                    value={premiumCost} /> 
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >Insurance Doc</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <TextField 
                    fullWidth
                    value={insuranceDoc}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setinsuranceDoc(reader.result);
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                    InputLabelProps={{ shrink: true }}
                    type="file"/> 
                  </Grid>
                </Grid>
                <form>
                  <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}} >
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label style={{ marginRight: '10px', marginLeft: '30px' }}>Department :</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}xl={4}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label=""
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
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label >Section:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}xl={4}>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label=""
                        value={section}
                        onChange={(e) => onSectionChange(e)}>
                          {sectionList?.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>Asset Type :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <Box>
                      <FormControl  fullWidth>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label=""
                        value={assetType}
                        onChange={(e) => onAssetTypeChange(e)}>
                          {assetList?.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >Asset Name :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label=""
                        value={assetName}
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
                </Grid>          
              </form>
            </form>
          </DialogContentText>
        </DialogContent>
          <DialogActions>
            <div className='addbutton'>
              <Button type="submit" style={{ border: 'solid', width: '150px' }}  autoFocus>
                {
                  isAdd !== true  ? 'Update' : ' Apply'
                }
              </Button>
              <Button type='reset' onClick={handleClose}>Cancel</Button>
            </div>
            <NotificationBar
            handleClose={handleCloseNotify}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}/>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default InsuranceModel
