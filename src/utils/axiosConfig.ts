import axios, { AxiosRequestConfig } from 'axios';

// Hàm chuyển đổi Axios Request Config sang CURL command
function convertRequestToCurl(config: AxiosRequestConfig): string {
  let curl = 'curl -X ' + (config.method?.toUpperCase() || 'GET');

  // Duyệt và thêm headers
  const headers = config.headers;
  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      if (typeof value === 'object') {
        // Đối với các trường headers là object, duyệt qua các key-value và log
        Object.entries(value).forEach(([headerKey, headerValue]) => {
          curl += ` -H "${headerKey}: ${headerValue}"`;
        });
      } else {
        // Đối với headers không phải object, log trực tiếp
        curl += ` -H "${key}: ${value}"`;
      }
    });
  }

  // Thêm data nếu có
  if (config.data) {
    // Chuyển đổi data object thành chuỗi JSON nếu cần
    const dataStr = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data;
    curl += ` -d '${dataStr}'`;
  }

  // Thêm URL
  curl += ` "${config.url}"`;

  return curl;
}

const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    // 'Accept-Language': 'en-US',
    // 'Accept-Encoding': 'gzip, deflate, br', 
    'Connection': 'keep-alive',
    'authority': 'aniwave.to',
    'sec-ch-ua-mobile': '?0',
    'Content-Type': 'application/json',
    'sec-ch-ua-platform': '"Windows"',
    'Cookie': 'cf_clearance=pA6RZjYw9jw9Mi11Vu40.CAhJPUdcAVSnkMFq9qhZLU-1709480787-1.0.1.1-uPkh9w7LJw5XuC6Uu_LPCcPvCwlcLOQI5H6qtUMwRR5mpAstmZTr8Zt386v2B65vwDd0iIHnPmZPggw6MhYvaQ',
  }
});

// Thêm request interceptor để log CURL command
axiosInstance.interceptors.request.use((config) => {
  console.log(convertRequestToCurl(config));
  return config;
});

axiosInstance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response.data, null, 2));
  return response;
});

export default axiosInstance;