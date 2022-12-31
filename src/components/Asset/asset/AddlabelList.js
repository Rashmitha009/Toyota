import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import NotificationBar from '../../../services/NotificationBar';
import Addlabel from './Addlabel';
import { AssetLabelDeletService, FetchAssetLableService, UserDeleteService } from '../../../services/ApiServices';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCode from './QrCode';
import { Button, Grid } from '@mui/material';

const AddlabelList = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [refresh , setRefresh]=useState(false);
    const [loading, setLoading]=useState(true);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    const columns = [
        // { field: 'id', headerName: 'Serial No', width: 100, },
        {   field: 'department', headerName: 'Department', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
        {   field: 'selectSection', headerName: 'Section',  
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
        {   field: 'selectAsset', headerName: 'Asset Type', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
        {   field: 'selectAssetId', headerName: 'Asset Id	', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'   },
        {   field: 'code', headerName: 'Code	', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
        {   field: 'date', headerName: 'Date', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
        // {   field: 'selectAsset', headerName: '	Asset Name', },
        {   field: 'action', headerName: 'Action', 
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
    
    useEffect(() => {
        FetchAssetLableService(handleFetchSuccess, handleFetchException);
       
    }, [refresh]);

    const handleFetchSuccess = (dataObject) =>{
        setLoading(false);
        setRows(dataObject.data);
    }

    const handleFetchException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }

    const handleClose = () => {
        setOpen(false)
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };

    function EditData({ selectedRow }) {
        return (
            <RemoveRedEyeIcon
                className='prbuton'
                variant="contained"
                color='primary'
                onClick={() => {      
                setOpen1(true);
                setEditData(selectedRow)
            }}/>     
        )
    }
    
    function DeleteData({ selectedRow }) {
        return (
            <DeleteIcon
                variant="contained"
                color='primary'
                onClick={() => {
                DeletAssetLabel(selectedRow.id)
                }
            }/> 
        )
    }
    
    const  DeletAssetLabel = (id) => {
        AssetLabelDeletService({id}, handleDeleteSuccess, handleDeleteException);
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
            message:errorMessage,
          });
    }

    const handleModalOpen = () => {
        setIsAdd(true);
        setOpen(true);
       
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
                    <h3 style={{margin:'0px'}}>VIEW ASSET TABLE</h3>
                </Grid>
                <Grid item 
                 style={{}} >
                    <Button variant="contained" onClick={handleModalOpen}>
                    Add Label
                    </Button>
                </Grid>
        </Grid>         
        <Grid >
            <DataGrid 
                style={{ height: 270,width:'100%' }}
                loading={loading}
                rows={rows}
                columns={columns} 
            />
         </Grid>
        <Addlabel
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            editData={editData}
            setRefresh={setRefresh}
        />
        <QrCode
            open1={open1}
            setOpen1={setOpen1}
            editData={editData}
        />
        <NotificationBar
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}
        />
    </div>
  )
}

export default AddlabelList
