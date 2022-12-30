import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { VendorTypeAddService, VendorTypeUpdateService } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';

const VendorTypeModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [VendorTypeList, setVendorTypeList] = useState('')
  const [description, setDescription] = useState('')
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    setVendorTypeList(editData.vendorType || '');
    setDescription(editData.description || '');

  }, [editData]);

  const handleSuccess = (dataObject) => {
    console.log(dataObject);
    setRefresh(oldValue => !oldValue);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setVendorTypeList('');
    setDescription('');
  }

  const handleCloseNotify = () => {
    setOpen(false)
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const handleException = (errorObject, errorMessage) => {
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    isAdd === true ?
      (

        VendorTypeAddService({
          vendorType: VendorTypeList,
          description: description

        }, handleSuccess, handleException)
      ) : (

        VendorTypeUpdateService({
          id: editData.id,
          vendorType: VendorTypeList,
          description: description

        }, handleSuccess, handleException)
      );

  }

  const handleClose = () => {
    setOpen(false);
    setVendorTypeList('');
    setDescription('');
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='lg'
      >
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" sx={{ background: 'whiteSmoke' }}>
            {isAdd === true ? 'ADD ' : 'EDIT '}VENDOR TYPE
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div style={{ marginTop: '20px', marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                <lable style={{ marginRight: '40px' }}>Vendor Type:</lable>
                <TextField id="VendorType" label="Vendor Type" variant="outlined"
                  onChange={(e) => { setVendorTypeList(e.target.value) }}
                  value={VendorTypeList} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                <lable>Description:</lable>
                <TextField
                  style={{ width: '500px', marginLeft: '45px' }}
                  id="Description"
                  label="Description"
                  multiline
                  rows={4}
                  onChange={(e) => { setDescription(e.target.value) }}
                  value={description}
                />
              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='addbutton'>
              <Button type='reset' onClick={handleClose}>Cancel</Button>
              <Button type='submit'>
                {isAdd === true ? 'Add' : 'Update'}
              </Button>
            </div>
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

export default VendorTypeModel
