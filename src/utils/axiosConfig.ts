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

// Tạo và cấu hình Axios instance
const axiosInstance = axios.create({
  headers: {
    // Thêm User-Agent trong headers
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Cookie': '_ga=GA1.1.204385024.1708441895; fpestid=FswUzQ5QpJynOzT1R_g6tWvji6RaoIAo42XOgQi9tnZjjwiX4gMpYzWCdS_8P1Z-hYN_1w; dom3ic8zudi28v8lr6fgphwffqoz0j6c=7b82d18e-a070-4c30-bc4b-390e1a54b840%3A1%3A1; usertype=guest; _ga_EMMQD7K482=GS1.1.1708832681.6.0.1708832681.0.0.0',
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