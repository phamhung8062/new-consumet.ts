// import axios, { AxiosRequestConfig } from 'axios';

// function convertRequestToCurl(config: AxiosRequestConfig): string {
//   let curl = 'curl -X ' + (config.method?.toUpperCase() || 'GET');

//   const headers = config.headers;
//   if (headers) {
//     Object.entries(headers).forEach(([key, value]) => {
//       if (typeof value === 'object') {
//         Object.entries(value).forEach(([headerKey, headerValue]) => {
//           curl += ` -H "${headerKey}: ${headerValue}"`;
//         });
//       } else {
//         curl += ` -H "${key}: ${value}"`;
//       }
//     });
//   }
//   if (config.data) {
//     const dataStr = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data;
//     curl += ` -d '${dataStr}'`;
//   }

//   curl += ` "${config.url}"`;

//   return curl;
// }

// async function updateAxiosHeaders() {
//   try {
//     const response = await axios.post('http://167.99.236.43:8191/v1', {
//       cmd: "request.get",
//       url: "https://aniwave.to/ajax/server/list/FTmWDM4=?vrf=Hyx1KS81IGctFyMHLKN0Dt%3D%3D",
//       returnRawHtml: true,
//       maxTimeout: 1200000
//     }, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
    
//     const userAgent = response.data.solution.userAgent;
//     const cookiesString = response.data.solution.cookies.map((cookie: { name: any; value: any; }) => `${cookie.name}=${cookie.value}`).join('; ');
//     console.log('cookiesString', cookiesString)
//     return {
//       'User-Agent': userAgent,
//       'Cookie': cookiesString
//     };
//   } catch (error) {
//     console.error('Error updating axios headers:', error);
//     throw error;
//   }
// }
// let axiosInstance: any;
// let isInitialized = false; 

// async function initializeAxiosInstance() {
//   if (!isInitialized) {
//     const headers = await updateAxiosHeaders();
//     axiosInstance = axios.create({ headers });
//     axiosInstance.interceptors.request.use((config: AxiosRequestConfig<any>) => {
//       console.log(convertRequestToCurl(config));
//       return config;
//     });
  
//     axiosInstance.interceptors.response.use((response: { data: any; }) => {
//       // console.log('Response:', JSON.stringify(response.data, null, 2));
//       return response;
//     });
//     isInitialized = true; 
//   }
// }

// function getAxiosInstance() {
//   if (!axiosInstance) {
//     throw new Error('Axios instance has not been initialized. Please call initializeAxiosInstance first.');
//   }
//   return axiosInstance;
// }
// export { initializeAxiosInstance, getAxiosInstance };