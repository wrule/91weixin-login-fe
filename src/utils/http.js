
import axios from "axios";
import { Message } from "element-ui";

axios.defaults.timeout = 50000;
axios.defaults.baseURL = "";

//弹出错误信息
function showError (message) {
    Message({
        type: "error",
        message: message,
    });
}

function http (config) {
    return new Promise((resolve, reject) => {
        axios(config).then(response => {
            if (response.status === 401) {
                // 需要跳转
            }
            else if (response.status === 403) {
                // iView.Message.error('权限不足，禁止访问！');
            }
            else if (response.status === 500) {

            }
            else if (response.status !== 200) {
                // iView.Message.error(response.data.msg);
            }

            if (response.status == 200) {
                resolve(response.data);
            }
            else {
                if (response.data && response.data.message) {
                    showError(response.data.message);
                }
            }
        }).catch(err => {
            console.error(err);
            showError("网络请求发生错误！");
            reject(err);
        });
    });
}

/**
 * 封装get方法
 * @param url 要请求的url地址
 * @param params 请求的参数
 * @returns {Promise}
 */
export function fetch(url, params = { }) {
    return http({
        method: "GET",
        url: url,
        params: params,
        headers: {
            "Content-Type": "application/json",
        }
    });
}
/**
 * 封装post请求
 * @param url 要请求的url地址
 * @param data 请求的参数
 * @returns {Promise}
 */
export function post(url, data = { }) {
    return http({
        method: "POST",
        url: url,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    });
}

//导出两个常用Http方法
export default {
    fetch: fetch,
    post: post,
};