import React,{useState,useEffect} from 'react'
import { Button, Grid, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';

const Masters = () => {
    return (
        <div>
            <Grid container spacing={2} style={{marginTop:'5px'}}>
                <Grid item xs={12} sm={3} md={3} lg={2} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <label >Unit :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2} xl={3}>
                    <TextField
                    fullWidth 
                    id="outlined-basic" 
                    label="" 
                    variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <Button variant="contained">Save</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}} >  
                    <Button variant="contained">Inactive</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop:'5px'}}>
                <Grid item xs={12} sm={3} md={3} lg={2} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <label >Project :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2} xl={3}>
                    <TextField
                    fullWidth 
                    id="outlined-basic" 
                    label="" 
                    variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <Button variant="contained">Save</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}} >  
                    <Button variant="contained">Inactive</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop:'5px'}}>
                <Grid item xs={12} sm={3} md={3} lg={2} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <label >Department :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2} xl={3}>
                    <TextField
                    fullWidth 
                    id="outlined-basic" 
                    label="" 
                    variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <Button variant="contained">Save</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}} >  
                    <Button variant="contained">Inactive</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop:'5px'}}>
                <Grid item xs={12} sm={3} md={3} lg={2} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <label >Section :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2} xl={3}>
                    <TextField
                    fullWidth 
                    id="outlined-basic" 
                    label="" 
                    variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <Button variant="contained">Save</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}} >  
                    <Button variant="contained">Inactive</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop:'5px'}}>
                <Grid item xs={12} sm={3} md={3} lg={2} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <label >Lines :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2} xl={3}>
                    <TextField
                    fullWidth 
                    id="outlined-basic" 
                    label="" 
                    variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <Button variant="contained">Save</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}} >  
                    <Button variant="contained">Inactive</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop:'5px'}}>
                <Grid item xs={12} sm={3} md={3} lg={2} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <label >Usage Code :</label>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2} xl={3}>
                    <TextField
                    fullWidth 
                    id="outlined-basic" 
                    label="" 
                    variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}}>
                    <Button variant="contained">Save</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={1} xl={3} style={{alignSelf:'center',textAlign:'center'}} >  
                    <Button variant="contained">Inactive</Button>
                </Grid>
            </Grid>
        </div>
  )
}

export default Masters
