import moment from 'moment';
// import { routes } from '../routes'

// import {
//   MPAfterSale,
//   MPAfterSaleDetail,
//   MPOrderChild,
//   MPOrderParent,
//   MPOrderDetail,
//   MPAfterSaleApply
// } from '../main'
// console.log(routes,'routes!!')
 const pageParamsKey = 'listPageParamsMiddle';
 const dateFormatStr = 'YYYY-MM-DD';

const routes = [
  // {
  //   path: '/order/order_manage',
  //   component: MPOrderParent,
  //   exact: true,
  //   name: '主单列表',
  //   key: 'MPOrderParent',
  // },
  // {
  //   path: '/order/order_list_child',
  //   component: MPOrderChild,
  //   exact: true,
  //   name: '子单列表',
  //   key: 'MPOrderChild',
  // },
  // {
  //   path: '/order/order_list_child/:id',
  //   component: MPOrderChild,
  //   exact: true,
  //   name: '子单列表',
  //   key: 'MPOrderChild',
  // },
  // {
  //   path: '/order/order_list_child/order_detail/:id',
  //   component: MPOrderDetail,
  //   exact: true,
  //   name: '订单详情',
  //   key: 'MPOrderDetail',
  // },
  // {
  //   path: '/order/order_list_child/after_sale_apply/:id',
  //   component: MPAfterSaleApply,
  //   exact: true,
  //   name: '申请售后',
  //   key: 'MPAfterSaleApply',
  // },
  // {
  //   path: '/aftersale/after_sale',
  //   component: MPAfterSale,
  //   exact: true,
  //   name: '售后列表',
  //   key: 'MPAfterSale',
  // },
  // {
  //   path: '/aftersale/after_sale/detail/:id',
  //   component: MPAfterSaleDetail,
  //   exact: true,
  //   name: '售后详情',
  //   key: 'MPAfterSaleDetail',
  // },
]

function getPathMap(data) {
  let pathMap = new Map();
  data.forEach(group => {
    pathMap.set(group.path, group.key);
  })
  return pathMap
}
let pathMap = getPathMap(routes);

export const listPageParams = {
  getParams(props, isCustom, callBack) {
    let pageParamsStr = window.sessionStorage.getItem(pageParamsKey);
    let currentPageKey = pathMap.get(props.match.path);
    if (pageParamsStr) {
      try {
        let pageParams = JSON.parse(pageParamsStr);
        // window.sessionStorage.removeItem(pageParamsKey);
        // 如果存储的参数确实是当前页面的
        if (pageParams.key === currentPageKey) {
          window.sessionStorage.removeItem(pageParamsKey);
          if (isCustom) { // 自定义存储的参数
            return pageParams;//将数据全部返回，到使用的页面进行处理
          } else {
            //设置时间及其他表单字段
            this.setFormFieldsValue(props, pageParams, callBack);
            return pageParams.pagination;
          }
        }
      } catch (e) {
        console.log('解析sessionStorage信息报错');
        console.log(e);
        return null;
      }
    } else {
      return null;
    }
  },
  setFormFieldsValue(props, pageParams, callBack) {
    let { formParams, dateFormat, dateFields } = pageParams;
    if (dateFields.length) {
      dateFields.forEach(dateField => {
        if (typeof formParams[dateField] === 'string') {
          formParams[dateField] = moment(formParams[dateField], dateFormat);
        } else if (Array.isArray(formParams[dateField])) {
          for (let i = 0; i < formParams[dateField].length; i++) {
            formParams[dateField][i] = moment(formParams[dateField][i], dateFormat);
          }
        }
      })
    }
    props.form.setFieldsValue(formParams);
    callBack && callBack(formParams)
  },
  setParams(props, pagination, dateFormat = dateFormatStr, customParams) {
    let key = pathMap.get(props.match.path);
    if (key) {
      let pageParams = {};
      // 自定义存储参数,
      if (customParams) {
        pageParams = {
          key,
          pagination,// 页码信息 内部约定两个属性currentPage,pageSize
          formParams: customParams,//其他自定义参数
        }
      } else {
        let form = props.form;
        let formParams = form.getFieldsValue();
        let dateFields = [];
        this.checkMoment(formParams, dateFormat, dateFields);
        pageParams = {
          key,
          pagination,// 页码信息 内部约定两个属性currentPage,pageSize
          formParams,// 表单信息
          dateFormat,// 日期格式
          dateFields,// 日期字段数组
        };
      }
      window.sessionStorage.setItem(pageParamsKey, JSON.stringify(pageParams));
    }
  },
  checkMoment(formParams, dateFormat, dateFields) {
    let allFields = Object.keys(formParams);
    allFields.forEach(field => {
      let curValue = formParams[field];
      if (typeof curValue === 'object') {
        if (Array.isArray(curValue)) {
          let dateArr = [];
          for (let i = 0; i < curValue.length; i++) {
            if (moment.isMoment(curValue[i])) {
              let dateStr = curValue[i].format(dateFormat);
              dateArr.push(dateStr);
              if (dateFields.indexOf(field) === -1) {
                dateFields.push(field);
              }
            } else {
              dateArr.push(curValue[i]);
            }
          }
          formParams[field] = dateArr;
        } else {
          if (moment.isMoment(curValue)) {
            formParams[field] = formParams[field].format(dateFormat);
            dateFields.push(field);
          }
        }
      }
    })
  }
}

//pagination 参数格式
// let demoPagination = {
//   currentPage: 0,
//   pageSize: 10,
// }
//能处理的表单数据格式 即通过form.getFieldsValue()取到的格式
//主要针对包含时间的字段，其他形式的目前不支持 可以使用第四个参数自定义存储
// let demoFormValues = {
//   dateObj: 'moment对象',
//   dateArr: ['moment对象1', 'moment对象2'],//数组里面全是moment对象
// };

//pageParams 数据格式
// let demoPageParams = {
//   key: 'pageKey',
//   pagination: demoPagination,
//   formParams: {
//     name: '',
//     date1: demoFormValues.dateObj,
//     date2: demoFormValues.dateArr,
//   },
//   dateFormat: 'YYYY-MM-DD',
//   dateFields: ['date1', 'date2'],
// }