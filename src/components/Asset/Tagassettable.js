import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { FetcTagAssetShowData } from '../../services/ApiServices';

const columns = [
  { field: 'id', headerName: 'Serial No', width: 100 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'section', headerName: 'Section', width: 200 },
  { field: 'assetType', headerName: 'Asset Type', width: 200 },
  { field: 'assetName', headerName: 'Asset Name', width: 200 },
  { field: 'rfidNo', headerName: 'RFID', width: 200 },
];


export default function Tagassettable() {
  const [rows, setRows] =useState('')
  const [loading,setloading]=React.useState(true);

  useEffect(()=>{
    FetcTagAssetShowData(handleFetcTagAssetShowData,handleFetcTagAssetException);
  },[])
  const handleFetcTagAssetShowData =(dataObject)=>{
    setloading(false);
    setRows(dataObject.data);
  }
  const handleFetcTagAssetException =()=>{
    
  }
  
  return ( 
    <div >
      <Grid contaner style={{marginTop:'40px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} lx={10} style={{alignSelf:'center',textAlign:'center'}}>
          <h3>TAG ASSET</h3>
        </Grid>
      </Grid>
      <Grid container style={{marginTop:'20px' ,marginLeft:'1%'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} lx={10}>
          <DataGrid style={{ height: 450, }}
          rows={rows}
          loading={loading}
          columns={columns}
          rowsPerPageOptions={[5]}
          onRowAdd/>
        </Grid>
      </Grid>
    </div>
  );
}
