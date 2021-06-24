import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import send from '../../util/send';
import { objectToLine, arrToLine } from '../../util/objectConvert';
import { ORDERSTATUS } from '../order/constant';
import { getConfig } from '../../config/config';
var maxLimit = 100000;
var offset = 0;
export function getParentOrderListApi(params) {
  return new Promise(function (resovle, reject) {
    return send({
      url: 'order/admin-order-main-list',
      method: 'POST',
      data: Object.assign(objectToLine(params), {
        page: params.current // company_id:JSON.parse(window.localStorage.getItem('userCompany'))

      })
    }).then(function (res) {
      if (res.data.code === 200) {
        var _res$data$data = res.data.data,
            resList = _res$data$data.list,
            total = _res$data$data.total;
        var list = resList.map(function (item) {
          return {
            orderNo: item.order_no,
            createTime: item.create_time,
            payStatus: item.pay_status,
            phone: item.phone,
            realPrice: (item.real_price * 1 / 100).toFixed(2),
            transPrice: (item.trans_price * 1 / 100).toFixed(2),
            orderPayWay: item.order_pay_way,
            orderPayTime: item.order_pay_time
          };
        });
        resovle({
          list: list,
          total: +total
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function getChildOrderListApi(params) {
  return new Promise(function (resovle, reject) {
    return send({
      url: 'order/admin-order-sub-list',
      method: 'POST',
      data: Object.assign(objectToLine(params), {
        page: params.current // company_id:JSON.parse(window.localStorage.getItem('userCompany'))

      })
    }).then(function (res) {
      if (res.data.code === 200) {
        var _res$data$data2 = res.data.data,
            resList = _res$data$data2.list,
            total = _res$data$data2.total;
        var list = resList.map(function (item) {
          return {
            orderSubNo: item.order_sub_no,
            orderStatus: item.order_status,
            orderType: item.order_type,
            deliveryType: item.delivery_type,
            shopName: item.shop_name,
            createTime: item.create_time,
            receiveName: item.receive_name,
            phone: item.phone,
            pickCode: item.pick_code,
            realPrice: (item.real_price * 1 / 100).toFixed(2),
            transPrice: (item.trans_price * 1 / 100).toFixed(2),
            orderPayWay: item.order_pay_way,
            address: item.address,
            canRefundTrans: item.can_refund_trans,
            // 是否可以退运费，0 不可以 1 可以
            canCancel: item.can_cancel,
            // 是否允许取消订单，0 不允许 1 允许
            product: item.product.map(function (item) {
              return {
                id: item.product_id,
                productName: item.product_name,
                productNumber: item.product_number,
                productPriceSum: (item.product_price_sum * 1 / 100).toFixed(2)
              };
            })
          };
        });
        resovle({
          list: list,
          total: +total
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function getChildOrderDetailApi(data) {
  return new Promise(function (resovle, reject) {
    return send({
      url: 'order/admin-order-detail',
      method: 'POST',
      data: objectToLine(data)
    }).then(function (res) {
      if (res.data.code === 200) {
        var _data = res.data.data;
        resovle({
          orderNo: _data.order_no + '',
          orderSubNo: _data.order_sub_no + '',
          status: _data.order_status + '',
          deliveryType: _data.delivery_type + '',
          notes: _data.notes + '' || '--',
          // 备注
          transportationExpenses: (_data.transportation_expenses * 1 / 100).toFixed(2),
          historyStatusList: _data.status.map(function (item) {
            return {
              createTime: item.create_time,
              status: item.order_status + ''
            };
          }),
          orderPayWay: Array.isArray(_data.order_pay_way) ? _data.order_pay_way : [],
          shopInfo: {
            shopAddress: _data.shop_info && _data.shop_info.address,
            shopName: _data.shop_info && _data.shop_info.shop_name,
            concatName: _data.shop_info && _data.shop_info.concat_name,
            concatMobile: _data.shop_info && _data.shop_info.concat_mobile,
            remarks: _data.remarks
          },
          expectArriveTimeStart: _data.expect_arrive_time_start,
          expectArriveTimeEnd: _data.expect_arrive_time_end,
          expectArriveTime: "".concat(_data.expect_arrive_time_start, " ~ ").concat(_data.expect_arrive_time_end, "  "),
          finishTime: _data.finish_time,
          orderResource: _data.order_resource,
          pickCode: _data.pick_code,
          originPrice: (_data.origin_price * 1 / 100).toFixed(2),
          couponValue: (_data.coupon_value * 1 / 100).toFixed(2) || '0.00',
          realPrice: (_data.real_price * 1 / 100).toFixed(2),
          receiveName: _data.address_info && _data.address_info.receive_name,
          phone: _data.address_info && _data.address_info.phone,
          address: _data.address_info && _data.address_info.address,
          productList: _data.product.map(function (item) {
            return {
              // real_unit_price 剪过优惠后的价格
              productThumbImg: item.product_thumb_img,
              productNumber: item.product_number,
              productSn: item.product_sn,
              productName: item.product_name,
              norms: item.norms,
              price: (item.sale_unit_price * 1 / 100).toFixed(2),
              sumPrice: (item.product_price_sum * 1 / 100).toFixed(2),
              realSumPrice: (item.real_unit_price * 1 / 100 * item.product_number).toFixed(2),
              realPrice: (item.real_unit_price * 1 / 100).toFixed(2),
              productPriceSum: (item.product_price_sum * 1 / 100).toFixed(2)
            };
          }),
          logList: _data.status.map(function (item) {
            return {
              operatorName: item.operator_name,
              updateTime: item.update_time,
              operatorStatus: ORDERSTATUS[item.order_status + '']
            };
          }),
          mainInfoUserName: _data.main_info && _data.main_info.user_name,
          mainInfoPhone: _data.main_info && _data.main_info.phone
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function getProductListApi() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resovle, reject) {
    return send({
      url: 'order/refund/product-list',
      method: 'POST',
      data: objectToLine(data)
    }).then(function (res) {
      if (res.data.code === 200) {
        var _data2 = res.data.data;
        resovle(_data2.map(function (item) {
          return {
            productId: item.product_id,
            productName: item.product_name,
            barcode: item.barcode,
            productSn: item.product_sn,
            productThumbImg: item.product_thumb_img,
            saleUnitPrice: (item.sale_unit_price * 1 / 100).toFixed(2),
            refundUnitPrice: (item.refund_unit_price * 1 / 100).toFixed(2),
            productNumber: item.product_number * 1,
            payPrice: ((item.sale_unit_price * 1 - item.discount_price) / 100 * item.product_number * 1).toFixed(2),
            refundableNum: item.refundable_num * 1,
            // refundNum: item.refundableNum === 0 ? 0 : 1,
            refundNum: 0,
            refundTotalPrice: item.refundableNum === 0 ? 0 : (item.sale_unit_price * 1 / 100).toFixed(2),
            // 已废弃
            hasWight: item.product_weight > 0,
            // 是否有重量
            productWeight: Number(item.product_weight / 1000).toFixed(2),
            // 单个商品重量（单个商品销售重量）
            productAllWeight: Number(item.product_all_weight / 1000).toFixed(2),
            // 购买商品总重量(销售重量)
            productAllRefundWeight: Number(item.product_all_refund_weight / 1000).toFixed(2),
            // 商品可售后总重量
            pickWeight: 0,
            // 拣货重量
            refundWeight: 0,
            // 退货重量（kg）
            productAllRefundSum: 0 // 退款金额

          };
        }));
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function modifyOrderStatusApi(data) {
  return new Promise(function (resovle, reject) {
    send({
      url: 'order/modify-status',
      method: 'POST',
      data: Object.assign(objectToLine(data), {
        extra: {
          operator_id: window.localStorage.getItem('userId'),
          operator_name: window.localStorage.getItem('userName'),
          operator_mobile: window.localStorage.getItem('userMobile')
        }
      })
    }).then(function (res) {
      if (res.data.code === 200) {
        resovle();
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function refundOrderTransApi(data) {
  return new Promise(function (resovle, reject) {
    send({
      url: 'order/refund-order-trans',
      method: 'POST',
      data: Object.assign(objectToLine(data), {
        extra: {
          // operator_id: window.localStorage.getItem('userId'),
          operator_name: window.localStorage.getItem('userName'),
          operator_mobile: window.localStorage.getItem('userMobile')
        }
      })
    }).then(function (res) {
      if (res.data.code === 200) {
        resovle();
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function getCompanyListApi() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mpConfig = getConfig();
  var ROOTPATH = mpConfig.ROOTPATH,
      basic = mpConfig.basic;

  if (basic.mp_platform === 'cp_plus') {
    return new Promise(function (resovle, reject) {
      send({
        url: "".concat(ROOTPATH, "company/list"),
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
      }).catch(function (e) {
        console.log(e, 'company/list');
      });
    });
  } else if (basic.mp_platform === 'cp_cook') {
    return new Promise(function (resovle, reject) {
      send({
        url: "".concat(ROOTPATH, "admin/org/company/lists"),
        params: _objectSpread(_objectSpread({
          id: basic.mp_company,
          name: ''
        }, params), {}, {
          page: 0,
          size: 10000
        })
      }).then(function (res) {
        if (res.data.code === 0) {
          var list = res.data.data.list;
          list = list.map(function (item) {
            return {
              label: item.name,
              value: item.id
            };
          });
          resovle({
            list: list
          });
        } else {
          reject(res.data.msg);
        }
      }).catch(function (e) {
        console.log(e, 'admin/org/company/lists');
      });
    });
  }
}
export function getShopListApi() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mpConfig = getConfig();
  var ROOTPATH = mpConfig.ROOTPATH,
      basic = mpConfig.basic;

  if (basic.mp_platform === 'cp_plus') {
    var companyId = params.companyId;
    return new Promise(function (resovle, reject) {
      send({
        url: "".concat(ROOTPATH, "shop/list"),
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
      }).catch(function (e) {
        console.log(e, 'shop/list');
      });
    });
  } else if (basic.mp_platform === 'cp_cook') {
    return new Promise(function (resovle, reject) {
      // const id = window.localStorage.getItem('storeId');
      var company_id = window.localStorage.getItem('companyId');
      send({
        url: "".concat(ROOTPATH, "admin/org/store/lists"),
        params: _objectSpread({
          company_id: company_id
        }, objectToLine(params))
      }).then(function (res) {
        if (res.data.code === 0) {
          var list = res.data.data.list;
          list = list.map(function (item) {
            return {
              label: item.name,
              value: item.id
            };
          });
          resovle({
            list: list
          });
        } else {
          reject(res.data.msg);
        }
      }).catch(function (e) {
        console.log(e, 'admin/org/store/lists');
      });
    });
  }
}
export function getReasonApi(data) {
  return new Promise(function (resovle, reject) {
    return send({
      url: 'order/refund/reason',
      method: 'POST',
      data: {}
    }).then(function (res) {
      if (res.data.code === 200) {
        var _data3 = res.data.data;

        var reasons = _data3.map(function (item) {
          return {
            reasonId: item.reason_id,
            reasonInfo: item.reason_info
          };
        });

        resovle(reasons);
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function getPriceApi() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resovle, reject) {
    return send({
      url: 'order/refund/price',
      method: 'POST',
      data: objectToLine(data)
    }).then(function (res) {
      if (res.data.code === 200) {
        resovle((res.data.data.refund_price / 100).toFixed(2));
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function afterSaleApplyApi() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resovle, reject) {
    var productInfo = data.productInfo;
    data.productInfo = arrToLine(productInfo);
    return send({
      url: 'order/refund/apply',
      method: 'POST',
      data: objectToLine(data)
    }).then(function (res) {
      if (res.data.code === 200) {
        resovle({
          res: res
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function uploadImgApi() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resovle, reject) {
    return send({
      url: 'https://gateway-cp-kitchen-api-dev.cpgroupcloud.com/mp/opinion/upload-img',
      method: 'POST',
      data: objectToLine(data)
    }).then(function (res) {
      if (res.data.code === 200) {
        resovle({
          res: res
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function exportCSVApi() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resovle, reject) {
    return send({
      url: 'order/export-order-csv',
      method: 'POST',
      data: objectToLine(data)
    }).then(function (res) {
      if (res.data.code === 200) {
        resovle(res.data);
      } else {
        reject(res.data.msg);
      }
    });
  });
}