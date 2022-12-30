import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import NotificationBar from '../../../services/NotificationBar';
import CretificateModel from './CretificateModel';
import { CertificateDeleteService, FetchCertificateService} from '../../../services/ApiServices';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import FileDownload from '@mui/icons-material/FileDownload';
import CertificateModalView from './CertificateModalView';
import { DownloadCertificate } from '../../../services/DownloadService';

const CertificateList = () => {
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isView, setIsView] = useState(false);
    const [isService, setIsService] = useState(false);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [refresh , setRefresh]=useState(false);
    const [loading,setLoading]=useState(true);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    const columns = [
        { field: 'vendorName', headerName: 'Vender Name', width: 140 },
        { field: 'certificateDate', headerName: 'Period From', width: 120 },
        { field: 'expireDate', headerName: 'Period To', width: 100 },
        { field: 'inspectionPattern', headerName: 'Inspection Pattern', width: 140 },
        { field: 'department', headerName: 'Department', width: 120 },
        { field: 'section', headerName: 'Section', width: 120 },
        { field: 'assetType', headerName: 'Asset Type', width: 110 },
        { field: 'assetName', headerName: 'Asset Name', width: 120 },
        {field: 'action', headerName: 'Action', width: 150, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
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
                
            }}
            />
        )
    }
    
    
    const deleteAmc = (id) => {
        CertificateDeleteService({id}, handleDeleteSuccess, handleDeleteException);
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
        setIsAdd(false);
        setIsService(true);
        setOpen(true);  
    };

    useEffect(() => {
        FetchCertificateService(handleFetchSuccess,handleFetchException)  
    }, [refresh]);

    const handleFetchSuccess = (dataObject) =>{
        setRows(dataObject.data);
        setLoading(false);
        
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

    const CertificateDownload = () =>{
        DownloadCertificate(handleDownloadCertificate, handleDownloadCertificateException);
    }

    const handleDownloadCertificate =() => {

    }

    const handleDownloadCertificateException =() =>{

    }
  
   
    return (
        <div >
            <div style={{display:'flex', marginLeft:'40px',}}>
                <h3 style={{ marginLeft: '60px' }}>INSPECTION</h3>
                <Button style={{width:'120px',height:'30px', marginLeft:'60%',marginTop:'20px'}} variant="outlined" onClick={handleModalOpen}>
                    Add
                </Button>
            </div>
            <hr style={{ bottom: 'solid' , borderColor:'whitesmoke'}} />
            <div style={{ height: '300px', width: '96%', marginLeft: '40px', marginTop: '20px' }}>
                <DataGrid
                loading={loading}
                rows={rows}
                columns={columns} />
            </div>
            
             <Button style={{marginTop:'20px'}} variant="contained" onClick={CertificateDownload}>Export</Button>
            <CretificateModel
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            isService={isService}
            editData={editData}
            setRefresh={setRefresh}
            isView={isView}/>
            
            <CertificateModalView
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

export default CertificateList
