import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { FetchVendorTypeListService, VendorTypeDeleteService } from '../../services/ApiServices';
import VendorTypeModel from './VendorTypeModel';
import NotificationBar from '../../services/NotificationBar';
import { Grid, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const VendorTypeList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading]=useState(true);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
      });

    const columns = [
        { field: 'id', headerName: 'Vendor Id',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'vendorType', headerName: 'Vendor Type', 
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'description', headerName: 'Description',
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'action', headerName: 'Action',
            minWidth: 100, flex: 1, align: 'center', headerAlign: 'center', sortable: false,
            cellClassname: 'actions',
            type: 'actions',
            getActions: (params) => [
                <EditData selectedRow={params.row} />,
                <DeleteData selectedRow={params.row} />,
            ],
        }
    ];

    const handleClose = () => {
        setNotification({
          status: false,
          type: '',
          message: '',
        });
      };

    useEffect(() => {
        FetchVendorTypeListService(handleFetchSuccess, handleFetchException);

    }, [refresh]);

    const handleFetchSuccess = (dataObject) => { 
        setLoading(false);
        setRows(dataObject.data);
    }

    const handleFetchException = (errorStaus, errorMessage) => {
        console.log(errorMessage);
    }


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
                    deletVenderType(selectedRow.id)
                }}
            />
              
        )
    }

    const deletVenderType = (id) => {

        VendorTypeDeleteService({ id }, handleDeleteSuccess, handleDeleteException);
    }

    const handleDeleteSuccess = (dataObject) => {
        console.log(dataObject);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
          });     
        
    }

    const handleDeleteException = (errorObject, errorMessage) => {
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
                <h3 style={{margin:'0px'}}>VIEW VENDOR TYPE</h3>
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
            <VendorTypeModel
                open={open}
                setOpen={setOpen}
                isAdd={isAdd}
                editData={editData}
                setRefresh={setRefresh}
            />
               <NotificationBar
                    handleClose={handleClose}
                    notificationContent={openNotification.message}
                    openNotification={openNotification.status}
                    type={openNotification.type}
                />

        </div>
    )
}

export default VendorTypeList
