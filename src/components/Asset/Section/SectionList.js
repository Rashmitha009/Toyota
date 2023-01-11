import  React , { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FetchSectionListService,SectionDeleteService} from '../../../services/ApiServices';
import SectionModel from '../Section/SectionModel'
import { FormControl,  InputLabel, MenuItem, Select } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationBar from '../../../services/NotificationBar';
import { Button, Grid } from '@mui/material';

const SectionList = () => {
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState('');
  const [refresh , setRefresh]=useState(false);
  const [loading , setLoading]= useState(true);
  const [departmentList, setDepartmentList] = useState([]);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
});


  const columns = [
    { field: 'id', headerName: 'Section No', 
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
    { field: 'department', headerName: 'Department',  
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center'},
    { field: 'section', headerName: 'Section',   
      minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'action', headerName: 'Action',   
      minWidth: 100, flex: 1, align: 'center', 
      headerAlign: 'center', sortable: false,
      cellClassname: 'actions',
      type: 'actions',
      getActions: (params) => [
        <EditData selectedRow={params.row} />,
        <DeleteData selectedRow={params.row} />,
      ],
    }
  ];
  
  useEffect(() => {

    FetchSectionListService(handleFetchSuccess, handleFetchException);

  }, [refresh]);
  
  const handleDepartmentSuccess = (dataObject) =>{
    setDepartmentList(dataObject.data || []);
    
  } 

  const handleDepartmentException = () =>{}
  const handleFetchSuccess = (dataObject) =>{
    setLoading(false);
    setRows(dataObject.data);
  }
  
  const handleFetchException = (errorStaus, errorMessage) =>{
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
        setOpen(true);}}/>
     
    )
  }

  function DeleteData({ selectedRow }) {
    return (
      <DeleteIcon
      variant="contained"
      color='primary'
      onClick={() => {
        deleteSection(selectedRow.id)
        }}/>
      
    )
  }

  function DepartmentList({ selectedRow }) {
    return (
      <FormControl style={{width:'250px' ,marginLeft:'55px'}}>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedRow.department}
        label="Select Department"
        inputProps={{ readOnly: true }}>
          {departmentList.map((data, index) => {
             return (
              <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    )
  }
  const deleteSection = (id) => {
    SectionDeleteService({id}, handleDeleteSuccess, handleDeleteException);
  }

  const handleDeleteSuccess = (dataObject) =>{
    console.log(dataObject);
    setRefresh(oldValue => !oldValue);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
  }

  const handleDeleteException = (errorObject, errorMessage) =>{
    console.log(errorMessage);
  }

  const handleModalOpen = () => {
    setIsAdd(true);
    setOpen(true);
  };
  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
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
                    <h3 style={{margin:'0px'}}>Section</h3>
                </Grid>
                <Grid item style={{}} >
                    <Button variant="contained" onClick={handleModalOpen}>
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
        <SectionModel
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            editData={editData}
            setRefresh={setRefresh}/> 
        <NotificationBar
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}
        />
    </div>
  )
}

export default SectionList
