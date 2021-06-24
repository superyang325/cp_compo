import React, { Component } from 'react';
import OrderSteps from '../component/OrderSteps';
import InfoListCart from '../component/InfoListCart';
import SectionHeader from '../component/SectionHeader';
import { getChildOrderDetailApi } from '../api';
import { ORDERSTATUS, DELIVERYTYPE, PAYTYPE, ORDERRESOURCE } from '../constant';
import { message, Table } from 'antd';
import '../style.less';

const deliveryTypeToStateList = {
  1: ['100', '200', '300', '400', '410', '700'],
  2: ['100', '200', '300', '600', '700'],
  3: ['100', '200', '500', '510', '700'],
};

export default class OrderDetailContainer extends Component {
  state = {
    orderNo: '',
    currentStatus: '',
    currentStatusIndex: -1,
    statusList: [],
    deliveryType: '',
    remainTime: '', // 订单剩余时间
    // 基本信息
    basicInfo: [],
    // 收货人信息
    consigneeInfo: [],
    // 商品信息
    productList: [],
    // 操作信息
    logList: [],
    goodsColumn: [
      {
        title: '商品图片',
        align: 'center',
        dataIndex: 'productThumbImg',
        render: (text) => (
          <img
            src={text}
            alt=""
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
            }}
          />
        ),
      },
      {
        title: '商品名称',
        align: 'center',
        dataIndex: 'productName',
      },
      {
        title: '商品编码',
        align: 'center',
        dataIndex: 'productSn',
      },
      {
        title: '规格',
        align: 'center',
        dataIndex: 'norms',
      },
      {
        title: '单价',
        align: 'center',
        dataIndex: 'price',
      },
      {
        title: '数量',
        align: 'center',
        dataIndex: 'productNumber',
      },
      {
        title: '小计',
        align: 'center',
        dataIndex: 'sumPrice',
      },
    ],
    operationColumn: [
      {
        title: '操作人',
        align: 'center',
        dataIndex: 'operatorName',
      },
      {
        title: '操作时间',
        align: 'center',
        dataIndex: 'updateTime',
      },
      {
        title: '订单状态',
        align: 'center',
        dataIndex: 'operatorStatus',
      },
    ],
  };

  componentDidMount() {
    getChildOrderDetailApi({
      orderNo: this.props.match.params.id,
    })
      .then((res) => {
        const { historyStatusList, deliveryType, status, productList, logList } = res;
        const statusList = this.getStatusList(deliveryType, historyStatusList);
        const currentStatusIndex = this.getCurrentStatusIndex(
          statusList,
          status
        );
        const basicInfo = this.getBasicInfo(res);
        const consigneeInfo = this.getConsigneeInfo(res);
        this.setState(
          Object.assign(
            {},
            {
              orderNo: res.orderNo,
              currentStatus: status,
              currentStatusIndex,
              statusList,
              basicInfo,
              consigneeInfo,
              productList,
              logList,
            }
          )
        );
      })
      .catch((e) => {
        message.error(e);
      });
  }

  getStatusList(deliveryType, historyStatusList) {
    const result = [];
    const allStatusList = deliveryTypeToStateList[deliveryType];
    //处理订单中存在取消情况
    let cancelOrderIndex = -1;
    historyStatusList.forEach((statusInfo, index) => {
      if (statusInfo.status + '' === '900') {
        cancelOrderIndex = index;
      }
    });
    allStatusList.map((status, index) => {
      if (cancelOrderIndex !== -1 && index > cancelOrderIndex) {
        return;
      }
      if (cancelOrderIndex !== -1 && index === cancelOrderIndex) {
        result.push({
          label: ORDERSTATUS['900'],
          status: '900',
          createTime: historyStatusList[index].createTime,
        });
        return;
      }
      let currentStatus = {
        label: ORDERSTATUS[status],
        status: status,
      };
      if (index < historyStatusList.length) {
        currentStatus['createTime'] = historyStatusList[index].createTime;
      }
      result.push(currentStatus);
    });
    return result;
  }
  getCurrentStatusIndex(statusList, currentStatus) {
    let result = -1;
    statusList.forEach((statusInfo, index) => {
      if (statusInfo.status + '' === currentStatus + '') {
        result = index;
      }
    });
    return result;
  }
  getBasicInfo(data) {
    return [
      {
        label: '订单编号',
        value: data.orderSubNo,
        space: 2,
      },
      {
        label: '创建时间',
        value:
          data.historyStatusList[0] && data.historyStatusList[0].createTime,
      },
      {
        label: '门店名称',
        value: data.shopInfo && data.shopInfo.shopName,
      },
      {
        label: '主订单编号',
        value: data.orderNo,
        space: 2,
      },
      {
        label: '配送方式',
        value: DELIVERYTYPE[data.deliveryType],
      },
      {
        label: '运费',
        value: data.transportationExpenses,
      },
      // {
      //   label: '自提/配送时间',
      //   value: data
      // }
      {
        label: '支付方式',
        value: data.orderPayWay
          .map((key) => {
            return PAYTYPE[key];
          })
          .join('|'),
      },
      {
        label: '订单来源',
        value: ORDERRESOURCE[data.orderResource + ''],
      },
      // {
      //   label: '订单类型',
      //   value: ''
      // },
      {
        label: '订单金额（元）',
        value: data.originPrice,
      },
      {
        label: '优惠金额（元）',
        value: data.couponValue,
      },
      {
        label: '实付金额（元）',
        value: data.realPrice,
      },
      {
        label: '期望自提时间',
        value: data.expectArriveTime,
        // value: data => `${data.expectArriveTimeStart} - ${data.expectArriveTimeEnd}`,
        space: 2,
      },
      // {
      //   label: '订单完成时间',
      //   value: data.finishTime,
      // },
      {
        label: '提货码',
        value: data.pickCode,
      },
      {
        label: '下单人姓名',
        value: data.mainInfoUserName,
      },
      {
        label: '下单人手机号',
        value: data.mainInfoPhone,
      },
    ];
  }
  getConsigneeInfo = (data) => {
    return [
      {
        label: '收货人',
        value: data.receiveName,
      },
      {
        label: '联系方式',
        value: data.phone,
      },
      {
        label: '收货地址',
        value: data.address,
        space: 2,
      },
    ];
  };

  render() {
    const {
      statusList,
      currentStatusIndex,
      basicInfo,
      consigneeInfo,
      goodsColumn,
      operationColumn,
      productList,
      logList
    } = this.state;
    return (
      <div style={{ background: '#fff', padding: '16px' }}>
        <OrderSteps statusList={statusList} current={currentStatusIndex} />
        <InfoListCart fieldList={basicInfo} title="基础信息" />
        <InfoListCart fieldList={consigneeInfo} title="收货人信息" />
        <SectionHeader>商品信息</SectionHeader>
        <Table
          dataSource={productList}
          pagination={false}
          columns={goodsColumn}
        />
        <SectionHeader>操作日志</SectionHeader>
        <Table dataSource={logList} columns={operationColumn} />
      </div>
    );
  }
}
