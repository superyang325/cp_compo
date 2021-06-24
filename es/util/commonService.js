import send from './send';
var maxLimit = 100000;
var offset = 0;
export var commonService = {
  getEnabledCompanyList: function getEnabledCompanyList() {
    return send({
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
    return send({
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
    return send({
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
    return send({
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
    return send({
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
    return send({
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