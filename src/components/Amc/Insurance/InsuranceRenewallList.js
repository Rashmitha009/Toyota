import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ViewInsuranceRenewal } from '../../../services/ApiServices';
import RenevalInsurance from './RenevalInsurance';


const InsuranceRenewallList = () => {
  const [rows , setRows]=useState([]);
  const [editData, setEditData] = useState('');
  const [open, setOpen] = useState(false);
  const [loading,setLoading]=useState(true);

    const columns = [
        { field: 'department', headerName: 'Department', width: 170 },
        { field: 'assetName', headerName: 'Machine', width: 160 },
        { field: 'insuranceStartDate', headerName: 'Insurance Start  Date', width: 250 },
        { field: 'insuranceEndDate', headerName: 'Insurance End Date', width: 250 },
        {field: 'action', headerName: 'Action', width: 200, sortable: false,
    cellClassname: 'actions',
    type: 'actions',
    getActions: (params) => [
      

      <EditData selectedRow={params.row} />,
    ],
    }
    ];

    function EditData({ selectedRow }) {
      return (
          <label 
          className='prbuton'
          variant="contained"
          color='primary'
          onClick={() => {
          
              setEditData(selectedRow);
              setOpen(true);
  
          }}>
            Reneval
          </label >
      )
    }

    useEffect(()=>{
      ViewInsuranceRenewal(handleViewInsuranceRenewalResult,handleViewInsuranceRenewalError)
    },[]);
  
    const handleViewInsuranceRenewalResult=(dataObject)=>{
      setRows(dataObject.data);
      setLoading(false);
      console.log(dataObject.data);
    }
    const handleViewInsuranceRenewalError=(errorStaus, errorMessage)=>{
      console.log(errorMessage)
      
    }

    
  return (
    <div>
     <form style={{ border:'solid',borderColor:'whitesmoke'}}>
        
      <h3 style={{marginLeft:'40%'}}> View Insurance </h3>
      <hr/>
      <div>
      <Box sx={{ height: 300, width: '100%' }}>
            <DataGrid
            loading={loading}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
         </Box>
      </div>
      <RenevalInsurance
      open={open}
      setOpen={setOpen}
      editData={editData}
      />
     </form>
    </div>
  )
}

export default InsuranceRenewallList
