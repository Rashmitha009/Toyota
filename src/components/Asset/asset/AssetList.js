import  React , { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AssetDeleteService, FetchAssetListService,FetchSectionService } from '../../../services/ApiServices';
import AssetModel from './AssetModel';
import NotificationBar from '../../../services/NotificationBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid } from '@mui/material';

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
        {   field: 'assetId', headerName: 'Asset Id',  
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
        {   field: 'departmentName', headerName: 'Department', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {   field: 'sectionName', headerName: 'Section', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {   field: 'assetName', headerName: 'Machine', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {   field: 'assetTypeName', headerName: 'Asset Type', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {   field: 'manufacturer', headerName: 'Manufacturer', 
            minWidth: 150, flex: 1, align: 'center', headerAlign: 'center' },
        {   field: 'manufacturerNo', headerName: 'Manufacturer No', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {   field: 'yearOfMfg', headerName: 'Year Of Mfg', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {   field: 'warrantyEndDate', headerName: 'Warranty End Date', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {   field: 'action', headerName: 'Action', 
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center', sortable: false,
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
        <div style={{}}>
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
                    <h3 style={{margin:'0px'}}> Asset</h3>
                </Grid>
                <Grid item 
                 style={{}} >
                    <Button style={{}} variant="contained" onClick={handleModalOpen}>
                        Add
                    </Button>
                </Grid>
            </Grid>
           
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
