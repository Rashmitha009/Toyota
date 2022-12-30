import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import CertificateList from './CertificateList';
import CertificateRenewal from './CertificateRenewal';
import InspactionDueLis from './InspectionDueList';
import InspectionList from './InspectionList';

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

const Certificate = () => {
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
            <Tab label="Inspection" {...a11yProps(1)} />
            <Tab label="Inspection Due " {...a11yProps(2)} />
            <Tab label="Certificate Renewal" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CertificateList/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InspectionList/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <InspactionDueLis/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CertificateRenewal/>
        </TabPanel>
      </Box>
    </div>
  )
}

export default Certificate;
