import axios from 'axios';
import "./IDValidator.min";
import DC from "./DateCalculator";

let util = {};


const ajaxUrl = "http://118.190.38.28:8668/";
util.platform = "";
util.baseURL = ajaxUrl;

let vueContent;
util.init = content => {
    vueContent = content;
}

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})
let loading = document.createElement("div");
loading.setAttribute("style", "position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0);z-index:1001;display:none;");
loading.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;width: 50px;height: 50px;position: absolute;top: 50%;left: 50%;margin: -25px 0 0 -25px;" xml:space="preserve">	<path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(65.3608 25 25)" style="fill:#666">	<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>	</path>	</svg>';
document.body.appendChild(loading);
let isShowLoading = true;
let isShowError = false;
let showLoading = (delay = 1000) => {
    isShowLoading = true;
    setTimeout(() => {
        if (isShowLoading && loading.style.display != 'block') {
            loading.style.display = 'block';
            vueContent.$Message.warning({
                content: '正在处理，请稍后',
                duration: 0
            });
        }

    }, delay)
}
let hideLoading = () => {
    if (loading.style.display == 'block') {
        vueContent.$Message.destroy();
    }
    isShowLoading = false;
    loading.style.display = 'none';
}
util.ajax.interceptors.request.use(config => {
    let token = localStorage.token;
    const url = config.url;
    // config.headers = ;
    if (url.indexOf("//") != 0 && url.indexOf("http") != 0) {
        if (token && token != "") {
            config.headers.common.Authorization = token;
        }
        config.isUseBaseURL = true;
    } else {
        config.isUseBaseURL = false;
    }
    if (config.params) {
        tirmObject(config.params);
    }
    if (config.data) {
        deleteParam(config.data);
        tirmObject(config.data);
    }
    if (config.loading !== false) {
        showLoading();
    }
    return config;
})
//清空字符串对象空格
function tirmObject(obj) {
    for (let i in obj) {
        if (typeof item == "string") {
            obj[i] = item.trim();
        }
    }
}
//删除 提交的created_at updated_at字段
function deleteParam(obj) {
    for (let i in obj) {
        if (i == "created_at" || i == "updated_at") {
            delete obj[i];
        }
    }
}
const warning = debounce(() => {
    vueContent.$Message.warning("登录失效，请重新登录")
}, 200);
util.ajax.interceptors.response.use(rep => {
    hideLoading();
    if (rep.headers['content-type'] === 'application/vnd.ms-excel') {
        return rep;
    } else if (rep.data === "") {
        vueContent.$Message.warning("数据返回有误");
    } else if (rep.data.code == 1024) {
        clearSession(true);
        // vueContent.$router.push({
        //     name: 'login'
        // });
        warning();
    } else if (rep.data.code == 501) {
        vueContent.$Message.warning("暂无权限");
    } else if (rep.data.code != 0 && rep.config.method != "get" && rep.config.isUseBaseURL) {
        vueContent.$Message.error(rep.data.msg);
    }
    return rep.data;
}, error => {
    if (isShowError) {
        return Promise.reject(error);
    }
    isShowError = true;
    hideLoading();
    vueContent.$Message.error({
        content: "服务器连接有问题，请稍后再试",
        onClose: () => isShowError = false
    });
    return Promise.reject(error);
})
//
// let handleAjaxError;

let rules = {
    phone: getPhoneRule("手机号码不能为空", "手机号码输入有误"),
    password: [getRequiredRule("密码不能为空"), {
        pattern: /^.{6,16}$/,
        message: "密码长度只能在6-16位之间",
        trigger: 'blur'
    }],
    idCardNum: [getRequiredRule("身份证号码不能为空"), getIDCardRule()],
    longitude: [getRequiredRule("经度不能为空"), {
        pattern: /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,6})?)|180(([.][0]{1,6})?))$/,
        message: "请输入正确格式的经度",
        trigger: 'blur'
    }],
    latitude: [getRequiredRule("纬度不能为空"), {
        pattern: /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,6})?)|90(([.][0]{1,6})?))$/,
        message: "请输入正确格式的纬度",
        trigger: 'blur'
    }],
};
util.getRules = function () {
    return {
        ...rules
    };
}

util.getPassRule = () => {
    return [getRequiredRule("密码不能为空"), {
        pattern: /^.{6,16}$/,
        message: "密码长度只能在6-16位之间",
        trigger: 'blur'
    }];
}

function getPhoneRule(message1, message2) {
    return [getRequiredRule(message1), {
        pattern: /^1[3456789][0-9]{9}$/,
        message: message2,
        trigger: 'blur'
    }];
}
util.getPhoneRule = getPhoneRule;

function getContactPhoneRule(name) {
    return [getRequiredRule(name + "不能为空"), {
        pattern: /(^1[345789][0-9]{9}$)|(^(0[0-9]{2,3}(\-)?)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)/,
        message: "请输入正确格式的手机或者电话",
        trigger: 'blur'
    }];
}
util.getContactPhoneRule = getContactPhoneRule;

function getNameRule(name, size) {
    return getSizeRule(name + "名称", size);
}
util.getNameRule = getNameRule;

function getSizeRule(name, size) {
    return [getRequiredRule(name + '不能为空'), getSimpleSizeRule(name, size)]
}
util.getSizeRule = getSizeRule;

function getSimpleSizeRule(name, size) {
    return {
        type: 'string',
        max: size,
        message: name + "不能超过" + size + "个字",
        trigger: 'blur'
    };
}
util.getSimpleSizeRule = getSimpleSizeRule;

function getRequiredRule(message) {
    return {
        required: true,
        message: message,
        trigger: 'blur'
    }
}
util.getRequiredRule = getRequiredRule;

function getRequiredRuleOnChange(message) {
    return {
        required: true,
        message: message,
        trigger: 'change'
    }
}
util.getRequiredRuleOnChange = getRequiredRuleOnChange;

function getURLRule(message) {
    return {
        message: message,
        trigger: 'blur',
        pattern: /https?:\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/
    }
}
util.getURLRule = getURLRule;

function getIDCardRule() {
    return {
        validator(rule, value, callback) {
            if (value == "" || new IDValidator().isValid(value)) {
                callback();
            } else {
                callback(new Error("身份证号码输入有误"));
            }
        },
        trigger: 'blur'
    }
}
util.getIDCardRule = getIDCardRule;


util.formatTime = (timestamp, format = "yyyy-MM-dd hh:mm:ss") => {
    if (!timestamp) {
        return "";
    }
    let d;
    if (timestamp instanceof Date) {
        d = timestamp;
    } else {
        d = timestamp ? new Date(timestamp * 1000) : new Date();
    }
    let date = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        "S+": d.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

util.generateMixed = n => {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}

util.showBigImg = imgUrl => {
    let div = document.createElement("div");
    div.setAttribute("style", "position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,.8);z-index:1101;");
    let img = document.createElement("img");
    img.setAttribute("style", "top: 0;left: 0;right: 0;bottom: 0;max-height: 100%;max-width: 100%;margin: auto;position:absolute;");
    img.setAttribute("src", imgUrl);
    div.appendChild(img);
    div.onclick = e => {
        document.body.removeChild(div);
    }
    document.body.appendChild(div);
}
util.getProjectSetting = (puid) => {
    return util.ajax("project_config/" + puid).then(result => {
        if (result.code == 200) {
            return result.data;
        } else {
            return 0;
        }
    })
}
util.getProjectSettingByName = (puid, name) => {
    return util.getProjectSetting(puid).then(result => {
        let month = parseInt(result[name]);
        month = month == 0 ? 1200 : month;
        return DC(new Date(), [0, month, 0]);
    })
}

let handleEnter = (obj, handle) => {
    if (!obj) {
        return;
    }
    if (!obj.$options) {
        return;
    }
    if (obj.$options._componentTag == "Input") {
        obj.handleEnter = handle;
        return;
    }
    if (obj.$children.length == 0) {
        return;
    }
    obj.$children.map(item => {
        handleEnter(item, handle);
    })

}
util.handleEnter = handleEnter;

util.fmTime = timestamp => {
    if (timestamp == 0) {
        return "无";
    }
    return util.formatTime(timestamp);
}
let urlEncode = function (param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};
util.urlEncode = urlEncode;

let phoneFormat = phone => {
    if (!phone || phone.length < 8) {
        return phone;
    }
    return phone.substr(0, 3) + "****" + phone.substr(7);
}
util.phoneFormat = phoneFormat;

const idFormat = id => {
    if (!id || id.length < 15) {
        return id;
    }
    return id.substr(0, 6) + "*".repeat(8) + id.substr(14);
}
util.idFormat = idFormat;

let canvasToBlob = canvas => {
    let encodeData = canvas.toDataURL('image/jpeg').split(',')[1];
    let decodedData = window.atob(encodeData);
    let ia = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; i++) {
        ia[i] = decodedData.charCodeAt(i);
    };
    return new Blob([ia], {
        type: "image/jpeg"
    });
}
util.canvasToBlob = canvasToBlob;

const clearSession = isClearToken => {
    // vueContent.$store.commit("reset");
    // localStorage.removeItem("name");
    // localStorage.removeItem("agent_property");
    if (isClearToken) {
        localStorage.removeItem("token");
    }
}
util.clearSession = clearSession;

function debounce(method, delay) {
    let timer = null;
    return function () {
        let self = this,
            args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(self, args);
        }, delay);
    }
}
util.debounce = debounce;

function prefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
util.prefixInteger = prefixInteger;

function isEmpty(obj) {
    return (typeof obj === 'undefined' || obj === null || obj === "");
}
util.isEmpty = isEmpty;
export default util;