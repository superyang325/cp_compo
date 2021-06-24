"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonService = void 0;

var _send = _interopRequireDefault(require("./send"));

var maxLimit = 100000;
var offset = 0;
var commonService = {
  getEnabledCompanyList: function getEnabledCompanyList() {
    return (0, _send.default)({
      url: '/company/list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset // is_enabled: 1,

      }
    }).then(function (res) {
      if (res.data.code) {
        var info = res.data;
        var list = info.data.data || [];
        return list;
      }
    });
  },
  getEnabledShopList: function getEnabledShopList(companyId) {
    return (0, _send.default)({
      url: '/shop/list',
      method: 'POST',
      data: {
        company_id: companyId,
        limit: maxLimit,
        offset: offset // is_enabled: 1,

      }
    }).then(function (res) {
      if (res.data.code === 200) {
        var shopListInfo = res.data;
        var shopList = shopListInfo.data.data || [];
        return shopList;
      }
    });
  },
  getActivityList: function getActivityList(shopId) {
    return (0, _send.default)({
      url: '/activity/list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
        shop_id: shopId
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        var activityInfo = res.data;
        var activityList = activityInfo.data.data || [];
        return activityList;
      }
    });
  },
  getPackActivityList: function getPackActivityList(shopId) {
    return (0, _send.default)({
      url: '/pack-activity/list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
        shop_id: shopId,
        is_enabled: '1',
        sign: 'adv'
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        var info = res.data;
        var activityList = info.data.data || [];
        return activityList;
      }
    });
  },
  getLuckActivityList: function getLuckActivityList(shopId) {
    return (0, _send.default)({
      url: '/prize/list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
        shop_id: shopId
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        var info = res.data;
        var luckActivityList = info.data.data || [];
        return luckActivityList;
      }
    });
  },
  getCouponList: function getCouponList(shopId) {
    return (0, _send.default)({
      url: '/coupon/list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
        shop_id: shopId
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        var info = res.data;
        var couponList = info.data.list || [];
        return couponList;
      }
    });
  }
};
exports.commonService = commonService;