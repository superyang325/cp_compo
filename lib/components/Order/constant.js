"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ORDERTYPE = exports.BATCHWANCHENG = exports.BATCHJIEDAN = exports.BATCHFAHUO = exports.BATCHZHIZUO = exports.BATCHBEIHUO = exports.PRINT = exports.APPLYTYPE = exports.REFUNDTYPES = exports.ORDERRESOURCE = exports.PAYTYPE = exports.DELIVERYTYPE = exports.PAYSTATUS = exports.ORDERSTATUS = void 0;
var ORDERSTATUS = {
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
exports.ORDERSTATUS = ORDERSTATUS;
var PAYSTATUS = {
  0: '未支付',
  1: '已支付'
};
exports.PAYSTATUS = PAYSTATUS;
var DELIVERYTYPE = {
  1: '外卖',
  2: '自提',
  3: '堂食'
};
exports.DELIVERYTYPE = DELIVERYTYPE;
var PAYTYPE = {
  1: '微信',
  2: '储值'
};
exports.PAYTYPE = PAYTYPE;
var ORDERRESOURCE = {
  '9': '优鲜',
  '14': 'cpcook'
}; // 售后类型

exports.ORDERRESOURCE = ORDERRESOURCE;
var REFUNDTYPES = [// { text: '仅退款', value: '1', hideCondition: { deliveryType: '', code: [] } },
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
exports.REFUNDTYPES = REFUNDTYPES;
var APPLYTYPE = 2; // 申请来源 1小程序 2后台

exports.APPLYTYPE = APPLYTYPE;
var PRINT = 'PRINT';
exports.PRINT = PRINT;
var BATCHBEIHUO = 'BATCHBEIHUO';
exports.BATCHBEIHUO = BATCHBEIHUO;
var BATCHZHIZUO = 'BATCHZHIZUO';
exports.BATCHZHIZUO = BATCHZHIZUO;
var BATCHFAHUO = 'BATCHFAHUO';
exports.BATCHFAHUO = BATCHFAHUO;
var BATCHJIEDAN = 'BATCHJIEDAN';
exports.BATCHJIEDAN = BATCHJIEDAN;
var BATCHWANCHENG = 'BATCHWANCHENG';
exports.BATCHWANCHENG = BATCHWANCHENG;
var ORDERTYPE = [{
  label: '全部',
  value: ''
}, {
  label: '普通订单',
  value: 1
}, {
  label: '预售订单',
  value: 2
}];
exports.ORDERTYPE = ORDERTYPE;