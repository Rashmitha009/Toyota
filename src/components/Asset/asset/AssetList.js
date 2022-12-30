import  React , { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { AssetDeleteService, FetchAssetListService,FetchSectionService } from '../../../services/ApiServices';
import AssetModel from './AssetModel';
import NotificationBar from '../../../services/NotificationBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';

const AssetList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState({});
    const [refresh , setRefresh]=useState(false);
    const [ loading, setLoading]=useState(true);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
          
    const columns = [
        { field: 'id', headerName: 'Serial No', width: 40 },
        { field: 'departmentName', headerName: 'Department', width: 100 },
        { field: 'sectionName', headerName: 'Section', width: 100 },
        { field: 'assetName', headerName: 'Machine', width: 100 },
        { field: 'assetTypeName', headerName: 'Asset Type', width: 100 },
        { field: 'manufacturer', headerName: 'Manufacturer', width: 100 },
        { field: 'assetModel', headerName: 'Asset Model', width: 100 },
        { field: 'warrantyStartDate', headerName: 'Warranty Start Date', width: 100 },
        { field: 'warrantyEndDate', headerName: 'Warranty End Date', width: 100 },
        {field: 'action', headerName: 'Action', width: 120, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
            <DeleteData selectedRow={params.row} />,
        ],
        }
    ];
    
    useEffect(() => {
        FetchAssetListService(handleFetchSuccess, handleFetchException);
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
                deletAsset(selectedRow.id)
            }}/>       
        )
    }

    const deletAsset = (id) => {
        AssetDeleteService({id}, handleDeleteSuccess, handleDeleteException);
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
        setRefresh(true); 
    };
  
    return (
        <div style={{border:'solid',borderColor:'whitesmoke'}}>
            <Grid container>
                <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{ alignSelf:'center', textAlign:'center' }}  >
                    <h3 > Asset</h3>
                </Grid>
                <Grid item xs={10} sm={10} md={6} lg={6} xl={6} style={{ alignSelf:'center', textAlign:'center' }}>
                    <Button style={{width:'10%',height:'30px'}} variant="outlined" onClick={handleModalOpen}>
                        Add
                    </Button>
                </Grid>
            </Grid>
            <hr style={{ bottom: 'solid' }} />
            <Grid item xs={10} sm={10} md={10} lg={10} lx={10}>
                <DataGrid 
                    style={{ height: 270,width:'120%' }}
                    loading={loading}
                    rows={rows}
                    columns={columns} 
                />
            </Grid>
            <AssetModel
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            editData={editData}
            setRefresh={setRefresh}
            refresh ={refresh}/>
            <NotificationBar
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}/>
        </div>
    )
}

export default AssetList
