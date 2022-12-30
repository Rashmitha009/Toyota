import React, { useEffect, useState } from 'react';
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
import {
  AmcServiceAddService,
  AmcServiceUpdateService,
  FetchDepaertmentService,
  FetchSectionService,
  FetchAssetTypeService,
  FetchVenderService,
  FetchVenderDataService,
  FetchAssetNameService,
} from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';

const AmcServiceModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [vendorName, setVendorName] = useState(editData?.vendorId || '');
  const [vendorNameList, setVendorNameList] = useState([]);
  const [venderAddress, setVenderAddress] = useState(editData?.venderAddress || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [premiumCost, setPremiumCost] = useState( editData?.premiumCost || '');
  const [amcDoc, setamcDoc] = useState('');
  const [department, setDepartment] = useState(editData?.department|| '');
  const [section, setSection] = useState('');
  const [sectionList, setSectionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [assetType, setAssetType] = useState('');
  const [fromDate, setfromDate] = useState(editData?.periodFrom || '');
  const [toDate, settoDate] = useState('');
  const [assetList, setAssetList] = useState([]);
  const [asset, setAsset] = useState('');
  const [vendorData, setVendorData] = useState([]);
  const [assetNameList, setAssetNameList] = useState([]);
  const [s1DateFrom, sets1DateFrom] = useState('');
  const [s1DateTo, sets1DateTo] = useState('');
  const [s1runHours, sets1runHours] = useState('');
  const [s2DateFrom, sets2DateFrom] = useState('');
  const [s2DateTo, sets2DateTo] = useState('');
  const [s2runHours, sets2runHours] = useState('');
  const [s3DateFrom, sets3DateFrom] = useState('');
  const [s3DateTo, sets3DateTo] = useState('');
  const [s3runHours, sets3runHours] = useState('');
  const [s4DateFrom, sets4DateFrom] = useState('');
  const [s4DateTo, sets4DateTo] = useState('');
  const [s4runHours, sets4runHours] = useState('');
  const [s5DateFrom, sets5DateFrom] = useState('');
  const [s5DateTo, sets5DateTo] = useState('');
  const [s5runHours, sets5runHours] = useState('');
  const [servicePattern, setServicePattern] = useState(0);

  const [rows, setRows]=useState([]);

  useEffect(() => {
    FetchDepaertmentService(handleFetchSuccess, handleFetchException);
    FetchVenderService(handleFetchVender, handleFetchVenderException);
    setVendorName(editData?.vendorId || '');
    setfromDate(editData?.periodFrom || '');
    settoDate(editData?.periodTo || '');
    setPremiumCost(editData?.premiumCost || '');
    setDepartment(editData?.departmentId || '');
    setSection(editData?.sectionsId || '' );
    setAssetType(editData?.assetType || '');
    console.log("data"+editData?.assetTypesId);
  }, [editData]);

  const handleClose = () => {
    setOpen(false);
  };

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const handleChangefromDate = (e) => {
    setfromDate(e.target.value);
    console.log(e.target.value);
  };

  const handleChangetoDate = (e) => {
    settoDate(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges1DateFrom = (e) => {
    sets1DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges1DateTo = (e) => {
    sets1DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges1runHours = (e) => {
    sets1runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges2DateFrom = (e) => {
    sets2DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges2DateTo = (e) => {
    sets2DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges2runHours = (e) => {
    sets2runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges3DateFrom = (e) => {
    sets3DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges3DateTo = (e) => {
    sets3DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges3runHours = (e) => {
    sets3runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges4DateFrom = (e) => {
    sets4DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges4DateTo = (e) => {
    sets4DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges4runHours = (e) => {
    sets4runHours(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges5DateFrom = (e) => {
    sets5DateFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleChanges5DateTo = (e) => {
    sets5DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChanges5runHours = (e) => {
    sets5runHours(e.target.value);
    console.log(e.target.value);
  };
  
  

  const handleFetchSuccess = (dataObject) => {
    setDepartmentList(dataObject.data);
    if(editData?.departmentId)
    {
      FetchSectionService({id:editData?.departmentId},handleFetchSectionService,handleFetchSectionException);
    }
  }

  const handleFetchSectionService=(dataObject)=>{
    setSectionList(dataObject.data);
    if(editData?.sectionsId)
    {
      FetchAssetTypeService({id:editData?.sectionsId},handleFetchAssetTypeService,handleFetchAssetTypeException);
    }
  }

  const handleFetchAssetTypeService=(dataObject)=>{
    setAssetList(dataObject.data);
  }

  const handleFetchAssetTypeException=(errorStaus,errorMessage)=>{
    console.log(errorMessage);
  }

  const handleFetchSectionException=(errorStaus,errorMessage)=>{
    console.log(errorMessage);
  }

  const handleFetchException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const handleFetchVender = (dataObject) => {
    setVendorNameList(dataObject.data);
    if(editData?.vendorId)
    {
      setPhoneNumber(dataObject?.data[0]?.contactNo || '');
      setEmailId(dataObject?.data[0]?.email || '');
      setVenderAddress(dataObject?.data[0]?.address || '');
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
      AmcServiceAddService({
        department: department,
        section: section,
        vendorName: vendorName,
        phoneNumber: phoneNumber,
        email: emailId,
        periodFrom:fromDate,
        periodTo:toDate,
        premiumCost:premiumCost,
        amcDoc:amcDoc,
        servicePattern:servicePattern,
        s1DateFrom:s1DateFrom,
        s1DateTo:s1DateTo,
        s1runHours:s1runHours,
        s2DateFrom:s2DateFrom,
        s2DateTo:s2DateTo,
        s2runHours:s2runHours,
        s3DateFrom:s3DateFrom,
        s3DateTo:s3DateTo,
        s3runHours:s3runHours,
        s4DateFrom:s4DateFrom,
        s4DateTo:s4DateTo,
        s4runHours:s4runHours,
        s5DateFrom:s5DateFrom,
        s5DateTo:s5DateTo,
        s5runHours:s5runHours,
        assetType:assetType,
        assetName:asset,
      }, handleSuccess, handleException)
    ) : (
      AmcServiceUpdateService({
        id: editData.id,
        department: department,
        section: section,
        vendorName: vendorName,
        phoneNumber: phoneNumber,
        email: emailId,
        periodFrom:fromDate,
        periodTo:toDate,
        premiumCost:premiumCost,
        amcDoc:amcDoc,
        servicePattern:servicePattern,
        s1DateFrom:s1DateFrom,
        s1DateTo:s1DateTo,
        s1runHours:s1runHours,
        s2DateFrom:s2DateFrom,
        s2DateTo:s2DateTo,
        s2runHours:s2runHours,
        s3DateFrom:s3DateFrom,
        s3DateTo:s3DateTo,
        s3runHours:s3runHours,
        s4DateFrom:s4DateFrom,
        s4DateTo:s4DateTo,
        s4runHours:s4runHours,
        s5DateFrom:s5DateFrom,
        s5DateTo:s5DateTo,
        s5runHours:s5runHours,
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
  
  const handleChange = (event) => {
    setServicePattern(event.target.value);
  };

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
      onClose={handleClose}
      fullWidth
      maxWidth='lg'>
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            {"VENDER DETAILS"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form>
                <Grid  container spacing={2} style={{ marginTop: '20px'}}>
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
                          {
                            vendorNameList.map((data, index) => {
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
                    id=" Phone" 
                    label="" 
                    variant="outlined" 
                    value={phoneNumber}/>
                  </Grid>
                </Grid>
                <div style={{ margin: '20px' }}>
                  <h2>SERVICE DETAILS</h2>
                  <hr />
                </div>
                <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > Period : FROM </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <TextField 
                    fullWidth 
                    id="Vendor-Address" 
                    variant="outlined" 
                    type='date'
                    value={fromDate}
                    onChange={(e) => { handleChangefromDate(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > To </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <TextField
                    style={{ alignSelf: 'left',}}
                    fullWidth 
                    id="Vendor-Address" 
                    variant="outlined" 
                    type='date'
                    value={toDate}
                    onChange={(e) => { handleChangetoDate(e) }}/>
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
                      onChange={(e) => { setPremiumCost(e.target.value) }}
                      value={premiumCost} /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label >AMC Doc</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <TextField 
                      fullWidth
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setamcDoc(reader.result);
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
                          <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                          <Select
                          value={department}
                          label="Select Department"
                          onChange={(e) => onDepartmentChange(e)}>
                            {
                              departmentList.map((data, index) => {
                              return (
                                <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label >Service Pattern:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}xl={4}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={servicePattern}
                          label=""
                          onChange={handleChange}>
                            <MenuItem value={1}>Service 1</MenuItem>
                            <MenuItem value={2}>Service 2</MenuItem>
                            <MenuItem value={3}>Service 3</MenuItem>
                            <MenuItem value={4}>Service 4</MenuItem>
                            <MenuItem value={5}>Service 5</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                  { servicePattern >=1 && (
                    <Grid container spacing={2} style={{ marginTop: '20px'}}>
                      <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>1 Service: FROM: </label>
                      </Grid>
                      <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        value={s1DateFrom}
                        onChange={(e) => { handleChanges1DateFrom(e) }}/>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                      style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label>To:</label>
                      </Grid>
                      <Grid item xs={12}  sm={6} md={2} lg={2} xl={2}>
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        value={s1DateTo}
                        onChange={(e) => { handleChanges1DateTo(e) }}/>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                        <label>RunHours: </label>
                      </Grid>
                      <Grid item xs={12} sm={6} md={1} lg={1} xl={1}
                      style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                        <TextField
                        fullWidth
                        id=""
                        label=""
                        variant="outlined"
                        onChange={(e) => { sets1runHours(e.target.value) }}
                        value={s1runHours}/>
                      </Grid>
                    </Grid>
                    )
                  }
                  { servicePattern >=2 && (
                    <Grid container spacing={2} style={{ marginTop: '20px'}}>
                      <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>2 Service: FROM: </label>
                        </Grid>
                        <Grid item xs={12} sm={6}  md={2} lg={2} xl={2} >
                          <TextField
                          fullWidth
                          id=""
                          variant="outlined"
                          type='date'
                          value={s2DateFrom}
                          onChange={(e) => { handleChanges2DateFrom(e) }}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                          <label>To:</label>
                        </Grid>
                        <Grid item xs={12}  sm={9} md={2} lg={2} xl={2}>
                          <TextField
                          fullWidth
                          id=""
                          variant="outlined"
                          type='date'
                          value={s2DateTo}
                          onChange={(e) => { handleChanges2DateTo(e) }}/>
                        </Grid>
                        <Grid item xs={12} sm={3} md={2} lg={2} xl={2}
                        style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                          <label>RunHours: </label>
                        </Grid>
                        <Grid item xs={12} sm={9} md={2} lg={1} xl={3}
                        style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                          <TextField
                          fullWidth
                          id=""
                          label=""
                          variant="outlined"
                          onChange={(e) => { sets2runHours(e.target.value) }}
                          value={s2runHours}/>
                        </Grid>
                      </Grid>
                    )
                  }
                  {servicePattern >=3 && (
                        <Grid container spacing={2} style={{ marginTop: '20px'}}>
                          <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                            style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                            <label>3 Service: FROM: </label>
                          </Grid>
                          <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                            <TextField
                            fullWidth
                            id=""
                            variant="outlined"
                            type='date'
                            value={s3DateFrom}
                            onChange={(e) => { handleChanges3DateFrom(e) }}/>
                          </Grid>
                          <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                          style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                            <label>To:</label>
                          </Grid>
                          <Grid item xs={12}  sm={9} md={2} lg={2} xl={2}>
                            <TextField
                            fullWidth
                            id=""
                            variant="outlined"
                            type='date'
                            value={s3DateTo}
                            onChange={(e) => { handleChanges3DateTo(e) }}/>
                          </Grid>
                          <Grid item xs={12} sm={3} md={2} lg={2} xl={2}
                          style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                            <label>RunHours: </label>
                          </Grid>
                          <Grid item xs={12} sm={9} md={2} lg={1} xl={3}
                          style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                            <TextField
                            fullWidth
                            id=""
                            label=""
                            variant="outlined"
                            onChange={(e) => { sets3runHours(e.target.value) }}
                            value={s3runHours}/>
                          </Grid>
                        </Grid>
                    )
                  }
                  {servicePattern >=4 && (
                        <Grid container spacing={2} style={{ marginTop: '20px'}}>
                          <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                            style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                            <label>4 Service: FROM: </label>
                          </Grid>
                          <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                          <TextField
                          fullWidth
                          id=""
                          variant="outlined"
                          type='date'
                          value={s4DateFrom}
                          onChange={(e) => { handleChanges4DateFrom(e) }}/>
                          </Grid>
                          <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                          style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                            <label>To:</label>
                          </Grid>
                          <Grid item xs={12}  sm={9} md={2} lg={2} xl={2}>
                            <TextField
                            fullWidth
                            id=""
                            variant="outlined"
                            type='date'
                            value={s4DateTo}
                            onChange={(e) => { handleChanges4DateTo(e) }}/>
                          </Grid>
                          <Grid item xs={12} sm={3} md={2} lg={2} xl={2}
                          style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                            <label>RunHours: </label>
                          </Grid>
                          <Grid item xs={12} sm={9} md={2} lg={1} xl={3}
                          style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                            <TextField
                            fullWidth
                            id=""
                            label=""
                            variant="outlined"
                            onChange={(e) => { sets4runHours(e.target.value) }}
                            value={s4runHours}/>
                          </Grid>
                        </Grid>
                    )
                  }
                  { servicePattern >=5 && (
                        <Grid container spacing={2} style={{ marginTop: '20px'}}>
                          <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                            style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                            <label>5 Service: FROM: </label>
                            </Grid>
                            <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}>
                              <TextField
                              fullWidth
                              id=""
                              variant="outlined"
                              type='date'
                              value={s5DateFrom}
                              onChange={(e) => { handleChanges5DateFrom(e) }}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                          style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                              <label>To:</label>
                            </Grid>
                            <Grid item xs={12}  sm={9} md={2} lg={2} xl={2}>
                              <TextField
                              fullWidth
                              id=""
                              variant="outlined"
                              type='date'
                              value={s5DateTo}
                              onChange={(e) => { handleChanges5DateTo(e) }}/>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2} lg={2} xl={2}
                            style={{ alignSelf: 'center', textAlignLast: 'center' }} >
                              <label>RunHours: </label>
                            </Grid>
                            <Grid item xs={12} sm={9} md={2} lg={1} xl={3}
                            style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'  }}>
                              <TextField
                              fullWidth
                              id=""
                              label=""
                              variant="outlined"
                              onChange={(e) => { sets5runHours(e.target.value) }}
                              value={s5runHours}/>
                            </Grid>
                        </Grid>
                    )
                  }
                  <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label >Section:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <Box>
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
                      </Box>
                    </Grid>
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
                            {
                              assetList.map((data, index) => {
                              return (
                                <MenuItem value={data.id} key={index}>{data.assetType}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}} >
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label >Asset Name :</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}xl={4}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label=""
                          value={asset}
                          onChange={(e) => onAssetChange(e)}>
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
            type={openNotification.type}
          />
      
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default AmcServiceModel
