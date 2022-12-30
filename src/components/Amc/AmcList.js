import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import AmcRenewalList from './AmcRenewalList';
import AmcService from './AmcService';
import AmcServiceDueList from './AmcServiceDueList';
import AmcServiceList from './AmcServiceList';

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
    id: `simple-tab-${index}`,'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AmcList = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label=" VENDER DETAILS " {...a11yProps(0)} />
            <Tab label="Service" {...a11yProps(1)} />
            <Tab label="Service Due" {...a11yProps(2)} />
            <Tab label="AMC Renewal" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AmcServiceList/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AmcService/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AmcServiceDueList/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AmcRenewalList/> 
        </TabPanel>
      </Box>
    </div>
  )
}

export default AmcList
