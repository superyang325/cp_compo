import send from '../../util/send';
import { objectToLine, arrToLine } from '../../util/objectConvert';
import { ORDERSTATUS } from '../order/constant';
import { getConfig } from '../../config/config'

const maxLimit = 100000;
const offset = 0;

export function getParentOrderListApi(params) {
  return new Promise((resovle, reject) => {
    return send({
      url: 'order/admin-order-main-list',
      method: 'POST',
      data: Object.assign(objectToLine(params), {
        page: params.current,
        // company_id:JSON.parse(window.localStorage.getItem('userCompany'))
      }),
    }).then((res) => {
      if (res.data.code === 200) {
        const { list: resList, total } = res.data.data;
        const list = resList.map((item) => {
          return {
            orderNo: item.order_no,
            createTime: item.create_time,
            payStatus: item.pay_status,
            phone: item.phone,
            realPrice: ((item.real_price * 1) / 100).toFixed(2),
            transPrice: ((item.trans_price * 1) / 100).toFixed(2),
            orderPayWay: item.order_pay_way,
            orderPayTime: item.order_pay_time,
          };
        });
        resovle({
          list,
          total: +total,
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function getChildOrderListApi(params) {
  return new Promise((resovle, reject) => {
    return send({
      url: 'order/admin-order-sub-list',
      method: 'POST',
      data: Object.assign(objectToLine(params), {
        page: params.current,
        // company_id:JSON.parse(window.localStorage.getItem('userCompany'))
      }),
    }).then((res) => {
      if (res.data.code === 200) {
        const { list: resList, total } = res.data.data;
        const list = resList.map((item) => {
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
            realPrice: ((item.real_price * 1) / 100).toFixed(2),
            transPrice: ((item.trans_price * 1) / 100).toFixed(2),
            orderPayWay: item.order_pay_way,
            address: item.address,
            canRefundTrans: item.can_refund_trans, // 是否可以退运费，0 不可以 1 可以
            canCancel: item.can_cancel, // 是否允许取消订单，0 不允许 1 允许
            product: item.product.map(item => ({
              id: item.product_id,
              productName: item.product_name,
              productNumber: item.product_number,
              productPriceSum: (item.product_price_sum * 1 / 100).toFixed(2),
            })),
          };
        });
        resovle({
          list,
          total: +total,
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function getChildOrderDetailApi(data) {
  return new Promise((resovle, reject) => {
    return send({
      url: 'order/admin-order-detail',
      method: 'POST',
      data: objectToLine(data),
    }).then((res) => {
      if (res.data.code === 200) {
        const { data } = res.data;
        resovle({
          orderNo: data.order_no + '',
          orderSubNo: data.order_sub_no + '',
          status: data.order_status + '',
          deliveryType: data.delivery_type + '',
          notes: data.notes + '' || '--', // 备注
          transportationExpenses: ((data.transportation_expenses * 1) / 100).toFixed(2),
          historyStatusList: data.status.map((item) => {
            return {
              createTime: item.create_time,
              status: item.order_status + '',
            };
          }),
          orderPayWay: Array.isArray(data.order_pay_way) ? data.order_pay_way : [],
          shopInfo: {
            shopAddress: data.shop_info && data.shop_info.address,
            shopName: data.shop_info && data.shop_info.shop_name,
            concatName: data.shop_info && data.shop_info.concat_name,
            concatMobile: data.shop_info && data.shop_info.concat_mobile,
            remarks: data.remarks,
          },
          expectArriveTimeStart: data.expect_arrive_time_start,
          expectArriveTimeEnd: data.expect_arrive_time_end,
          expectArriveTime: `${data.expect_arrive_time_start} ~ ${data.expect_arrive_time_end}  `,
          finishTime: data.finish_time,
          orderResource: data.order_resource,
          pickCode: data.pick_code,
          originPrice: (data.origin_price * 1 / 100).toFixed(2),
          couponValue: (data.coupon_value * 1 / 100).toFixed(2) || '0.00',
          realPrice: (data.real_price * 1 / 100).toFixed(2),
          receiveName: data.address_info && data.address_info.receive_name,
          phone: data.address_info && data.address_info.phone,
          address: data.address_info && data.address_info.address,
          productList: data.product.map((item) => {
            return {
              // real_unit_price 剪过优惠后的价格
              productThumbImg: item.product_thumb_img,
              productNumber: item.product_number,
              productSn: item.product_sn,
              productName: item.product_name,
              norms: item.norms,
              price: (item.sale_unit_price * 1 / 100).toFixed(2),
              sumPrice: (item.product_price_sum * 1 / 100).toFixed(2),
              realSumPrice: (((item.real_unit_price * 1) / 100) * item.product_number).toFixed(2),
              realPrice: ((item.real_unit_price * 1) / 100).toFixed(2),
              productPriceSum: (item.product_price_sum * 1 / 100).toFixed(2),
            };
          }),
          logList: data.status.map((item) => {
            return {
              operatorName: item.operator_name,
              updateTime: item.update_time,
              operatorStatus: ORDERSTATUS[item.order_status + ''],
            };
          }),
          mainInfoUserName: data.main_info && data.main_info.user_name,
          mainInfoPhone: data.main_info && data.main_info.phone,
        });
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function getProductListApi(data = {}) {
  return new Promise((resovle, reject) => {
    return send({
      url: 'order/refund/product-list',
      method: 'POST',
      data: objectToLine(data),
    }).then((res) => {
      if (res.data.code === 200) {
        const data = res.data.data;
        resovle(data.map(item => ({
          productId: item.product_id,
          productName: item.product_name,
          barcode: item.barcode,
          productSn: item.product_sn,
          productThumbImg: item.product_thumb_img,
          saleUnitPrice: (item.sale_unit_price * 1 / 100).toFixed(2),
          refundUnitPrice: (item.refund_unit_price * 1 / 100).toFixed(2),
          productNumber: item.product_number * 1,
          payPrice: (((item.sale_unit_price * 1 - item.discount_price) / 100) * item.product_number * 1).toFixed(2),
          refundableNum: item.refundable_num * 1,
          // refundNum: item.refundableNum === 0 ? 0 : 1,
          refundNum: 0,
          refundTotalPrice: item.refundableNum === 0 ? 0 : (item.sale_unit_price * 1 / 100).toFixed(2), // 已废弃

          hasWight: item.product_weight > 0, // 是否有重量
          productWeight: Number(item.product_weight / 1000).toFixed(2), // 单个商品重量（单个商品销售重量）
          productAllWeight: Number(item.product_all_weight / 1000).toFixed(2), // 购买商品总重量(销售重量)
          productAllRefundWeight: Number(item.product_all_refund_weight / 1000).toFixed(2), // 商品可售后总重量

          pickWeight: 0, // 拣货重量
          refundWeight: 0, // 退货重量（kg）
          productAllRefundSum: 0, // 退款金额

        })))
      } else {
        reject(res.data.msg);
      }
    });
  })
}
export function modifyOrderStatusApi(data) {
  return new Promise((resovle, reject) => {
    send({
      url: 'order/modify-status',
      method: 'POST',
      data: Object.assign(objectToLine(data), {
        extra: {
          operator_id: window.localStorage.getItem('userId'),
          operator_name: window.localStorage.getItem('userName'),
          operator_mobile: window.localStorage.getItem('userMobile')
        }
      }),
    }).then((res) => {
      if (res.data.code === 200) {
        resovle();
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function refundOrderTransApi(data) {
  return new Promise((resovle, reject) => {
    send({
      url: 'order/refund-order-trans',
      method: 'POST',
      data: Object.assign(objectToLine(data), {
        extra: {
          // operator_id: window.localStorage.getItem('userId'),
          operator_name: window.localStorage.getItem('userName'),
          operator_mobile: window.localStorage.getItem('userMobile')
        }
      }),
    }).then((res) => {
      if (res.data.code === 200) {
        resovle();
      } else {
        reject(res.data.msg);
      }
    });
  });
}

export function getCompanyListApi(params = {}) {
  const mpConfig = getConfig()
  const { ROOTPATH, basic } = mpConfig
  if (basic.mp_platform === 'cp_plus') {
    return new Promise((resovle, reject) => {
      send({
        url: `${ROOTPATH}company/list`,
        method: 'POST',
        data: {
          limit: maxLimit,
          offset: offset,
        }
      }).then(res => {
        if (res.data.code === 200) {
          let { data: list } = res.data.data
          list = list.map(item => ({
            label: item.company_name,
            value: item.company_id
          }))
          resovle({
            list
          })
        } else {
          reject(res.data.msg)
        }
      }).catch(e => {
        console.log(e, 'company/list')
      })
    })
  } else if (basic.mp_platform === 'cp_cook') {
    return new Promise((resovle, reject) => {
      send({
        url: `${ROOTPATH}admin/org/company/lists`,
        params: { id: basic.mp_company, name: '', ...params, page: 0, size: 10000 }
      }).then(res => {
        if (res.data.code === 0) {
          let { list } = res.data.data
          list = list.map(item => ({
            label: item.name,
            value: item.id
          }))
          resovle({
            list
          })
        } else {
          reject(res.data.msg)
        }
      }).catch(e => {
        console.log(e, 'admin/org/company/lists')
      })
    })
  }
}

export function getShopListApi(params = {}) {
  const mpConfig = getConfig()
  const { ROOTPATH, basic } = mpConfig
  if (basic.mp_platform === 'cp_plus') {
    const { companyId } = params
    return new Promise((resovle, reject) => {
      send({
        url: `${ROOTPATH}shop/list`,
        method: 'POST',
        data: {
          company_id: companyId,
          limit: maxLimit,
          offset: offset,
        }
      }).then(res => {
        if (res.data.code === 200) {
          let { data: list } = res.data.data
          list = list.map(item => ({
            label: item.shop_name,
            value: item.shop_id
          }))
          resovle({
            list
          })
        } else {
          reject(res.data.msg)
        }
      }).catch(e => {
        console.log(e, 'shop/list')
      })
    })
  } else if (basic.mp_platform === 'cp_cook') {
    return new Promise((resovle, reject) => {
      // const id = window.localStorage.getItem('storeId');
      const company_id = window.localStorage.getItem('companyId');
      send({
        url: `${ROOTPATH}admin/org/store/lists`,
        params: { company_id, ...objectToLine(params) }
      }).then(res => {

        if (res.data.code === 0) {
          let { list } = res.data.data
          list = list.map(item => ({
            label: item.name,
            value: item.id
          }))
          resovle({
            list
          })
        } else {
          reject(res.data.msg)
        }
      }).catch(e => {
        console.log(e, 'admin/org/store/lists')
      })
    })
  }
}

export function getReasonApi(data) {
  return new Promise((resovle, reject) => {
    return send({
      url: 'order/refund/reason',
      method: 'POST',
      data: {},
    }).then((res) => {
      if (res.data.code === 200) {
        let data = res.data.data
        let reasons = data.map(item => ({
          reasonId: item.reason_id,
          reasonInfo: item.reason_info
        }))
        resovle(reasons)
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function getPriceApi(data = {}) {
  return new Promise((resovle, reject) => {
    return send({
      url: 'order/refund/price',
      method: 'POST',
      data: objectToLine(data),
    }).then((res) => {
      if (res.data.code === 200) {
        resovle((res.data.data.refund_price / 100).toFixed(2))
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function afterSaleApplyApi(data = {}) {
  return new Promise((resovle, reject) => {
    const productInfo = data.productInfo
    data.productInfo = arrToLine(productInfo)
    return send({
      url: 'order/refund/apply',
      method: 'POST',
      data: objectToLine(data),
    }).then((res) => {
      if (res.data.code === 200) {
        resovle({ res })
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function uploadImgApi(data = {}) {
  return new Promise((resovle, reject) => {
    return send({
      url: 'https://gateway-cp-kitchen-api-dev.cpgroupcloud.com/mp/opinion/upload-img',
      method: 'POST',
      data: objectToLine(data),
    }).then((res) => {
      if (res.data.code === 200) {
        resovle({ res })
      } else {
        reject(res.data.msg);
      }
    });
  });
}
export function exportCSVApi(data = {}) {
  return new Promise((resovle, reject) => {
    return send({
      url: 'order/export-order-csv',
      method: 'POST',
      data: objectToLine(data),
    }).then((res) => {
      if (res.data.code === 200) {
        resovle(res.data)
      } else {
        reject(res.data.msg);
      }
    });
  });
}
