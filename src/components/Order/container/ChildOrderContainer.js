import { Button, Col, Divider, message, Row, Popconfirm, Modal, Form, Input, Popover } from 'antd';
import React, { Component, Fragment } from 'react';
import ListPage from '../../../component/ListPage';
import OrderPrint from '../component/OrderPrint'
import {
  getChildOrderListApi, //子订单列表
  modifyOrderStatusApi,
  getCompanyListApi,
  getShopListApi,
  getChildOrderDetailApi,
  exportCSVApi,
  refundOrderTransApi
} from '../api';
import {
  ORDERSTATUS, DELIVERYTYPE, PAYTYPE, PRINT,
  BATCHBEIHUO,
  BATCHZHIZUO,
  BATCHFAHUO,
  BATCHJIEDAN,
  BATCHWANCHENG,
  ORDERTYPE,
} from '../constant';
import { DATERANGE, INPUT } from '../../../constant'
import { objectToLine, } from '../../../util/objectConvert'
import { isExceedRange, getThreeMonthRange } from '../../../util/date'
import { listPageParams } from '../../../util/listPageParams'
const orderSubNo = 'orderSubNo'
const FREIGHTBACK = 'FREIGHTBACK'
const TOAPPLY = 'TOAPPLY'
function getOrderStatusList() {
  const result = [
    {
      value: '',
      label: '全部',
    },
  ];
  Object.keys(ORDERSTATUS).forEach((key) => {
    result.push({
      value: key,
      label: ORDERSTATUS[key],
    });
  });
  return result;
}
function getOrderOper(order) {
  const operToStatusMap = {
    100: [
      {
        label: '取消订单',
        status: '900',
        // block: order.canCancel === 0,
        // blockCb() {
        //   message.info('已申请过售后的订单不可取消')
        // },
        disabled: order.canCancel === 0,
      },
    ],
    200: [
      (order) => {
        const deliveryTypeToOperMap = {
          1: {
            //外卖
            label: '接单',
            status: '300',
          },
          2: {
            //自提
            label: '接单',
            status: '300',
          },
          3: {
            //堂食
            label: '接单',
            status: '300',
          },
        };
        return deliveryTypeToOperMap[order.deliveryType];
      },
      {
        label: '取消订单',
        status: '900',
        // block: order.canCancel === 0,
        // blockCb() {
        //   message.info('已申请过售后的订单不可取消')
        // },
        disabled: order.canCancel === 0,
      },
      (order) => {
        const deliveryTypeToOperMap = {
          1: {
            //外卖
            label: '退运费',
            operation: FREIGHTBACK,
            disabled: order.canRefundTrans === 0
          },
        };
        return deliveryTypeToOperMap[order.deliveryType];
      },
      {
        label: '申请售后',
        noPop: true,
        operation: TOAPPLY
      },
    ],
    300: [
      (order) => {
        const deliveryTypeToOperMap = {
          1: {
            //外卖
            label: '完成备货',
            status: '400',
          },
          2: {
            //自提
            label: '完成备货',
            status: '600',
          },
          3: {
            //堂食
            label: '开始制作',
            status: '500',
          },
        };
        return deliveryTypeToOperMap[order.deliveryType];
      },
      (order) => {
        const deliveryTypeToOperMap = {
          1: {
            //外卖
            label: '退运费',
            operation: FREIGHTBACK,
            disabled: order.canRefundTrans === 0
          },
        };
        return deliveryTypeToOperMap[order.deliveryType];
      },
      {
        label: '取消订单',
        status: '900',
        // block: order.canCancel === 0,
        // blockCb() {
        //   message.info('已申请过售后的订单不可取消')
        // },
        disabled: order.canCancel === 0,
      },
      // “备货中/配送中”，支持申请售后
      {
        label: '申请售后',
        noPop: true,
        operation: TOAPPLY
      },
    ],
    400: [
      {
        label: '发货',
        status: '410',
      },
      {
        label: '取消订单',
        status: '900',
        // block: order.canCancel === 0,
        // blockCb() {
        //   message.info('已申请过售后的订单不可取消')
        // },
        disabled: order.canCancel === 0,
      },
      (order) => {
        const deliveryTypeToOperMap = {
          1: {
            //外卖
            label: '退运费',
            operation: FREIGHTBACK,
            disabled: order.canRefundTrans === 0
          },
        };
        return deliveryTypeToOperMap[order.deliveryType];
      },
      {
        label: '申请售后',
        noPop: true,
        operation: TOAPPLY
      },
    ],
    410: [
      {
        label: '完成订单',
        status: '700',
      },
      (order) => {
        const deliveryTypeToOperMap = {
          1: {
            //外卖
            label: '退运费',
            operation: FREIGHTBACK,
            disabled: order.canRefundTrans === 0
          },
        };
        return deliveryTypeToOperMap[order.deliveryType];
      },
      {
        label: '申请售后',
        noPop: true,
        operation: TOAPPLY
      },
    ],
    500: [
      {
        //堂食
        label: '完成制作',
        status: '510',
      },
      {
        label: '申请售后',
        noPop: true,
        operation: TOAPPLY
      },
    ],
    510: [
      {
        title: '取餐',
        label: '取餐（堂食)',
        status: '700',
        filter: []
      },
      {
        label: '申请售后',
        noPop: true,
        operation: TOAPPLY
      },
    ],
    600: [
      {
        label: '取消订单',
        status: '900',
        // block: order.canCancel === 0,
        // blockCb() {
        //   message.info('已申请过售后的订单不可取消')
        // },
        disabled: order.canCancel === 0,
      },
      {
        title: '自提',
        label: '自提',
        status: '700',
        filter: []
      },
      {
        label: '申请售后',
        noPop: true,
        operation: TOAPPLY
      },
    ],
    700: [
      {
        label: '打印',
        operation: PRINT
      },
      {
        label: '申请售后',
        noPop: true,
        operation: TOAPPLY
      },
    ],
    900: [
      (order) => {
        const deliveryTypeToOperMap = {
          1: {
            //外卖
            label: '退运费',
            operation: FREIGHTBACK,
            disabled: order.canRefundTrans === 0
          },
        };
        return deliveryTypeToOperMap[order.deliveryType];
      },
    ]
  };
  return operToStatusMap[order.orderStatus] || [];
}

class ChildOrderContainer extends Component {
  listPageProps;
  state = {
    modalInfo: {
      visible: false,
      title: '',
      contentText: '',
      confirmLoading: false,
      filter: [],
      record: {}
    },
    dataSource: [],
    filters: [
      {
        title: '公司',
        name: 'companyId',
        dataSource: [],
        required: true,
        message: '公司名称不能为空!',
      },
      {
        title: '门店',
        name: 'shopId',
        dataSource: [],
      },
      {
        title: '订单类型',
        name: 'orderType',
        dataSource: ORDERTYPE,
      },
      {
        title: '订单状态',
        name: 'orderStatus',
        dataSource: getOrderStatusList(),
      },
      {
        title: '订单号',
        name: 'orderNo',
      },
      {
        title: '配送方式',
        name: 'deliveryType',
        dataSource: [
          {
            label: '外卖',
            value: '1',
          },
          {
            label: '自提',
            value: '2',
          },
          {
            label: '堂食',
            value: '3',
          },
        ],
      },
      {
        title: '下单时间',
        name: 'createTime',
        dataSource: DATERANGE,
      },
      {
        title: '收货电话',
        name: 'phone',
      },
      {
        title: '支付方式',
        name: 'payChannel',
        dataSource: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '储值',
            value: '2',
          },
          {
            label: '微信',
            value: '1',
          },
        ],
      },
      {
        title: '自提码',
        name: 'pickCode',
      },
      {
        title: '商品名称',
        name: 'productName',
      },
    ],
    selectedRowKeys: [], // 列表多选选择
    selectedRows: [], // 列表多选选择
    columns: [
      {
        title: '订单号',
        dataIndex: 'orderSubNo',
        align: 'center',
        width: 250,
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        align: 'center',
        width: 100,
        render: (val) => {
          return ORDERSTATUS[val];
        },
      },
      {
        title: '配送类型',
        dataIndex: 'deliveryType',
        align: 'center',
        width: 100,
        render: (val) => {
          return DELIVERYTYPE[val];
        },
      },
      {
        title: '订单类型',
        dataIndex: 'orderType',
        align: 'center',
        width: 100,
        render: (val) => {
          const target = ORDERTYPE.find(item => item.value === val)
          return target?.label;
        },
      },
      {
        title: '商品信息',
        dataIndex: 'product',
        align: 'center',
        width: 200,
        render(text,record){
          const title = '商品信息'
          let names = ''
          text.forEach(item => {
            names += item.productName
          })
          const shotName = names.length > 10 ? names.slice(0,10) + '...' : names
          const content = text.map(item => (<Fragment key={item.id}>
            <span>{item.productName} * {item.productNumber} ({item.productPriceSum} 元)</span>
            <br/>
          </Fragment>))
          return <Popover title={title} content={content}>
            {shotName}
          </Popover>
        }
      },
      {
        title: '门店名称',
        width: 220,
        dataIndex: 'shopName',
        align: 'center',
      },
      {
        title: '创建时间',
        width: 120,
        dataIndex: 'createTime',
        align: 'center',
      },
      {
        title: '收货人姓名',
        width: 110,
        dataIndex: 'receiveName',
        align: 'center',
      },
      {
        title: '收货人手机号',
        width: 140,
        dataIndex: 'phone',
        align: 'center',
      },
      {
        title: '自提码',
        width: 120,
        dataIndex: 'pickCode',
        align: 'center',
      },
      {
        title: '价格',
        width: 120,
        dataIndex: 'realPrice',
        align: 'center',
      },
      {
        title: '运费',
        width: 120,
        dataIndex: 'transPrice',
        align: 'center',
      },
      {
        title: '支付方式',
        dataIndex: 'orderPayWay',
        width: 120,
        align: 'center',
        render: (val) => {
          return val
            .map((item) => {
              return PAYTYPE[item];
            })
            .join(' | ');
        },
      },
      {
        title: '收货地址',
        dataIndex: 'address',
        width: 300,
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        fixed: 'right',
        width: 225,
        render: (val, record) => {
          const oper = getOrderOper(record);
          return (
            <Fragment>
              <a onClick={() => this.onLinkRouter(record.orderSubNo)}>查看订单</a>
              <span>
                {oper.map((item, index) => {
                  const style = {}
                  typeof item === 'function' && (item = item(record));
                  if (!item) return null
                  /*noPop 代表不需要二次确认弹框*/
                  const conditionNoPop = item.noPop // 
                  /*取消订单特殊处理:判断是否已经申请过售后*/
                  let conditionBlock = item.block
                  // if (conditionBlock) {
                  //   style.color = '#999'
                  // } else {
                  //   style.color = '#1890ff'
                  // }
                  const onConfirm = () => {
                    this.setState({ visible: false }, () => {
                      /* 
                        operation:PRINT 打印操作
                        operation:FREIGHTBACK 退运费操作
                        operation:undefined 修改订单状态操作
                      */
                      if (item.operation === PRINT) { // 打印
                        this.onPrint(record)
                      } else if (item.operation === FREIGHTBACK) { // 退运费
                        this.onFrieightBack(record)
                      } else if (item.operation === TOAPPLY) { // 申请售后
                        this.toApply(record)
                      } else {
                        /* 更改订单状态 */
                        // if (conditionBlock) {
                        //   item.blockCb && item.blockCb()
                        // } else {
                        //   this.onModifyOrder(record, item.status, item);
                        // }
                        this.onModifyOrder(record, item.status, item);
                      }
                    });
                  }
                  const onVisibleChange = visible => {
                    if (!visible) {
                      this.setState({ visible });
                      return;
                    }
                    if (conditionNoPop) {
                      onConfirm(); // 不进行二次弹框确认 直接回调
                    } else {
                      this.setState({ visible });
                    }
                  }
                  // 按钮是否可以点击
                  let disabled = item.disabled
                  return (
                    <React.Fragment key={index}>
                      <Divider type="vertical" />
                      <Popconfirm
                        title={`确定${item.label}?`}
                        okText="确定"
                        cancelText="取消"
                        onVisibleChange={onVisibleChange}
                        onConfirm={onConfirm}
                      >
                        <a href='#' style={{ wordBreak: 'keep-all', ...style }} disabled={disabled}>
                          {item.label}
                        </a>
                      </Popconfirm>
                    </React.Fragment>
                  );
                })}
              </span>
            </Fragment>
          );
        },
      },
    ],
    visible: false,
    batchOperation: [
      {
        batchType: BATCHJIEDAN,
        name: '批量接单',
        title: '批量接单',
        contentText: '确定批量接单吗？',
        currentStatus: [200], // 当前状态 过滤用
        deliveryType: [1, 2, 3], // 批量接单针对:自提 外卖 堂食
        status: 300,
      },
      {
        batchType: BATCHBEIHUO,
        name: '批量完成备货',
        title: '批量完成备货',
        contentText: '确定批量完成备货吗？',
        currentStatus: [300], // 当前状态 过滤用
        deliveryType: [1, 2], // 批量备货针对:外卖+自提
        status: 600, //  待自提（自提） 600(自提)/ 400(外卖) 与后端(李康)约定都送 600
      },
      {
        batchType: BATCHZHIZUO,
        name: '批量完成制作', // 存在歧义 开始制作还是制作完成 已找产品确定（批量完成制作）
        title: '批量完成制作',
        contentText: '确定批量完成制作吗？',
        currentStatus: [500], // 当前状态 过滤用
        deliveryType: [3], // 批量制作针对:堂食
        status: 510, // 制作完成，待取餐（堂食）
      },
      {
        batchType: BATCHFAHUO,
        name: '批量发货',
        title: '批量发货',
        contentText: '确定批量发货吗？',
        currentStatus: [400], // 当前状态 过滤用
        deliveryType: [1], // 批量发货针对:外卖
        status: 410, // 配送中（外卖）
      },
      {
        batchType: BATCHWANCHENG,
        name: '批量完成',
        title: '批量完成',
        contentText: '确定批量完成吗？',
        currentStatus: [410, 600, 510], // 当前状态 过滤用
        deliveryType: [1, 2, 3], // 批量完成针对:外卖 自提 堂食
        status: 700, // 完成
      },
      // {
      //   name: '批量确认送达',
      //   title: '批量确认送达',
      //   contentText: '确定批量确认送达吗？',
      //   currentStatus:'', // 当前状态 过滤用
      //   status:700,
      // },
    ],
    pageInfo: {
      current: 1,
      pageSize: 10,
    },
    loading: {
      tableLoading: false,
    },
    printData: {
      productList: [],
      orderPayWay: [],
      shopInfo: {},
      historyStatusList: []
    },
    filterParams: {}
  };
  cacheParams = {}
  onLinkRouter = (orderNo) => {
    this.setPageParams();
    // 如果列表页的loation可能含有查询参数，则当该页跳转子页面时需要传递额外参数state
    this.props.history.push({
      pathname: `/order/order_list_child/order_detail/${orderNo}`,
    });
  };
  setPageParams = () => {
    const { pageInfo: { current, pageSize } } = this.state;
    let pagination = { currentPage: current, pageSize: pageSize };
    listPageParams.setParams(this.listPageProps, pagination);
  }
  getListPageProps = (props) => {
    this.listPageProps = props
  }
  componentDidMount() {
    const orderNo = this.props.match.params.id || '';
    let pagination = listPageParams.getParams(this.listPageProps, undefined, formParams => {
      this.selectChange(formParams['companyId'], {
        name: 'companyId',
      })
    });
    if (pagination) {
      let { currentPage: current, pageSize } = pagination;
      this.setState({ pageInfo: { current, pageSize } }, () => {
        const { form: { getFieldsValue } } = this.listPageProps
        const params = getFieldsValue()
        this.getChildOrder({ ...params, orderNo: '', orderSubNo: params.orderNo}); // orderNo: '', orderSubNo: params.orderNo
      });
    } else {
      this.getChildOrder({ orderNo });
    }
    this.getCompanyList()
  }
  getChildOrder = (
    params = this.cacheParams,
    pageInfo = this.state.pageInfo
  ) => {
    const { loading } = this.state;
    if (loading.tableLoading) {
      return;
    }
    this.setState({
      loading: Object.assign({}, loading, { tableLoading: true }),
    });
    getChildOrderListApi(Object.assign({}, pageInfo, params))
      .then(({ list, total }) => {
        this.setState({
          dataSource: list,
          loading: Object.assign({}, loading, { tableLoading: false }),
          pageInfo: Object.assign({}, pageInfo, { total }),
        });
        this.cacheParams = params;
        this.resetSelectedKeys(list)
      })
      .catch((err) => {
        message.error(err);
      });
  };
  // 已选中的条目
  resetSelectedKeys = (list) => {
    const { selectedRowKeys } = this.state
    if (selectedRowKeys.length) {
      let map = new Map()
      selectedRowKeys.forEach(item => {
        map.set(item, 1)
      })
      let selectedRows = list.filter(item => map.has(item[orderSubNo]))
      this.setState({
        selectedRows
      })
    }
  }
  getCompanyList = async () => {
    const { list: companyList } = await getCompanyListApi()
    const { filters } = this.state
    const targetFilter = filters.find(item => item.name === 'companyId')
    filters.splice(0, 1, Object.assign({}, targetFilter, { dataSource: companyList }))
    this.setState({
      filters
    })
  }
  selectChange = (value, filter) => {
    const { filters } = this.state
    if (filter['name'] === 'companyId') {
      let companyId = value
      getShopListApi({ companyId }).then(({ list: shopList }) => {
        filters.splice(1, 1, Object.assign({}, filters[1], { dataSource: shopList }))
        this.setState({
          filters
        })
      })
    }
  }
  onChangePage = (current, pageSize) => {
    this.getChildOrder(this.cacheParams, { current, pageSize });
  };
  onSearch = (params = {}, validateFields) => {
    validateFields((err, vals) => {
      if (err) return
      if (params['createTime'] && params['createTime'][0]) {
        params['startTime'] = params['createTime'][0].format('YYYY-MM-DD');
        params['endTime'] = params['createTime'][1].format('YYYY-MM-DD');
        delete params['createTime'];
        if (isExceedRange(params['startTime'], params['endTime'])) {
          message.error('时间范围不能超过3个月')
          return
        }
      }
      this.setState({
        filterParams: params,
      })
      this.getChildOrder({ ...params, ...{ orderNo: '', orderSubNo: params.orderNo } },
        { ...this.state.pageInfo });
    })
  };

  onReset = (params = {}) => {
    this.onChangePage(Object.assign({}, params, { page: 1, page_size: 10 }));
  };
  onRefresh = () => {
    this.getChildOrder();
  };
  onCancleOrder = (orderSubNo) => {
    modifyOrderStatusApi({ orderNo: orderSubNo, orderStatus: 1000 }).then(
      () => {
        this.getChildOrder();
        message.success('修改成功');
      },
      (err) => {
        message.error(err);
      }
    )
  }
  // 退运费
  onFrieightBack = (record) => {
    const params = {
      orderNo: record.orderSubNo,
      transAmount: record.transPrice,
    }
    refundOrderTransApi(params).then(() => {
      this.getChildOrder();
      message.success('退款成功');
    }, (err) => {
      message.error(err);
    })
  }

  // columnsOperation = (status) => {
  //   return this.toApply
  // }

  toApply = (record) => {
    this.setPageParams();
    this.props.history.push({
      pathname: `/order/order_list_child/after_sale_apply/${record.orderSubNo}`,
    });
  }
  // 操作列 该方法 给 modalInfo 赋值 orderSubNo orderNo
  onModifyOrder = (record, status, item) => {
    const { orderSubNo: orderNo } = record
    // 不需要form弹框 不需要改变订单状态的操作（如打印、申请售后。。。）
    if (!item.filter) {
      // 不需要form弹框 如接单等操作
      this.onModifyOrderState([orderNo], status, item)
    } else if (item.filter) {
      // 需要form弹框 如取餐码/提货码 等
      this.setModalInfoState(item, [{
        name: 'pickCode',
        title: item.title + '码',
        type: INPUT,
        status: item.status,
      }], record)
    }
  }

  onModifyOrderState = (orderNos, status) => {
    // 修改订单状态 / 非取餐码、自提码
    const extra = {
      operatorId: window.localStorage.getItem('userId'),
      operatorType: 'admin',
      operatorName: window.localStorage.getItem('userName'),
      operatorMobile: window.localStorage.getItem('userMobile'),
      desc: ''
    }
    modifyOrderStatusApi({ orderNo: orderNos, orderStatus: status, extra: objectToLine(extra) }).then(
      () => {
        message.success('操作成功');
        this.onModalCancel()
        this.getChildOrder();
      },
      (err) => {
        message.error(err);
      }
    );
  }

  onModalOk = async (e, modalInfo) => {
    e.preventDefault()
    const {
      filter,
      record,
      status,
      // batchType,
      currentStatus,
      deliveryType
    } = modalInfo
    const { dataSource } = this.state
    if (filter && filter.length) {
      const { form } = this.props
      form.validateFields(async (err, val) => {
        if (err) return
        const target = dataSource.filter(item => item.orderSubNo === record.orderSubNo)
        const targetCode = target[0].pickCode
        if (val.pickCode === targetCode) {
          this.onModifyOrderState([target[0].orderSubNo], filter[0].status)
        } else {
          message.error(`${filter[0].title}错误`)
          return
        }
      })
    } else {
      const { selectedRows } = this.state
      let unDealOrders = []
      unDealOrders = selectedRows.map(item => {
        if (currentStatus.includes(item.orderStatus) && deliveryType.includes(item.deliveryType)) {
          return item.orderSubNo
        } else {
          return false
        }
      })
      unDealOrders = unDealOrders.filter(item => item)
      if (!unDealOrders.length) {
        message.error('无可操作订单')
        return
      }
      this.onModifyOrderState(unDealOrders, status)
    }
  }

  // 关闭弹框
  onModalCancel = () => {
    const { modalInfo } = this.state
    this.setState({
      modalInfo: { ...modalInfo, ...{ visible: false } }
    })
  }

  renderInput = (filter) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label={filter['title']} key={filter['name']}>
        {getFieldDecorator(filter['name'], {
          rules: [{ required: true, message: `请输入${filter['title']}` }], initialValue: ''
        })(<Input />)}
      </Form.Item>
    );
  }

  onPrint = async (record) => {
    const detail = await getChildOrderDetailApi({ orderNo: record.orderSubNo }) // 获取详情 打印用
    this.setState({
      printData: detail
    }, () => {
      this.prePrint()
    })
  }

  prePrint = () => {
    const el = document.getElementById('i-print-wrapper')
    const iframe = document.createElement('IFRAME')
    let doc = null
    iframe.setAttribute(
      'style',
      'position:absolute;width:0px;height:0px;left:500px;top:500px;'
    )
    document.body.appendChild(iframe)
    doc = iframe.contentWindow.document
    doc.write(el.innerHTML)
    doc.close()
    iframe.contentWindow.focus()
    iframe.contentWindow.print()
    if (navigator.userAgent.indexOf('MSIE') > 0) {
      document.body.removeChild(iframe)
    }
  }

  onRangeChange = (date) => {
    const { cacheParams } = this
    if (date.length) {
      let startTime = date[0].format('YYYY-MM-DD');
      let endTime = date[1].format('YYYY-MM-DD');
      Object.assign(cacheParams, { startTime, endTime })
    }
  }

  onExport = () => {
    const { page, pageSize } = this.state.pageInfo
    const { filterParams } = this.state
    let startTime, endTime
    startTime = filterParams.startTime
    endTime = filterParams.endTime
    // 未选择时间 默认3个月
    if (!startTime || !endTime) {
      let range = getThreeMonthRange(3)
      startTime = range.startTime
      endTime = range.endTime
    } else {
      startTime = filterParams.startTime
      endTime = filterParams.endTime
    }
    const params = {
      page,
      pageSize,
      userId: window.localStorage.getItem('userId'),
      ...{
        ...filterParams,
        order_sub_no: filterParams.orderNo,
        order_no: '',
        startTime,
        endTime
      },
    }
    exportCSVApi(params).then(res => {
      const url = res.data
      window.open(
        url,
        '_self'
      );
    }).catch(err => {
      message.error(err)
    })
  }

  setModalInfoState = (item, filter, record) => {
    const { modalInfo } = this.state
    this.setState({
      modalInfo: {
        ...modalInfo,
        ...{
          title: item.title,
          contentText: item.contentText,
          visible: true,
          status: item.status,
          filter,
          record
        }
      }
    })
  }

  onBatchOpration = (item, filter) => {
    // 批量操作
    if (!this.state.selectedRows.length) {
      message.error('请选择要进行批量操作的订单')
      return
    }
    const { modalInfo } = this.state

    this.setState({
      modalInfo: {
        ...modalInfo,
        ...{
          title: item.title,
          contentText: item.contentText,
          visible: true,
          status: item.status,// 下一个状态
          batchType: item.batchType,
          currentStatus: item.currentStatus, // 当前状态
          deliveryType: item.deliveryType,
          filter
        }
      }
    })
  }

  render() {
    const { modalInfo, batchOperation, selectedRowKeys, printData } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }

    return (
      <div>
        <ListPage
          id={orderSubNo}
          onSearch={this.onSearch}
          onReset={this.onReset}
          onChangePage={this.onChangePage}
          scroll={{ x: 1700 }}
          {...this.state}
          rowSelection={rowSelection}
          selectChange={this.selectChange}
          parentFun={this.getListPageProps}
          match={this.props.match}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Button onClick={this.onExport} style={{ marginRight: 8 }}>导出</Button>
              <Button onClick={this.onRefresh} style={{ marginRight: 8 }}>刷新</Button>
              {
                batchOperation.map(item => <Button onClick={() => { this.onBatchOpration(item, null) }} key={item.name} style={{ marginRight: 8 }}>{item.name}</Button>)
              }
            </Col>
          </Row>
          <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
            <OrderPrint
              data={printData}
            />
          </div>
          <Modal
            title={modalInfo.title}
            visible={modalInfo.visible}
            onCancel={this.onModalCancel}
            renderInput={this.renderInput}
            footer={null}
            maskClosable={true}
          >
            <Form name="modalForm" onSubmit={(e) => { this.onModalOk(e, modalInfo) }}>
              {
                modalInfo.filter && modalInfo.filter.length ?
                  <>
                    {
                      modalInfo.filter.map(item => this.renderInput(item))
                    }
                  </>
                  :
                  <>
                    {
                      modalInfo.contentText
                    }
                  </>
              }
              <Row>
                <Form.Item wrapperCol={{ span: 24, offset: 16 }}>
                  <Button onClick={this.onModalCancel} style={{ marginRight: 20 }}>
                    取消
                  </Button>
                  <Button type="primary" htmlType="submit" loading={modalInfo.confirmLoading}>
                    确定
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Modal>
        </ListPage>
      </div>
    );
  }
}
const ChildOrderContainerWrapper = Form.create()(ChildOrderContainer);
export default ChildOrderContainerWrapper
