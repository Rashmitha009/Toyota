import React, { useState, useEffect } from 'react'
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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { VendorAddService, VendorUpdateService, FetchVendorTypeService } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';
import { Grid } from '@mui/material';


const VendorModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [vendorName, setvendorName] = useState('');
  const [vendorTypeList, setvendorTypeList] = useState([]);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [altEmail, setAltEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [altContactNo, setAltContactNo] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [remark, setRemark] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [gstCertificate, setGstCertificate] = useState('');
  const [msmeCertificate, setMsmeCertificate] = useState('');
  const [canceledCheque, setcanceledCheque] = useState('');
  const [vendorType, setVenderType] = useState('');
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    FetchVendorTypeService(handleFetchSuccess, handleFetchException);
    setvendorName(editData.vendorName || '');
    setVenderType(editData.vendorType || '');
    setAddress(editData.address || '');
    setEmail(editData.email || '');
    setAltEmail(editData.altEmail || '');
    setContactNo(editData.contactNo || '');
    setAltContactNo(editData.altContactNo || '');
    setContactPerson(editData.contactPerson || '');
    setRemark(editData.reMarks || '');
    setGstNo(editData.gstNo || '');
  }, [editData]);


  const handleFetchSuccess = (dataObject) => {
    setvendorTypeList(dataObject.data)
  }
  const handleFetchException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  const handleCloseNotify = () => {
    setOpen(false)
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const handleClose = () => {
    setOpen(false);
    setvendorName('');
    setVenderType('');
    setAddress('');
    setEmail('');
    setAltEmail('');
    setContactNo('');
    setAltContactNo('');
    setContactPerson('');
    setRemark('');
    setGstNo('');
  };

  const handleSuccess = (dataObject) => {
    console.log(dataObject);
    setRefresh(oldValue => !oldValue);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setvendorName('');
    setVenderType('');
    setAddress('');
    setEmail('');
    setAltEmail('');
    setContactNo('');
    setAltContactNo('');
    setContactPerson('');
    setRemark('');
    setGstNo('');
  }

  const handleException = (errorObject, errorMessage) => {
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  }

  const onVendorTypeChange = (e) => {
    setVenderType(e.target.value)
    console.log(e)

  }

  const onSubmit = (e) => {
    e.preventDefault();
    isAdd === true ?
      (

        VendorAddService({
          vendorName: vendorName,
          vendorType: vendorType,
          address: address,
          email: email,
          altEmail: altEmail,
          contactNo: contactNo,
          altContactNo: altContactNo,
          contactPerson: contactPerson,
          reMarks: remark,
          gstNo: gstNo,
          msmeCertificate: msmeCertificate,
          gstCertificate: gstCertificate,
          canceledCheque: canceledCheque,
        }, handleSuccess, handleException)
      ) : (
         VendorUpdateService({
          id: editData.id,
          vendorName: vendorName,
          vendorType: vendorType,
          address: address,
          email: email,
          altEmail: altEmail,
          contactNo: contactNo,
          altContactNo: altContactNo,
          contactPerson: contactPerson,
          reMarks: remark,
          gstNo: gstNo,
          msmeCertificate: msmeCertificate,
          gstCertificate: gstCertificate,
          canceledCheque: canceledCheque,

      }, handleSuccess, handleException)
    );
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='lg'>
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            {isAdd === true ? 'Add ' : 'Edit '}Vendor
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>
                <Grid container spacing={2} style={{marginTop:'20px'}}>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                    style={{
                      alignSelf: 'center',
                      textAlignLast: 'center',
                     
                    }}
                  >
                    <label>Vendor Name :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField 
                        fullWidth 
                        label="Vendor Name" 
                        variant="outlined"
                        onChange={(e) => { setvendorName(e.target.value) }}
                        value={vendorName}
                  />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                       style={{
                        alignSelf: 'center',
                        textAlignLast: 'center',
                       
                      }}
                  >
                        <label >Vendor Type :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <FormControl fullWidth>
                        <InputLabel id="venderTypelabel">Select Vender Type</InputLabel>
                        <Select
                          labelId="venderType"
                          label="Select Vender Type"
                          value={vendorType}
                          onChange={(e) => onVendorTypeChange(e)}>
                          {
                            vendorTypeList.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.vendorType}</MenuItem>
                            )
                          })}
                        </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop:'10px'}}>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                    style={{
                      alignSelf: 'center',
                      textAlignLast: 'center',
                     
                    }}
                  >
                    <label>Address :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField 
                      fullWidth
                      multiline
                      label="Address"
                      onChange={(e) => { setAddress(e.target.value) }}
                      value={address}
                  />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                       style={{
                        alignSelf: 'center',
                        textAlignLast: 'center',
                       
                      }}
                  >
                    <label >Email :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField 
                        fullWidth 
                        id="Email" 
                        label="Email" 
                        variant="outlined" 
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                  />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop:'10px'}}>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                    style={{
                      alignSelf: 'center',
                      textAlignLast: 'center',
                     
                    }}
                  >
                      <label>Alt Email :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <TextField 
                          fullWidth
                          id="AltEmail "
                          label="Alt Email "
                          variant="outlined"
                          onChange={(e) => { setAltEmail(e.target.value) }}
                          value={altEmail}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                       style={{
                        alignSelf: 'center',
                        textAlignLast: 'center',
                       
                      }}
                  >
                   <label >Contact No :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <TextField
                        fullWidth
                        id="ContactNo "
                        label="Contact No "
                        variant="outlined"
                        onChange={(e) => { setContactNo(e.target.value) }}
                        value={contactNo}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop:'10px'}}>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                    style={{
                      alignSelf: 'center',
                      textAlignLast: 'center',
                     
                    }}
                  >
                      <label>Alt Contact No:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <TextField
                        fullWidth
                        id="AltContactNo"
                        label="Alt Contact No"
                        variant="outlined"
                        onChange={(e) => { setAltContactNo(e.target.value) }}
                        value={altContactNo}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                       style={{
                        alignSelf: 'center',
                        textAlignLast: 'center',
                       
                      }}
                  >
                    <label >Contact Person :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField
                      fullWidth
                      id="ContactPerson"
                      label="Contact Person"
                      variant="outlined"
                      onChange={(e) => { setContactPerson(e.target.value) }}
                      value={contactPerson}
                  />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop:'10px'}}>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                    style={{
                      alignSelf: 'center',
                      textAlignLast: 'center',
                     
                    }}
                  >
                       <label>Remarks :</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField
                      fullWidth
                      id="remark"
                      label="Remarks"
                      variant="outlined"
                      onChange={(e) => { setRemark(e.target.value) }}
                      value={remark}
                  />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                       style={{
                        alignSelf: 'center',
                        textAlignLast: 'center',
                       
                      }}
                  >
                    <label >GST No:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField
                      fullWidth
                      id="GSTNo"
                      label="GST No"
                      variant="outlined"
                      onChange={(e) => { setGstNo(e.target.value) }}
                      value={gstNo}
                  />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop:'10px'}}>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                    style={{
                      alignSelf: 'center',
                      textAlignLast: 'center',
                     
                    }}
                  >
                         <label>GST Certificate:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField
                      fullWidth
                      label="GST Certificate"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setGstCertificate(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                      type="file"
                  />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                       style={{
                        alignSelf: 'center',
                        textAlignLast: 'center',
                       
                      }}
                  >
                   <label >MSME Certificate:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField
                      fullWidth
                      label="MSME Certificate"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setMsmeCertificate(reader.result);
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

                <Grid container spacing={2} style={{marginTop:'10px'}}>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                    style={{
                      alignSelf: 'center',
                      textAlignLast: 'center',
                     
                    }}
                  >
                       <label>Canceled Cheque:</label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <TextField
                        fullWidth
                        label="Canceled Cheque"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setcanceledCheque(reader.result);
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
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type='reset' onClick={handleClose}>Cancel</Button>
            <Button type='submit'>
              {isAdd === true ? 'Add' : 'Update'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <NotificationBar
        handleClose={handleCloseNotify}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />

    </div>
  )
}

export default VendorModel
