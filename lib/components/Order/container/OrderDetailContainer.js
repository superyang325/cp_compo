"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _OrderSteps = _interopRequireDefault(require("../component/OrderSteps"));

var _InfoListCart = _interopRequireDefault(require("../component/InfoListCart"));

var _SectionHeader = _interopRequireDefault(require("../component/SectionHeader"));

var _api = require("../api");

var _constant = require("../constant");

require("../style.less");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var deliveryTypeToStateList = {
  1: ['100', '200', '300', '400', '410', '700'],
  2: ['100', '200', '300', '600', '700'],
  3: ['100', '200', '500', '510', '700']
};

var OrderDetailContainer = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(OrderDetailContainer, _Component);

  var _super = _createSuper(OrderDetailContainer);

  function OrderDetailContainer() {
    var _this;

    (0, _classCallCheck2.default)(this, OrderDetailContainer);

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
      // 订单剩余时间
      // 基本信息
      basicInfo: [],
      // 收货人信息
      consigneeInfo: [],
      // 商品信息
      productList: [],
      // 操作信息
      logList: [],
      goodsColumn: [{
        title: '商品图片',
        align: 'center',
        dataIndex: 'productThumbImg',
        render: function render(text) {
          return /*#__PURE__*/_react.default.createElement("img", {
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
        title: '商品名称',
        align: 'center',
        dataIndex: 'productName'
      }, {
        title: '商品编码',
        align: 'center',
        dataIndex: 'productSn'
      }, {
        title: '规格',
        align: 'center',
        dataIndex: 'norms'
      }, {
        title: '单价',
        align: 'center',
        dataIndex: 'price'
      }, {
        title: '数量',
        align: 'center',
        dataIndex: 'productNumber'
      }, {
        title: '小计',
        align: 'center',
        dataIndex: 'sumPrice'
      }],
      operationColumn: [{
        title: '操作人',
        align: 'center',
        dataIndex: 'operatorName'
      }, {
        title: '操作时间',
        align: 'center',
        dataIndex: 'updateTime'
      }, {
        title: '订单状态',
        align: 'center',
        dataIndex: 'operatorStatus'
      }]
    };

    _this.getConsigneeInfo = function (data) {
      return [{
        label: '收货人',
        value: data.receiveName
      }, {
        label: '联系方式',
        value: data.phone
      }, {
        label: '收货地址',
        value: data.address,
        space: 2
      }];
    };

    return _this;
  }

  (0, _createClass2.default)(OrderDetailContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      (0, _api.getChildOrderDetailApi)({
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
        _message2.default.error(e);
      });
    }
  }, {
    key: "getStatusList",
    value: function getStatusList(deliveryType, historyStatusList) {
      var result = [];
      var allStatusList = deliveryTypeToStateList[deliveryType]; //处理订单中存在取消情况

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
            label: _constant.ORDERSTATUS['900'],
            status: '900',
            createTime: historyStatusList[index].createTime
          });
          return;
        }

        var currentStatus = {
          label: _constant.ORDERSTATUS[status],
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
        label: '订单编号',
        value: data.orderSubNo,
        space: 2
      }, {
        label: '创建时间',
        value: data.historyStatusList[0] && data.historyStatusList[0].createTime
      }, {
        label: '门店名称',
        value: data.shopInfo && data.shopInfo.shopName
      }, {
        label: '主订单编号',
        value: data.orderNo,
        space: 2
      }, {
        label: '配送方式',
        value: _constant.DELIVERYTYPE[data.deliveryType]
      }, {
        label: '运费',
        value: data.transportationExpenses
      }, // {
      //   label: '自提/配送时间',
      //   value: data
      // }
      {
        label: '支付方式',
        value: data.orderPayWay.map(function (key) {
          return _constant.PAYTYPE[key];
        }).join('|')
      }, {
        label: '订单来源',
        value: _constant.ORDERRESOURCE[data.orderResource + '']
      }, // {
      //   label: '订单类型',
      //   value: ''
      // },
      {
        label: '订单金额（元）',
        value: data.originPrice
      }, {
        label: '优惠金额（元）',
        value: data.couponValue
      }, {
        label: '实付金额（元）',
        value: data.realPrice
      }, {
        label: '期望自提时间',
        value: data.expectArriveTime,
        // value: data => `${data.expectArriveTimeStart} - ${data.expectArriveTimeEnd}`,
        space: 2
      }, // {
      //   label: '订单完成时间',
      //   value: data.finishTime,
      // },
      {
        label: '提货码',
        value: data.pickCode
      }, {
        label: '下单人姓名',
        value: data.mainInfoUserName
      }, {
        label: '下单人手机号',
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
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          background: '#fff',
          padding: '16px'
        }
      }, /*#__PURE__*/_react.default.createElement(_OrderSteps.default, {
        statusList: statusList,
        current: currentStatusIndex
      }), /*#__PURE__*/_react.default.createElement(_InfoListCart.default, {
        fieldList: basicInfo,
        title: "\u57FA\u7840\u4FE1\u606F"
      }), /*#__PURE__*/_react.default.createElement(_InfoListCart.default, {
        fieldList: consigneeInfo,
        title: "\u6536\u8D27\u4EBA\u4FE1\u606F"
      }), /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, "\u5546\u54C1\u4FE1\u606F"), /*#__PURE__*/_react.default.createElement(_table.default, {
        dataSource: productList,
        pagination: false,
        columns: goodsColumn
      }), /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, "\u64CD\u4F5C\u65E5\u5FD7"), /*#__PURE__*/_react.default.createElement(_table.default, {
        dataSource: logList,
        columns: operationColumn
      }));
    }
  }]);
  return OrderDetailContainer;
}(_react.Component);

exports.default = OrderDetailContainer;