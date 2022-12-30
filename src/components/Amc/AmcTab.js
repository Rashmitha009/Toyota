import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import AmcList from './AmcList';
import Certificate from './Certificate/Certificate';
import WarrantyList from './WarrantyList.js';
import InsuranceTabList from './Insurance/InsuranceTabList';

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

const AmcTab = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="AMC SERVICE" {...a11yProps(0)} />
            <Tab label="CERTIFICATE" {...a11yProps(1)} />
            <Tab label="WARRANTY" {...a11yProps(2)} />
            <Tab label="INSURANCE" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AmcList/>      
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Certificate/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <WarrantyList/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <InsuranceTabList/>
        </TabPanel>
      </Box>
    </div>
  )
}

export default AmcTab;