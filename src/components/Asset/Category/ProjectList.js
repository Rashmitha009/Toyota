import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { Grid } from '@mui/material';
import ProjectModel from './ProjectModel';

const ProjectList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [loading , setLoading]=useState(true);
    const [refresh , setRefresh]=useState(false);
      
    const columns = [
      { field: 'id', headerName: 'Serial No', width: 200 },
      { field: 'employee_id', headerName: 'Project Name', width: 200 },
      { field: 'employee_name', headerName: 'Description', width: 200 },
      {field: 'action', headerName: 'Action', width: 200, sortable: false,
      cellClassname: 'actions',
      type: 'actions',
    
      }
  ];
  const handleModalOpen = () => {
    setIsAdd(true);
    setOpen(true);
  };
  
  return (
    <div>
    <div>
          <Grid container>
              <Grid xs={12} sm={6} md={6} lg={6} xl={6} style={{ alignSelf: 'center', textAlignLast: 'center', marginTop: '20px', }} >
                  <h3 >Project List</h3>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6} xl={6} style={{ alignSelf: 'center',  textAlignLast: 'center', marginTop: '20px',  }} >
                  <Button style={{width:'120px',height:'30px'}} variant="outlined" onClick={handleModalOpen} >
                    Add
                  </Button>
              </Grid>
          </Grid>
          <hr style={{ bottom: 'solid' }} />
          <div style={{ height: '350px', width: '85%', marginLeft: '5%', marginTop: '20px' }}>
              <DataGrid
              loading={loading}
              rows={rows}
              columns={columns} />
          </div>
      </div>
      <ProjectModel 
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            editData={editData}
            setRefresh={setRefresh}
            refresh={refresh}/>
  </div>
  )
}

export default ProjectList
