import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Edit from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { ViewAmcServiceService } from '../../services/ApiServices';
import AmcServicePatternView from './AmcServicePatternView';

const AmcServiceModalView = ({ open, setOpen,  setRefresh , isView, editData}) => {
    const [open1, setOpen1] = useState(false);
    const [isService, setIsService] = useState(false);
    const [rows, setRows] = useState([]);
    const [editData2, setEditData2] = useState('');
    const [loading,setLoading]=useState(true);
    
    const handleClose = () => {
      setOpen(false);
    };

    const columns = [
        { field: 'vendorName', headerName: 'Vender Name', width: 180 },
        { field: 'periodFrom', headerName: 'Period From', width: 140 },
        { field: 'servicePattern', headerName: 'No.service', width: 140 },
        {
            field: 'serviceList', 
            headerName: 'Service [YY-MM-DD]', 
            width: 400,
            
            renderCell: (params) => {
                var service = parseInt(params.row.servicePattern);
                var data= params.row.serviceList;
                var serviceList = [];
                if (service>0)
                {
                    if(service === 1)
                    {
                        serviceList[0] = {startDate:data.s1startDate,runHours:data.s1runHours,endDate:data.s1endDate} ;
                    }else if (service === 2)
                    {
                        serviceList[0] = {startDate:data.s1startDate,runHours:data.s1runHours,endDate:data.s1endDate };
                        serviceList[1] = {startDate:data.s2startDate,runHours:data.s2runHours,endDate:data.s2endDate } ; 
                    }else if (service === 3)
                    {
                        serviceList[0] = {startDate:data.s1startDate,runHours:data.s1runHours,endDate:data.s1endDate };
                        serviceList[1] = {startDate:data.s2startDate,runHours:data.s2runHours,endDate:data.s2endDate };
                        serviceList[2] = {startDate:data.s3startDate,runHours:data.s3runHours,endDate:data.s3endDate };
                    }else if (service === 4)
                    {
                        serviceList[0] = {startDate:data.s1startDate,runHours:data.s1runHours,endDate:data.s1endDate };
                        serviceList[1] = {startDate:data.s2startDate,runHours:data.s2runHours,endDate:data.s2endDate };
                        serviceList[2] = {startDate:data.s3startDate,runHours:data.s3runHours,endDate:data.s3endDate };
                        serviceList[3] = {startDate:data.s4startDate,runHours:data.s4runHours,endDate:data.s4endDate };
                    }else if (service === 5)
                    { 
                        serviceList[0] = {startDate:data.s1startDate,runHours:data.s1runHours,endDate:data.s1endDate };
                        serviceList[1] = {startDate:data.s2startDate,runHours:data.s2runHours,endDate:data.s2endDate };
                        serviceList[2] = {startDate:data.s3startDate,runHours:data.s3runHours,endDate:data.s3endDate };
                        serviceList[3] = {startDate:data.s4startDate,runHours:data.s4runHours,endDate:data.s4endDate };
                        serviceList[4] = {startDate:data.s5startDate,runHours:data.s5runHours,endDate:data.s5endDate };   
                    }
                }else {
                    serviceList[0]="no data "
                }
                console.log(serviceList);
                return(
                    <div style={{
                        display: 'inline'
                    }}>
                        {
                            serviceList.map((data, index)=>{
                                return(
                                    <Typography>
                                            From :{data.startDate} To:  {data.endDate} RnHrs: {data.runHours}
                                    </Typography>
                                )
                            })
                        }
                        
                    </div>
                )
            }
        },
        {field: 'action', headerName: 'Action', width: 180, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
          <EditData selectedRow={params.row}  />
         
        ],
        }
    ];
    
    function EditData({ selectedRow}) {
        return (
            <Edit 
            onClick={() => {
                setEditData2(selectedRow);
                setOpen1(true);
            }}
           />
        )
    }

    useEffect(() => {
        if(editData?.id){
            ViewAmcServiceService({id:editData?.id},handleViewAmcService, handleViewAmcServiceException)
        }
    }, [editData]);
    
    const handleViewAmcService = (dataObject) => {
        setRows(dataObject?.data);
        setLoading(false);
        console.log(dataObject?.data);
    }
    
    const handleViewAmcServiceException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    } 
     
    return (
        <div>
            <Dialog 
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='lg'>
                <form>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div>
                                <DataGrid style={{height:'200px', marginTop:'20px', RowHeight:'20px'}}
                                loading={loading}
                                rows={rows}
                                columns={columns}/>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button type='reset' onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <AmcServicePatternView
            open1={open1}
            setOpen1={setOpen1}
            editData2={editData2}
            rows2={rows}/>
        </div>
    ) 
}

export default AmcServiceModalView;
 
