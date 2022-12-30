import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { FetchVendorTypeListService, VendorTypeDeleteService } from '../../services/ApiServices';
import VendorTypeModel from './VendorTypeModel';
import NotificationBar from '../../services/NotificationBar';
import { Grid } from '@mui/material';
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
        { field: 'id', headerName: 'Vendor Id', width: 200 },
        { field: 'vendorType', headerName: 'Vendor Type', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        {
            field: 'action', headerName: 'Action', width: 250, sortable: false,
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
            <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} lx={6}
                    style={{alignSelf:'center', textAlign:'center'}}
                >
                <h3>VIEW VENDOR TYPE</h3>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} lx={6}
                style={{alignSelf:'center', textAlign:'center'}}
                >
                <Button style={{  width: '120px', height: '30px' }} variant="outlined" onClick={handleModalOpen}>
                Add
            </Button>
                </Grid>
            </Grid>
            <hr />
            
            <div style={{ height: 400, width: '90%', marginTop: '20px' }}>
                <DataGrid
                    loading={loading}
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5]}
                    onRowAdd />
            </div>
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
