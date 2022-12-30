import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import NotificationBar from '../../services/NotificationBar';
import AmcServiceModel from './AmcServiceModel';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import FileDownload from '@mui/icons-material/FileDownload';
import AmcServiceModalView from './AmcServiceModalView';
import { FetchAmcServiceListService, AmcServiceDeleteService ,  } from '../../services/ApiServices';
import { DownloadAmc } from '../../services/DownloadService';

const AmcServiceList = () => {
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isView, setIsView] = useState(false);
    const [isService, setIsService] = useState(false);
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
        { field: 'vendorName', headerName: 'Vender Name', width: 140 },
        { field: 'periodFrom', headerName: 'Period From', width: 110 },
        { field: 'periodTo', headerName: 'Period To', width: 100 },
        { field: 'servicePattern', headerName: 'Service Pattern', width: 110 },
        { field: 'department', headerName: 'Department', width: 120 },
        { field: 'section', headerName: 'Section', width: 120 },
        { field: 'assetType', headerName: 'Asset Type', width: 120 },
        { field: 'assetName', headerName: 'Asset Name', width: 120 },
        {field: 'action', headerName: 'Action', width: 180, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row}  />,
            <DeleteData selectedRow={params.row} />,
            <VisibilityData selectedRow={params.row} />,
            <FileDownloadData selectedRow={params.row} />,
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
                deleteAmc(selectedRow.id)
            }}/>
        )
    }

    function FileDownloadData({ selectedRow }) {
        return (
            <FileDownload />
        )
    }

    function VisibilityData({ selectedRow }) {
        return (
            <Visibility 
            onClick={() => {               
                setIsView(true);
                setEditData(selectedRow);
                setOpenView(true);               
            }}/>
        )
    }

    const handleViewEditSuccess = (dataObject) =>{
        console.log(dataObject);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
    }

    const handleViewDeleteException = (errorObject, errorMessage) =>{
        console.log(errorMessage);
        setNotification({
            status: true,
            type: 'error',
            message:errorMessage,
        });
    }
        
    const deleteAmc = (id) => {
        AmcServiceDeleteService ({id}, handleDeleteSuccess, handleDeleteException);
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

    const handleServiceModalOpen = () => {  
        setIsService(true);
        setOpen(true);       
    };

    useEffect(() => {
        FetchAmcServiceListService(handleFetchSuccess, handleFetchException);  
    }, [refresh]);

    const handleFetchSuccess = (dataObject) =>{
        setLoading(false);
        setRows(dataObject.data);
        setLoading(false);
    }

    const handleFetchException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }

    const AmcDownload = () =>{
        DownloadAmc(handleDownloadAmc, handleDownloadAmcException);
    }

    const handleDownloadAmc =() => {
    }

    const handleDownloadAmcException =() =>{
    }

    const handleClose = () => {
        setOpen(false)
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };
  
    return (
        <div >
            <div style={{display:'flex',}}>
                <h3 style={{ marginLeft: '80px' }}> AMC</h3>
                <Button style={{width:'120px',height:'30px',marginLeft:'70%',marginTop:'30px'}} variant="outlined" onClick={handleModalOpen}>
                   Add
                </Button>  
            </div>
            <hr style={{ bottom: 'solid' , borderColor:'whitesmoke'}} />
            <div style={{ height: '300px', width: '96%', marginLeft: '10px', marginTop: '20px' }}>
                <DataGrid
                loading={loading}
                rows={rows}
                columns={columns} />
            </div>
            <Button style={{marginTop:'20px'}} variant="contained" onClick={AmcDownload}>Export</Button>

            <AmcServiceModel 
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            isService={isService}
            editData={editData}
            setRefresh={setRefresh}
            isView={isView} />  
            
            <AmcServiceModalView
            open={openView}
            setOpen={setOpenView}
            isAdd={isAdd}
            isService={isService}
            editData={editData}
            setRefresh={setRefresh}
            isView={isView}/>
           
            <NotificationBar
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}/>
        </div>
    )
}

export default AmcServiceList
