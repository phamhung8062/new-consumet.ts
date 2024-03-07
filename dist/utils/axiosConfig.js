"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosInstance = exports.initializeAxiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
function convertRequestToCurl(config) {
    var _a;
    let curl = 'curl -X ' + (((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || 'GET');
    const headers = config.headers;
    if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
            if (typeof value === 'object') {
                Object.entries(value).forEach(([headerKey, headerValue]) => {
                    curl += ` -H "${headerKey}: ${headerValue}"`;
                });
            }
            else {
                curl += ` -H "${key}: ${value}"`;
            }
        });
    }
    if (config.data) {
        const dataStr = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data;
        curl += ` -d '${dataStr}'`;
    }
    curl += ` "${config.url}"`;
    return curl;
}
async function updateAxiosHeaders() {
    try {
        const response = await axios_1.default.post('http://167.99.236.43:8191/v1', {
            cmd: "request.get",
            url: "https://aniwave.to/ajax/server/list/FTmWDM4=?vrf=Hyx1KS81IGctFyMHLKN0Dt%3D%3D",
            returnRawHtml: true,
            maxTimeout: 1200000
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const userAgent = response.data.solution.userAgent;
        const cookiesString = response.data.solution.cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
        console.log('cookiesString', cookiesString);
        return {
            'User-Agent': userAgent,
            'Cookie': cookiesString
        };
    }
    catch (error) {
        console.error('Error updating axios headers:', error);
        throw error;
    }
}
let axiosInstance;
let isInitialized = false;
async function initializeAxiosInstance() {
    if (!isInitialized) {
        const headers = await updateAxiosHeaders();
        axiosInstance = axios_1.default.create({ headers });
        axiosInstance.interceptors.request.use((config) => {
            console.log(convertRequestToCurl(config));
            return config;
        });
        axiosInstance.interceptors.response.use((response) => {
            // console.log('Response:', JSON.stringify(response.data, null, 2));
            return response;
        });
        isInitialized = true;
    }
}
exports.initializeAxiosInstance = initializeAxiosInstance;
function getAxiosInstance() {
    if (!axiosInstance) {
        throw new Error('Axios instance has not been initialized. Please call initializeAxiosInstance first.');
    }
    return axiosInstance;
}
exports.getAxiosInstance = getAxiosInstance;
//# sourceMappingURL=axiosConfig.js.map