import React, { useEffect, useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { AllocationViewReturnAsset } from '../../services/ApiServices';

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
            <form>
                <label style={{marginLeft:'500px'}}>View Asset</label>
                <hr/>
                <div style={{ height: '250px', width: '96%', marginLeft: '40px', marginTop: '20px' }}>
                    <DataGrid
                        loading={loading}
                        rows={rows}
                        columns={columns} 
                    />
                </div>
            </form>
        </div>
    )
}

export default ReturnAssetList
