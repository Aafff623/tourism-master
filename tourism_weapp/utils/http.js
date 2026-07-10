import tool from "./tool";



const ENV = 'DEV';
const PROD_URL = 'http://localhost:82';
// 本机联调：改成你电脑的局域网 IP（微信开发者工具不能稳定用 localhost）
// 当前 WLAN：10.170.248.52 ；后端默认端口 86
const DEV_URL = 'http://10.170.248.52:86/client/c';
const BASE_URL = ENV == 'PROD' ? PROD_URL : DEV_URL;
// 请求白名单（游客可读；Wave 2 双语景区）
const whiteUrls = [
	'/user/login',
	'/user/register',
	'/spot/bilingual/catalog',
	'/spot/bilingual/detail',
	'/spot/bilingual/hotspots'
];
// 以下这些code需要重新登录
const reloadCodes = [401, 1011007, 1011008];
// 错误信息表
const errorCodeMap = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};
export default function http(option) {
    return new Promise((resolve, reject) => {
        if (option.showLoading){
					uni.showLoading();
				}
        let requestConfig
        try {
            requestConfig = requestInterceptor(option)
        } catch (err) {
            if (option.showLoading) {
                uni.hideLoading()
            }
            reject(err)
            return
        }
        uni.request({
            ...requestConfig,
            success: (res) => {
                if (option.showLoading){
									uni.hideLoading();
								}
                // 响应拦截
                responseInterceptor(res)
                    .then((data) => resolve(data))
                    .catch((err) => reject(err));
            },
            fail: (err) => {
                if (option.showLoading)
                    uni.hideLoading();
                errorHandler(err);
                reject(err);
            },
        });
    });
}
/**
 * 请求拦截器
 * @param option
 */
function requestInterceptor(option) {
    let header = option.header || {};
    const requestData = option.data || {};
    // 过滤属性为null的
    for (let key in requestData) {
        if (requestData[key] === null ||
            requestData[key] === undefined ||
            requestData[key] === "null" ||
            requestData[key] === "") {
            delete requestData[key];
        }
    }
    if (!whiteUrls.includes(option.url)) {
        let token = tool.data.get('TOKEN');
        if (!token) {
            uni.showToast({ icon: 'none', title: '未登录' });
            toLoginPage();
            throw new Error('UNAUTHORIZED');
        }
        header['Token'] = token;
    }
    const config = {
        url: BASE_URL + option.url,
        method: option.method,
        data: requestData,
        header: header,
    };
    return config;
}
/**
 * 响应拦截器
 * @param res
 */
function responseInterceptor(res) {
    // 需要重新登录
    if (reloadCodes.includes(res.data.code)) {
        toLoginPage();
        return Promise.reject(res);
    }
    if (res.data.code !== 200) {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        });
        return Promise.reject(res);
    }
    else {
        return Promise.resolve(res.data);
    }
}
/**
 * 错误处理器
 * @param err
 */
function errorHandler(err) {
    // 下面会直接写请求失败的代码
    if (err) {
        const status = 503;
        const description = errorCodeMap[status];
        uni.showToast({ title: description, icon: 'none' });
        console.error({ message: '请求错误', description });
        return Promise.reject(status);
    }
}

/**
 * 跳转登录页
 */
function toLoginPage() {
    uni.redirectTo({
        url: '/pages/user/children/signin/signin'
    });
}