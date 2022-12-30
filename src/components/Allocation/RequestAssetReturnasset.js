import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import RequestReturnAssetList from './RequestReturnAssetList';
import ReturnAssetList from './ReturnAssetList';

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
            <Typography>{children}</Typography>
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

  const RequestAssetReturnasset = () => {
    const [value, setValue] = useState(0);
    const handleChange = (e, newValue) => {
    setValue(newValue);
  };    
    
  return (
    <div>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label=" Requested Return Asset " {...a11yProps(0)} />
              <Tab label="Return Asset" {...a11yProps(1)} />
            </Tabs>
          </Box>
           <TabPanel value={value} index={0}>
            <RequestReturnAssetList/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ReturnAssetList/>
          </TabPanel>
        </Box>
      </Grid>
    </div>
  )
}

export default RequestAssetReturnasset
