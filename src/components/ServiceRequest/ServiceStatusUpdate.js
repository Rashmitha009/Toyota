import { Dialog, DialogContent, Grid, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';

import ServiceStatusUpdateView from './ServiceStatusUpdateView';
import { ShowServiceRequest } from '../../services/ApiServices';

const ServiceStatusUpdate = ({open3, setOpen3,setRefresh , editData }) => {
  const [rows,setRows] = useState([]);
  const [open1,setOpen1]=useState(false)
  const [editData2, setEditData2] = useState([]); 
  const [dataArray, setDataArray]=useState([]);
  const [loading , setLoading]=useState(true);

  const handleClose = () => { 
    setOpen3(false);
  };

  useEffect(() => {
    console.log(editData);
    if(editData){
      ShowServiceRequest({...editData},handleShowServiceRequest, handleShowServiceRequestException)
    }
    var tempDataSet ='';
    var tempList=[];
    tempDataSet=editData?.ServiceStatus?.replaceAll('\\'," ");
    tempList=tempDataSet && JSON.parse(tempDataSet);
    setDataArray(tempList || []);
    console.log("data "+dataArray);
  }, [editData]);

  const handleShowServiceRequest = (dataObject) => {
    setRows(dataObject?.data || []);
    setLoading(false);
    console.log(dataObject?.data);
  }

  const handleShowServiceRequestException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }  
  
  const columns = [
    { field: 'vendorName', headerName: 'Vendor', width: 150 },
    { field: 'vendorEmail', headerName: 'Vendor Email', width: 140 },
    { field: 'vendorPhone', headerName: 'Vendor ContactNo', width: 150 },
    { field: 'gstNo', headerName: 'Vendor GST No', width: 130 },
    { field: 'expectedDate', headerName: 'Exp.return Date', width: 130 },
    {field: 'action', headerName: 'Action', width: 140, sortable: false,
    cellClassname: 'actions',
    type: 'actions',
    getActions: (params) => [
      <ViewData selectedRow={params.row} />,     
    ],
    }     
  ]

  function ViewData({ selectedRow }) {
    return (
      <VisibilityIcon
      onClick={() => {
        setOpen1(true);
        setEditData2(selectedRow);

      }}/>
    )
  }

  return (
    <div>
      <Dialog
      open={open3}
      maxWidth='lg'>
        <form>
          <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
            {"Service Status Update"}
          </DialogTitle>
          <div>
            <DataGrid style={{height:'200px', marginTop:'20px', RowHeight:'20px'}}
            loading={loading}
            rows={rows}
            columns={columns}/>
          </div>
          <div>
            <Button style={{marginLeft:'800px'}}type='reset' onClick={handleClose}>Cancel</Button>
          </div>  
        </form>
      </Dialog>

      <ServiceStatusUpdateView
        open={open1}
        setOpen={setOpen1}
        dataArray={dataArray} 
        editData2={editData2}
        setDataArray={setDataArray}/>
    </div>
  )
}

export default ServiceStatusUpdate;
