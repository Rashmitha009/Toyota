import ApplicationStore from "../utils/ApplicationStore";

const _fetchServiceDownloadCsvData = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
  const { access_token, userDetails } = ApplicationStore().getStorage('userDetails');
  const END_POINT = 'https://varmatrix.com/AssetManagement/api/';
  const { email, userRole, companyCode } = userDetails;

  const headers = {
    'Content-Type': 'blob',
    authorization: `Bearer ${access_token}`,
    // companyCode: `${companyCode}`,
    userId: `${email}`, 
    // userRole: `${userRole}`,
    responseType: 'arraybuffer',
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

  let filename = 'Report.xlsx';

  return fetch(END_POINT + PATH, bodyObject)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      // const contentDisposition = response.headers.get('Content-Disposition');
      // filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
      // filename = fileName || 'Report.xlsx';
      console.log(response);
      return response.blob();
    })
    .then((dataResponse) => {
      successCallback(dataResponse);
      if (dataResponse != null) {
        const url = window.URL.createObjectURL(dataResponse);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Reports.xlsx';
        document.body.appendChild(a);
        a.click();
        // a.remove();
      }
    })
    .catch((error) => {
      error.errorObject.then((errorResponse) => {
        if (error.errorStatus === 401 && errorResponse.message === 'Unable to access the page, Token Expired') {
          ApplicationStore().clearStorage();
          /* eslint-disable-next-line */
          location.reload();
        }
        errorCallBack(error.errorStatus, errorResponse.message);
      });
    });
};

export const DownloadAlloction=(data, successCallback, errorCallBack) => {
    const { fromDate } = data;
    const { toDate } = data;
    return _fetchServiceDownloadCsvData(`allocation/export?=&fromDate=${fromDate}&toDate=${toDate}`, 'GET', {}, successCallback, errorCallBack);
  };

export const DownloadUntag=(data,successCallback, errorCallBack)=>{
  const { fromDate } = data;
  const { toDate } = data;
  return _fetchServiceDownloadCsvData(`untagAsset/export?=&fromDate=${fromDate}&toDate=${toDate}`, 'GET', {}, successCallback, errorCallBack);
};

export const DownloadAssetMaster=(data, successCallback, errorCallBack) => {
    return _fetchServiceDownloadCsvData(`assetMaster/${data}/export`, 'GET', {}, successCallback, errorCallBack);
};

export const DownloadScrapAsset=( successCallback, errorCallBack) => {
  return _fetchServiceDownloadCsvData('scrapAsset/export', 'GET', {}, successCallback, errorCallBack);
};

export const DownloadAmc=( successCallback, errorCallBack) => {
  return _fetchServiceDownloadCsvData('amc/export', 'GET', {}, successCallback, errorCallBack);
};

export const DownloadCertificate=( successCallback, errorCallBack) => {
  return _fetchServiceDownloadCsvData('certificate/export', 'GET', {}, successCallback, errorCallBack);
};

export const DownloadInsurance=( successCallback, errorCallBack) => {
  return _fetchServiceDownloadCsvData('insurance/export', 'GET', {}, successCallback, errorCallBack);
};

export const Downloadaudit=(data,fromDate, toDate,successCallback, errorCallBack) => {
 
  return _fetchServiceDownloadCsvData(`audit/${data}/export?=&fromDate=${fromDate}&toDate=${toDate}`, 'GET', {}, successCallback, errorCallBack);
};

export const DownloadTemplate=( successCallback, errorCallBack) => {
  return _fetchServiceDownloadCsvData('asset/template', 'GET', {}, successCallback, errorCallBack);
};


  
export const DownloadService=( successCallback, errorCallBack) => {
  return _fetchServiceDownloadCsvData('requestService/export', 'GET', {}, successCallback, errorCallBack);
};
