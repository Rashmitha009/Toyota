import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { FetchMaintenanceApprovedService, FetchMaintenancePendingShowDataService } from '../../services/ApiServices';
import MaintenancePandingModel from './MaintenancePandingModel';

const MaintenancePandingList = () => {
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState('');
  const [refresh , setRefresh]=useState(false);
        
    const columns = [
      { field: 'maintenanceId', headerName: 'Maintenance Id', width: 100 },
      { field: 'maintenanceType', headerName: 'Maintenance Type', width: 140 },
      { field: 'assetName', headerName: 'Machine', width: 100 },
      { field: 'severity', headerName: 'Severity', width: 120 },
      { field: 'problemNote', headerName: 'Problem Note', width: 120 },
      { field: 'dateFrom', headerName: 'Date From', width: 100 },
      { field: 'dateTo', headerName: 'Date To', width: 100 },
      { field: 'timeFrom', headerName: 'Time From', width: 100 },
      { field: 'timeTo', headerName: 'Time To', width: 100 },
      
        {field: 'view', headerName: 'View', width: 100, sortable: false,
        type: 'actions',
        getActions: (params) => [
            <ViewData selectedRow={params.row} />  
        ],
        },
      
        
    ]
    useEffect(() => {
      FetchMaintenancePendingShowDataService(handleMaintenancePending,handleMaintenancePendingException)
       
    }, [refresh]);

    const  handleMaintenancePending=(dataObject)=>
      {
        setRows(dataObject.data);
      }
      const handleMaintenancePendingException=(errorObject, errorMessage)=>{
        console.log(errorMessage);
  
      }
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
   
  return (
    <div>
    <Grid container >
    <h3> MAINTENANCE STATUS </h3>
        <Grid style={{ height: 350, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[5]}
            onRowAdd/>
        </Grid>
    </Grid>
    <MaintenancePandingModel
                open={open}
                setOpen={setOpen}
                isAdd={isAdd}
                editData={editData}
                setRefresh={setRefresh}
            />  
</div>
  )
}

export default MaintenancePandingList
