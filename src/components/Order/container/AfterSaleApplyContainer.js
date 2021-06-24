import React, { Component } from 'react'

import OrderAfterSaleApply from '../component/OrderAfterSaleApply'
import { REFUNDTYPES, APPLYTYPE, DELIVERYTYPE, ORDERSTATUS, } from '../constant'
import { RADIO, SELECT, INPUTNUMBER } from '../../../constant'
import { accMul } from "../../../util/data";
import { getReasonApi, afterSaleApplyApi, getChildOrderDetailApi, getProductListApi, getPriceApi, } from '../api'
import { message } from 'antd'
const limitSize = 5 * 1024 * 1024

export default class AfterSaleApplyContainer extends Component {
  state = {
    DELIVERYTYPE,
    ORDERSTATUS,
    filters: {
      refundTypes: {
        dataSource: REFUNDTYPES
      },
      refundReason: {
        dataSource: []
      },
    },
    detail: {}, // 订单详情
    productList: [], // 商品列表
    selectedRowKeys: [], // 列表多选选择
    selectedRows: [], // 列表多选选择

    imgInfo: {
      imgList: [], // 附件图片列表
      previewImage: '', // 图片预览modal
      isPreview: '' // 图片预览modal 显示隐藏控制
    },
    columns: [
      {
        title: '商品名称',
        dataIndex: 'productName',
      },
      {
        title: '69码',
        dataIndex: 'barcode',
      },
      {
        title: '商品编码',
        dataIndex: 'productSn',
      },
      {
        title: '商品图片',
        dataIndex: 'productThumbImg',
        render(text, record, index) {
          return <img src={record.productThumbImg} alt='商品图片' style={{ width: 60 }} />
        }
      },
      {
        title: '售卖价',
        dataIndex: 'saleUnitPrice', // 售卖价与支付金额一样 占龙
      },
      {
        title: '购买数量',
        dataIndex: 'productNumber',
      },
      {
        title: '支付金额',
        dataIndex: 'payPrice',
      },
      {
        title: '可售后商品数量',
        dataIndex: 'refundableNum',
      },
      {
        title: '退款数量',
        dataIndex: 'refundNum',
        editKey: 'refundNum',
        fieldType: INPUTNUMBER,
        max: (record) => {
          return record.refundableNum * 1
        },
        min: (record) => {
          // if (record.refundableNum * 1 === 0) {
          //   return 0
          // } else {
          //   return 1
          // }
          return 0
        },
        setInitialValue: 'min',
        required: false, // 是否为必输项
        onChange: true, // 改变数值后需要回调
        precision: 0 // 数值精度
      },
      // {
      //   title: '单件退款金额',
      //   dataIndex: 'refundTotalPrice',
      //   editKey: 'refundTotalPrice',
      //   fieldType: INPUTNUMBER,
      //   max: (record) => {
      //     return record.payPrice * 1
      //   },
      //   setInitialValue: 'max',
      //   min: 0.01,
      //   required: false,
      //   onChange: true,
      //   precision: 2 // 数值精度
      // },
      {
        title: '可售后重量（针对非标品，kg）',
        dataIndex: 'productAllRefundWeight',
      },
      {
        title: '商品重量（针对非标品，kg）',
        dataIndex: 'productAllWeight',
      },
      // {
      //   title: '拣货重量（针对非标品，kg）',
      //   dataIndex: 'pickWeight',
      //   editKey: 'pickWeight',
      //   fieldType: INPUTNUMBER,
      //   onChange: true, // 改变数值后需要回调
      //   precision: 2, // 数值精度
      //   step: 0.1,
      //   min: 0,
      //   max: (record) => {
      //     return record.productAllRefundWeight * 1
      //   },
      //   setInitialValue: 'min',
      // },
      {
        title: '退货重量（针对非标品，kg）',
        dataIndex: 'refundWeight',
        editKey: 'refundWeight',
        fieldType: INPUTNUMBER,
        onChange: true, // 改变数值后需要回调
        precision: 2, // 数值精度
        step: 0.1,
        min: 0,
        max: (record) => {
          return record.productAllRefundWeight * 1
        },
        setInitialValue: 'min',
      },
      {
        title: '退款金额',
        dataIndex: 'productAllRefundSum',
        editKey: 'productAllRefundSum',
        fieldType: INPUTNUMBER,
        precision: 2, // 数值精度
        step: 0.1,
        min: 0,
        max: (record) => {
          return record.payPrice * 1
        },
        setInitialValue: 'min',
      },

    ],
    basicInfo: [], // 基础信息
    applyInfo: [
      {
        name: '',
        type: RADIO,
        dataSource: REFUNDTYPES
      },
      {
        name: '',
        type: SELECT,
        dataSource: []
      }
    ], // 申请页面显示信息
  }
  componentDidMount() {
    const orderSubNo = this.props.match.params.id
    if (orderSubNo) {
      this.getDetailInfo(orderSubNo)
      this.getProductList(orderSubNo)
      // 已经申请售后且审核通过的订单，再次申请售后，“拣货重量”不可再编辑

    }
    this.getRefundReason()
  }

  getBasicInfo(data) {
    return [
      {
        label: '订单号',
        value: data.orderSubNo,
        space: 2,
      },
      {
        label: '订单状态',
        value: ORDERSTATUS[data.status]
      },
      {
        label: '配送类型',
        value: DELIVERYTYPE[data.deliveryType],
      },
      {
        label: '收货人',
        value: data.receiveName,
      },
      {
        label: '收货人手机号',
        value: data.phone,
      },
    ];
  }

  getDetailInfo = async (orderSubNo) => {
    const res = await getChildOrderDetailApi({
      orderNo: orderSubNo
    })
    const basicInfo = this.getBasicInfo(res);
    this.setState({
      detail: res,
      basicInfo,
    })
  }

  getProductList = async (orderSubNo) => {
    const res = await getProductListApi({
      orderSubNo
    })
    const product = res
    this.setState({
      productList: product
    })
  }
  getRefundReason = async () => {
    const { filters } = this.state
    const list = await getReasonApi()
    filters['refundReason'].dataSource = list
    this.setState({
      filters
    })
  }
  findTarget = (pList, record) => {
    let targetProduct, targetIndex = -1
    for (let i = 0; i < pList.length; i++) {
      let cur = pList[i];
      if (cur.productId === record.productId) {
        // cur.refundNum = record.refundNum
        targetProduct = cur
        targetIndex = i
        break
      }
    }
    return { targetProduct, targetIndex }
  }
  handleSave = (record, editKey, form) => {
    const { productList } = this.state;
    const { setFieldsValue } = form
    const pList = [...productList]
    const { targetProduct, targetIndex } = this.findTarget(pList, record)
    // const dataIndex = record.dataIndex
    if (targetProduct && targetIndex !== -1) {
      if (editKey === 'refundNum') {
        // const params = {
        //   orderSubNo: this.props.match.params.id,
        //   productId: targetProduct.productId,
        //   isPartRefund: true,//isPartRefund(),
        //   applyRefundNum: targetProduct.refundNum * 1
        // }
        // getPriceApi(params).then(res => {
        //   targetProduct.refundTotalPrice = res
        //   pList.splice(targetIndex, 1, { ...targetProduct })
        //   this.setState({
        //     productList: pList
        //   })
        // }).catch(error => {
        //   message.error(error)
        //   return
        // })

        // 按数量退款
        const { saleUnitPrice, refundNum, refundWeight } = record
        // 改变数量时，如果输入了重量
        if(refundWeight){
          return
        }
        // 如果没有输入重量
        record.productAllRefundSum = Number(saleUnitPrice * refundNum).toFixed(2)
        setFieldsValue({
          productAllRefundSum: record.productAllRefundSum
        })
        pList.splice(targetIndex, 1, record)
        this.setState({
          productList: pList
        })
      } 
      // else if (editKey === 'refundTotalPrice') {
      //   pList.splice(targetIndex, 1, record)
      //   this.setState({
      //     productList: pList
      //   })
      // }
       else if (editKey === 'pickWeight') { // 拣货重量
        debugger
        const { productAllWeight, pickWeight, payPrice } = record
        // 退货重量
        const newRefundWeight = productAllWeight - pickWeight
        record.refundWeight = Number(newRefundWeight).toFixed(2) // 销售重量 - 拣货重量
        // 退款金额
        record.productAllRefundSum = Number(newRefundWeight / productAllWeight * payPrice).toFixed(2)
        setFieldsValue({
          refundWeight: record.refundWeight,
          productAllRefundSum: record.productAllRefundSum
        })
        // 退款数量
        const { productWeight, refundWeight } = record
        // 退款数量
        record.refundNum = Math.floor(Number(refundWeight / productWeight))
        // debugger
        setFieldsValue({
          refundNum: record.refundNum,
        })
        pList.splice(targetIndex, 1, record)
        this.setState({
          productList: pList
        })
      } else if (editKey === 'refundWeight') { // 退货重量
        const { productAllWeight, productWeight, payPrice, refundWeight } = record
        // 退款金额
        record.productAllRefundSum = Number(refundWeight / productAllWeight * payPrice).toFixed(2)
        // 退款数量
        record.refundNum = Math.floor(Number(refundWeight / productWeight))
        setFieldsValue({
          productAllRefundSum: record.productAllRefundSum,
          refundNum: record.refundNum,
        })
        pList.splice(targetIndex, 1, record)
        this.setState({
          productList: pList
        })
      }else{
        pList.splice(targetIndex, 1, record)
        this.setState({
          productList: pList
        })
        
      }
    } else {
      console.log('未找到targetProduct~~')
    }
  }

  selectOnChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    })
  }

  submitGood = async val => {
    const { selectedRows, selectedRowKeys, productList } = this.state
    if (!selectedRowKeys.length) {
      message.error('请勾选要申请售后的商品')
      return
    }
    const subImgList = []
    const isPartRefund = () => {
      const allProductNum = productList.reduce((pre, item) => pre + item.refundableNum * 1, 0)
      const allSelectedProductNum = selectedRows.reduce((pre, item) => pre + item.refundNum * 1, 0)
      return allSelectedProductNum < allProductNum
    }
    const genSelectedProduct = () => {
      const map = new Map()
      selectedRowKeys.forEach(item => {
        map.set(item, 1)
      })
      const result = []
      productList.forEach(item => {
        if (map.has(item['productId'])) {
          result.push({
            productId: item.productId,
            refundNum: item.refundNum,
            refundWeight:accMul(item.refundWeight, 1000),
            // refundTotalPrice: accMul(item.refundTotalPrice, 100)
            productAllRefundSum: accMul(item.productAllRefundSum, 100)
          })
        }
      })
      return result
    }
    const selectedItems = genSelectedProduct()
    const realPrice = selectedItems.reduce((pre, cur) => {
      // return pre + cur.refundTotalPrice * 1
      return pre + cur.productAllRefundSum * 1
    }, 0)
    const params = {
      orderSubNo: this.props.match.params.id,
      productInfo: selectedItems,
      reasonId: val.reasonId,
      refundNotes: val.refundNotes,
      refundType: val.refundType,
      picInfo: subImgList.join(','),
      realPrice: Number(realPrice).toFixed(2),
      isPartRefund: isPartRefund(),
      applyType: APPLYTYPE,
      applyUser: window.localStorage.getItem('userId'),
      applyMobile: window.localStorage.getItem('userMobile'),
      applyName: window.localStorage.getItem('userName'),
    }
    console.log(JSON.stringify(params), 'params~~')
    // return 
    const { res } = await afterSaleApplyApi(params)
    if (res) {
      message.success('保存成功', .5, () => {
        this.goBack()
      })
    } else {
      message.error(res.data.msg, .5)
      return
    }
  }

  beforeUpload = file => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('上传类型错误jpg png格式')
      return false
    }
    const limit = file.size < limitSize
    if (!limit) {
      message.error('图片不能大于5M')
      return false
    }
  }

  imgChange = fileList => {
    const { imgInfo } = this.state // imgList
    this.setState({ imgInfo: { ...imgInfo, ...{ imgList: fileList } } })
  }

  handlePreview = file => {
    const { imgInfo } = this.state
    this.setState({
      imgInfo: { ...imgInfo, ...{ previewImage: file.url || file.thumbUrl, isPreview: true } }
    })
  }

  handleCancel = () => {
    const { imgInfo } = this.state
    this.setState({ imgInfo: { ...imgInfo, ...{ isPreview: false } } })
  }

  uploadAction = async (file) => {
    console.log(file, 'file~')
    // await uploadImgApi()

  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <OrderAfterSaleApply
        {...this.state}
        refundType={REFUNDTYPES}
        handleSave={this.handleSave}
        submitGood={this.submitGood}
        goBack={this.goBack}
        selectOnChange={this.selectOnChange}
        beforeUpload={this.beforeUpload}
        handleCancel={this.handleCancel}
        handlePreview={this.handlePreview}
        uploadAction={this.uploadAction}
      />
    )
  }
}
