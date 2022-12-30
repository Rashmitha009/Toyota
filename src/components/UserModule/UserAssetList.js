import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { FetchUserAllocationService } from '../../services/ApiServices';

const UserAssetList = () => {
  const [rows, setRows]=useState([]);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{
    FetchUserAllocationService(UserAllocationService,UserAllocationException)
  },[])
  
  const UserAllocationService=(dataObject)=>{
    setLoading(false);
    setRows(dataObject.data);
  }
  
  const UserAllocationException=()=>{
  }
  
  const columns = [
    { field: 'id', headerName: 'Serial No', width: 40 },
    { field: 'department', headerName: 'Department', width: 100 },
    { field: 'section', headerName: 'Section', width: 100 },
    { field: 'assetName', headerName: 'Machine', width: 100 },
    { field: 'assetTypeName', headerName: 'Asset Type', width: 120 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 120 },
    { field: 'assetModel', headerName: 'Asset Model', width: 120 },
    { field: 'warrantyStartDate', headerName: 'Warranty Start Date', width: 120 },
    { field: 'warrantyEndDate', headerName: 'Warranty End Date', width: 120 },       
  ];

  return (
    <div>
      <Grid container spacing={2} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{alignSelf:'center',textAlign:'center'}} >
          <h3>VIEW ASSET</h3>
        </Grid>
      </Grid>
       <hr/>
      <Grid container spacing={2} style={{marginTop:'20px',}} >
        <Grid xs={10} sm={10} md={10} lg={10} xl={10} style={{marginLeft:'5%',height:'350px'}} >
          <DataGrid  
          loading={loading}
          rows={rows}
          columns={columns} />
        </Grid>
      </Grid>
    </div>
  )
}

export default UserAssetList
