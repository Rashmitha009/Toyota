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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import { CertificateAddService,
  CertificateUpdateService ,
  FetchDepaertmentService, 
  FetchSectionService,
  FetchAssetTypeService,
  FetchVenderService,
  FetchVenderDataService, 
  FetchAssetNameService,
} from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';

const CretificateModel = ({open, setOpen, isAdd, editData, setRefresh }) => {
  const [vendorName, setVendorName] = useState(editData?.vendorId || '');
  const [vendorNameList, setVendorNameList] = useState([]);
  const [venderAddress ,setVenderAddress]= useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [premiumCost ,setPremiumCost]= useState('');
  const [certificateDoc ,setcertificateDoc]= useState('');
  const [inspectionPattern ,setinspectionPattern]= useState('');
  const [department, setDepartment] = useState('');
  const [section, setSection] = useState('');
  const [sectionList, setSectionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [assetType, setAssetType] = useState('');
  const [certificateDate, setcertificateDate] = useState('');
  const [expireDate, setexpireDate] = useState('');
  const [assetList, setAssetList] = useState([]);
  const [asset, setAsset] = useState('');
  const [vendorData, setVendorData] = useState([]);
  const [assetNameList, setAssetNameList] = useState([]);
  const [c1DateFrom, setc1DateFrom] = useState('');
  const [c1DateTo, setc1DateTo] = useState('');
  const [c2DateFrom, setc2DateFrom] = useState('');
  const [c2DateTo, setc2DateTo] = useState('');
  const [c3DateFrom, setc3DateFrom] = useState('');
  const [c3DateTo, setc3DateTo] = useState('');
  const [c4DateFrom, setc4DateFrom] = useState('');
  const [c4DateTo, setc4DateTo] = useState('');
  const [c5DateFrom, setc5DateFrom] = useState('');
  const [c5DateTo, setc5DateTo] = useState('');
  const [rows, setRows]=useState([]);
  const [assetName,setAssetName] =useState('');
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangecertificateDate = (e) => {
    setcertificateDate(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangeexpireDate= (e) => {
    setexpireDate(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec1DateFrom = (e) => {
    setc1DateFrom(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec1DateTo = (e) => {
    setc1DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec2DateFrom = (e) => {
    setc2DateFrom(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec2DateTo = (e) => {
    setc2DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec3DateFrom = (e) => {
    setc3DateFrom(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec3DateTo = (e) => {
    setc3DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec4DateFrom = (e) => {
    setc4DateFrom(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec4DateTo = (e) => {
    setc4DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec5DateFrom = (e) => {
    setc5DateFrom(e.target.value);
    console.log(e.target.value);
  };
  
  const handleChangec5DateTo = (e) => {
    setc5DateTo(e.target.value);
    console.log(e.target.value);
  };
  
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  
  useEffect(() => {
    FetchDepaertmentService(handleFetchSuccess, handleFetchException);
    FetchVenderService(handleFetchVender, handleFetchVenderException);
    setVendorName(editData?.vendorId || '');
    setPremiumCost(editData?.premiumCost || '');
    setSection(editData?.sectionsId || '' );
    setAssetType(editData?.assetType || '');
    setPhoneNumber(editData?.phoneNumber || '');
    setEmailId(editData?.emailId||'');
    setcertificateDate(editData?.certificateDate ||'');
    setexpireDate(editData?.expireDate ||'');
    setPremiumCost(editData?.premiumCost ||'');
    setcertificateDoc(editData?.certificateDoc ||'');
    setinspectionPattern (editData?.inspectionPattern||'');
    setc1DateFrom(editData?.c1DateFrom||'');
    setc1DateTo(editData?.c1DateTo ||'');
    setc2DateFrom(editData?.c2DateFrom ||'');
    setc2DateTo(editData?.c2DateTo ||'');
    setc3DateFrom(editData?.c3DateFrom||'');
    setc3DateTo(editData?.c3DateTo ||'');
    setc4DateFrom(editData?.c4DateFrom ||'');
    setc4DateTo(editData?.c4DateTo ||'');
    setc5DateFrom(editData?.c5DateFrom ||'');
    setc5DateTo(editData?.c5DateTo ||'');
    setAssetName(editData?.assetName ||'');
    setVendorNameList(editData?.vendorNameList ||[]);
    setSectionList(editData?.sectionList ||[]);
    setAssetList(editData?.assetList ||[]);
    setAssetNameList(editData?.assetNameList ||[]);
    console.log("data"+editData?.assetTypesId);

  }, [editData]);
  
  const handleFetchSuccess = (dataObject) => {
    setDepartmentList(dataObject.data);
    setDepartment(editData?.departmentId || '');
    if(editData?.department)
    {
      FetchSectionService({
        id:editData?.department
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
      CertificateAddService({
        department: department,
        section: section,
        vendorName: vendorName,
        phoneNumber: phoneNumber,
        email: emailId,
        certificateDate:certificateDate,
        expireDate:expireDate,
        premiumCost:premiumCost,
        certificateDoc:certificateDoc,
        inspectionPattern :inspectionPattern ,
        c1DateFrom:c1DateFrom,
        c1DateTo:c1DateTo,
        c2DateFrom:c2DateFrom,
        c2DateTo:c2DateTo,
        c3DateFrom:c3DateFrom,
        c3DateTo:c3DateTo,
        c4DateFrom:c4DateFrom,
        c4DateTo:c4DateTo,
        c5DateFrom:c5DateFrom,
        c5DateTo:c5DateTo,
        assetType:assetType,
        assetName:asset,
      }, handleSuccess, handleException)
    ) : (
      CertificateUpdateService({
        id: editData.id,
        department: department,
        section: section,
        vendorName: vendorName,
        phoneNumber: phoneNumber,
        email: emailId,
        certificateDate:certificateDate,
        expireDate:expireDate,
        premiumCost:premiumCost,
        certificateDoc:certificateDoc,
        inspectionPattern :inspectionPattern ,
        c1DateFrom:c1DateFrom,
        c1DateTo:c1DateTo,
        c2DateFrom:c2DateFrom,
        c2DateTo:c2DateTo,
        c3DateFrom:c3DateFrom,
        c3DateTo:c3DateTo,
        c4DateFrom:c4DateFrom,
        c4DateTo:c4DateTo,
        c5DateFrom:c5DateFrom,
        c5DateTo:c5DateTo,
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
    setinspectionPattern (event.target.value);
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
                          {vendorNameList?.map((data, index) => {
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
                  <h2>CERTIFICATE DETAILS</h2>
                  <hr />
                </div>
                <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > Certificate Date</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <TextField 
                    fullWidth 
                    id="Vendor-Address" 
                    variant="outlined" 
                    type='date'
                    value={certificateDate}
                    onChange={(e) => { handleChangecertificateDate(e) }}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label >Expire Date</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'left', textAlignLast: 'center'}}>
                    <TextField
                    style={{ alignSelf: 'left',}}
                    fullWidth 
                    id="Vendor-Address" 
                    variant="outlined" 
                    type='date'
                    value={expireDate}
                    onChange={(e) => { handleChangeexpireDate(e) }}/>
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
                    <label >Certificate Doc</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <TextField 
                    fullWidth
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setcertificateDoc(reader.result);
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
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Select Department"
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
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} 
                    style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                      <label >Inspection Pattern:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}xl={4}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={inspectionPattern }
                          label=""
                          onChange={handleChange}>
                            <MenuItem value={1}>1 Inspection</MenuItem>
                            <MenuItem value={2}>2 Inspection</MenuItem>
                            <MenuItem value={3}>3 Inspection</MenuItem>
                            <MenuItem value={4}>4 Inspection</MenuItem>
                            <MenuItem value={5}>5 Inspection</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                  { inspectionPattern  >=1 && (
                    <Grid container spacing={2} style={{ marginTop: '20px'}}>
                      <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>1 Inspection: FROM </label>
                      </Grid>
                      <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                        <TextField
                        fullWidth
                        id=""
                        variant="outlined"
                        type='date'
                        value={c1DateFrom}
                        onChange={(e) => { handleChangec1DateFrom(e) }}/>
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
                        value={c1DateTo}
                        onChange={(e) => { handleChangec1DateTo(e) }}/>
                      </Grid>
                    </Grid>
                    )
                  }
                  { inspectionPattern  >=2 && (
                    <Grid container spacing={2} style={{ marginTop: '20px'}}>
                      <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                      style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <label>2 Inspection: FROM: </label>
                        </Grid>
                        <Grid item xs={12} sm={6}  md={2} lg={2} xl={2} >
                          <TextField
                          fullWidth
                          id=""
                          variant="outlined"
                          type='date'
                          value={c2DateFrom}
                          onChange={(e) => { handleChangec2DateFrom(e) }}/>
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
                          value={c2DateTo}
                          onChange={(e) => { handleChangec2DateTo(e) }}/>
                        </Grid>
                        
                        
                      </Grid>
                    )
                  }
                  {inspectionPattern  >=3 && (
                        <Grid container spacing={2} style={{ marginTop: '20px'}}>
                          <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                            style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                            <label>3 Inspection: FROM: </label>
                          </Grid>
                          <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                            <TextField
                            fullWidth
                            id=""
                            variant="outlined"
                            type='date'
                            value={c3DateFrom}
                            onChange={(e) => { handleChangec3DateFrom(e) }}/>
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
                            value={c3DateTo}
                            onChange={(e) => { handleChangec3DateTo(e) }}/>
                          </Grid>
                          
                          
                        </Grid>
                    )
                  }
                  {inspectionPattern  >=4 && (
                        <Grid container spacing={2} style={{ marginTop: '20px'}}>
                          <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                            style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                            <label>4 Inspection: FROM: </label>
                          </Grid>
                          <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}  >
                          <TextField
                          fullWidth
                          id=""
                          variant="outlined"
                          type='date'
                          value={c4DateFrom}
                          onChange={(e) => { handleChangec4DateFrom(e) }}/>
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
                            value={c4DateTo}
                            onChange={(e) => { handleChangec4DateTo(e) }}/>
                          </Grid>
                          
                          
                        </Grid>
                    )
                  }
                  { inspectionPattern >=5 && (
                        <Grid container spacing={2} style={{ marginTop: '20px'}}>
                          <Grid item  xs={12} sm={6} md={2} lg={2} xl={2}
                            style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                            <label>5 Inspection: FROM: </label>
                            </Grid>
                            <Grid item xs={12} sm={6}  md={2} lg={2} xl={2}>
                              <TextField
                              fullWidth
                              id=""
                              variant="outlined"
                              type='date'
                              value={c5DateFrom}
                              onChange={(e) => { handleChangec5DateFrom(e) }}/>
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
                              value={c5DateTo}
                              onChange={(e) => { handleChangec5DateTo(e) }}/>
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
                            {assetList.map((data, index) => {
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
                          value={assetName}
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

export default CretificateModel;
