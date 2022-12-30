import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ConstructionIcon from '@mui/icons-material/Construction';
import UserMangeServiceModel from './UserMangeServiceModel';
import { FetchViewServiceRequesService } from '../../services/ApiServices';
import UserServiceData from './UserServiceData';
import UserServiceStatus from './UserServiceStatus';

const UserMangaeServiceList = (props) => {
    const [rows, setRows] = useState([]);
    const [loading,setLoading]=useState(true);
    const [open, setOpen]=useState(false);
    const [open2, setOpen2]=useState(false);
    const [open3, setOpen3]=useState(false);
    const [editData,setEditData]=useState('');
    const [refresh , setRefresh]=useState(false);


    const columns = [
        { field: 'id', headerName: ' Asset Id	', width: 200 },
        { field: 'assetName', headerName: 'Assetname', width: 200 },
        { field: 'problem', headerName: 'Asset Problem', width: 200 },
        {field: 'action', headerName: 'Action', width: 200, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
            <DeleteData selectedRow={params.row} />,
        ],
        },
        { field: 'status', headerName: 'Status', width: 200 },
        
    ];

    function EditData({ selectedRow }) {
        return (
            <RemoveRedEyeIcon
            className='prbuton'
            variant="contained"
            color='primary'
            onClick={() => {  
                setOpen2(true);
                setEditData(selectedRow);
            }}/>
           
        )
    }

    function DeleteData({ selectedRow }) {
        return (
            <ConstructionIcon
            variant="contained"
            color='primary'
            onClick={() => {
                setOpen3(true);
                setEditData(selectedRow);
                }
                }/>
           
        )
    }
    const onClikAdd=()=>{
        setOpen(true);
    }
    useEffect(()=>{
        FetchViewServiceRequesService(handleFetchViewServiceReques,handleFetchViewServiceRequesException);
    },[refresh])

    const handleFetchViewServiceReques=(dataObject)=>{
        setLoading(false);
        setRows(dataObject.data || []);
    }

const handleFetchViewServiceRequesException=(errorStaus, errorMessage) =>{
    console.log(errorMessage);
}
  return (
    <div>
      <Grid container style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
            style={{alignSelf:'center', textAlign:'center'}}
        >
            <h3>View Requested Service</h3>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
            style={{alignSelf:'center', textAlign:'center'}}
        >
            <Button variant="contained" onClick={onClikAdd}>Add</Button>
        </Grid>
      </Grid>
      <hr/>
      <Grid container>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}
         style={{marginLeft:'5%',height:'350px'}}
        >
        <DataGrid
            loading={loading}
            rows={rows}
            columns={columns} 
        />
        </Grid>

      </Grid>
      <UserMangeServiceModel
        open={open}
        setOpen={setOpen}
      />
      <UserServiceData
        open2={open2}
        setOpen2={setOpen2}
        editData={editData}
      />
      <UserServiceStatus
       open3={open3}
       setOpen3={setOpen3}
       editData={editData}
      />


    </div>
  )
}

export default UserMangaeServiceList
