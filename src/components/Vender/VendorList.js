import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { FetchVendorService,VendorDeleteService } from '../../services/ApiServices';
import VendorModel from './VendorModel';
import NotificationBar from '../../services/NotificationBar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';

export default function VendorList() {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [loading , setLoading]=useState(true);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
      });

    const columns = [
        { field: 'id', headerName: 'Serial No', width: 60 },
        { field: 'vendorName', headerName: 'Name', width: 150 },
        { field: 'address', headerName: 'Address', width: 150 },
        { field: 'contactNo', headerName: 'Contact No', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'contactPerson', headerName: 'Contact Parson', width: 150 },
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

    useEffect(() => {
        FetchVendorService(handleFetchSuccess, handleFetchException);

    }, [refresh]);

    const handleFetchSuccess = (dataObject) => {
        setLoading(false);
        setRows(dataObject.data);
    }

    const handleFetchException = (errorStaus, errorMessage) => {
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
                    deletVender(selectedRow.id)
                }
                }/>
        )
    }
    const deletVender = (id) => {

        VendorDeleteService({ id }, handleDeleteSuccess, handleDeleteException);
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
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                    style={{alignSelf:'center',textAlignLast: 'center',}}
                >
                    <h3 >MANAGE VENDOR</h3>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                    style={{alignSelf:'center',textAlignLast: 'center',}}
                >
                    <Button style={{ width: '120px', height: '30px' }} variant="outlined" onClick={handleModalOpen}>
                Add
            </Button>
                </Grid>
            </Grid>
           
            <hr style={{ bottom: 'solid' }} />
           
            <div style={{ height: '350px', width: '90%', marginLeft: '40px', marginTop: '20px' }}>
                <DataGrid
                    loading={loading}
                    rows={rows}
                    columns={columns} />
            </div>
            <VendorModel
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
    );
}
