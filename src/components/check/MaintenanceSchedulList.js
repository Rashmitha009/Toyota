import React, { useEffect, useState } from 'react'
import BuildIcon from '@mui/icons-material/Build';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FetchMaintenanceService } from '../../services/ApiServices';
import MaintenanceScheduleView from './MaintenanceScheduleView';

const MaintenanceSchedulList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState(''); 
    const [loading , setLoading]=useState(true);
    const [refresh , setRefresh]=useState(false);
   
    const columns = [
        { field: 'maintenanceType', headerName: 'Maintenance Type', width: 150 },
        { field: 'assetName', headerName: 'Machine', width: 150 },
        { field: 'severity', headerName: 'Severity', width: 120 },
        { field: 'problemNote', headerName: 'Problem Note', width: 120 },
        { field: 'dateFrom', headerName: 'Date From', width: 120 },
        { field: 'dateTo', headerName: 'Date To', width: 120 },
        { field: 'timeFrom', headerName: 'Time From', width: 120 },
        { field: 'timeTo', headerName: 'Time To', width: 120 },
        {field: 'action', headerName: 'Action', width: 150, sortable: false, 
        type: 'actions',
        getActions: (params) => [
            <ViewData selectedRow={params.row} />  
        ],
        },
         

    ];

    function ViewData({ selectedRow }) {
        return (
            <VisibilityIcon
                  onClick={() => {
                    setIsAdd(true);
                    setEditData(selectedRow);
                    setOpen(true);
                }}
           />
   
        )
    }
    useEffect(()=>{
    FetchMaintenanceService(handleFetchMaintenanceService,handleFetchMaintenanceServiceException)
   },[]);

   const handleFetchMaintenanceService=(dataObject)=>{
    setRows(dataObject.data)
    setLoading(false);

   }

   const handleFetchMaintenanceServiceException=(error,errorMessage)=>{
    console.log(errorMessage)
   }


  return (
    <div>
        <Grid container >
            <Grid container spacing={2}  style={{marginTop:'20px', marginLeft:'40px', marginRight:'0px'}}>
           
                <Grid item xs={12} sm={6} md={2.8} lg={2.8} xl={3}
                style={{
                    color: 'white',
                    display: 'box'  ,
                    background:'rgb(91, 87, 87)',
                    marginRight:'20px',
                    marginTop:'10px',
                    border: 'solid',
                    borderColor: 'aqua',
                }}>
                 
                    <p >MAINTENANCE</p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'right',
                    }}>
                        <Link to='/maintenanceSchedulList'><BuildIcon /></Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.6} lg={2.8} xl={3}
                    style={{
                        marginTop:'10px',
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',

                    }}>
                    <p >WARRANTY DUES</p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'right',
                        }}>
                            
                            
                            <Link to='/WarrantyList'><BuildIcon  /></Link>
                            </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.6} lg={2.8} xl={2.5}style={{
                    color: 'white',
                    display: 'box'  ,
                    background:'rgb(91, 87, 87)',
                    marginRight:'20px',
                    marginTop:'10px',
                    border: 'solid',
                    borderColor: 'aqua',

                }}>
                     <p >AMC DUES</p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'right',
                        }}>
                            
                           
                            <Link to='/amcTab'> <BuildIcon  /></Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.6} lg={2.8} xl={2.5}style={{
                    color: 'white',
                    display: 'box'  ,
                    background:'rgb(91, 87, 87)',
                    marginRight:'20px',
                    marginTop:'10px',
                    border: 'solid',
                    borderColor: 'aqua',

                }}>
                     <p>CERTIFICATION DUES</p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'right',
                        }}>
                           
                            
                            <Link to='/certificate'> <BuildIcon /></Link>
                        </div>
                    </Grid>
                    
            </Grid>

        </Grid>
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
             style={{ height: '500px', marginLeft: '40px', marginTop: '20px',marginRight:'30px',border:'solid',borderColor:'whitesmoke' }}
            >
                <h3 style={{marginLeft:'20px'}}>Maintenance Schedule</h3>
                <h/>
                <DataGrid
                loading={loading}
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5]}
                    onRowAdd/>
                </Grid>
            </Grid>
            <MaintenanceScheduleView
                        open={open}
                        setOpen={setOpen}
                        isAdd={isAdd}
                        editData={editData}
                        setRefresh={setRefresh}
                    />
         </div>
  )
  
}

export default MaintenanceSchedulList
