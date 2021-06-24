import { Button, Col, message, Row } from 'antd';
import React, { Component } from 'react';
import ListPage from '../../../component/ListPage';
import {
  getParentOrderListApi,
  exportCSVApi
} from '../api';
import { PAYSTATUS, PAYTYPE } from '../constant';
import { DATERANGE } from '../../../constant';
import { isExceedRange, getThreeMonthRange } from '../../../util/date'
// import { listPageParams } from '../../../util/listPageParams'

// import moment from 'moment'
class ParentOrder extends Component {
  orderNo;
  listPageProps;
  state = {
    filters: [
      {
        title: '主订单号',
        name: 'orderNo',
      },
      {
        title: '创建时间',
        name: 'createTime',
        dataSource: DATERANGE,
      },
      {
        title: '支付方式',
        name: 'orderPayWay',
        dataSource: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '微信',
            value: '1',
          },
          {
            label: '储值',
            value: '2',
          },
        ],
      },
      {
        title: '支付状态',
        name: 'orderPayStatus',
        dataSource: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '未付款',
            value: '0',
          },
          {
            label: '已付款',
            value: '1',
          },
        ],
      },
      {
        title: '用户手机号',
        name: 'phone',
      },
    ],
    dataSource: [],
    columns: [
      // {
      //   title: '',
      //   dataIndex: 'checkbox',
      //   render: (val)=>{
      //     console.log(val)
      //   }
      // },
      {
        title: '主订单号',
        dataIndex: 'orderNo',
        align: 'center',
        width: 260
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        align: 'center',
      },
      {
        title: '支付状态',
        dataIndex: 'payStatus',
        align: 'center',
        render: (val) => {
          return PAYSTATUS[val];
        },
      },
      {
        title: '用户手机号',
        dataIndex: 'phone',
        align: 'center',
        width: 130
      },
      {
        title: '订单金额（元）',
        dataIndex: 'realPrice',
        align: 'center',

      },
      {
        title: '运费（元）',
        dataIndex: 'transPrice',
        align: 'center',
      },
      {
        title: '支付方式',
        dataIndex: 'orderPayWay',
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
        title: '支付时间',
        dataIndex: 'orderPayTime',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        fixed: 'right',
        width: 120,
        render: (val, record) => {
          return (
            <>
              <a onClick={() => this.onLinkRouter(record.orderNo)}>查看子单</a>
            </>
          );
        },
      },
    ],
    pageInfo: {
      // total: 0,
      current: 1,
      pageSize: 10,
    },
    loading: {
      tableLoading: false,
    },
    filterParams: {}
  };
  cacheParams = {};

  onLinkRouter = (orderNo) => {
    this.setPageParams();
    this.props.history.push({
      pathname:`/order/order_list_child/${orderNo}`,
    });
  };
  setPageParams = () => {
    const { pageInfo: { current, pageSize } } = this.state;
    let pagination = { currentPage: current, pageSize: pageSize };
    // listPageParams.setParams(this.listPageProps, pagination);
  }
  getListPageProps = (props) => {
    this.listPageProps = props
  }
  componentDidMount() {
    // this.getParentOrder();
    // let pagination = listPageParams.getParams(this.listPageProps);
    // if (pagination) {
    //   let { currentPage: current, pageSize } = pagination;
    //   this.setState({ pageInfo: { current, pageSize } }, () => {
    //     const { form: { getFieldsValue } } = this.listPageProps
    //     this.getParentOrder(getFieldsValue())
    //   });
    // } else {
    //   this.getParentOrder();
    // }
    this.getParentOrder();
  }
  getParentOrder = (
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
    getParentOrderListApi(Object.assign({}, pageInfo, params))
      .then(({ list, total }) => {
        this.setState({
          dataSource: list,
          loading: Object.assign({}, loading, { tableLoading: false }),
          pageInfo: Object.assign({}, pageInfo, { total }),
        });
        this.cacheParams = params;
      })
      .catch((err) => {
        message.error(err);
      });
  };
  onChangePage = (current, pageSize) => {
    this.getParentOrder(this.cacheParams, { current, pageSize });
  };
  onSearch = (params = {}) => {
    if (params['createTime'] && params['createTime'][0]) {
      params['startTime'] = params['createTime'][0].format('YYYY-MM-DD');
      params['endTime'] = params['createTime'][1].format('YYYY-MM-DD');
      delete params['createTime'];
      if (isExceedRange(params['startTime'], params['endTime'])) {
        message.error('时间范围不能超过3个月')
        return
      }
    }
    // else{
    //   const {startTime,endTime} = getThreeMonthRange(3)
    //   params['startTime'] = startTime
    //   params['endTime'] = endTime
    // }
    this.setState({
      filterParams: params,
    })
    this.getParentOrder(params, { ...this.state.pageInfo, page: 1, });
  };
  onReset = (params = {}) => {
    this.onChangePage(Object.assign({}, params, { page: 1, page_size: 10 }));
  };
  // onRangeChange = (date) => {
  //   const { cacheParams } = this
  //   if (date.length) {
  //     let startTime = date[0].format('YYYY-MM-DD');
  //     let endTime = date[1].format('YYYY-MM-DD');
  //     Object.assign(cacheParams, {startTime,endTime})
  //   }
  //   console.log(cacheParams,'cacheParams')
  // }
  onRefresh = () => {
    this.getParentOrder();
  };
  onExport = () => {
    const { page, pageSize } = this.state.pageInfo
    const { filterParams } = this.state
    let startTime, endTime
    startTime = filterParams.startTime
    endTime = filterParams.endTime
    console.log(startTime, endTime)
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
        startTime,
        endTime
      },
    }
    console.log('导出接口参数', params)
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

  render() {
    const { dataSource, columns, filters, pageInfo } = this.state;
    return (
      <div>
        listPage 组件
        {/* <ListPage
          id="orderNo"
          onSearch={this.onSearch}
          onReset={this.onReset}
          onChangePage={this.onChangePage}
          columns={columns}
          filters={filters}
          pageInfo={pageInfo}
          dataSource={dataSource}
          scroll={{ x: 1200 }}
          parentFun={this.getListPageProps}
          // location={this.props.location}
          match={this.props.match}
        >
          <Row gutter={24} style={{ marginBottom: 8 }}>
            <Col span={6}>
              <Button onClick={this.onExport} style={{ marginRight: 8 }}>导出</Button>
              <Button onClick={this.onRefresh}>刷新</Button>
            </Col>
          </Row>
        </ListPage> */}
      </div>
    );
  }
}

export default ParentOrder;
