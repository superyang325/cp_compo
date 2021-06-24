"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = send;

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("axios"));

var _config = require("../config/config");

var _emitter = _interopRequireDefault(require("./emitter"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// import { md5sign } from './md5sign'; 确定是否要加密
function send() {
  var mpConfig = (0, _config.getConfig)();
  var MP_PLATFORM = mpConfig.basic.mp_platform;
  var token = window.localStorage.getItem('token'); //确定中台的token规则
  // let userCompany = JSON.parse(window.localStorage.getItem('userCompany'));

  var userCompany = mpConfig.basic.mp_company;

  if (!Array.isArray(userCompany)) {
    if (userCompany === 0 || userCompany === '0') {
      userCompany = [];
    } else {
      userCompany = [userCompany];
    }
  }

  var platformInfo = {
    appid: 100,
    platform: 100
  }; // let token = '';

  var platInfo = _objectSpread({
    token: token
  }, platformInfo);

  if (MP_PLATFORM === 'cp_cook') {
    platInfo = _objectSpread({
      Authorization: 'Bearer ' + token
    }, platInfo);
  }

  var defaultHeader = token === undefined || token === null || token === '' ? platInfo : platInfo;
  var config = {};
  var url = '';

  if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
    config = (arguments.length <= 1 ? undefined : arguments[1]) || {};
    url = arguments.length <= 0 ? undefined : arguments[0];
  } else {
    config = arguments.length <= 0 ? undefined : arguments[0];
  }

  url = config.url || url;

  if (url.indexOf('http') !== 0) {
    url = mpConfig.APIPATH + url;
  }

  var noCompanyIdUrls = ['company/list', 'shop/list']; // 不要上送 company_id 的url

  var cpCookUrls = ['admin/org/company/list', 'admin/org/store/lists']; // cpcook的url

  var find = function find(arr, url) {
    for (var i = 0, len = arr.length; i < len; i++) {
      var item = arr[i];

      if (url.indexOf(item) !== -1) {
        return true; // 不加 company_id 参数
      }
    }

    return false;
  };

  var noCompanyId = find(noCompanyIdUrls, config.url);
  return new Promise(function (resolve, reject) {
    if (!noCompanyId) {
      config.data = Object.assign({}, {
        company_id: userCompany
      }, config.data);
    }

    (0, _axios.default)({
      url: url,
      method: config.method || 'get',
      headers: defaultHeader,
      data: config.data,
      // withCredentials: true,
      params: (config.method || 'get').toUpperCase() === 'GET' ? config.params //md5sign(config.params)
      : config.params
    }).then(function (res) {
      var data = res.data;
      var code = data.code;
      var obj = {
        '-1': '服务器繁忙请稍后再试',
        402: '请求方式不支持',
        403: 'CURL请求失败',
        404: 'interface缺少方法',
        405: '参数错误',
        406: '操作失败',
        407: '非法操作',
        105000: '用户名不存在',
        105001: '密码错误',
        105002: '账户状态异常',
        105003: '路由已存在',
        105004: '角色已存在',
        105005: '手机号码已被占用',
        105006: '账户不存在',
        105007: '密码错误',
        105010: '没有操作权限',
        105011: '公司名称已被占用',
        105012: '业务员三方编号被占用'
      };
      var authError = {
        401: '验签失败',
        105008: '账户状态异常',
        105009: '请先登录',
        1101: '登录过期',
        1008: '登录过期',
        1100: '登录过期',
        300: '登录过期'
      };
      var isCpCookUrls = find(cpCookUrls, config.url);
      var rejectCondition;

      if (MP_PLATFORM === 'cp_cook' && isCpCookUrls) {
        rejectCondition = data && code !== 0;
      } else {
        rejectCondition = data && code !== 200;
      }

      if (rejectCondition) {
        var msg = '';

        if (obj[code]) {
          msg = obj[code];

          _message2.default.error(msg, 0.5);
        } else if (authError[code]) {
          // msg = '认证失败';
          msg = authError[code];
          console.log('logout event');

          _emitter.default.emit('logout');
        } else {
          msg = data.msg;

          _message2.default.error(msg, 0.5);
        } // reject(code);


        reject(msg);
      } else {
        resolve(res);
      }
    });
  });
}