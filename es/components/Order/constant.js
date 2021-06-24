export var ORDERSTATUS = {
  100: '待付款',
  200: '付款完成',
  300: '备货中',
  400: '待配送',
  410: '配送中',
  500: '制作中',
  510: '待取餐',
  600: '待自提',
  700: '订单完成',
  800: '订单取消中',
  900: '订单已取消'
};
export var PAYSTATUS = {
  0: '未支付',
  1: '已支付'
};
export var DELIVERYTYPE = {
  1: '外卖',
  2: '自提',
  3: '堂食'
};
export var PAYTYPE = {
  1: '微信',
  2: '储值'
};
export var ORDERRESOURCE = {
  '9': '优鲜',
  '14': 'cpcook'
}; // 售后类型

export var REFUNDTYPES = [// { text: '仅退款', value: '1', hideCondition: { deliveryType: '', code: [] } },
// { text: '退款且退货', value: '2', hideCondition: { deliveryType: '1', code: ['200', '300', '400'] } }, // 多次改动
{
  text: '仅退款',
  value: '1',
  hideCondition: {}
}, {
  text: '退款且退货',
  value: '2',
  hideCondition: {
    '1': {
      code: ['200', '300', '400']
    },
    '2': {
      code: ['200', '300', '600']
    },
    '3': {
      code: []
    }
  }
} // 多次改动
];
export var APPLYTYPE = 2; // 申请来源 1小程序 2后台

export var PRINT = 'PRINT';
export var BATCHBEIHUO = 'BATCHBEIHUO';
export var BATCHZHIZUO = 'BATCHZHIZUO';
export var BATCHFAHUO = 'BATCHFAHUO';
export var BATCHJIEDAN = 'BATCHJIEDAN';
export var BATCHWANCHENG = 'BATCHWANCHENG';
export var ORDERTYPE = [{
  label: '全部',
  value: ''
}, {
  label: '普通订单',
  value: 1
}, {
  label: '预售订单',
  value: 2
}];