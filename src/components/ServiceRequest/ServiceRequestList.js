import React, { useState,useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BuildIcon from '@mui/icons-material/Build';
import ServiceRequestView from './ServiceRequestView';
import { FetchServiceRequestService } from '../../services/ApiServices';
import HandymanIcon from '@mui/icons-material/Handyman';
import ServiceRequest from './ServiceRequest';
import ServiceStatusUpdate from './ServiceStatusUpdate';
import { DownloadService } from '../../services/DownloadService';

const ServiceRequestList = () => {
  const [open, setOpen] = useState(false);
  const [open2,setOpen2]=useState(false);
  const [open3,setOpen3]=useState(false)
  const [isAdd, setIsAdd] = useState(true);
  const [editData, setEditData] = useState([]); 
  const [refresh , setRefresh]=useState(false)
  const [rows , setRows]= useState([]);
  const [loading , setLoading]=useState(true);

  const columns = [
    { field: 'department', headerName: 'Department', width: 110 },
    { field: 'section', headerName: 'Section', width: 120 },
    { field: 'assetName', headerName: 'AssetName', width: 120 },
    { field: 'amcStatus', headerName: 'AMC Status', width: 120 },
    { field: 'warrantyStatus', headerName: 'Warranty Status', width: 140 },
    { field: 'insuranceStatus', headerName: 'Insurance Status', width: 140 },
    { field: 'problemNote', headerName: 'Problem Note', width: 140 },
    { field: 'userName', headerName: 'UserName', width: 120 },
    {field: 'action', headerName: 'Action', width: 150, sortable: false,
    cellClassname: 'actions',
    type: 'actions',
    getActions: (params) => [
      <ViewData selectedRow={params.row} />,
      <BuildData selectedRow={params.row}/>,
      <HandymanData selectedRow={params.row}/>
    ],
    }   
  ];
  
  function ViewData({ selectedRow }) {
    return (
      <VisibilityIcon
      onClick={() => {
        setIsAdd(true);
        setEditData(selectedRow);
        setOpen(true);
      }}/>
    )
  }
  
  function BuildData({ selectedRow }) {
    return (
      <BuildIcon
      onClick={() => {
        setEditData(selectedRow);
        setOpen2(true);
      }}/>
    )
  }

  function HandymanData({ selectedRow}) {
    return (
      <HandymanIcon
      onClick={() => {
        setEditData(selectedRow);
        setOpen3(true);
      }}/>
    )
  }
  
  useEffect(() => {
    FetchServiceRequestService(handleServiceRequestResult,handleServiceRequestError)
  },[]);

  const handleServiceRequestResult=(dataObject)=>{
    setRows(dataObject.data);
    setLoading(false);
    console.log("data"+dataObject.data);
  }

  const handleServiceRequestError=(errorStaus, errorMessage)=>{
    console.log("error"+errorMessage)
  }
  
  function DeleteData({ selectedRow }) {
    return (
      <Button style={{ width: '100px' }}
      variant="contained"
      color='primary'>
        Delete
      </Button>
    )
  }

  function editData2({ selectedRow }) {
    return (
      <Button style={{ marginLeft: '20px', marginRight: '20px', width: '100px' }}
      className='prbuton'
      variant="contained"
      color='primary'>
        Edit
      </Button>
    )
  }

  const ServiceDownload = () =>{
    DownloadService(handleDownloadService, handleDownloadServiceException);
  }

  const handleDownloadService =() => {
    
  }

  const handleDownloadServiceException =() =>{
    
  }

  return (
    <div >
      <h2 style={{marginLeft:'60px'}}>REQUESTED SERVICE</h2>
      <hr/>
      <form style={{border:'solid', borderColor:'whitesmoke', width:'95%',marginTop:'20px',height:'500px', marginLeft:'30px'}}>
        <div style={{margin:'30px',marginTop:'20px', marginLeft:'30px'}}>
          <h3 style={{marginLeft:'40px'}}>View Requested Service</h3>
        </div>
        <hr/>
        <DataGrid style={{marginLeft:'20px', marginRight:'20px',marginTop:'20px',height:'400px'}}
        loading={loading}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5]}
        onRowAdd/>
      </form>
      <Button style={{marginTop:'20px',marginLeft:'20px'}} variant="contained" onClick={ServiceDownload}>Export</Button>

      <ServiceRequestView
      open={open}
      setOpen={setOpen}
      editData={editData}
      setRefresh={setRefresh}/>
      
      <ServiceRequest
      open2={open2}
      setOpen2={setOpen2}
      editData={editData}/>

      <ServiceStatusUpdate
      open3={open3}
      setOpen3={setOpen3}
      editData={editData}/>
    </div>
  )
}

export default ServiceRequestList;