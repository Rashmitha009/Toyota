import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { FetchShowReturnAssetService } from '../../services/ApiServices';
import ReplayIcon from '@mui/icons-material/Replay';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UserAssetReturn from './UserAssetReturn';
import UserSelfAssessment from './UserSelfAssessment';

const UserReturnAssetList = () => {
    const [rows, setRows]=useState([]);
    const [loading,setLoading]=useState(true);
    const [refresh , setRefresh]=useState(false);
    const [open,setOpen]=useState(false);
    const [open2,setOpen2]=useState(false);
    const [editData,setEditData]=useState('');

    const columns = [
        { field: 'id', headerName: 'Serial No', width: 200 },
        { field: 'assetName', headerName: 'Asset Name', width: 220 },
        {field: 'action', headerName: 'Action', width: 200, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
            <DeleteData selectedRow={params.row} />,
        ],
        },
        { field: 'returnStatus', headerName: 'Return Status', width: 220 },
         
    ];
    function EditData({ selectedRow }) {
        return (
            <ReplayIcon
            className='prbuton'
            variant="contained"
            color='primary'
            onClick={() => {  
                 setOpen(true);
                 setEditData(selectedRow);
            }}/>
           
        )
    }

    function DeleteData({ selectedRow }) {
        return (
            <AssignmentIcon
            variant="contained"
            color='primary'
            onClick={() => {
                 setOpen2(true);
                 setEditData(selectedRow);
                }
              }/>
           
        )
    }

    useEffect(()=>{
        FetchShowReturnAssetService(handleFetchShowReturnAsset,handleFetchShowReturnAssetException);
    },[refresh])

    const handleFetchShowReturnAsset=(dataObject)=>{
        setLoading(false);
        setRows(dataObject.data);
    }
    const handleFetchShowReturnAssetException=()=>{

    }
  return (
    <div>
        <Grid container spacing={2} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
        style={{alignSelf:'center',textAlign:'center'}}
        >
            <h3>RETURN ASSET</h3>
        </Grid>
        
      </Grid>
      <hr/>
      <Grid container spacing={2} style={{marginTop:'20px',}} >
        <Grid xs={10} sm={10} md={10} lg={10} xl={10}
        style={{marginLeft:'5%',height:'350px'}}
        >
        <DataGrid 
                loading={loading}
                rows={rows}
                columns={columns} />
        </Grid>
      </Grid>
      <UserAssetReturn
        open={open}
        setOpen={setOpen}
        editData={editData}
        setRefresh={setRefresh}
      />
      <UserSelfAssessment
        open2={open2}
        setOpen2={setOpen2}
        editData={editData}
        setRefresh={setRefresh}
      />
    </div>
  )
}

export default UserReturnAssetList
