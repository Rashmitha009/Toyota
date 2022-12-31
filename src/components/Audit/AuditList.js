import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { FetchAuditListService, AuditDeleteService } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';
import AuditModel from './AuditModel';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { Grid, Button } from '@mui/material';

const AuditList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [refresh , setRefresh]=useState(false);
    const [loading , setLoading]=useState(true);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    
    const columns = [
        { field: 'id', headerName: 'Serial No', 
          minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
        { field: 'auditDate', headerName: 'Date', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'auditName', headerName: 'Audit Name',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'department', headerName: 'Department', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'section', headerName: 'Section', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'assetType', headerName: 'Asset Type', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
        {field: 'action', headerName: 'Action',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center', sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row}  />,
            <DeleteData selectedRow={params.row} />,
        ],
        }
    ];

    function EditData({ selectedRow }) {
        return (
            <Edit 
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
            <Delete  
            variant="contained"
            color='primary'
            onClick={() => {
                deleteAudit(selectedRow.id)
            }}/>
        )
    }

    useEffect(() => {
        FetchAuditListService(handleFetchSuccess, handleFetchException);
       
    }, [refresh]);

    const handleFetchSuccess = (dataObject) =>{
        setLoading(false);
        setRows(dataObject.data);
    }

    const handleFetchException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }

    const handleClose = () => {
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };
    
    const deleteAudit = (id) => {
        AuditDeleteService({id}, handleDeleteSuccess, handleDeleteException);
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
                <h3 style={{margin:'0px'}}> Audit View Assets </h3>
                </Grid>
                <Grid item style={{}} >
                <Button variant="contained" onClick={handleModalOpen} >
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
            <AuditModel
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            editData={editData}
            setRefresh={setRefresh} />
            
            <NotificationBar
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}/>
        </div>
    )
}

export default AuditList;