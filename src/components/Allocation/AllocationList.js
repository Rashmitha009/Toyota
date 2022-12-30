import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { DataGrid} from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import {  AlloctionViewService,  UserDeleteService } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';
import AllocationModel from './AllocationModel';
import { Grid } from '@mui/material';
import { DownloadAlloction } from '../../services/DownloadService';
import EditIcon from '@mui/icons-material/Edit';

const AllocationList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [refresh , setRefresh]=useState(false);
    const [dateFrom , setDateFrom]=useState('');
    const [dateTo , setDateTo]=useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
   
    const columns = [
        { field: 'department', headerName: 'Department', width: 150 },
        { field: 'section', headerName: 'Section', width: 150 },
        { field: 'assetType', headerName: 'Asset Type', width: 150 },
        { field: 'assetName', headerName: 'Asset Name', width: 150 },
        { field: 'assetId', headerName: 'Asset Id', width: 150 },
        { field: 'user', headerName: 'Assigned User', width: 150 },
        {field: 'action', headerName: 'Action', width: 200, sortable: false, 
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
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <h2 style={{marginLeft:'40px'}}>View Allocation</h2>
                    </Grid>
                    <Grid item xs={6} style={{  alignSelf: 'center', textAlignLast: 'center' }}>
                        <Button  variant="contained" style={{height:'40px'}} onClick={handleModalOpen}>Add Alloction</Button>
                    </Grid>
                </Grid>
                <hr/>
                <Grid container spacing={2}  style={{marginLeft:'20px', marginTop:'30px'}}>
                    <Grid item xs={10} sm={4} md={1} lg={1} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label >Date From :</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                        <TextField fullWidth id="outlined-basic" type='date' onChange={(e)=>setDateFrom(e.target.value)} variant="outlined" />
                    </Grid>
                    <Grid item xs={10} sm={4} md={1} lg={1} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                        <label > To</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                        <TextField fullWidth id="outlined-basic" type='date' onChange={(e)=>setDateTo(e.target.value)} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'}}>
                        <Button style={{height:'40px', width:'100px'}} variant="contained" type='submit'>View</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ height: '250px', marginTop: '10px' }} >
                        <DataGrid
                        rows={rows}
                        columns={columns} />
                    </Grid>
                    <Grid style={{marginTop:'10px',marginLeft:'20px'}}>
                        <Button variant="contained" onClick={(e)=>{onClickExport(e)}}>Export</Button>
                    </Grid>
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
