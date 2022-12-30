import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const AuditSyncList = () => {
  const [rows,setRows]=React.useState([])
  const columns = [
    { field: 'Scheduled Audit', headerName: 'Scheduled Audit', width: 200, },
    { field: 'Date', headerName: 'Date', width: 200 },
    { field: 'action', headerName: 'Action', width: 200 ,  sortable: false, }
  ];

  return (
    <div>
      <div>
        <h2>AUDIT SYNC</h2>
      </div>
      <hr/>
      <div>
        <DataGrid style={{height:'150px'}}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5]}
        onRowAdd/>
      </div>
      <div style={{marginTop:'20px'}}>
        <DataGrid style={{height:'150px'}}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5]}
        onRowAdd/>
      </div>
    </div>
  )
}

export default AuditSyncList
