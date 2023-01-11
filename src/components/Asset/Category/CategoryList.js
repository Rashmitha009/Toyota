import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UnitList from './UnitList';
import ProjectList from './ProjectList'
import LineList from './LineList';
import ControlDepartmentList from './ControlDepartmentList';
import UserDepartmentList from './UserDepartmentList';
import AssetMasterList from './AssetMasterList';
import RequesterList from './RequesterList';
import OperationList from './Process/OperationList';

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
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const CategoryList = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
          variant='scrollable'
          visibleScrollbar={true}
          allowScrollButtonsMobile
          style={{overflow: 'auto',
          width:'89vw'
        }}
        >
          <Tab label="UNIT" {...a11yProps(0)} />
          <Tab label="PROJECT" {...a11yProps(1)} />
          <Tab label="LINE" {...a11yProps(2)} />
          <Tab label="CONTROL DEPARTMENT" {...a11yProps(3)} />
          <Tab label="USER DEPARTMENT" {...a11yProps(4)} />
          <Tab label="REQUESTER DEPARTMENT" {...a11yProps(5)} />
          <Tab label="ASSET MASTER " {...a11yProps(6)} />
          {/* <Tab label="PROCESS/OPERATION NO " {...a11yProps(7)} /> */}
        </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UnitList/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProjectList/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <LineList/>
        </TabPanel>
        <TabPanel value={value} index={3}>
       <ControlDepartmentList/>
        </TabPanel>
        <TabPanel value={value} index={4}>
         <UserDepartmentList/>
        </TabPanel>
        <TabPanel value={value} index={5}>
         <RequesterList/>
        </TabPanel>
        <TabPanel value={value} index={6}>
         <AssetMasterList/>
        </TabPanel>
        {/* <TabPanel value={value} index={7}>
         <OperationList/>
        </TabPanel> */}
      </Box>
    );
  }

export default CategoryList
