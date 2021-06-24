import { message } from 'antd';
import axios from 'axios';
import { getConfig } from '../config/config';

import emitter from './emitter';
// import { md5sign } from './md5sign'; 确定是否要加密

export default function send(...value) {
  const mpConfig = getConfig()
  const MP_PLATFORM = mpConfig.basic.mp_platform

  let token = window.localStorage.getItem('token'); //确定中台的token规则
  // let userCompany = JSON.parse(window.localStorage.getItem('userCompany'));
  let userCompany = mpConfig.basic.mp_company
  if (!Array.isArray(userCompany)) {
    if (userCompany === 0 || userCompany === '0') {
      userCompany = []
    } else {
      userCompany = [userCompany]
    }
  }

  const platformInfo = { appid: 100, platform: 100 }
  // let token = '';
  let platInfo = { token, ...platformInfo };
  if (MP_PLATFORM === 'cp_cook') {
    platInfo = { Authorization: 'Bearer ' + token, ...platInfo }
  }

  const defaultHeader =
    token === undefined || token === null || token === ''
      ? platInfo
      : platInfo;
  let config = {};
  let url = '';
  if (typeof value[0] === 'string') {
    config = value[1] || {};
    url = value[0];
  } else {
    config = value[0];
  }
  url = config.url || url;

  if (url.indexOf('http') !== 0) {
    url = mpConfig.APIPATH + url;
  }

  const noCompanyIdUrls = ['company/list', 'shop/list'] // 不要上送 company_id 的url
  const cpCookUrls = ['admin/org/company/list', 'admin/org/store/lists'] // cpcook的url
  const find = (arr, url) => {
    for (let i = 0, len = arr.length; i < len; i++) {
      let item = arr[i]
      if (url.indexOf(item) !== -1) {
        return true // 不加 company_id 参数
      }
    }
    return false
  }
  const noCompanyId = find(noCompanyIdUrls, config.url)

  return new Promise((resolve, reject) => {
    if (!noCompanyId) {
      config.data = Object.assign({}, { company_id: userCompany }, config.data)
    }
    axios({
      url,
      method: config.method || 'get',
      headers: defaultHeader,
      data: config.data,
      // withCredentials: true,
      params:
        (config.method || 'get').toUpperCase() === 'GET'
          ? config.params //md5sign(config.params)
          : config.params,
    }).then((res) => {
      const data = res.data;
      const code = data.code;
      const obj = {
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
        105012: '业务员三方编号被占用',
      };
      const authError = {
        401: '验签失败',
        105008: '账户状态异常',
        105009: '请先登录',
        1101:'登录过期',
        1008:'登录过期',
        1100:'登录过期',
        300:'登录过期',
      };

      const isCpCookUrls = find(cpCookUrls, config.url)
      let rejectCondition
      if (MP_PLATFORM === 'cp_cook' && isCpCookUrls) {
        rejectCondition = (data && code !== 0)
      } else {
        rejectCondition = (data && code !== 200)
      }
      if (rejectCondition) {
        let msg = '';
        if (obj[code]) {
          msg = obj[code];
          message.error(msg, 0.5);
        } else if (authError[code]) {
          // msg = '认证失败';
          msg = authError[code]
          console.log('logout event')
          emitter.emit('logout');
        } else {
          msg = data.msg;
          message.error(msg, 0.5);
        }
        // reject(code);
        reject(msg);
      } else {
        resolve(res);
      }
    });
  });
}
