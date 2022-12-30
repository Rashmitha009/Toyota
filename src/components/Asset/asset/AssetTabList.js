import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import Addlabel from './Addlabel';
import AddlabelList from './AddlabelList';
import Assetimport from './Assetimport';
import AssetList from './AssetList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
    return (
      <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography  >{children}</Typography>
          </Box>
        )}
        </div>
    );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const AssetTabList = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Add Asset" {...a11yProps(0)} />
              <Tab label="IMPORT " {...a11yProps(1)} />
              <Tab label="ADD LABEL" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel  value={value} index={0} >
          <AssetList/>     
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Assetimport />
          </TabPanel>
          <TabPanel value={value} index={2}> 
            <AddlabelList /> 
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
      
    </>
  )
}

export default AssetTabList
