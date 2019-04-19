
import http from "../utils/http";

export default {
    // 注册用户
    async registerUser (params) {
        let reqUrl = "/api/users/register";
        let result = await http.post(reqUrl, params);
        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    async userLogin (params) {
        let reqUrl = "/api/login";
        let result = await http.post(reqUrl, params);
        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    // 获取新的验证码
    async newCAPTCHA () {
        let reqUrl = "/api/captcha/new";
        let result = await http.post(reqUrl);
        if (result) {
            return result.data;
        }
        else {
            return null;
        }
    },
    // 刷新验证码
    async updateCAPTCHA (params) {
        let reqUrl = "/api/captcha/update";
        let result = await http.post(reqUrl, params);
        if (result) {
            return result.data;
        }
        else {
            return null;
        }
    },
};