import ApplicationStore from "../utils/ApplicationStore";

const successCaseCode = [200, 201];

const _fetchService = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
  const { access_token, userDetails } = ApplicationStore().getStorage('userDetails');
  const END_POINT = 'http://192.168.1.35:8000/api/';
  const { email } = userDetails;
  const { id } = userDetails;

  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${access_token}`,
    email: `${email}`,
    id:`${id}`,
  };
  const body = (serviceMethod === 'GET') || (serviceMethod === 'DELETE') ? {} : { body: JSON.stringify(data) };

  const bodyParameters = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers,
    ...body,
  };

  const bodyObject = {
    method: serviceMethod,
    ...bodyParameters,
  };

  return fetch(END_POINT + PATH, bodyObject)
  .then((response) => {
    if (successCaseCode.indexOf(response.status) > -1) {
       return response.json();
      }
      // eslint-disable-next-line no-throw-literal
      throw {
        errorStatus: response.status,
        errorObject: response.json(),
      };
    })

    .then((dataResponse) => successCallback(dataResponse))
    .catch((error) => {
      error.errorObject.then((errorResponse) => {
        if (error.errorStatus === 401 && errorResponse.message === 'Unable to access the page, Token Expired') {
          ApplicationStore().clearStorage();
          // eslint-disable-next-line
          // location.reload();
        }
        errorCallBack(error.errorStatus, errorResponse.message);
    } );
  });
};

export const LoginService = (data) => {
  const PATH = 'login';
  const END_POINT = 'http://192.168.1.35:8000/api/';
  const SERVICE_METHOD = 'POST';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return fetch(END_POINT + PATH, {
    method: SERVICE_METHOD,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
};

export const LogoutService = (successCallback, errorCallBack) => _fetchService('logout', 'POST', {}, successCallback, errorCallBack);

///........ common API........./////
export const FetchSectionService = (data,successCallback, errorCallBack) => _fetchService(`getSection/${data.id}`, 'GET', {}, successCallback, errorCallBack);

export const FetchAssetTypeService = (data,successCallback, errorCallBack) => _fetchService(`getAssetType/${data.id}`, 'GET', {}, successCallback, errorCallBack);

export const FetchAssetNameService = (data,successCallback, errorCallBack) => _fetchService(`getAssetName/${data.id}`, 'GET', {}, successCallback, errorCallBack);

export const FetchVenderDataService = (data,successCallback, errorCallBack) => _fetchService(`getVendorData/${data.id}`, 'GET', {}, successCallback, errorCallBack);

export const FetchAsstTransferService = (data,successCallback, errorCallBack) => _fetchService(`transferAsset/${data.id}`, 'POST', data, successCallback, errorCallBack);

export const FetchEmployeeIdService = (successCallback, errorCallBack) => _fetchService('allocation/getEmpId', 'GET', {}, successCallback, errorCallBack);

export const FetchEmployeeNameService = (data,successCallback, errorCallBack) => _fetchService(`allocation/${data.id}/getEmpName`, 'POST', data, successCallback, errorCallBack);

export const FetchUserNameService = (data,successCallback, errorCallBack) => _fetchService(`allocation/${data.id}/getUser`, 'GET', {}, successCallback, errorCallBack);

export const FetchCountService = (successCallback, errorCallBack) => _fetchService('getCount', 'GET', {}, successCallback, errorCallBack);

export const FetcTagAssetShowData = (successCallback, errorCallBack) => _fetchService('tagAsset/showData', 'GET', {}, successCallback, errorCallBack);


////.........Category Unit...../////
export const UnitAddService = (data, successCallback, errorCallBack) => _fetchService('unit/add', 'POST', data, successCallback, errorCallBack);

export const UnitUpdateService = (data, successCallback, errorCallBack) => _fetchService(`unit/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const UnitDeleteService = (data, successCallback, errorCallBack) => _fetchService(`unit/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const FetchUnitService = (successCallback, errorCallBack) => _fetchService('unit/showData', 'GET', {}, successCallback, errorCallBack);

////.........Category Project...../////

export const ProjectAddService = (data, successCallback, errorCallBack) => _fetchService('project/add', 'POST', data, successCallback, errorCallBack);

export const ProjectUpdateService = (data, successCallback, errorCallBack) => _fetchService(`project/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const ProjectDeleteService = (data, successCallback, errorCallBack) => _fetchService(`project/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const FetchProjectService = (successCallback, errorCallBack) => _fetchService('project/showData', 'GET', {}, successCallback, errorCallBack);

////.........Category Line...../////

export const LineAddService = (data, successCallback, errorCallBack) => _fetchService('line/add', 'POST', data, successCallback, errorCallBack);

export const LineUpdateService = (data, successCallback, errorCallBack) => _fetchService(`line/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const LineDeleteService = (data, successCallback, errorCallBack) => _fetchService(`line/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const FetchLineService = (successCallback, errorCallBack) => _fetchService('line/showData', 'GET', {}, successCallback, errorCallBack);

////.........Category Control Department...../////

export const ControlDepartmentAddService = (data, successCallback, errorCallBack) => _fetchService('controlDepartment/add', 'POST', data, successCallback, errorCallBack);

export const ControlDepartmentUpdateService = (data, successCallback, errorCallBack) => _fetchService(`controlDepartment/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const ControlDepartmentDeleteService = (data, successCallback, errorCallBack) => _fetchService(`controlDepartment/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const FetchControlDepartmentService = (successCallback, errorCallBack) => _fetchService('controlDepartment/showData', 'GET', {}, successCallback, errorCallBack);

////.........Category Asset Master...../////

export const AssetMasterAddService = (data, successCallback, errorCallBack) => _fetchService('assetMaster/add', 'POST', data, successCallback, errorCallBack);

export const AssetMasterUpdateService = (data, successCallback, errorCallBack) => _fetchService(`assetMaster/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const AssetMasterDeleteService = (data, successCallback, errorCallBack) => _fetchService(`assetMaster/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const FetchAssetmasterService = (successCallback, errorCallBack) => _fetchService('assetMaster/showData', 'GET', {}, successCallback, errorCallBack);

// // --------- User--------------//
export const FetchUserService = (successCallback, errorCallBack) => _fetchService('user/showData', 'GET', {}, successCallback, errorCallBack);

export const FetchDepaertmentService = (successCallback, errorCallBack) => _fetchService('department/showData', 'GET', {}, successCallback, errorCallBack);

export const UserAddService = (data, successCallback, errorCallBack) => _fetchService('user/add', 'POST', data, successCallback, errorCallBack);

export const UserUpdateService = (data, successCallback, errorCallBack) => _fetchService(`user/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const UserDeleteService = (data, successCallback, errorCallBack) => _fetchService(`user/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const FetchUserIdService = (successCallback, errorCallBack) => _fetchService('user/empId', 'GET', {}, successCallback, errorCallBack);

// //...........vender...........////
export const FetchVendorService = (successCallback, errorCallBack) => _fetchService('vendor/showData', 'GET', {}, successCallback, errorCallBack);

export const FetchVendorTypeService = (successCallback, errorCallBack) => _fetchService('vendorType/showData', 'GET', {}, successCallback, errorCallBack);

export const VendorAddService = (data, successCallback, errorCallBack) => _fetchService('vendor/add', 'POST', data, successCallback, errorCallBack);

export const VendorUpdateService = (data, successCallback, errorCallBack) => _fetchService(`vendor/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const VendorDeleteService = (data, successCallback, errorCallBack) => _fetchService(`vendor/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

// //...........vender...........////

export const FetchVendorTypeListService = (successCallback, errorCallBack) => _fetchService('vendorType/showData', 'GET', {}, successCallback, errorCallBack);

export const VendorTypeAddService = (data, successCallback, errorCallBack) => _fetchService('vendorType/add', 'POST', data, successCallback, errorCallBack);

export const VendorTypeUpdateService = (data, successCallback, errorCallBack) => _fetchService(`vendorType/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const VendorTypeDeleteService = (data, successCallback, errorCallBack) => _fetchService(`vendorType/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

// //...........Requested Service...........////

export const FetchRequestedService = (successCallback, errorCallBack) => _fetchService('vendorType/showData', 'GET', {}, successCallback, errorCallBack);

///.........Asset........////

export const  FetchAssetListService = (successCallback, errorCallBack) => _fetchService('asset/showData', 'GET', {}, successCallback, errorCallBack);

export const  FetchVenderService = (successCallback, errorCallBack) => _fetchService('getVendor', 'GET', {}, successCallback, errorCallBack);

export const  FetchAssetIdService = (successCallback, errorCallBack) => _fetchService('asset/assetId', 'GET', {}, successCallback, errorCallBack);

export const  AssetAddService = (data, successCallback, errorCallBack) => _fetchService('asset/add', 'POST', data, successCallback, errorCallBack);

export const  AssetUpdateService = (data, successCallback, errorCallBack) => _fetchService(`asset/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const  AssetDeleteService = (data, successCallback, errorCallBack) => _fetchService(`asset/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const  FetchAssetLableService = (successCallback, errorCallBack) => _fetchService('label/showData', 'GET', {}, successCallback, errorCallBack);

export const  FetchSelectAssetIdService = (successCallback, errorCallBack) => _fetchService('tagAsset/selectAssetId', 'GET', {}, successCallback, errorCallBack);

export const  FetchIdAssetIdService = (data,successCallback, errorCallBack) => _fetchService(`tagAsset/${data.id}/getAssetId`, 'GET', data, successCallback, errorCallBack);

export const  FetchAssetMasterService = (data,successCallback, errorCallBack) => _fetchService(`assetMaster/${data.id}/showData`, 'GET', {}, successCallback, errorCallBack);

export const  AssetLabelAddService = (data, successCallback, errorCallBack) => _fetchService('label/add', 'POST', data, successCallback, errorCallBack);

export const  AssetShowLabelService = (data, successCallback, errorCallBack) => _fetchService(`label/${data.id}/showLabel`, 'GET', {}, successCallback, errorCallBack);

export const  AssetLabelDeletService = (data, successCallback, errorCallBack) => _fetchService(`label/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);



////....Department..../////

export const  FetchDepartmentListService = (successCallback, errorCallBack) => _fetchService('department/showData', 'GET', {}, successCallback, errorCallBack);

export const DepartmentAddService = (data, successCallback, errorCallBack) => _fetchService('department/add', 'POST', data, successCallback, errorCallBack);

export const DepartmentUpdateService = (data, successCallback, errorCallBack) => _fetchService(`department/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const DepartmentDeleteService = (data, successCallback, errorCallBack) => _fetchService(`department/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);


///...........Section........////

export const  FetchSectionListService = (successCallback, errorCallBack) => _fetchService('section/showData', 'GET', {}, successCallback, errorCallBack);

export const SectionAddService = (data, successCallback, errorCallBack) => _fetchService('section/add', 'POST', data, successCallback, errorCallBack);

export const SectionUpdateService = (data, successCallback, errorCallBack) => _fetchService(`section/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const SectionDeleteService = (data, successCallback, errorCallBack) => _fetchService(`section/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

////..........Assettype........////

export const  FetchAssetTypeListService = (successCallback, errorCallBack) => _fetchService('assetType/showData', 'GET', {}, successCallback, errorCallBack);

export const AssetTypeAddService = (data, successCallback, errorCallBack) => _fetchService('assetType/add', 'POST', data, successCallback, errorCallBack);

export const AssetTypeUpdateService = (data, successCallback, errorCallBack) => _fetchService(`assetType/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const AssettypeDeleteService = (data, successCallback, errorCallBack) => _fetchService(`assetType/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const AssetImportService = (data, successCallback, errorCallBack) => _fetchService('asset/import', 'POST', data, successCallback, errorCallBack);



/////........TagAsset....../////

export const  FetchTagAssetListService = (successCallback, errorCallBack) => _fetchService('tagasset/showData', 'GET', {}, successCallback, errorCallBack);

export const TagAssetAddService = (data, successCallback, errorCallBack) => _fetchService('tagasset/add', 'POST', data, successCallback, errorCallBack);

export const TagAssetUpdateService = (data, successCallback, errorCallBack) => _fetchService(`tagasset/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const TagAssetDeleteService = (data, successCallback, errorCallBack) => _fetchService(`tagasset/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const  FetchTagAssetRfIdService = (successCallback, errorCallBack) => _fetchService('tagAsset/rfid', 'GET', {}, successCallback, errorCallBack);

export const  FetchTagAssetIdService = (data,successCallback, errorCallBack) => _fetchService('tagAsset/add', 'POST', data, successCallback, errorCallBack);

////..........Audit........////
export const  FetchAuditListService = (successCallback, errorCallBack) => _fetchService('audit/showData', 'GET', {}, successCallback, errorCallBack);

export const  FetchAuditSectionService = (data,successCallback, errorCallBack) => _fetchService(`audit/${data.id}/getSection`, 'GET', {}, successCallback, errorCallBack);

export const  FetchAuditAssetTypeService = (data,successCallback, errorCallBack) => _fetchService(`audit/${data.id}/getAssetType`, 'GET', {}, successCallback, errorCallBack);

export const  AuditAddService = (data, successCallback, errorCallBack) => _fetchService('audit/add', 'POST', data, successCallback, errorCallBack);

export const  AuditUpdateService = (data, successCallback, errorCallBack) => _fetchService(`audit/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const AuditDeleteService = (data, successCallback, errorCallBack) => _fetchService(`audit/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const ViewAuditReportService = (data, successCallback, errorCallBack) => _fetchService(`audit/${data.id}/viewAuditReport`, 'POST', data, successCallback, errorCallBack);

///..........Amc.........//// 
export const  FetchAmcServiceListService = (successCallback, errorCallBack) => _fetchService('amc/showData', 'GET', {}, successCallback, errorCallBack);

export const AmcServiceAddService = (data, successCallback, errorCallBack) => _fetchService('amc/add', 'POST', data, successCallback, errorCallBack);

export const AmcServiceUpdateService = (data, successCallback, errorCallBack) => _fetchService(`amc/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const AmcServiceDeleteService = (data, successCallback, errorCallBack) => _fetchService(`amc/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const AssetTypeDeleteService = (data, successCallback, errorCallBack) => _fetchService(`assetType/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const  AMCServiceDueListService = (data,successCallback, errorCallBack) => _fetchService(`amc/${data.id}/serviceDue`, 'POST', data, successCallback, errorCallBack);

export const  ViewAmcService = (data,successCallback, errorCallBack) => _fetchService(`amc/${data.id}/showService`, 'GET', {}, successCallback, errorCallBack);

export const  ViewAmcRenewal = (successCallback, errorCallBack) => _fetchService('amc/viewAmcRenewal', 'GET', {}, successCallback, errorCallBack);

export const  ViewAmcServiceService = (data,successCallback, errorCallBack) => _fetchService(`amc/${data.id}/showData1`, 'GET', {}, successCallback, errorCallBack);

export const  AMCrenewalAmc = (data,successCallback, errorCallBack) => _fetchService(`amc/${data.id}/renewalAmc`, 'POST', data, successCallback, errorCallBack);

/////........Certificate................./////

export const CertificateAddService = (data, successCallback, errorCallBack) => _fetchService('certificate/add', 'POST', data, successCallback, errorCallBack);

export const FetchCertificateService = (successCallback, errorCallBack) => _fetchService('certificate/showData', 'GET', {}, successCallback, errorCallBack);

export const CertificateUpdateService = (data, successCallback, errorCallBack) => _fetchService(`certificate/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const CertificateDeleteService = (data, successCallback, errorCallBack) => _fetchService(`certificate/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const ViewInspection = (data,successCallback, errorCallBack) => _fetchService(`certificate/${data.id}/showInspection`, 'GET', {}, successCallback, errorCallBack);

export const ViewCertificateRenewal = (successCallback, errorCallBack) => _fetchService('certificate/viewCertificateRenewal', 'GET', {}, successCallback, errorCallBack);

export const ViewCertificateService = (data,successCallback, errorCallBack) => _fetchService(`certificate/${data.id}/showData1`, 'GET', {}, successCallback, errorCallBack);

export const  ViewRenewalCertificate = (data,successCallback, errorCallBack) => _fetchService(`certificate/${data.id}/renewalCertificate`, 'POST', data, successCallback, errorCallBack);


////.......Insurance....//////

export const InsuranceAddService = (data, successCallback, errorCallBack) => _fetchService('insurance/add', 'POST', data, successCallback, errorCallBack);

export const FetchInsuranceService = (successCallback, errorCallBack) => _fetchService('insurance/showData', 'GET', {}, successCallback, errorCallBack);

export const InsuranceUpdateService = (data, successCallback, errorCallBack) => _fetchService(`insurance/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const InsuranceDeleteService = (data, successCallback, errorCallBack) => _fetchService(`insurance/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const ViewInsuranceRenewal = (successCallback, errorCallBack) => _fetchService('insurance/viewInsuranceRenewal', 'GET', {}, successCallback, errorCallBack);

export const  InsuranceDueListService = (data,successCallback, errorCallBack) => _fetchService(`insurance/${data.id}/insuranceDue`, 'POST', data, successCallback, errorCallBack);

/////........Warrenty.........///////

export const  FetchWarrantyService = (data,successCallback, errorCallBack) => _fetchService('warranty/showData', 'POST', data, successCallback, errorCallBack);

export const  ViewWarranty = (data,successCallback, errorCallBack) => _fetchService(`warranty/${data.id}/viewAsset`, 'GET', {}, successCallback, errorCallBack);

///.........Maintenance......./////

export const MaintenanceAddService = (data, successCallback, errorCallBack) => _fetchService('maintenance/add', 'POST', data, successCallback, errorCallBack);

export const  FetchMachineService = (successCallback, errorCallBack) => _fetchService('getMachine', 'GET', {}, successCallback, errorCallBack);

export const  FetchGetMaintenanceId = (successCallback, errorCallBack) => _fetchService('maintenance/getMaintenanceId', 'GET', {}, successCallback, errorCallBack);

export const  FetchMaintenanceSchedule = (data,successCallback, errorCallBack) => _fetchService(`maintenance/${data.id}/showStatus`, 'POST',data, successCallback, errorCallBack);

export const  MaintenanceUpdateAction = (data,successCallback, errorCallBack) => _fetchService(`maintenance/${data.id}/updateAction`, 'POST',data, successCallback, errorCallBack);


/////.......Check.....///

export const  FetchMaintenanceService = (successCallback, errorCallBack) => _fetchService('maintenance/showData', 'GET', {}, successCallback, errorCallBack);

///..........Maintenance Status.......//////

export const  FetchMaintenanceApprovedService = (successCallback, errorCallBack) => _fetchService('maintenance/aprovedShowData', 'GET', {}, successCallback, errorCallBack);

export const  FetchMaintenanceStatusAprovedService = (successCallback, errorCallBack) => _fetchService('maintenance/aprovedShowData', 'GET', {}, successCallback, errorCallBack);

export const  FetchMaintenancePendingShowDataService = (successCallback, errorCallBack) => _fetchService('maintenance/pendingShowData', 'GET', {}, successCallback, errorCallBack);

export const  FetchMaintenanceRejectedShowDataService = (successCallback, errorCallBack) => _fetchService('maintenance/rejectedShowData', 'GET', {}, successCallback, errorCallBack);

export const  FetchMaintenanceShowClosedMaintenanceService = (successCallback, errorCallBack) => _fetchService('maintenance/showClosedMaintenance', 'GET', {}, successCallback, errorCallBack);

////...........Allocation........//////

export const AlloctionAddService = (data, successCallback, errorCallBack) => _fetchService('allocation/add', 'POST', data, successCallback, errorCallBack);

export const AlloctionViewService = (data, successCallback, errorCallBack) => _fetchService('allocation/showData', 'POST', data, successCallback, errorCallBack);

export const AlloctionExportService = (data, successCallback, errorCallBack) => _fetchService('allocation/export', 'POST', data, successCallback, errorCallBack);

export const  FetchAllocationShowRequestReturnAsset = (successCallback, errorCallBack) => _fetchService('allocation/showRequestReturnAsset', 'GET', {}, successCallback, errorCallBack);

export const UpdateRequestedReturnAsset = (data, successCallback, errorCallBack) => _fetchService(`allocation/${data.id}/updateRequestedReturnAsset`, 'POST', data, successCallback, errorCallBack);

export const  AllocationViewReturnAsset= (successCallback, errorCallBack) => _fetchService('allocation/viewReturnAsset', 'GET', {}, successCallback, errorCallBack);

export const  AllocationViewSelfAssessment= (successCallback, errorCallBack) => _fetchService('allocation/viewSelfAssessment', 'GET', {}, successCallback, errorCallBack);



///...........UNTAG......////
export const UntagAssetService = (data, successCallback, errorCallBack) => _fetchService(`untagAsset/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const UntagAssetViewService = (data, successCallback, errorCallBack) => _fetchService('untagAsset/showData', 'POST', data, successCallback, errorCallBack);

export const AlloctionUntageUpdate = (data, successCallback, errorCallBack) => _fetchService(`untagAsset/${data.id}/untagUpdate`, 'POST', data, successCallback, errorCallBack);


////.........Scrap............////

export const ScrapAssetAddService = (data, successCallback, errorCallBack) => _fetchService('scrapAsset/add', 'POST', data, successCallback, errorCallBack);

export const  FetchScrapAssetShowDataService = (successCallback, errorCallBack) => _fetchService('scrapAsset/showData', 'GET', {}, successCallback, errorCallBack);



/////.......Request Service......//////


export const  FetchServiceRequestService = (successCallback, errorCallBack) => _fetchService('requestService/showData', 'GET', {}, successCallback, errorCallBack);

// export const  ViewRequestService = (data,successCallback, errorCallBack) => _fetchService(`requestService/${data.id}/showData1`, 'GET', {}, successCallback, errorCallBack);

export const RequestServiceAdd = (data, successCallback, errorCallBack) => _fetchService(`requestService/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const UpdateServiceStatus = (data,successCallback, errorCallBack) => _fetchService(`requestService/${data.id}/updateServiceStatus`, 'POST',  successCallback, errorCallBack);

export const ShowServiceRequest  = (data, successCallback, errorCallBack) => _fetchService(`requestService/${data.id}/showData1`, 'GET', {}, successCallback, errorCallBack);


/////.......DashBord count..../////

export const AssetsCountService = (successCallback, errorCallBack) => _fetchService('assetsCount', 'POST', {}, successCallback, errorCallBack);

export const TagAssetsCountService = (successCallback, errorCallBack) => _fetchService('tagAssetsCount', 'POST', {}, successCallback, errorCallBack);

export const UntagCountService = (successCallback, errorCallBack) => _fetchService('untagCount', 'POST', {}, successCallback, errorCallBack);

export const WarrantyDueCountService = (successCallback, errorCallBack) => _fetchService('warrantyDueCount', 'POST', {}, successCallback, errorCallBack);

export const AmcDueCountService = (successCallback, errorCallBack) => _fetchService('amcDueCount', 'POST', {}, successCallback, errorCallBack);

export const CertificateDueCountService = (successCallback, errorCallBack) => _fetchService('certificateDueCount', 'POST', {}, successCallback, errorCallBack);

export const InsuranceDueCountService = (successCallback, errorCallBack) => _fetchService('insuranceDueCount', 'POST', {}, successCallback, errorCallBack);

export const AuditDueCountService = (successCallback, errorCallBack) => _fetchService('auditDueCount', 'POST', {}, successCallback, errorCallBack);

export const EolCountService = (successCallback, errorCallBack) => _fetchService('eolCount', 'POST', {}, successCallback, errorCallBack);

export const DamageCountService = (successCallback, errorCallBack) => _fetchService('damageCount', 'POST', {}, successCallback, errorCallBack);

export const SalesCountService = (successCallback, errorCallBack) => _fetchService('salesCount', 'POST', {}, successCallback, errorCallBack);

export const InServiceCountService = (successCallback, errorCallBack) => _fetchService('inServiceCount', 'POST', {}, successCallback, errorCallBack);

export const ScrapCountService = (successCallback, errorCallBack) => _fetchService('scrapCount', 'POST', {}, successCallback, errorCallBack);

export const TransferCountService = (successCallback, errorCallBack) => _fetchService('transferCount', 'POST', {}, successCallback, errorCallBack);


////.........DashboardItems...........///

export const  ViewWarrantyDue = (successCallback, errorCallBack) => _fetchService('warrantyDue/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewAmcDue = (successCallback, errorCallBack) => _fetchService('amcDue/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewCertificateDue = (successCallback, errorCallBack) => _fetchService('certificateDue/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewAuditDue = (successCallback, errorCallBack) => _fetchService('auditDue/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewEol = (successCallback, errorCallBack) => _fetchService('eol/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewDamage = (successCallback, errorCallBack) => _fetchService('damage/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewTransfer = (successCallback, errorCallBack) => _fetchService('transfer/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewSales = (successCallback, errorCallBack) => _fetchService('sales/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewNotInuse = (successCallback, errorCallBack) => _fetchService('notInuse/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewTransferDue = (successCallback, errorCallBack) => _fetchService('transferDue/showData', 'GET', {}, successCallback, errorCallBack);

export const  ViewUntagAsset = (successCallback, errorCallBack) => _fetchService('untagAsset/showData', 'GET', {}, successCallback, errorCallBack);

//////..........user Model.......////

export const  FetchUserAllocationService = (successCallback, errorCallBack) => _fetchService('um/showAsset', 'GET', {}, successCallback, errorCallBack);

export const  FetchUserGetAssetNameService = (successCallback, errorCallBack) => _fetchService('um/getAssetName', 'GET', {}, successCallback, errorCallBack);

export const  FetchUserGetShowStatusService = (data,successCallback, errorCallBack) => _fetchService(`um/${data.id}/showStatus`, 'GET', {}, successCallback, errorCallBack);

export const  FetchViewServiceRequesService = (successCallback, errorCallBack) => _fetchService('um/viewServiceRequest', 'GET', {}, successCallback, errorCallBack);

export const  FetchAddRequesService = (data,successCallback, errorCallBack) => _fetchService('um/add', 'POST', data, successCallback, errorCallBack);

export const  FetchShowReturnAssetService = (successCallback, errorCallBack) => _fetchService('um/showReturnAsset', 'GET', {}, successCallback, errorCallBack);

export const  FetchUpdateReturnAssetService = (data,successCallback, errorCallBack) => _fetchService(`um/${data.id}/updateReturnAsset`, 'POST', data, successCallback, errorCallBack);

export const  FetchUpdateSelfAssessmentService = (data,successCallback, errorCallBack) => _fetchService(`um/${data.id}/updateSelfAssessment`, 'POST', data, successCallback, errorCallBack);

////////.......AMC........////


export const UpdateAmc = (data,successCallback, errorCallBack) => _fetchService(`amc/${data.id}/updateServiceDate`, 'POST',  successCallback, errorCallBack);

export const UpdateCertificate = (data,successCallback, errorCallBack) => _fetchService(`certificate/${data.id}/updateInspectionDate`, 'POST',  successCallback, errorCallBack);


