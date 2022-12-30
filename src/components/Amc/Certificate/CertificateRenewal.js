import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { ViewCertificateRenewal } from '../../../services/ApiServices';
import RenevalCertificate from './RenevalCertificate';

const CertificateRenewal = () => {
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [editData, setEditData] = useState('');
  const [refresh , setRefresh]=useState(false)
  const [open1, setOpen1] = useState(false);
  const [isService, setIsService] = useState(false);
  const [rows, setRows] = useState([]);
  const [editData2, setEditData2] = useState('');
  const [loading,setLoading]=useState(true);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const columns = [
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'assetName', headerName: 'Machine', width: 200 },
    { field: 'certificateStartDate', headerName: 'Certificate start date', width: 250 },
    { field: 'certificateEndDate', headerName: 'Certificate end date', width: 250 },
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
    ViewCertificateRenewal(handleViewCertificateRenewalResult,handleViewCertificateRenewalError)
  },[]);
  
  const handleViewCertificateRenewalResult=(dataObject)=>{
    setRows(dataObject.data);
    console.log(dataObject.data);
    setLoading(false);
  }
  
  const handleViewCertificateRenewalError=(errorStaus, errorMessage)=>{
    console.log(errorMessage)  
  }
   
  return (
    <div>
      <form style={{border:'solid', borderColor:'whitesmoke'}}>
        <h3 style={{marginLeft:'40%'}}> View Certificate </h3>
        <hr/>
        <div>
          <Box sx={{ height: 300, width: '100%' }}>
            <DataGrid
            loading={loading}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]} />
          </Box>
        </div>
        <RenevalCertificate
        open={open}
        setOpen={setOpen}
        editData={editData}/>
      </form>
    </div>
  )
}

export default CertificateRenewal;
