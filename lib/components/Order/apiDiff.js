"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompanyListCPPlusApi = getCompanyListCPPlusApi;
exports.getCompanyListCPCookApi = getCompanyListCPCookApi;
exports.getShopListCPPlusApi = getShopListCPPlusApi;
exports.getShopListCPCookApi = getShopListCPCookApi;

var _send = _interopRequireDefault(require("../../util/send"));

// import { objectToLine, arrToLine } from '../../util/objectConvert';
// import { ORDERSTATUS } from './constant';
var maxLimit = 100000;
var offset = 0;

function getCompanyListCPPlusApi() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resovle, reject) {
    (0, _send.default)({
      url: 'https://gateway-cp-kitchen-admin-api-dev.cpgroupcloud.com/company/list',
      //'enum/company-list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        var list = res.data.data.data;
        list = list.map(function (item) {
          return {
            label: item.company_name,
            value: item.company_id
          };
        });
        resovle({
          list: list
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}

function getCompanyListCPCookApi() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resovle, reject) {
    (0, _send.default)({
      url: 'https://gateway-cp-kitchen-admin-api-dev.cpgroupcloud.com/company/list',
      //'enum/company-list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        var list = res.data.data.data;
        list = list.map(function (item) {
          return {
            label: item.company_name,
            value: item.company_id
          };
        });
        resovle({
          list: list
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}

function getShopListCPPlusApi() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var companyId = params.companyId;
  return new Promise(function (resovle, reject) {
    (0, _send.default)({
      url: 'https://gateway-cp-kitchen-admin-api-dev.cpgroupcloud.com/shop/list',
      //'enum/shop-list',
      method: 'POST',
      data: {
        company_id: companyId,
        limit: maxLimit,
        offset: offset
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        var list = res.data.data.data;
        list = list.map(function (item) {
          return {
            label: item.shop_name,
            value: item.shop_id
          };
        });
        resovle({
          list: list
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}

function getShopListCPCookApi() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var companyId = params.companyId;
  return new Promise(function (resovle, reject) {
    (0, _send.default)({
      url: 'https://gateway-cp-kitchen-admin-api-dev.cpgroupcloud.com/shop/list',
      //'enum/shop-list',
      method: 'POST',
      data: {
        company_id: companyId,
        limit: maxLimit,
        offset: offset
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        var list = res.data.data.data;
        list = list.map(function (item) {
          return {
            label: item.shop_name,
            value: item.shop_id
          };
        });
        resovle({
          list: list
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}