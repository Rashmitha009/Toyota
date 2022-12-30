import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { FetchUserService, UntagAssetViewService, UserDeleteService } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';
import UntageAssetModel from './UntageAssetModel';
import { Grid } from '@mui/material';
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
        { field: 'id', headerName: 'Serial No', width: 140 },
        { field: 'section', headerName: 'Section', width: 140 },
        { field: 'assetName', headerName: 'Asset Name', width: 140 },
        { field: 'assetId', headerName: 'Asset Id', width: 140 },
        { field: 'id', headerName: 'Id', width: 140 },
        { field: 'user', headerName: 'Username', width: 140 },
        {field: 'action', headerName: 'Action', width: 250, sortable: false,
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
    const handleUntagExportException=()=>{   }


  return (
    <div>
        <form onSubmit={onSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                 style={{alignSelf:'center',textAlign:'center'}}
                >
                    <h3 > UNTAG ASSET</h3>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                style={{alignSelf:'center',textAlign:'center'}}
                >
                    <Button 
                    style={{
                            marginLeft:'53%',
                            width:'120px',
                            height:'30px',
                            marginTop:'20px', 
                            alignSelf:'center'
                        }} variant="outlined" 
                    onClick={ handleModalOpen}>
                    UNTAG ASSET
                    </Button>
                </Grid>
            </Grid>
            <hr style={{ bottom: 'solid' }} />
            <Grid container spacing={2}  style={{marginLeft:'20px', marginTop:'30px'}}>               
                <Grid item xs={12} sm={4} md={2} lg={1} xl={3}
                    style={{
                        alignSelf: 'center',
                        textAlignLast: 'center'
                }}>
                    <label >Date From :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <TextField fullWidth id="outlined-basic" type='date' onChange={(e)=>setDateFrom(e.target.value)} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={1} xl={3}
                    style={{
                        alignSelf: 'center',
                        textAlignLast: 'center'
                }}>
                    <label > To</label>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <TextField fullWidth id="outlined-basic" type='date' onChange={(e)=>setDateTo(e.target.value)} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}
                    style={{
                        alignSelf: 'center',
                        textAlignLast: 'center'
                }}>

                <Button variant="contained" style={{height:'40px', width:'100px'}} type='submit'>View</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                    style={{ height: '250px', marginTop: '10px' }}>
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
                     setRefresh={setRefresh}
                />
                 <NotificationBar
                    handleClose={handleClose}
                    notificationContent={openNotification.message}
                    openNotification={openNotification.status}
                    type={openNotification.type}
                />
 </form>
    </div>
  )
}

export default UntageAseetList
