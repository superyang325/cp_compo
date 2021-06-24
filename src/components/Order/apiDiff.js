import send from '../../util/send';
// import { objectToLine, arrToLine } from '../../util/objectConvert';
// import { ORDERSTATUS } from './constant';

const maxLimit = 100000;
const offset = 0;
export function getCompanyListCPPlusApi(params={}){
  return new Promise((resovle,reject)=>{
    send({
      url: 'https://gateway-cp-kitchen-admin-api-dev.cpgroupcloud.com/company/list',//'enum/company-list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
      }
    }).then(res => {
      if (res.data.code === 200) {
        let {data:list} = res.data.data
        list = list.map(item => ({
          label:item.company_name,
          value:item.company_id
        }))
        resovle({
          list
        })
      }else{
        reject(res.data.msg)
      }
    })
  })
}
export function getCompanyListCPCookApi(params={}){
  return new Promise((resovle,reject)=>{
    send({
      url: 'https://gateway-cp-kitchen-admin-api-dev.cpgroupcloud.com/company/list',//'enum/company-list',
      method: 'POST',
      data: {
        limit: maxLimit,
        offset: offset,
      }
    }).then(res => {
      if (res.data.code === 200) {
        let {data:list} = res.data.data
        list = list.map(item => ({
          label:item.company_name,
          value:item.company_id
        }))
        resovle({
          list
        })
      }else{
        reject(res.data.msg)
      }
    })
  })
}
export function getShopListCPPlusApi(params={}){
  const {companyId } = params
  return new Promise((resovle,reject)=>{
    send({
      url: 'https://gateway-cp-kitchen-admin-api-dev.cpgroupcloud.com/shop/list',//'enum/shop-list',
      method: 'POST',
      data: {
        company_id: companyId,
        limit: maxLimit,
        offset: offset,
      }
    }).then(res => {
      if (res.data.code === 200) {
        let {data:list} = res.data.data
        list = list.map(item => ({
          label:item.shop_name,
          value:item.shop_id
        }))
        resovle({
          list
        })
      }else{
        reject(res.data.msg)
      }
    })
  })
}
export function getShopListCPCookApi(params={}){
  const {companyId } = params
  return new Promise((resovle,reject)=>{
    send({
      url: 'https://gateway-cp-kitchen-admin-api-dev.cpgroupcloud.com/shop/list',//'enum/shop-list',
      method: 'POST',
      data: {
        company_id: companyId,
        limit: maxLimit,
        offset: offset,
      }
    }).then(res => {
      if (res.data.code === 200) {
        let {data:list} = res.data.data
        list = list.map(item => ({
          label:item.shop_name,
          value:item.shop_id
        }))
        resovle({
          list
        })
      }else{
        reject(res.data.msg)
      }
    })
  })
}