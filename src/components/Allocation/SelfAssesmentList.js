import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { AllocationViewSelfAssessment } from '../../services/ApiServices';

const SelfAssesmentList = () => {
  const [loading,setLoading]=useState(true);
  const [rows, setRows]=useState([]);
  const columns = [
      { field: 'id', headerName: 'Id', width: 100 },
      { field: 'assetId', headerName: 'Asset Id', width: 200 },
      { field: 'selfAssessmentStatus', headerName: 'Assessment Status', width: 600 },
      { field: 'assetName', headerName: 'User Name', width: 160 },
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
      <div style={{marginLeft:'500px'}}>
        <h2>View Asset</h2>
      </div>
      <hr/>
      <div style={{ height: 400, width: '90%', marginLeft:'30px' }}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
        />
    </div>
    </div>
  )
}

export default SelfAssesmentList
