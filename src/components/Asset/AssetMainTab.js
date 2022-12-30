import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SectionList from './Section/SectionList';
import AssetTypeList from './AssetType/AssetTypeList';
import DepartmentList from './Department/DepartmentList';
import TagAssetModel from './TagAsset/TagAssetModel';
import AssetTabList from './asset/AssetTabList';
import ScrapAssetList from './ScrapAssetList';
import Transferasset from './Transferasset';
import Assetmaster from './Assetmaster'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
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

  const AssetMainTab  = () => {
   
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  return (
    <div>
       <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="ASSET" {...a11yProps(0)} />
          <Tab label="DEPARTMENT" {...a11yProps(1)} />
          <Tab label="SECTION" {...a11yProps(2)} />
          <Tab label="ASSET TYPE" {...a11yProps(3)} />
          <Tab label="TAG ASSET" {...a11yProps(4)} />

          <Tab label="SCRAP ASSET" {...a11yProps(5)} />
          <Tab label=" TRANSFER ASSET" {...a11yProps(6)} />
          <Tab label="ASSET MASTER" {...a11yProps(7)} />
        </Tabs>
      </Box>
      <TabPanel  value={value} index={0} >
       <AssetTabList/>     
      </TabPanel>
      <TabPanel value={value} index={1}>
      <DepartmentList />
     
      </TabPanel>
      <TabPanel value={value} index={2}>
       <SectionList />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <AssetTypeList />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TagAssetModel/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ScrapAssetList/>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Transferasset />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Assetmaster />
      </TabPanel>
    </Box>
    </div>
  )
}

export default AssetMainTab 
