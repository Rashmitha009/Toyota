import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogContentText, DialogTitle, Grid, Typography  } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Edit from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { ViewCertificateService } from '../../../services/ApiServices';
import CertificatePatternView from './CertificatePatternView';


const CertificateModalView = ({ open, setOpen,  setRefresh , isView, editData}) => {
    const [open1, setOpen1] = useState(false);
    const [isService, setIsService] = useState(false);
    const [rows, setRows] = useState([]);
    const [editData2, setEditData2] = useState('');
    const [loading,setLoading]=useState(true);
    
    const handleClose = () => {
      setOpen(false);
    };

    const columns = [
        { field: 'vendorName', headerName: 'Vender Name', width: 140 },
        { field: 'periodFrom', headerName: 'Period From', width: 140 },
        { field: 'inspectionPattern', headerName: 'No.service', width: 140 },
        { field: 'inspectionList        ', 
        headerName: 'Service [YY-MM-DD]',
        width: 300,
        renderCell: (params) => {
            
            var service = parseInt(params.row.inspectionPattern);
            var data= params.row.inspectionList;
            var inspectionList= [];
            if (service > 0)
            {
              if(service === 1)
              {
                inspectionList[0] = {startDate:data.c1startDate,endDate:data.c1endDate} ;
            
               }else if (service === 2)
               {
                inspectionList[0] = {startDate:data.c1startDate,endDate:data.c1endDate};
                inspectionList[1] = {startDate:data.c2startDate,endDate:data.c2endDate } ;

              }else if (service === 3){
                inspectionList[0] = {startDate:data.c1startDate,endDate:data.c1endDate };
                inspectionList[1] = {startDate:data.c2startDate,endDate:data.c2endDate };
                inspectionList[2] = {startDate:data.c3startDate,endDate:data.c3endDate };
                 

              }else if (service === 4){
                inspectionList[0] = {startDate:data.c1startDate,endDate:data.c1endDate };
                inspectionList[1] = {startDate:data.c2startDate,endDate:data.c2endDate };
                inspectionList[2] = {startDate:data.c3startDate,endDate:data.c3endDate };
                inspectionList[3] = {startDate:data.c4startDate,endDate:data.c4endDate };
                

              }else if (service === 5){
                inspectionList[0] = {startDate:data.c1startDate,endDate:data.c1endDate };
                inspectionList[1] = {startDate:data.c2startDate,endDate:data.c2endDate };
                inspectionList[2] = {startDate:data.c3startDate,endDate:data.c3endDate };
                inspectionList[3] = {startDate:data.c4startDate,endDate:data.c4endDate };
                inspectionList[4] = {startDate:data.c5startDate,endDate:data.c5endDate };
                
              }
            }else {
                inspectionList[0]="no data "
            }

            console.log(inspectionList);
            return(
                <div style={{
                    display: 'inline'
                }}>
                    {
                        inspectionList.map((data, index)=>{
                            return(
                                <Typography>
                                    From :{data.startDate} To:  {data.endDate} 
                                </Typography>
                            )
                        })
                    }
                      
                </div>
            )
        }},
        
        {field: 'action', headerName: 'Action', width: 180, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
          <EditData selectedRow={params.row}  />,
        ],}
    ];
    
    function EditData({ selectedRow}) {
        return (
            <Edit 
            onClick={() => {
                setEditData2(selectedRow);
                setOpen1(true); 
            }}/>
        )
    }
    
    useEffect(() => {
        if(editData?.id){
            ViewCertificateService({id:editData?.id},handleViewCertificate, handleViewCertificateException)
        }
    }, [editData]);
    
    const handleViewCertificate = (dataObject) => {
        setRows(dataObject?.data);
        setLoading(false);
        console.log(dataObject?.data);
    }
    
    const handleViewCertificateException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }

    return (
        <div>
            <Dialog 
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='lg'>
                <form >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <form>
                                <DataGrid style={{height:'200px', marginTop:'20px'}}
                                loading={loading}
                                rows={rows}
                                columns={columns} />
                                <CertificatePatternView
                                open1={open1}
                                setOpen1={setOpen1}
                                editData2={editData2}/>      
                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button type='reset' onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )        
}

export default CertificateModalView;
 
