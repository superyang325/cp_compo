import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/message/style";
import _message from "antd/es/message";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import OrderSteps from '../component/OrderSteps';
import InfoListCart from '../component/InfoListCart';
import SectionHeader from '../component/SectionHeader';
import { getChildOrderDetailApi } from '../api';
import { ORDERSTATUS, DELIVERYTYPE, PAYTYPE, ORDERRESOURCE } from '../constant';
import '../style.less';
var deliveryTypeToStateList = {
  1: ['100', '200', '300', '400', '410', '700'],
  2: ['100', '200', '300', '600', '700'],
  3: ['100', '200', '500', '510', '700']
};

var OrderDetailContainer = /*#__PURE__*/function (_Component) {
  _inherits(OrderDetailContainer, _Component);

  var _super = _createSuper(OrderDetailContainer);

  function OrderDetailContainer() {
    var _this;

    _classCallCheck(this, OrderDetailContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      orderNo: '',
      currentStatus: '',
      currentStatusIndex: -1,
      statusList: [],
      deliveryType: '',
      remainTime: '',
      // ??????????????????
      // ????????????
      basicInfo: [],
      // ???????????????
      consigneeInfo: [],
      // ????????????
      productList: [],
      // ????????????
      logList: [],
      goodsColumn: [{
        title: '????????????',
        align: 'center',
        dataIndex: 'productThumbImg',
        render: function render(text) {
          return /*#__PURE__*/React.createElement("img", {
            src: text,
            alt: "",
            style: {
              width: '60px',
              height: '60px',
              borderRadius: '50%'
            }
          });
        }
      }, {
        title: '????????????',
        align: 'center',
        dataIndex: 'productName'
      }, {
        title: '????????????',
        align: 'center',
        dataIndex: 'productSn'
      }, {
        title: '??????',
        align: 'center',
        dataIndex: 'norms'
      }, {
        title: '??????',
        align: 'center',
        dataIndex: 'price'
      }, {
        title: '??????',
        align: 'center',
        dataIndex: 'productNumber'
      }, {
        title: '??????',
        align: 'center',
        dataIndex: 'sumPrice'
      }],
      operationColumn: [{
        title: '?????????',
        align: 'center',
        dataIndex: 'operatorName'
      }, {
        title: '????????????',
        align: 'center',
        dataIndex: 'updateTime'
      }, {
        title: '????????????',
        align: 'center',
        dataIndex: 'operatorStatus'
      }]
    };

    _this.getConsigneeInfo = function (data) {
      return [{
        label: '?????????',
        value: data.receiveName
      }, {
        label: '????????????',
        value: data.phone
      }, {
        label: '????????????',
        value: data.address,
        space: 2
      }];
    };

    return _this;
  }

  _createClass(OrderDetailContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      getChildOrderDetailApi({
        orderNo: this.props.match.params.id
      }).then(function (res) {
        var historyStatusList = res.historyStatusList,
            deliveryType = res.deliveryType,
            status = res.status,
            productList = res.productList,
            logList = res.logList;

        var statusList = _this2.getStatusList(deliveryType, historyStatusList);

        var currentStatusIndex = _this2.getCurrentStatusIndex(statusList, status);

        var basicInfo = _this2.getBasicInfo(res);

        var consigneeInfo = _this2.getConsigneeInfo(res);

        _this2.setState(Object.assign({}, {
          orderNo: res.orderNo,
          currentStatus: status,
          currentStatusIndex: currentStatusIndex,
          statusList: statusList,
          basicInfo: basicInfo,
          consigneeInfo: consigneeInfo,
          productList: productList,
          logList: logList
        }));
      }).catch(function (e) {
        _message.error(e);
      });
    }
  }, {
    key: "getStatusList",
    value: function getStatusList(deliveryType, historyStatusList) {
      var result = [];
      var allStatusList = deliveryTypeToStateList[deliveryType]; //?????????????????????????????????

      var cancelOrderIndex = -1;
      historyStatusList.forEach(function (statusInfo, index) {
        if (statusInfo.status + '' === '900') {
          cancelOrderIndex = index;
        }
      });
      allStatusList.map(function (status, index) {
        if (cancelOrderIndex !== -1 && index > cancelOrderIndex) {
          return;
        }

        if (cancelOrderIndex !== -1 && index === cancelOrderIndex) {
          result.push({
            label: ORDERSTATUS['900'],
            status: '900',
            createTime: historyStatusList[index].createTime
          });
          return;
        }

        var currentStatus = {
          label: ORDERSTATUS[status],
          status: status
        };

        if (index < historyStatusList.length) {
          currentStatus['createTime'] = historyStatusList[index].createTime;
        }

        result.push(currentStatus);
      });
      return result;
    }
  }, {
    key: "getCurrentStatusIndex",
    value: function getCurrentStatusIndex(statusList, currentStatus) {
      var result = -1;
      statusList.forEach(function (statusInfo, index) {
        if (statusInfo.status + '' === currentStatus + '') {
          result = index;
        }
      });
      return result;
    }
  }, {
    key: "getBasicInfo",
    value: function getBasicInfo(data) {
      return [{
        label: '????????????',
        value: data.orderSubNo,
        space: 2
      }, {
        label: '????????????',
        value: data.historyStatusList[0] && data.historyStatusList[0].createTime
      }, {
        label: '????????????',
        value: data.shopInfo && data.shopInfo.shopName
      }, {
        label: '???????????????',
        value: data.orderNo,
        space: 2
      }, {
        label: '????????????',
        value: DELIVERYTYPE[data.deliveryType]
      }, {
        label: '??????',
        value: data.transportationExpenses
      }, // {
      //   label: '??????/????????????',
      //   value: data
      // }
      {
        label: '????????????',
        value: data.orderPayWay.map(function (key) {
          return PAYTYPE[key];
        }).join('|')
      }, {
        label: '????????????',
        value: ORDERRESOURCE[data.orderResource + '']
      }, // {
      //   label: '????????????',
      //   value: ''
      // },
      {
        label: '?????????????????????',
        value: data.originPrice
      }, {
        label: '?????????????????????',
        value: data.couponValue
      }, {
        label: '?????????????????????',
        value: data.realPrice
      }, {
        label: '??????????????????',
        value: data.expectArriveTime,
        // value: data => `${data.expectArriveTimeStart} - ${data.expectArriveTimeEnd}`,
        space: 2
      }, // {
      //   label: '??????????????????',
      //   value: data.finishTime,
      // },
      {
        label: '?????????',
        value: data.pickCode
      }, {
        label: '???????????????',
        value: data.mainInfoUserName
      }, {
        label: '??????????????????',
        value: data.mainInfoPhone
      }];
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          statusList = _this$state.statusList,
          currentStatusIndex = _this$state.currentStatusIndex,
          basicInfo = _this$state.basicInfo,
          consigneeInfo = _this$state.consigneeInfo,
          goodsColumn = _this$state.goodsColumn,
          operationColumn = _this$state.operationColumn,
          productList = _this$state.productList,
          logList = _this$state.logList;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#fff',
          padding: '16px'
        }
      }, /*#__PURE__*/React.createElement(OrderSteps, {
        statusList: statusList,
        current: currentStatusIndex
      }), /*#__PURE__*/React.createElement(InfoListCart, {
        fieldList: basicInfo,
        title: "\u57FA\u7840\u4FE1\u606F"
      }), /*#__PURE__*/React.createElement(InfoListCart, {
        fieldList: consigneeInfo,
        title: "\u6536\u8D27\u4EBA\u4FE1\u606F"
      }), /*#__PURE__*/React.createElement(SectionHeader, null, "\u5546\u54C1\u4FE1\u606F"), /*#__PURE__*/React.createElement(_Table, {
        dataSource: productList,
        pagination: false,
        columns: goodsColumn
      }), /*#__PURE__*/React.createElement(SectionHeader, null, "\u64CD\u4F5C\u65E5\u5FD7"), /*#__PURE__*/React.createElement(_Table, {
        dataSource: logList,
        columns: operationColumn
      }));
    }
  }]);

  return OrderDetailContainer;
}(Component);

export { OrderDetailContainer as default };