import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { ViewWarrantyDue } from '../../services/ApiServices';

const WarrantyDue = () => {
    const [rows, setRows] = useState([]);
    const [loading , setLoading]=useState(true);

  const columns = [
      { field: 'department', headerName: 'Department', width: 250 },
      { field: 'assetName', headerName: 'Asset Name', width: 250 },
      { field: 'warrantyStartDate', headerName: 'Warranty Start Date', width: 250 },
      { field: 'warrantyEndDate', headerName: 'Warranty End Date', width: 300 },
  ];

    useEffect(()=>{
        ViewWarrantyDue(handleViewWarrantyDueResult,handleViewWarrantyDueError)

    },[]);

    const handleViewWarrantyDueResult=(dataObject)=>{
        setRows(dataObject.data);
        setLoading(false);
        console.log(dataObject.data);
      }
    
      const handleViewWarrantyDueError=(errorStaus, errorMessage)=>{
        console.log(errorMessage)
      }
 

  return (
    <div >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
        style={{alignSelf:'center', textAlign:'center'}}
        >
            <h3 >WarrantyDue</h3>
        </Grid>
      </Grid>
        
      <hr/>
      <Grid  container spacing={2} style={{ marginTop: '10px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}
        style={{ height: '400px',  marginTop: '20px',marginLeft:'5%' }}>

      <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}/>
</Grid>
</Grid>
        
     
    </div>
  )
}

export default WarrantyDue
