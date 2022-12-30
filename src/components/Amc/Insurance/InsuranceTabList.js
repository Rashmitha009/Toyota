import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import InsuranceDueList from './InsuranceDueList';
import InsuranceList from './InsuranceList';
import InsuranceRenewallList from './InsuranceRenewallList';

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
  

const InsuranceTabList = () => {
    const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Add Insurance" {...a11yProps(0)} />
            <Tab label="Insurance Due" {...a11yProps(1)} />
            <Tab label="Insurance Renewal" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <InsuranceList/>
        </TabPanel>
        <TabPanel value={value} index={1}>
         <InsuranceDueList/>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <InsuranceRenewallList/>
        </TabPanel>
      </Box>
    </div>
  )
}

export default InsuranceTabList
