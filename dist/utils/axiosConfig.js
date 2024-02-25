"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Hàm chuyển đổi Axios Request Config sang CURL command
function convertRequestToCurl(config) {
    var _a;
    let curl = 'curl -X ' + (((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || 'GET');
    // Duyệt và thêm headers
    const headers = config.headers;
    if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
            if (typeof value === 'object') {
                // Đối với các trường headers là object, duyệt qua các key-value và log
                Object.entries(value).forEach(([headerKey, headerValue]) => {
                    curl += ` -H "${headerKey}: ${headerValue}"`;
                });
            }
            else {
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
const axiosInstance = axios_1.default.create({});
// Thêm request interceptor để log CURL command
axiosInstance.interceptors.request.use((config) => {
    console.log(convertRequestToCurl(config));
    return config;
});
exports.default = axiosInstance;
//# sourceMappingURL=axiosConfig.js.map