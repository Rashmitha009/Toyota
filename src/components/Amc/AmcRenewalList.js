import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ViewAmcRenewal, AmcServiceDeleteService } from '../../services/ApiServices';
import RenevalAmc from './RenevalAmc';

const AmcRenewalList = () => {
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [editData, setEditData] = useState('');
  const [refresh , setRefresh]=useState(false)
  const [open1, setOpen1] = useState(false);
  const [isService, setIsService] = useState(false);
  const [rows, setRows] = useState([]);
  const [editData2, setEditData2] = useState('');
  const [loading , setLoading]=useState(true);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const columns = [
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'machineName', headerName: 'Machine', width: 200 },
    { field: 'amcStartDate', headerName: 'AMC Start Date', width: 250 },
    { field: 'amcEndDate', headerName: 'AMC End Date', width: 250 },
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
    ViewAmcRenewal(handleViewAmcRenewalResult,handleViewAmcRenewalError)
  },[]);

  const handleViewAmcRenewalResult=(dataObject)=>{
    setRows(dataObject.data);
    setLoading(false);
    console.log(dataObject.data);
  }

  const handleViewAmcRenewalError=(errorStaus, errorMessage)=>{
    console.log(errorMessage)
  }

  return (
    <div>
      <h3 style={{marginLeft:'40%'}}> View AMC </h3>
      <hr/>
      <div>
        <Box sx={{ height: 300, width: '100%' }}>
          <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}/>
        </Box>
      </div>
      <RenevalAmc
      open={open}
      setOpen={setOpen}
      editData={editData}/>
    </div>
  )
}

export default AmcRenewalList
