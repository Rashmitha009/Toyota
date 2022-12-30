import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import MaintenancePandingList from './MaintenancePandingList';
import MaintenanceAddList from './MaintenanceAddList';
import MaintenaceRejectList from './MaintenaceRejectList';
import MaintenanceClossList from './MaintenanceClossList';

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


const MaintenanceTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <h2 style={{marginLeft:'30px'}}>
        Maintenance Status
        </h2>
      </div>
    
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="APPORVED" {...a11yProps(0)} />
          <Tab label="PENDING" {...a11yProps(1)} />
          <Tab label="REJECTED" {...a11yProps(2)} />
          <Tab label="CLOSSED" {...a11yProps(3)} />
        
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <MaintenanceAddList/>                 
      </TabPanel>
      <TabPanel value={value} index={1}>
      <MaintenancePandingList/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MaintenaceRejectList/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MaintenanceClossList/>
      </TabPanel>
    </Box>
    </div>
  )
}

export default MaintenanceTab;