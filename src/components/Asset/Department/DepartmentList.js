import  React , { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { FetchDepartmentListService , DepartmentDeleteService  } from '../../../services/ApiServices';
import DepartmentModel from './DepartmentModel';
import NotificationBar from '../../../services/NotificationBar';
import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DepartmentList = () => {
    const [open, setOpen] = useState(false);
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
        { field: 'id', headerName: 'Dep No', width: 200 },
        { field: 'department_name', headerName: 'Department Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 250 },
        {field: 'action', headerName: 'Action', width: 250, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
            <DeleteData selectedRow={params.row} />,
        ],
        }
    ];
    useEffect(() => {
        FetchDepartmentListService(handleFetchSuccess, handleFetchException);
       
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
    
    function EditData({ selectedRow }) {
        return (
           < EditIcon
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
                deleteDepartment(selectedRow.id)
            }}/>
          
        )
    }
    
    const deleteDepartment = (id) => {
        DepartmentDeleteService ({id}, handleDeleteSuccess, handleDeleteException);
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

    const handleModalOpen = () => {
        setIsAdd(true);
        setOpen(true);
       
    };
    
    
  
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} 
                    style={{alignSelf:'center', textAlign:'center'}}
                >
                <h3 >Department</h3>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} 
                    style={{alignSelf:'center', textAlign:'center'}}
                >
                <Button style={{width:'120px',height:'30px', }} variant="outlined" onClick={handleModalOpen}>
                Add
            </Button>
                </Grid>                
            </Grid>
            <hr style={{ bottom: 'solid' }} />
           
            <div style={{ height: '350px', width: '90%', marginLeft: '50px', marginTop: '20px' }}>
                <DataGrid
                 loading={loading}
                rows={rows}
                columns={columns} />
            </div>
            <DepartmentModel 
             open={open}
             setOpen={setOpen}
             isAdd={isAdd}
             editData={editData}
             setRefresh={setRefresh}/>

                <NotificationBar
                    handleClose={handleClose}
                    notificationContent={openNotification.message}
                    openNotification={openNotification.status}
                    type={openNotification.type}
                />
        </div>
    )
}

export default DepartmentList;
