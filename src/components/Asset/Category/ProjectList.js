import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Grid ,Button } from '@mui/material';
import ProjectModel from './ProjectModel';

const ProjectList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [loading , setLoading]=useState(true);
    const [refresh , setRefresh]=useState(false);
      
    const columns = [
      { field: 'id', headerName: 'Serial No',  
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'employee_id', headerName: 'Project Name',  
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
      { field: 'employee_name', headerName: 'Description',  
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'action', headerName: 'Action',  
        minWidth: 100, flex: 1, align: 'center', headerAlign: 'center', sortable: false,
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
                  <h3 style={{margin:'0px'}}>Project List</h3>
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
