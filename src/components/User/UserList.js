import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import UserModel from './UserModel';
import { FetchUserService, UserDeleteService } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';

const UserList = (props) => {
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
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'  },
        { field: 'employee_id', headerName: 'Employee Id', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'employee_name', headerName: 'Employee Name',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'  },
        { field: 'department', headerName: 'Department', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'designation', headerName: 'Designation',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'mobile_number', headerName: 'Mobile',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'  },
        { field: 'email', headerName: 'Email',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'  },
        { field: 'user_name', headerName: 'UserName', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'  },
        {field: 'action', headerName: 'Action',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' , sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
            <DeleteData selectedRow={params.row} />,
        ],
        }
    ];
    
    useEffect(() => {
        FetchUserService(handleFetchSuccess, handleFetchException);
       
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
                <h3 style={{margin:'0px'}}>MANAGE USER</h3>
            </Grid>
              <Grid item style={{}} >
                <Button variant="contained" onClick={handleModalOpen} >
                    Add
                </Button>    
              </Grid>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} lx={10}>
            <DataGrid 
                style={{ height: 400,width:'100%' }}
                loading={loading}
                rows={rows}
                columns={columns} 
            />
        </Grid>
            <UserModel 
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            editData={editData}
            setRefresh={setRefresh}
            refresh={refresh}/>
            <NotificationBar
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}/>
        </div>
    )
}

export default UserList
