import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { Grid } from '@mui/material';
import LineModel from './LineModel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FetchLineService, LineDeleteService } from '../../../services/ApiServices';
import NotificationBar from '../../../services/NotificationBar';

const LineList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [loading , setLoading]=useState(true);
    const [refresh , setRefresh]=useState(false);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    
    const columns = [
        { field: 'id', headerName: 'Serial No', width: 200 },
        { field: 'lineName', headerName: 'Line Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        {field: 'action', headerName: 'Action', width: 200, sortable: false,
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
                deletUser(selectedRow.id)
            }}/>
        )
    }
  
    const deletUser =(id) => {
        LineDeleteService({id}, handleDeleteSuccess, handleDeleteException);
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
  
    useEffect(() => {
        FetchLineService(handleFetchSuccess, handleFetchException);
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
    
    const handleNotify = () => {
        setOpen(false)
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };
  
    return (
        <div>
            <div>
                <Grid container>
                    <Grid xs={12} sm={6} md={6} lg={6} xl={6} style={{ alignSelf: 'center', textAlignLast: 'center', marginTop: '20px', }} >
                        <h3 >Line List</h3>
                    </Grid>
                    <Grid xs={12} sm={6} md={6} lg={6} xl={6} style={{ alignSelf: 'center',  textAlignLast: 'center', marginTop: '20px',  }} >
                        <Button style={{width:'120px',height:'30px'}} variant="outlined" onClick={handleModalOpen} >
                            Add
                        </Button>
                    </Grid>
                </Grid>
                <hr style={{ bottom: 'solid' }} />
                <div style={{ height: '350px', width: '85%', marginLeft: '5%', marginTop: '20px' }}>
                    <DataGrid
                    loading={loading}
                    rows={rows}
                    columns={columns} />
                </div>
            </div>
            <LineModel 
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            editData={editData}
            setRefresh={setRefresh}
            refresh={refresh}/>
            <NotificationBar
            handleClose={handleNotify}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}/>
        </div>
    )
}

export default LineList
