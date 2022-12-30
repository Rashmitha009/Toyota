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
import { Grid } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import { FetchMaintenanceStatusAprovedService } from '../../services/ApiServices';
import MaintenanceDataTable from './MaintenanceDataTable';


const MaintenanceViewClose = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [rows, setRows] = useState([]);
    const [affectingMachines,setAffectingMachines]=useState('');
    const [utilizationPlan,setUtilizationPlan]=useState('');
    const [affectingManHours,setAffectingManHours]=useState('');
    const [utilizationPlan2,setUtilizationPlan2]=useState('');
    const [bpImages1,setBpImages1]=useState('');
    const [bpImages2,setBpImages2]=useState('');
    const [bpImages3,setBpImages3]=useState('');
    const [bpImages4,setBpImages4]=useState('');
    const [maintenance, setMaintenance] = useState([]);
    const [approvedData , setApprovedData]= useState('');
    const [tempData , setTempData]= useState('');
    const [approvalUnitList, setApprovalUnitList] = useState([]);
    const [totalAmount, setTotalAmount]=useState(0);
    const URL='https://varmatrix.com/AssetManagement/AssetManagement'

    useEffect(() => {
        var tenpAffectMachine= editData?.affectedMachine?.replaceAll('\\',' ');
          
        setAffectingMachines(tenpAffectMachine|| '');
        setUtilizationPlan(editData.shutdownOrUtilization || '');
        setAffectingManHours(editData.timeFrom ||'' );
        setUtilizationPlan2(editData.offOrUtilization || '');
        setBpImages1(editData.bpImages1 || '');
        setBpImages2(editData.bpImages2 || '');
        setBpImages3(editData.bpImages3 || '');
        setBpImages4(editData.bpImages4 || '');
        setApprovedData(editData.partsOrConsumable ||'');
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
        setOpen(false);
      
        };
    
        const onSubmit = (e) => {
            e.preventDefault();
           alert(' succefull')
          }
  return (
    <div>
      <Dialog
      open={open}
      maxWidth='lg'
    >
      <form onSubmit={onSubmit}>
        <DialogTitle  style={{ background: 'whitesmoke' }}>
        ' Estimated Cost For Maintenance'
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {      
            isAdd=== true ?
            (
         <>
         <Grid container style={{marginTop:'20px'}}>
         <Grid style={{ height: 200, width: '80%', marginLeft:'100px' }}>
         {
            approvalUnitList.length > 0
                ? approvalUnitList?.map((approvalUnitList, index) => (
                
                <MaintenanceDataTable approvalUnitList={approvalUnitList} index={index}   key={index}    
                />
                )) : ''
        }
         <div>
          <label style={{marginTop:'20px', marginRight:'30px'}}><b>Total Estimated Cost:</b></label>
          <label>{totalAmount} </label>
    
        </div>
        </Grid>
        <div>
          <Grid container >
          <Grid item xs={10} sm={10} md={10} lg={10} xl={10} style={{ marginTop: '20px',marginLeft:'40%',width:'500px'}}>
            <Accordion >
              <AccordionSummary
                fullwith
                expandIcon={<VisibilityIcon />}
              >
                <Grid style={{ alignSelf:'center',textAlign:'center'}}>
                <Typography >Impact and Plans</Typography>
                </Grid>
                
                <hr />
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div>
                    <Grid container>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
                      style={{alignSelf:'center',textAlign:'center'}}
                      >
                      <label >Affecting Machines: </label>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
                      style={{alignSelf:'center',textAlign:'center'}}
                      >
                      <label>{affectingMachines}</label>
                      </Grid>
                    </Grid>
                    
                    <Grid container>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
                      style={{alignSelf:'center',textAlign:'center'}}
                      >
                      <label >Utilization Plan: </label>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
                      style={{alignSelf:'center',textAlign:'center'}}
                      >
                      <label>{utilizationPlan}</label>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
                      style={{alignSelf:'center',textAlign:'center'}}
                      >
                        <label>Affecting Man Hours: </label>
                  
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
                      style={{alignSelf:'center',textAlign:'center'}}
                      >
                      <label>{affectingManHours} </label>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
                      style={{alignSelf:'center',textAlign:'center'}}
                      >
                      <label >Utilization Plan: </label>
                  
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
                      style={{alignSelf:'center',textAlign:'center'}}
                      >
                      <label>{utilizationPlan2} </label>
                      </Grid>
                    </Grid>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          </Grid>
        </div>
         </Grid>
         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{marginTop:'20px', }}>
        <Accordion >
        <AccordionSummary
        fullwith 
          expandIcon={<VisibilityIcon />}
        >
          <Typography style={{marginLeft:'40%'}}>Breakdown Parts Images</Typography>
          <hr/>
        </AccordionSummary>
        <AccordionDetails>     
          <Typography>
          <ImageList sx={{ height: 200 }} cols={4} colHeight={100} rowHeight={164}>
                <img style={{width:'200px',height:'180px'}}
                  src={`${URL}${bpImages1}`}
                />
                <img style={{width:'200px',height:'180px'}}
                  src={`${URL}${bpImages2}`}
                />
                <img style={{width:'200px',height:'180px'}}
                  src={`${URL}${bpImages3}`}
                />
                <img style={{width:'200px',height:'180px'}}
                  src={`${URL}${bpImages4}`}
                />
            
         </ImageList>
           
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Grid>
         
         </>
            ):(
                <>
              <Grid container style={{marginTop:'20px', display:'box'}} >
                    <Grid item xs={12} sm={2} md={3} lg={2} xl={3} style={{display:'inline'}}>
                        <lable>Remarks</lable>
                     </Grid>

                    <Grid item xs={12} sm={10} md={8} lg={10} xl={8} style={{display:'inline'}}>

                        <TextField fullWidth
                            height={500}
                            id="outlined-multiline-flexible"
                            label="Remarks"
                            multiline
                            Rows={100}
                        
                        />
                   
                </Grid>
                </Grid>
                </>
            
            )
}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='addbutton'>
            <Button type='reset' onClick={handleClose}>Cancel</Button>
            {
            isAdd !== true ? 
            <Button type='submit'>
             Submit
            </Button>:" "
            
            }
            
          </div>
         
        </DialogActions>
      </form>
    </Dialog>
    </div>
  )
}

export default MaintenanceViewClose
