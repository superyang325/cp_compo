import send from './send';

const maxLimit = 100000;
const offset = 0;
export const commonService = {
  getEnabledCompanyList() {
    return send({
      url: '/company/list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
        // is_enabled: 1,
      }
    }).then(res => {
      if (res.data.code) {
        let info = res.data;
        let list = info.data.data || [];
        return list;
      }
    })
  },
  getEnabledShopList(companyId) {
    return send({
      url: '/shop/list',
      method: 'POST',
      data: {
        company_id: companyId,
        limit: maxLimit,
        offset: offset,
        // is_enabled: 1,
      }
    }).then(res => {
      if (res.data.code === 200) {
        let shopListInfo = res.data;
        let shopList = shopListInfo.data.data || [];
        return shopList;
      }
    })
  },
  getActivityList(shopId) {
    return send({
      url: '/activity/list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
        shop_id: shopId
      }
    }).then(res => {
      if(res.data.code === 200) {
        let activityInfo = res.data;
        let activityList = activityInfo.data.data || [];
        return activityList
      }
    })
  },
  getPackActivityList(shopId){
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
    }).then(res=>{
      if(res.data.code === 200) {
        let info = res.data;
        let activityList = info.data.data || [];
        return activityList;
      }
    })
  },
  getLuckActivityList(shopId) {
    return send({
      url: '/prize/list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
        shop_id: shopId
      }
    }).then(res => {
      if(res.data.code === 200) {
        let info = res.data;
        let luckActivityList = info.data.data || [];
        return luckActivityList;
      }
    })
  },
  getCouponList(shopId) {
    return send({
      url: '/coupon/list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
        shop_id: shopId
      }
    }).then(res => {
      if(res.data.code ===200) {
        let info = res.data;
        let couponList = info.data.list || [];
        return couponList;
      }
    })
  }
}
