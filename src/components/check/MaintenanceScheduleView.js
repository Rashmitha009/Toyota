import React, { useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageList from '@mui/material/ImageList';
import { Grid } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MaintenanceData from './MaintenanceData';
import { MaintenanceUpdateAction } from '../../services/ApiServices';

const MaintenanceScheduleView = ({ open, setOpen, isAdd, editData, setRefresh }) => {
  const [rows, setRows] = useState([]);
  const [affectingMachines,setAffectingMachines]=useState('');
  const [utilizationPlan,setUtilizationPlan]=useState('');
  const [affectingManHours,setAffectingManHours]=useState('');
  const [utilizationPlan2,setUtilizationPlan2]=useState('');
  const [bpImages1,setBpImages1]=useState('');
  const [bpImages2,setBpImages2]=useState('');
  const [bpImages3,setBpImages3]=useState('');
  const [bpImages4,setBpImages4]=useState('');
  const [approvalUnitList, setApprovalUnitList] = useState([]);
  const [totalAmount, setTotalAmount]=useState(0);
  const [reject,setReject]=useState(false);
  const [action,setAction] = useState('');
  const [rejectReason,setRejectReason] = useState('');
  
  const columns = [
    { field: 'maintenanceId', headerName: 'Name	', width: 80 },
    { field: 'maintenanceType', headerName: 'Part Id', width: 100 },
    { field: 'assetName', headerName: 'Quantity	', width: 100 },
    { field: 'severity', headerName: 'UOM', width: 100 },
    { field: 'problemNote', headerName: 'Unit Price', width: 120 },   
  ]
  
  useEffect(() => {
    setAffectingMachines(editData.affectedMachine || '');
    setUtilizationPlan(editData.shutdownOrUtilization || '');
    setAffectingManHours(editData.timeFrom ||'' );
    setUtilizationPlan2(editData.offOrUtilization || '');
    setBpImages1(editData.bpImages1 || '');
    setBpImages2(editData.bpImages2 || '');
    setBpImages3(editData.bpImages3 || '');
    setBpImages4(editData.bpImages4 || '');
    var tempDataSet = '';
    var tempList = [];
    tempDataSet = editData?.partsOrConsumable?.replaceAll('\\', '');
    tempList = tempDataSet && JSON.parse(tempDataSet);
    setApprovalUnitList(tempList || []);
    setTotalAmount(()=>{
      var oldData = 0;
      tempList?.map((tempList, index)=>{ 
        const unitSum= tempList.quantity * tempList.unitPrice;
        oldData = unitSum + oldData;
      })
        return oldData
    })
  }, [editData]);
  
  const handleClose = () => {
    setReject(false);
    setOpen(false);
  };

  const onRejectSubmit = (e) => {
    e.preventDefault();
    setReject(false);
    setOpen(false);
    MaintenanceUpdateAction({
      id:editData.id,
      action:action,
      rejectReason:rejectReason,

    },handleMaintenanceUpdateAction,hanleMaintenanceUpdateException)
   
  }

const handleMaintenanceUpdateAction=(dataObject)=>{
  setReject(false);
  setOpen(false);
}
const hanleMaintenanceUpdateException=(errorStatus,errorMessage)=>
{
console.log(errorMessage)
}



  const onReject=()=>{
    setReject(true);
    setAction("reject");
  }

  const onSubmit = (e) => {
    
    MaintenanceUpdateAction({
      id:editData.id,
      action:action,
      rejectReason:rejectReason,

    },handleMaintenanceUpdata,hanleMaintenanceException)
    setAction("aprove");
  }

const handleMaintenanceUpdata=(dataObject)=>{
  setReject(false);
  setOpen(false);
}
const hanleMaintenanceException=(errorStatus,errorMessage)=>
{
console.log(errorMessage)
}


  return (
    <div>
      <Dialog
      open={open}
      maxWidth='lg'>
        <form >
          <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            {isAdd === true ? 'Estimated Cost For Maintenance ' : 'Close Maintainance Schedule '}User
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl>
                  {
                    approvalUnitList.length > 0
                    ? approvalUnitList?.map((approvalUnitList, index) => (
                      <MaintenanceData approvalUnitList={approvalUnitList} index={index}   key={index} 
                      />
                    )) : ''
                  }
                  <div>
                    <label style={{marginTop:'20px', marginRight:'30px'}}><b>Total Estimated Cost:</b></label>
                    <TextField style={{width:'80px'}} value={totalAmount} variant="standard" />
                  </div>
                </Grid>
              </Grid>
              <Grid container style={{marginTop:'20px'}}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{marginTop:'20px',widthLeft:'300px' }}>
                  <Accordion >
                    <AccordionSummary
                    fullwith 
                    expandIcon={<VisibilityIcon />}>
                      <Typography style={{marginLeft:'200px'}}>Impact and Plans</Typography>
                      <hr/>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div>
                          <div style={{display:'flex',marginTop:'5px'}}>
                            <label style={{marginLeft:'50px', marginRight:'100px'}}>Affecting Machines: </label>
                            <TextField style={{marginLeft:'50px', marginRight:'100px'}} value={affectingMachines} variant="standard" />
                          </div>
                          <div style={{display:'flex' ,marginTop:'5px'}}>
                            <label style={{marginLeft:'80px', marginRight:'100px'}}>Utilization Plan: </label>
                            <TextField style={{marginLeft:'50px', marginRight:'100px'}} value={utilizationPlan} variant="standard" />
                          </div>
                          <div style={{display:'flex',marginTop:'5px'}}>
                            <label style={{marginLeft:'50px', marginRight:'100px'}}>Affecting Man Hours: </label>
                            <TextField style={{marginLeft:'50px', marginRight:'100px'}} value={affectingManHours} variant="standard" />
                          </div>
                          <div style={{display:'flex',marginTop:'5px'}}>
                            <label style={{marginLeft:'50px', marginRight:'100px'}}>Utilization Plan: </label>
                            <TextField style={{marginLeft:'50px', marginRight:'100px'}} value={utilizationPlan2} variant="standard" />
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{marginTop:'20px',  }}>
                <Accordion >
                  <AccordionSummary
                  fullwith 
                  expandIcon={<VisibilityIcon />}>
                    <Typography style={{marginLeft:'200px'}}>Breakdown Parts Images</Typography>
                    <hr/>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <ImageList x={{ width: 500, height: 450 }} cols={4} rowHeight={164}>
                        <img
                        style={{width:'200px',height:'200px'}}
                        src={`https://varmatrix.com/AssetManagement${bpImages1}`}/>
                        
                        <img  style={{width:'200px',height:'200px'}}
                        src={`https://varmatrix.com/AssetManagement${bpImages2}`}/>

                        <img  style={{width:'200px',height:'200px'}}
                        src={`https://varmatrix.com/AssetManagement${bpImages3}`}/>

                        <img  style={{width:'200px',height:'200px'}}
                        src={`https://varmatrix.com/AssetManagement${bpImages4}`}/>
                      </ImageList>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              </>
              <Button onClick={onSubmit}>
                Aprove
              </Button>
              <Button type='reset' onClick={handleClose}>Cancel</Button> 
              <Button type='reset' onClick={onReject}>Reject</Button>
              {
                reject === true &&
                <>
                <Grid container spacing={2} style={{ marginTop: '20px', marginRight:'30px'}}>
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <label>Reject Reason: </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                    <TextareaAutosize
                    style={{ width:'250px', height:'40px',marginLeft:'70px', marginTop:'20px'}}
                    aria-label="empty textarea"
                    placeholder="Address"
                    onChange={(e)=>setRejectReason(e.target.value)}
                    />
                  </Grid>
                </Grid>
              <Grid>
                <Button onClick={onRejectSubmit}  autoFocus>
                  Submit
                </Button>
                <Button type='reset' onClick={handleClose}>Cancel</Button>
              </Grid>
              </>
            }
          </DialogContentText>
        </DialogContent>
      </form>
    </Dialog>
    </div>
  )

}

export default MaintenanceScheduleView;
