import React, { useEffect, useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { AllocationViewReturnAsset } from '../../services/ApiServices';
import { Grid } from '@mui/material';

const ReturnAssetList = () => {
    const [rows, setRows] = useState([]);
    const [loading,setLoading]=useState(true);
		
    const columns = [
        { field: 'assetId', headerName: 'Asset Id', width: 200 },
        { field: 'assetName', headerName: 'Returned Asset Name', width: 200 },
        { field: 'user', headerName: 'User Name', width: 200 },
        { field: 'returnedDate', headerName: ' Returned Date', width: 200 },
        
    ];

    useEffect(()=>{
        AllocationViewReturnAsset(handleAllocationViewReturnAsset,handleAllocationViewException);
    },[])
    const handleAllocationViewReturnAsset=(dataObject)=>{
        setLoading(false);
        setRows(dataObject.data);
    }
    const handleAllocationViewException=(errorStatus, errorMassege)=>{
        console.log(errorMassege);
    }

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
        </div>
    )
}

export default ReturnAssetList
