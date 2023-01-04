import React, { useEffect, useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import { FetchAllocationShowRequestReturnAsset, UpdateRequestedReturnAsset } from '../../services/ApiServices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationBar from '../../services/NotificationBar';
import { Grid } from '@mui/material';

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
        { field: 'id', headerName: 'Asset Id', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'assetName', headerName: 'Returned Asset Name', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'user', headerName: 'User Name',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {field: 'action', headerName: 'Action',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center', sortable: false,
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
                    <h3 style={{margin:'0px'}}>View Asset</h3>
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
            <NotificationBar
                handleClose={handleCloseNotify}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </div>
    )
}

export default RequestReturnAssetList
