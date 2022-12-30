import React, { useEffect, useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import { FetchAllocationShowRequestReturnAsset, UpdateRequestedReturnAsset } from '../../services/ApiServices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationBar from '../../services/NotificationBar';

const RequestReturnAssetList = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading]=useState(true);
    const currentTime = new Date();
    const [refresh , setRefresh]=useState(false);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    const columns = [
        { field: 'id', headerName: 'Asset Id', width: 150 },
        { field: 'assetName', headerName: 'Returned Asset Name', width: 150 },
        { field: 'user', headerName: 'User Name', width: 150 },
        {field: 'action', headerName: 'Action', width: 250, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
        ],
        }
    ];

    useEffect(()=>{
        FetchAllocationShowRequestReturnAsset(handleFetchAllocationShowRequest,handleFetchAllocationException);
        
    },[])

    const handleFetchAllocationShowRequest=(dataObject)=>{
        setLoading(false);
        setRows(dataObject.data);
    }

    const handleFetchAllocationException=(errorStatus, errorMassege)=>{
        console.log(errorMassege);
    }

    function EditData({ selectedRow }) {
        return (
            <CheckCircleIcon
                className='prbuton'
                variant="contained"
                color='primary'
                onClick={() => {
                    UpdateRequestedReturnAsset({
                        id:selectedRow.id,
                        requestedReturnAsset:0,
                        returnedDate:currentTime.toLocaleDateString('es-CL'),
                    },handleUpdateRequestedReturnAsset,handleUpdateRequestedException );
                }}  
            />
           
        )
    }

    const handleUpdateRequestedReturnAsset=(dataObject)=>{
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.data,
        });
    }

    const handleUpdateRequestedException=(errorStatus, data)=>{
        setNotification({
            status: true,
            type: 'error',
            message: data,
        });
    }

    const handleCloseNotify = () => {
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };
    
    return (
        <div>
            <label style={{marginLeft:'500px'}}>View Asset</label>
            <hr/>
            <div style={{ height: '250px', width: '96%', marginLeft: '40px', marginTop: '20px' }}>
                <DataGrid
                loading={loading}
                rows={rows}
                columns={columns}/>
            </div>
            <NotificationBar
            handleClose={handleCloseNotify}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}/>
        </div>
    )
}

export default RequestReturnAssetList
