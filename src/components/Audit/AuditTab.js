import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import AuditList from './AuditList';
import ViewAuditReport from './ViewAuditReport';

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


const AuditTab = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label=" AUDIT ASSET" {...a11yProps(0)} />
          <Tab label="VIEW AUDIT REPORT" {...a11yProps(1)} /> 
        </Tabs>
      </Box>
      <TabPanel  value={value} index={0} >
      <div> 
        <AuditList/>
       </div>   
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ViewAuditReport/>
      </TabPanel>
    </Box>
    </div>
  )
}

export default AuditTab;