import DashBoard from './dashBord/DashBoard'
import Login from './login/Login';
import {HashRouter as Router, Navigate, Outlet, Route,Routes, useNavigate,} from 'react-router-dom';
import Main from './components/mian/Main';
import AssetTab from './components/Asset/AssetTab';
import AuditTab from './components/Audit/AuditTab';
import { useEffect } from 'react';
import AmcTab from './components/Amc/AmcTab';
import MaintenanceTab from './components/Maintenance/MaintenanceTab';
import AllocationTab from './components/Allocation/AllocationTab';
import VenderAdd from './components/Vender/VenderAdd';
import UserList from './components/User/UserList';
import Servicedue from './components/DashboardItems/Servicedue';
import Tagassettable from './components/Asset/Tagassettable';
import Untagassettable from './components/Allocation/Untagassettable';
import MaintenanceSchedule from './components/MaintenanceSchedule/MaintenanceSchedule';
import MaintenanceSchedulList from './components/check/MaintenanceSchedulList';
import Certificate from './components/Amc/Certificate/Certificate';
import ServiceRequestList from './components/ServiceRequest/ServiceRequestList';
import InspectionDueList from './components/Amc/Certificate/InspectionDueList';
import WarrantyDue from './components/DashboardItems/WarrantyDue';
import InspectionDue from './components/DashboardItems/InspectionDue';
import Amcdue from './components/DashboardItems/Amcdue';
import CertificateDue from './components/DashboardItems/CertificateDue';
import Insurancedue from './components/DashboardItems/Insurancedue';
import Transferdue from './components/DashboardItems/Transferdue';
import Auditdue from './components/DashboardItems/Auditdue';
import Eol from './components/DashboardItems/Eol';
import Notinuse from './components/DashboardItems/Notinuse';
import Damage from './components/DashboardItems/Damage';
import Transfer from './components/DashboardItems/Transfer';
import Inservice from './components/DashboardItems/Inservice';
import Sale from './components/DashboardItems/Sale';
import Scrap from './components/DashboardItems/Scrap';
import UserAssetList from './components/UserModule/UserAssetList';
import UserMangaeServiceList from './components/UserModule/UserMangaeServiceList';
import UserReturnAssetList from './components/UserModule/UserReturnAssetList';
import UntageAssetList from './components/DashboardItems/UntageAssetList';
import WarrantyList from './components/Amc/WarrantyList';
import UnitList from './components/Asset/Category/UnitList';


function App() {
  // const navigate = useNavigate();
  // useEffect(()=>{
  //   const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  //   return !userDetails?.access_token? navigate('/login' ) : navigate('/main')
  // },[]);


  function ProtectedRoutes() {
    const navigate = useNavigate();
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    if (userDetails) {
      return !userDetails?.access_token? navigate('/login' ) : <Outlet />
    }
    
    return <Navigate replace to="/login" />;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/login"  element={<Login/>}/> 
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<DashBoard/>}>
            <Route path="/main" element={<Main/>}/>
            <Route path="/asset" element={<AssetTab />}/>
            <Route path='/unitList' element={<UnitList/>}/>
            <Route path='/audit' element={<AuditTab/>}/>
            <Route path='/amc' element={<AmcTab/>}/>
            <Route path='/maintenanceschedule' element={<MaintenanceSchedule/>}/>
            <Route path='/maintainceaproval' element={<MaintenanceSchedulList/>}/>
            <Route path='/maintaincestatus' element={<MaintenanceTab/>}/>
            <Route path='/alloction' element={<AllocationTab/>}/>
            <Route path='/servicerequest' element={<ServiceRequestList/>}/>
            <Route path='/vender' element={<VenderAdd/>}/>
            <Route path='/user' element={<UserList/>}/>
            <Route path='/logout' element={<MaintenanceTab/>}/>
            <Route path='/servicedue' element={<Servicedue/>}/>
            <Route path='/tagassettable' element={<Tagassettable/>}/>
            <Route path='/untagassettable' element={<Untagassettable/>}/>
            <Route path='/WarrantyDue' element={<WarrantyDue/>}/>
            <Route path='/amcTab' element={<AmcTab/>}/>
            <Route path='/maintenanceSchedulList' element={<MaintenanceSchedulList/>}/>
            <Route path='/certificate' element={<Certificate/>}/>
            <Route path='/InsepectionDueList' element={<InspectionDueList/>}/>
            <Route path='/InspectionDue' element={<InspectionDue/>}/>
            <Route path='/Amcdue' element={< Amcdue/>}/>
            <Route path='/CertificateDue' element={<CertificateDue/>}/>
            <Route path='/Insurancedue' element={<Insurancedue/>}/>
            <Route path='/Transferdue' element={<Transferdue/>}/>
            <Route path='/Auditdue' element={<Auditdue/>}/>
            <Route path='/Eol' element={<Eol/>}/>
            <Route path='/Notinuse' element={<Notinuse/>}/>
            <Route path='/Damage' element={<Damage/>}/>
            <Route path='/Transfer' element={<Transfer/>}/>
            <Route path='/Inservice' element={<Inservice/>}/>
            <Route path='/Sale' element={<Sale/>}/>
            <Route path='/Scrap' element={<Scrap/>}/>
            <Route path='/userAssetList' element={<UserAssetList/>}/>
            <Route path='/UserManageServiceList' element={<UserMangaeServiceList/>}/>
            <Route path='/UserRetureAsset' element={<UserReturnAssetList/>}/>
            <Route path='/UntageAssetList' element={<UntageAssetList/>}/>
            <Route path='/WarrantyList' element={<WarrantyList/>}/>
          </Route> 
        </Route>
      </Routes> 
    </Router>
  );
}

export default App;
