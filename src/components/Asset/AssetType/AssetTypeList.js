import  React , { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { FetchAssetTypeListService , AssetTypeDeleteService,FetchAssetTypeSection} from '../../../services/ApiServices'
import AssetTypeModel from './AssetTypeModel'
import NotificationBar from '../../../services/NotificationBar';
import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AssetTypeList= () => {
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState('');
  const [refresh , setRefresh]=useState(false);
  const [department,setDepartment] = useState('');
  const [sectionList,setSectionList] = useState([]);
  const [loading,setLoading]=useState(true);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  
  const columns = [
    { field: 'id', headerName: 'Asset Type no', width:120 },
    { field: 'assetType', headerName: 'Asset Type', width: 200,},
    { field: 'department', headerName: 'Department', width: 200,},
    { field: 'section', headerName: 'Section', width: 200,},
    {field: 'action', headerName: 'Action', width: 250, sortable: false,
    cellClassname: 'actions',
    type: 'actions',
      getActions: (params) => [
       <EditData selectedRow={params.row} />,
       <DeleteData selectedRow={params.row} />,
      ],
    }
  ];
  
  function EditData({ selectedRow }) {
    return (
      <EditIcon
      className='prbuton'
      variant="contained"
      color='primary'
      onClick={() => {
        setIsAdd(false);
        setEditData(selectedRow);
        setOpen(true);
      }}/>
   
    )
  }
  
  function DeleteData({ selectedRow }) {
    return (
      <DeleteIcon
      variant="contained"
      color='primary'
      onClick={() => {
        deleteAssetType(selectedRow.id)
      }}/>
      
    )
  }
  
  const deleteAssetType = (id) => {
    AssetTypeDeleteService ({id}, handleDeleteSuccess, handleDeleteException);
  }
  
  const handleDeleteSuccess = (dataObject) =>{
    console.log(dataObject);
    setRefresh(oldValue => !oldValue);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
  }
  
  const handleDeleteException = (errorObject, errorMessage) =>{
    console.log(errorMessage);
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  }
  
  useEffect(() => {
    FetchAssetTypeListService(handleFetchSuccess, handleFetchException);

  }, [refresh]);
  
  const handleFetchSuccess = (dataObject) =>{
    setLoading(false);
    setRows(dataObject.data);
  }
  
  const handleFetchException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const handleModalOpen = () => {
    setIsAdd(true);
    setOpen(true);
  };
  
  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
  
  return (
    <div>
      <Grid container>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} 
      style={{alignSelf:'center',textAlign:'center'}}
      >
      <h3 >Asset Type</h3>
     </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} 
        style={{alignSelf:'center',textAlign:'center'}}
        >
        <Button style={{marginLeft:'43%',width:'120px',height:'30px', marginTop:'25px'}} variant="outlined" onClick={handleModalOpen}>
            Add
        </Button>
        </Grid>    
      </Grid> 
      <hr style={{ bottom: 'solid' }} />
     
      <div style={{ height: '350px', width: '90%', marginLeft: '40px', marginTop: '20px' }}>
        <DataGrid
        loading={loading}
        rows={rows}
        columns={columns} />
      </div>
      <AssetTypeModel
      open={open}
      setOpen={setOpen}
      isAdd={isAdd}
      editData={editData}
      setRefresh={setRefresh}/>
      
      <NotificationBar
      handleClose={handleClose}
      notificationContent={openNotification.message}
      openNotification={openNotification.status}
      type={openNotification.type}/>
    </div>
  )
}

export default AssetTypeList
