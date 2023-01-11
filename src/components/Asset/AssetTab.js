import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Transferasset from './Transferasset';
import Assetmaster from './Assetmaster'
import SectionList from './Section/SectionList';
import AssetTypeList from './AssetType/AssetTypeList';
import DepartmentList from './Department/DepartmentList';
import TagAssetModel from './TagAsset/TagAssetModel';
import AssetTabList from './asset/AssetTabList';
import ScrapAssetList from './ScrapAssetList';
import ApplicationStore from '../../utils/ApplicationStore';
import CategoryList from './Category/CategoryList'
import Masters from './Masters';

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
        <Box sx={{ p: 1 }}>
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


const AssetTab = () => {

  const [value, setValue] = useState(0);
  const [user ,setUser]=useState(false);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const {userDetails} = ApplicationStore().getStorage("userDetails");
    const {userRole} =userDetails;
    if(userRole==='Admin')
    {
      setUser(true);
    }
  }, []);

  return (
    <div>
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
          <Tab label="ASSET" {...a11yProps(0)} />
          {/* <Tab label="MASTERS" {...a11yProps(1)} /> */}
          {/* <Tab label="DEPARTMENT" {...a11yProps(1)} /> */}
          <Tab label="SECTION" {...a11yProps(1)} />
          <Tab label="ASSET TYPE" {...a11yProps(2)} />
          <Tab label="CATEGORY" {...a11yProps(3)} />
          {/* <Tab label="TAG ASSET" {...a11yProps(6)} /> */}
        {/* {
          user === true &&
          <Tab label="SCRAP ASSET" {...a11yProps(7)} />
        } */}
          <Tab label=" TRANSFER ASSET" {...a11yProps(4)} />
          {/* <Tab label="ASSET MASTER" {...a11yProps(9)} /> */}
        </Tabs>
      </Box>
      <TabPanel  value={value} index={0} >
       <AssetTabList/>     
      </TabPanel>
      {/* <TabPanel  value={value} index={1} >
       <Masters/>   
      </TabPanel> */}
      {/* <TabPanel value={value} index={1}>
      <DepartmentList />
      </TabPanel> */}
      <TabPanel value={value} index={1}>
       <SectionList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AssetTypeList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CategoryList/>
      </TabPanel>

      {/* <TabPanel value={value} index={6}>
        <TagAssetModel />
      </TabPanel> */}
      {/* <TabPanel value={value} index={7}>
        <ScrapAssetList />
      </TabPanel> */}
      <TabPanel value={value} index={4}>
        <Transferasset />
      </TabPanel>
      {/* <TabPanel value={value} index={9}>
        <Assetmaster />
      </TabPanel> */}
    </Box>
    </div>
  )
}

export default AssetTab;