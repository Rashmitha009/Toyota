import  React , { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FetchAssetTypeListService , AssetTypeDeleteService,FetchAssetTypeSection} from '../../../services/ApiServices'
import AssetTypeModel from './AssetTypeModel'
import NotificationBar from '../../../services/NotificationBar';
import { Grid,Button } from '@mui/material';
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
    { field: 'id', headerName: 'Asset Type no', 
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'assetType', headerName: 'Asset Type', 
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'
    },
    { field: 'department', headerName: 'Department', 
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
    { field: 'section', headerName: 'Section', 
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
    { field: 'action', headerName: 'Action', 
      minWidth: 100, flex: 1, align: 'center', 
      headerAlign: 'center', sortable: false,
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
                    <h3 style={{margin:'0px'}}>Asset Type</h3>
                </Grid>
                <Grid item style={{}} >
                <Button variant="contained"  onClick={handleModalOpen}>
                    Add
                </Button>
                   
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
      <Grid container>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} 
      style={{alignSelf:'center',textAlign:'center'}}
      >
      <h3 ></h3>
     </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} 
        style={{alignSelf:'center',textAlign:'center'}}
        >
       
        </Grid>    
      </Grid> 
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
