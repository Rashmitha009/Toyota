import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { AllocationViewSelfAssessment } from '../../services/ApiServices';
import { Grid } from '@mui/material';

const SelfAssesmentList = () => {
  const [loading,setLoading]=useState(true);
  const [rows, setRows]=useState([]);
  
  const columns = [
      { field: 'id', headerName: 'Id', 
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'assetId', headerName: 'Asset Id',
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
      { field: 'selfAssessmentStatus', headerName: 'Assessment Status',
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
      { field: 'assetName', headerName: 'User Name', 
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
  ];
  useEffect(()=>{
    AllocationViewSelfAssessment(handleAllocationViewSelfAssessment,handleAllocationViewSelfException);
  },[])
      
  const handleAllocationViewSelfAssessment=(dataObject)=>{
    setLoading(false);
    setRows(dataObject.data);
  }
  const handleAllocationViewSelfException=(errorStatus, errorMessage)=>{
    console.log(errorMessage);
  }
  return (
    <div>
        <Grid container style={{
                  display:'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding:'10px'
              }} 
              >
              <Grid item  
                  style={{alignSelf:'center',textAlign:'center'}}
              >
                  <h3 style={{margin:'0px'}}>View Asset</h3>
              </Grid>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} lx={10}>
            <DataGrid 
                style={{ height: 270,width:'100%' }}
                loading={loading}
                rows={rows}
                columns={columns} 
            />
        </Grid>
    </div>
  )
}

export default SelfAssesmentList
