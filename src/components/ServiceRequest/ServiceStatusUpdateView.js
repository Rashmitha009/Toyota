import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { ShowServiceRequest, UpdateServiceStatus } from '../../services/ApiServices';

const ServiceStatusUpdateView = ({open,setOpen,dataArray, setDataArray, editData2 }) => {
  const [rows,setRows] = useState([]);
  const [follow,setFollow]=useState(false);
  const [followUpText, setFollowUpText] = useState('');
  const [arrayData,setArrayData]=useState([]);
  const [date,setdate]=useState('');
  const [notRepairStatus,setNotRepairStatus]=useState('');
  const [notRepairable,setNotRepairable]=useState(false);
  const [serviceDone,setServiceDone]=useState(0);
  const [notification,setNotification]=useState('');
  const [refresh,setRefresh]=useState('');
  const [serviceStatus,setserviceStatus]=useState('');
  const [status,setstatus]=useState('');
  
    
  const columns = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'date', headerName: 'Date', width: 160 },
    { field: 'status', headerName: 'Status', width: 160 },
  ]

  useEffect(()=>{
    if(editData2){
      console.log(editData2);
    }
    
  },[editData2]);
  const onClickClose=()=>{
    setOpen(false);
  }

  const onClickfollow= () => {
    setFollow(true);
  }

  const todaysData = () => {
    return '2022-10-24'
  }

  const addStatus=()=>{
    setServiceDone(1);
    setRows((oldValue)=>{
      const id= oldValue.length + 1;
      const newArrayData={id,date: todaysData(),status: followUpText};
      return [newArrayData, ...oldValue]
    });
  }
 
  const notRepair=() =>{
    setServiceDone(1)
    setRows((oldValue)=>{
    const id= oldValue.length + 1;
    const newArrayData={id,date: todaysData(), status: 'Not Repairable'};
    return [newArrayData, ...oldValue]
    });
  }

  const service=() => {
    setServiceDone(1)
    setRows((oldValue)=>{
    const id= oldValue.length + 1;
    const newArrayData={id,date: todaysData(),status: 'Service Done'};
    return [newArrayData, ...oldValue]
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(editData2);
    UpdateServiceStatus({
      id: editData2?.id,
      status : serviceDone,
      serviceStatus :rows,
    },handleSuccess, handleException)
  }

  const handleSuccess = (dataObject) => {
    console.log(dataObject);
    setRefresh(oldValue => !oldValue);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setstatus('');
    setserviceStatus(''); 
  }

  const handleException = (errorObject, errorMessage) => {
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  }

  return (
    <Dialog 
    open={open}
    fullWidth>
      <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
        View Status
      </DialogTitle>
      <DialogContent>
        <form  onSubmit={onSubmit}>
          <Grid container spacing={2} style={{ marginTop: '20px'}}>
            <Grid xs={12} sm={3} md={2} lg={4} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'}}>
              <Button  variant="contained" onClick={onClickfollow}>Follow up</Button>
            </Grid>
            {
              follow === true &&
              <>
              <Grid item xs={12} sm={3} md={4} lg={4} xl={4} >
                <TextField 
                fullWidth
                id="outlined-basic" 
                label=""
                variant="outlined" 
                value={followUpText}
                onChange={(e)=>setFollowUpText(e.target.value)}/>  
              </Grid>
              <Grid xs={12} sm={2} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center',marginLeft:'20px'}}>
                <Button variant="contained" onClick={addStatus}>Add</Button>
              </Grid>
              </>
            }
          </Grid>
          <Grid container spacing={2} style={{ marginTop: '20px'}}>
            <Grid xs={12} sm={3} md={2} lg={4} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center',marginRight:'30px'}}>
              <Button variant="contained"  onClick={notRepair}>Not Repairable</Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: '20px'}}>
            <Grid  xs={12} sm={3} md={2} lg={4} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
              <Button variant="contained" color="success" style={{width:'158px'}} onClick={service}>
                Service Done
              </Button>
            </Grid>
          </Grid>
          <div>
            <DataGrid style={{height:'200px', marginTop:'20px', RowHeight:'20px'}}
            rows={rows}
            columns={columns}/>
          </div>
          <div>
            <Button type='submit'> Update</Button>
            <Button onClick={onClickClose}>Close </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ServiceStatusUpdateView;

