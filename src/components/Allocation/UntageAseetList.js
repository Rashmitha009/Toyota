import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { FetchUserService, UntagAssetViewService, UserDeleteService } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';
import UntageAssetModel from './UntageAssetModel';
import { Grid, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DownloadUntag } from '../../services/DownloadService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UntageAseetList = () => {
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
       
        { field: 'section', headerName: 'Section',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'  },
        { field: 'assetName', headerName: 'Asset Name',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'  },
        { field: 'assetId', headerName: 'Asset Id', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'  },
        { field: 'id', headerName: 'Id',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'user', headerName: 'Username',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'  },
        {field: 'action', headerName: 'Action',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' , sortable: false,
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

    const onSubmit=(e)=>{
        e.preventDefault();
        UntagAssetViewService({fromDate:dateFrom,toDate:dateTo},handleViewService,handleViewServiceException)
    }
    
    const handleViewService=(dataObject)=>{
    setRows(dataObject.data)
    }

    const handleViewServiceException=(errorObject, errorMessage) =>{
        console.log(errorMessage);
    }

    const onClickExport=(e)=>{
        e.preventDefault();    
        DownloadUntag({fromDate:dateFrom,toDate:dateTo}, handleUntagExport,handleUntagExportException)
    }

    const handleUntagExport = () => { 

    }

    const handleUntagExportException=()=>{  

    }
  
    return (
        <div>
            <form onSubmit={onSubmit}>
                <Grid container style={{
                    display:'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding:'10px'
                }}>
                <Grid item style={{alignSelf:'center',textAlign:'center'}}>
                    <h3 style={{margin:'0px'}}> UNTAG ASSET</h3>
                </Grid>
                <Grid item style={{}} >
                    <Button variant="contained" onClick={ handleModalOpen} >
                    UNTAG ASSET
                    </Button>    
                </Grid>
            </Grid>
            <Grid container spacing={2}  style={{marginTop:'0px'}}>               
                <Grid item xs={12} sm={4} md={2} lg={2} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                    <label >Date From :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                    <TextField fullWidth id="outlined-basic" type='date' onChange={(e)=>setDateFrom(e.target.value)} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={2} lg={2} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center'  }}>
                    <label > To</label>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                    <TextField fullWidth id="outlined-basic" type='date' onChange={(e)=>setDateTo(e.target.value)} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} xl={3} style={{ alignSelf: 'center', textAlignLast: 'center' }}>
                    <Button variant="contained" style={{height:'40px', width:'100px'}} type='submit'>View</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ height: '250px', marginTop: '10px' }}>
                    <DataGrid
                    rows={rows}
                    columns={columns} />
                </Grid>
                <Grid style={{marginTop:'10px',marginLeft:'20px'}}>
                    <Button variant="contained" onClick={(e)=>{onClickExport(e)}}>Export</Button>
                </Grid>
            </Grid> 
            <UntageAssetModel
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

export default UntageAseetList
