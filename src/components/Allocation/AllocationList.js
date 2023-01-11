import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { DataGrid} from '@mui/x-data-grid';
import {  AlloctionViewService,  FetchAssetListService,  UserDeleteService } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';
import AllocationModel from './AllocationModel';
import { Grid,Button } from '@mui/material';
import { DownloadAlloction } from '../../services/DownloadService';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const AllocationList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [refresh , setRefresh]=useState(false);
    const [dateFrom , setDateFrom]=useState('');
    const [dateTo , setDateTo]=useState('');
    const [loading,setLoading]=useState(true);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    useEffect(() => {
        FetchAssetListService(handleFetchAssetListService,FetchAssetListServiceException);
        
      }, []);
   
      const handleFetchAssetListService=(dataObject)=>{
        setLoading(false);
        setRows(dataObject.data);
      }
      const FetchAssetListServiceException=(errorObject, errorMessage) =>{
        console.log(errorMessage);
    }

    const columns = [
        { field: 'assetNo', headerName: 'Asset No', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'section', headerName: 'Section',
        //  minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'assetType', headerName: 'Asset Type',
        //  minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'assetName', headerName: 'Asset Name', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
        // { field: 'assetId', headerName: 'Asset Id', 
        // minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'requesterName', headerName: 'Requester Name', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {field: 'action', headerName: 'Action',
         minWidth: 100, flex: 1, align: 'center', headerAlign: 'center', sortable: false, 
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
            
        ],
        }
    ];

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
            <AddIcon
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
    const onSubmitView =(e)=>{
        e.preventDefault();
        AlloctionViewService({fromDate:dateFrom,toDate:dateTo},handleViewService,handleViewServiceException)
    }

    const handleViewService=(dataObject)=>{
        setRows(dataObject.data)
    }

    const handleViewServiceException=(errorObject, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const deletUser = (id) => {
        UserDeleteService({id}, handleDeleteSuccess, handleDeleteException);
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

    const onClickExport=(e)=>{
        e.preventDefault();
        DownloadAlloction({fromDate:dateFrom,toDate:dateTo}, handleAlloctionExport,handleAlloctionExportException)
    }
    
    const handleAlloctionExport = () => { 
        
    }
    
    const handleAlloctionExportException=()=>{  

    }
    
    return (
        <div>
            <form onSubmit={onSubmitView}>
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
                        <h3 style={{margin:'0px'}}>View Allocation</h3>
                    </Grid>
                    {/* <Grid item style={{}} >
                        <Button  variant="contained" onClick={handleModalOpen}>Add Alloction</Button> 
                    </Grid> */}
                </Grid>
                {/* <Grid container spacing={2}  style={{ marginTop:'0px'}}>
                    <Grid item xs={10} sm={4} md={2} lg={2} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label >Date From :</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                        <TextField fullWidth id="outlined-basic" type='date' onChange={(e)=>setDateFrom(e.target.value)} variant="outlined" />
                    </Grid>
                    <Grid item xs={10} sm={4} md={2} lg={1.5} xl={2} style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label > To</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                        <TextField fullWidth id="outlined-basic" type='date' onChange={(e)=>setDateTo(e.target.value)} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <Button style={{height:'40px', width:'100px'}} variant="contained" type='submit'>View</Button>
                    </Grid>
                </Grid> */}
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ height: '400px', marginTop: '10px' }} >
                        <DataGrid
                        rows={rows}
                        loading={loading}
                        columns={columns} 
                    />
                    </Grid>
                    {/* <Grid style={{marginTop:'10px',marginLeft:'20px'}}>
                        <Button variant="contained" onClick={(e)=>{onClickExport(e)}}>Export</Button>
                    </Grid> */}
                </Grid>
                <AllocationModel
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
            </form>
        </div>
    )
}

export default AllocationList
