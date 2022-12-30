import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogContentText, DialogTitle,  RadioGroup} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { FetchVenderService,FetchVenderDataService, RequestServiceAdd, } from '../../services/ApiServices';

const ServiceRequest = ({open2, setOpen2,editData}) => {
  const [vendorName, setVendorName] = useState('');
  const [rows, setRows]=useState([]);
  const [department,setDepartment]=useState('');
  const [section,setSection]=useState('');
  const [assetType,setAssetType]=useState('');
  const [assetName ,setAssetName]=useState('');
  const [vendorNameList, setVendorNameList] = useState([]);
  const [venderAddress, setVenderAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [contactPerson,setContactPerson ] =  useState('');
  const [gstNo,setGstNo] = useState('');
  const [vendorData, setVendorData] = useState([]);
  const [dateOrDay,setdateOrDay]=useState('');
  const [firstService,setfirstService] = useState('');
  const [chargeValue,setChargeValue] = useState('');
  const [returnValue,setReturnValue] = useState('');
  const [deliveryValue,setDeliveryValue]= useState('');
  const [jobValue,setJobValue] = useState(0);
  const [expectedDate,setExpectedDate]= useState('');
  const [expectedDay,setExpectedDay]=useState('');
  const [eWayBill,setEWayBill] =useState('');
  const [repair,setRepair]=useState(0);
  const [personName,setPersonName]=useState('');
  const [departmentId,setDepartmentId]=useState('');
  const [sectionsId,setSectionsId]=useState('');
  const [assetTypesId,setAssetTypesId]=useState('');
  const [assetNameId,setAssetNameId]=useState('');

  const onDateChange = (e) =>{
    setdateOrDay(e.target.value);
  }

  const handleChangefirstService = (e) => {
    setfirstService(e.target.value);
    console.log(e.target.value);
  };

  const onChargeChange = (e) => {
    setChargeValue(e.target.value);
  }

  const onReturnChange = (e) => {
    setReturnValue(e.target.value);
  }

  const onDeliveryChange = (e) => {
    setDeliveryValue(e.target.value);
  }

  useEffect(() => {
    FetchVenderService(handleFetchVender, handleFetchVenderException);
    setDepartment(editData?.department ||'');
    setSection(editData?.section ||'');
    setAssetType(editData?.assetType || '');
    setAssetName(editData?.assetName || '');
    setDepartmentId(editData?.departmentId || '');
    setSectionsId(editData?.sectionsId  || '');
    setAssetTypesId(editData?.assetTypesId || '');
    setAssetNameId(editData?.assetNameId || '');
  },[editData]);
  
  const handleFetchVender = (dataObject) => {
    setVendorNameList(dataObject.data);
    setVendorName(editData?.vendorId || '');
  }
  
  const handleFetchVenderException = (errorStaus, errorMessage) => {
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
    setContactPerson(dataObject?.data[0]?.contactPerson || '');
    setGstNo(dataObject?.data[0]?.gstNo || '');
  }
  
  const handleFetchVenderDataServiceException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    RequestServiceAdd({
      department:departmentId,
      section:sectionsId,
      id: editData?.id,
      assetType:assetTypesId,
      assetName:assetNameId,
      vendorName:vendorName,
      vendorEmail:emailId,
      vendorAddress:venderAddress,
      vendorPhone:phoneNumber,
      gstNo:gstNo,
      expectedDate:firstService,
      expectedDay:expectedDay,
      eWayBill:eWayBill,
      chargable:chargeValue,
      returnable:returnValue,
      delivery:deliveryValue,
      jobWork:jobValue,
      repair:repair,
      personName:personName,
      dateOrDay:dateOrDay,
    },handleRequestServiceAdd,hanleRequestServiceAddException)
  }

  const handleRequestServiceAdd=(dataObject)=>{
   console.log(dataObject.data);
  }

  const hanleRequestServiceAddException=(errorStatus,errorMessage)=>
  {
    console.log(errorMessage)
  }
  
  const handleClose = () => { 
    setOpen2(false);
  };
 
  const onJobValueChange = () => {
    setJobValue((oldValue)=>{
      return oldValue === 1 ? 0 : 1
    });
  }

  const onRepairChange = () => {
    setRepair((oldValue)=>{
      return oldValue === 1 ? 0 : 1
    });
  }

  return (
    <div>
      <Dialog 
      open={open2}
      maxWidth='lg'>
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
            {"Service Request"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} style={{ marginTop: '20px'}}>
              <Grid xs={12} sm={6} md={1} lg={1} xl={1} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Department:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField fullWidth
                label=""
                variant="outlined"
                value={department}/>
              </Grid>
              <Grid xs={12} sm={6} md={1} lg={1} xl={1} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Section:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField  fullWidth
                label=""
                variant="outlined"
                value={section}/>
              </Grid>
              <Grid xs={12} sm={6} md={1} lg={1} xl={1} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Asset Type:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField  fullWidth
                label=""
                variant="outlined"
                value={assetType}/>
              </Grid>
              <Grid xs={12} sm={6} md={1} lg={1} xl={1} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Asset Name:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                <TextField  fullWidth
                label=""
                variant="outlined"
                value={assetName}/>
              </Grid>
            </Grid>
            <div style={{ margin: '30px' , border:'solid', borderColor:'whitesmoke'}}>
              <h2>Vendor Details</h2>
              <hr />
              <Grid container spacing={2} style={{ marginTop: '20px'}}>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label>Vendor name:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
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
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label>Vendor Email:</label>
                </Grid>
                <Grid  item xs={12} sm={6} md={2} lg={2} xl={2}>
                  <TextField 
                  fullwidth
                  id="Email" 
                  label="" 
                  variant="outlined" 
                  value={emailId} />
                </Grid>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label>Vendor Address:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                  <TextField fullwidth id="" label="" variant="outlined"  value={venderAddress} />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: '20px'}}>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label>Vendor Phone:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                  <TextField 
                  fullWidth
                  id=" Phone"
                  label="" 
                  variant="outlined" 
                  value={phoneNumber}/>
                </Grid>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label>Contact Person</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                  <TextField 
                  fullWidth
                  id=" Phone"
                  label=""
                  variant="outlined" 
                  value={contactPerson}/>
                </Grid>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label>GST No</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                  <TextField 
                  fullWidth
                  id=" Phone"
                  label=""
                  variant="outlined" 
                  value={gstNo}/>
                </Grid>
              </Grid>
            </div>
            <Grid  container spacing={2} style={{ marginTop: '20px'}}>
              <Grid  xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
              <FormControl>
                <RadioGroup
                  row
                  value={dateOrDay}
                  onChange={onDateChange}>
                  <FormControlLabel value="date" control={<Radio />} label="Date" />
                  <FormControlLabel value="day" control={<Radio />} label="Day" />                 
                </RadioGroup>
              </FormControl>
            </Grid>
            {
              dateOrDay === 'date' &&
              <>
              <Grid  container spacing={2} style={{ marginTop: '20px'}}>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label > Expected Return Date:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                  <TextField 
                  fullWidth 
                  id="Vendor-Address" 
                  variant="outlined" 
                  type='date'
                  value={firstService}
                  onChange={(e) => { handleChangefirstService(e) }}/>
                </Grid>
              </Grid>
              </>
            }
            {
             dateOrDay === 'day' &&
              <>
              <Grid  container spacing={2} style={{ marginTop: '20px'}}>
                <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                  <label > Expected Return Days:</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                  <TextField
                  fullWidth
                  id="Asset-Name"
                  label="Asset Name"
                  variant="outlined"
                  value={expectedDay}
                  onChange={(e) => {setExpectedDay(e.target.value)}}/>
                </Grid>
              </Grid>
              </>
            }
            <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
              <label > E-way BillNo:</label>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
              <TextField
              fullWidth
              id="Asset-Name"
              label="Asset Name"
              variant="outlined"
              value={eWayBill}
              onChange={(e) => { setEWayBill(e.target.value) }}
              />
            </Grid>
            </Grid>
            <Grid  container spacing={2} style={{ marginTop: '20px'}}>
              <Grid  xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Chargable:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                <FormControl>
                  <RadioGroup
                  row
                  value={chargeValue}
                  onChange={onChargeChange}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />                 
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label > Returnable:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                <FormControl>
                  <RadioGroup
                  row
                  value={returnValue}
                  onChange={onReturnChange}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />                 
                  </RadioGroup>
                </FormControl>
              </Grid>  
            </Grid>
            <Grid  container spacing={2} style={{ marginTop: '20px'}}>
              <Grid  xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                <label>Delivery:</label>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                <FormControl>
                  <RadioGroup
                  row
                  value={deliveryValue}
                  onChange={onDeliveryChange}>
                    <FormControlLabel value="Courier" control={<Radio />} label="Courier" />
                    <FormControlLabel value="Vehicle" control={<Radio />} label="Vehicle" />      
                    <FormControlLabel value="Inhand" control={<Radio />} label="Inhand" />               
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                <FormGroup
                row>
                  <FormControlLabel control={<Checkbox defaultChecked checked={jobValue === 1} onChange={onJobValueChange}/>} label="JobWork" />  
                  <FormControlLabel control={<Checkbox checked={repair ===1} onChange={onRepairChange}/>} label="Repair" />
                </FormGroup>
              </Grid>
              {
                deliveryValue === 'Courier' &&
                <>
                <Grid  container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > Tracking Id:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                    <TextField
                    fullWidth
                    id="Asset-Name"
                    label="Asset Name"
                    variant="outlined"/>
                  </Grid>
                </Grid>
                </>
              }
              {
                deliveryValue === 'Vehicle' &&
                <>
                <Grid  container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > Vechicle No:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                    <TextField
                    fullWidth
                    id="Asset-Name"
                    label="Asset Name"
                    variant="outlined"/>
                  </Grid>
                </Grid>
                </>
              }
              {
                deliveryValue === 'Inhand' &&
                <>
                <Grid  container spacing={2} style={{ marginTop: '20px'}}>
                  <Grid xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label > Person Name:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} >
                    <TextField
                    fullWidth
                    id="Asset-Name"
                    label="Asset Name"
                    variant="outlined"
                    value={personName}
                    onChange={(e) => { setPersonName(e.target.value) }}/>
                  </Grid>
                </Grid>
                </>
              }
            </Grid>
            <div>
              <Button type='submit'>Submit</Button>
              <Button style={{marginLeft:'800px'}}type='reset' onClick={handleClose}>Cancel</Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>     
    </div>
  )
}

export default ServiceRequest;