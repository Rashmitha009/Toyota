import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';


const ProjectModel = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [departmentName,setDepartmentName]=useState("")
    const[description,setDescription]=useState("")

    const handleClose=()=>{
        setOpen(false);
    }
  return (
    <div>
    <div>
            <Dialog 
            open={open}
            onClose={handleClose}
            fullWidth
            >
                <form > 
                    <DialogTitle id="alert-dialog-title" style={{background:'whitesmoke'}}>
                      {"ADD PROJECT"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div>
                                <Grid container  style={{marginTop:'20px'}}>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                                     style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}}
                                    >
                                    <label >Project Name:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <TextField fullWidth 
                                        label=""
                                        variant="outlined"
                                        onChange={((e)=>{setDepartmentName(e.target.value)})}
                                        value={departmentName}
                                    />
                                    </Grid>
                                </Grid>

                                <Grid container  style={{marginTop:'20px'}}>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}
                                     style={{alignSelf:'center', textAlign:'center', marginTop:'20px'}}
                                    >
                                   <label>Description:</label>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <TextField 
                                        fullWidth
                                        multiline
                                        onChange={((e)=>{setDescription(e.target.value)})}
                                        value={description}
                                    />
                                    </Grid>
                                </Grid>
                                <div style={{marginLeft:'70%',marginTop:'20px'}}>
                             <Button type='reset' onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>
                                    {isAdd === true ? 'Add' : 'Update'}
                                </Button>
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </form>
            </Dialog>
           
        </div>
</div>
  )
}

export default ProjectModel
