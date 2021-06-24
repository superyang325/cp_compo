"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

require("antd/es/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/es/popconfirm"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/popover/style");

var _popover = _interopRequireDefault(require("antd/es/popover"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _ListPage = _interopRequireDefault(require("../../../component/ListPage"));

var _OrderPrint = _interopRequireDefault(require("../component/OrderPrint"));

var _api = require("../api");

var _constant = require("../constant");

var _constant2 = require("../../../constant");

var _objectConvert = require("../../../util/objectConvert");

var _date = require("../../../util/date");

var _listPageParams = require("../../../util/listPageParams");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var orderSubNo = 'orderSubNo';
var FREIGHTBACK = 'FREIGHTBACK';
var TOAPPLY = 'TOAPPLY';

function getOrderStatusList() {
  var result = [{
    value: '',
    label: '全部'
  }];
  Object.keys(_constant.ORDERSTATUS).forEach(function (key) {
    result.push({
      value: key,
      label: _constant.ORDERSTATUS[key]
    });
  });
  return result;
}

function getOrderOper(order) {
  var operToStatusMap = {
    100: [{
      label: '取消订单',
      status: '900',
      // block: order.canCancel === 0,
      // blockCb() {
      //   message.info('已申请过售后的订单不可取消')
      // },
      disabled: order.canCancel === 0
    }],
    200: [function (order) {
      var deliveryTypeToOperMap = {
        1: {
          //外卖
          label: '接单',
          status: '300'
        },
        2: {
          //自提
          label: '接单',
          status: '300'
        },
        3: {
          //堂食
          label: '接单',
          status: '300'
        }
      };
      return deliveryTypeToOperMap[order.deliveryType];
    }, {
      label: '取消订单',
      status: '900',
      // block: order.canCancel === 0,
      // blockCb() {
      //   message.info('已申请过售后的订单不可取消')
      // },
      disabled: order.canCancel === 0
    }, function (order) {
      var deliveryTypeToOperMap = {
        1: {
          //外卖
          label: '退运费',
          operation: FREIGHTBACK,
          disabled: order.canRefundTrans === 0
        }
      };
      return deliveryTypeToOperMap[order.deliveryType];
    }, {
      label: '申请售后',
      noPop: true,
      operation: TOAPPLY
    }],
    300: [function (order) {
      var deliveryTypeToOperMap = {
        1: {
          //外卖
          label: '完成备货',
          status: '400'
        },
        2: {
          //自提
          label: '完成备货',
          status: '600'
        },
        3: {
          //堂食
          label: '开始制作',
          status: '500'
        }
      };
      return deliveryTypeToOperMap[order.deliveryType];
    }, function (order) {
      var deliveryTypeToOperMap = {
        1: {
          //外卖
          label: '退运费',
          operation: FREIGHTBACK,
          disabled: order.canRefundTrans === 0
        }
      };
      return deliveryTypeToOperMap[order.deliveryType];
    }, {
      label: '取消订单',
      status: '900',
      // block: order.canCancel === 0,
      // blockCb() {
      //   message.info('已申请过售后的订单不可取消')
      // },
      disabled: order.canCancel === 0
    }, // “备货中/配送中”，支持申请售后
    {
      label: '申请售后',
      noPop: true,
      operation: TOAPPLY
    }],
    400: [{
      label: '发货',
      status: '410'
    }, {
      label: '取消订单',
      status: '900',
      // block: order.canCancel === 0,
      // blockCb() {
      //   message.info('已申请过售后的订单不可取消')
      // },
      disabled: order.canCancel === 0
    }, function (order) {
      var deliveryTypeToOperMap = {
        1: {
          //外卖
          label: '退运费',
          operation: FREIGHTBACK,
          disabled: order.canRefundTrans === 0
        }
      };
      return deliveryTypeToOperMap[order.deliveryType];
    }, {
      label: '申请售后',
      noPop: true,
      operation: TOAPPLY
    }],
    410: [{
      label: '完成订单',
      status: '700'
    }, function (order) {
      var deliveryTypeToOperMap = {
        1: {
          //外卖
          label: '退运费',
          operation: FREIGHTBACK,
          disabled: order.canRefundTrans === 0
        }
      };
      return deliveryTypeToOperMap[order.deliveryType];
    }, {
      label: '申请售后',
      noPop: true,
      operation: TOAPPLY
    }],
    500: [{
      //堂食
      label: '完成制作',
      status: '510'
    }, {
      label: '申请售后',
      noPop: true,
      operation: TOAPPLY
    }],
    510: [{
      title: '取餐',
      label: '取餐（堂食)',
      status: '700',
      filter: []
    }, {
      label: '申请售后',
      noPop: true,
      operation: TOAPPLY
    }],
    600: [{
      label: '取消订单',
      status: '900',
      // block: order.canCancel === 0,
      // blockCb() {
      //   message.info('已申请过售后的订单不可取消')
      // },
      disabled: order.canCancel === 0
    }, {
      title: '自提',
      label: '自提',
      status: '700',
      filter: []
    }, {
      label: '申请售后',
      noPop: true,
      operation: TOAPPLY
    }],
    700: [{
      label: '打印',
      operation: _constant.PRINT
    }, {
      label: '申请售后',
      noPop: true,
      operation: TOAPPLY
    }],
    900: [function (order) {
      var deliveryTypeToOperMap = {
        1: {
          //外卖
          label: '退运费',
          operation: FREIGHTBACK,
          disabled: order.canRefundTrans === 0
        }
      };
      return deliveryTypeToOperMap[order.deliveryType];
    }]
  };
  return operToStatusMap[order.orderStatus] || [];
}

var ChildOrderContainer = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ChildOrderContainer, _Component);

  var _super = _createSuper(ChildOrderContainer);

  function ChildOrderContainer() {
    var _this;

    (0, _classCallCheck2.default)(this, ChildOrderContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.listPageProps = void 0;
    _this.state = {
      modalInfo: {
        visible: false,
        title: '',
        contentText: '',
        confirmLoading: false,
        filter: [],
        record: {}
      },
      dataSource: [],
      filters: [{
        title: '公司',
        name: 'companyId',
        dataSource: [],
        required: true,
        message: '公司名称不能为空!'
      }, {
        title: '门店',
        name: 'shopId',
        dataSource: []
      }, {
        title: '订单类型',
        name: 'orderType',
        dataSource: _constant.ORDERTYPE
      }, {
        title: '订单状态',
        name: 'orderStatus',
        dataSource: getOrderStatusList()
      }, {
        title: '订单号',
        name: 'orderNo'
      }, {
        title: '配送方式',
        name: 'deliveryType',
        dataSource: [{
          label: '外卖',
          value: '1'
        }, {
          label: '自提',
          value: '2'
        }, {
          label: '堂食',
          value: '3'
        }]
      }, {
        title: '下单时间',
        name: 'createTime',
        dataSource: _constant2.DATERANGE
      }, {
        title: '收货电话',
        name: 'phone'
      }, {
        title: '支付方式',
        name: 'payChannel',
        dataSource: [{
          label: '全部',
          value: ''
        }, {
          label: '储值',
          value: '2'
        }, {
          label: '微信',
          value: '1'
        }]
      }, {
        title: '自提码',
        name: 'pickCode'
      }, {
        title: '商品名称',
        name: 'productName'
      }],
      selectedRowKeys: [],
      // 列表多选选择
      selectedRows: [],
      // 列表多选选择
      columns: [{
        title: '订单号',
        dataIndex: 'orderSubNo',
        align: 'center',
        width: 250
      }, {
        title: '订单状态',
        dataIndex: 'orderStatus',
        align: 'center',
        width: 100,
        render: function render(val) {
          return _constant.ORDERSTATUS[val];
        }
      }, {
        title: '配送类型',
        dataIndex: 'deliveryType',
        align: 'center',
        width: 100,
        render: function render(val) {
          return _constant.DELIVERYTYPE[val];
        }
      }, {
        title: '订单类型',
        dataIndex: 'orderType',
        align: 'center',
        width: 100,
        render: function render(val) {
          var target = _constant.ORDERTYPE.find(function (item) {
            return item.value === val;
          });

          return target?.label;
        }
      }, {
        title: '商品信息',
        dataIndex: 'product',
        align: 'center',
        width: 200,
        render: function render(text, record) {
          var title = '商品信息';
          var names = '';
          text.forEach(function (item) {
            names += item.productName;
          });
          var shotName = names.length > 10 ? names.slice(0, 10) + '...' : names;
          var content = text.map(function (item) {
            return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
              key: item.id
            }, /*#__PURE__*/_react.default.createElement("span", null, item.productName, " * ", item.productNumber, " (", item.productPriceSum, " \u5143)"), /*#__PURE__*/_react.default.createElement("br", null));
          });
          return /*#__PURE__*/_react.default.createElement(_popover.default, {
            title: title,
            content: content
          }, shotName);
        }
      }, {
        title: '门店名称',
        width: 220,
        dataIndex: 'shopName',
        align: 'center'
      }, {
        title: '创建时间',
        width: 120,
        dataIndex: 'createTime',
        align: 'center'
      }, {
        title: '收货人姓名',
        width: 110,
        dataIndex: 'receiveName',
        align: 'center'
      }, {
        title: '收货人手机号',
        width: 140,
        dataIndex: 'phone',
        align: 'center'
      }, {
        title: '自提码',
        width: 120,
        dataIndex: 'pickCode',
        align: 'center'
      }, {
        title: '价格',
        width: 120,
        dataIndex: 'realPrice',
        align: 'center'
      }, {
        title: '运费',
        width: 120,
        dataIndex: 'transPrice',
        align: 'center'
      }, {
        title: '支付方式',
        dataIndex: 'orderPayWay',
        width: 120,
        align: 'center',
        render: function render(val) {
          return val.map(function (item) {
            return _constant.PAYTYPE[item];
          }).join(' | ');
        }
      }, {
        title: '收货地址',
        dataIndex: 'address',
        width: 300,
        align: 'center'
      }, {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        fixed: 'right',
        width: 225,
        render: function render(val, record) {
          var oper = getOrderOper(record);
          return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("a", {
            onClick: function onClick() {
              return _this.onLinkRouter(record.orderSubNo);
            }
          }, "\u67E5\u770B\u8BA2\u5355"), /*#__PURE__*/_react.default.createElement("span", null, oper.map(function (item, index) {
            var style = {};
            typeof item === 'function' && (item = item(record));
            if (!item) return null;
            /*noPop 代表不需要二次确认弹框*/

            var conditionNoPop = item.noPop; // 

            /*取消订单特殊处理:判断是否已经申请过售后*/

            var conditionBlock = item.block; // if (conditionBlock) {
            //   style.color = '#999'
            // } else {
            //   style.color = '#1890ff'
            // }

            var onConfirm = function onConfirm() {
              _this.setState({
                visible: false
              }, function () {
                /* 
                  operation:PRINT 打印操作
                  operation:FREIGHTBACK 退运费操作
                  operation:undefined 修改订单状态操作
                */
                if (item.operation === _constant.PRINT) {
                  // 打印
                  _this.onPrint(record);
                } else if (item.operation === FREIGHTBACK) {
                  // 退运费
                  _this.onFrieightBack(record);
                } else if (item.operation === TOAPPLY) {
                  // 申请售后
                  _this.toApply(record);
                } else {
                  /* 更改订单状态 */
                  // if (conditionBlock) {
                  //   item.blockCb && item.blockCb()
                  // } else {
                  //   this.onModifyOrder(record, item.status, item);
                  // }
                  _this.onModifyOrder(record, item.status, item);
                }
              });
            };

            var onVisibleChange = function onVisibleChange(visible) {
              if (!visible) {
                _this.setState({
                  visible: visible
                });

                return;
              }

              if (conditionNoPop) {
                onConfirm(); // 不进行二次弹框确认 直接回调
              } else {
                _this.setState({
                  visible: visible
                });
              }
            }; // 按钮是否可以点击


            var disabled = item.disabled;
            return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
              key: index
            }, /*#__PURE__*/_react.default.createElement(_divider.default, {
              type: "vertical"
            }), /*#__PURE__*/_react.default.createElement(_popconfirm.default, {
              title: "\u786E\u5B9A".concat(item.label, "?"),
              okText: "\u786E\u5B9A",
              cancelText: "\u53D6\u6D88",
              onVisibleChange: onVisibleChange,
              onConfirm: onConfirm
            }, /*#__PURE__*/_react.default.createElement("a", {
              href: "#",
              style: _objectSpread({
                wordBreak: 'keep-all'
              }, style),
              disabled: disabled
            }, item.label)));
          })));
        }
      }],
      visible: false,
      batchOperation: [{
        batchType: _constant.BATCHJIEDAN,
        name: '批量接单',
        title: '批量接单',
        contentText: '确定批量接单吗？',
        currentStatus: [200],
        // 当前状态 过滤用
        deliveryType: [1, 2, 3],
        // 批量接单针对:自提 外卖 堂食
        status: 300
      }, {
        batchType: _constant.BATCHBEIHUO,
        name: '批量完成备货',
        title: '批量完成备货',
        contentText: '确定批量完成备货吗？',
        currentStatus: [300],
        // 当前状态 过滤用
        deliveryType: [1, 2],
        // 批量备货针对:外卖+自提
        status: 600 //  待自提（自提） 600(自提)/ 400(外卖) 与后端(李康)约定都送 600

      }, {
        batchType: _constant.BATCHZHIZUO,
        name: '批量完成制作',
        // 存在歧义 开始制作还是制作完成 已找产品确定（批量完成制作）
        title: '批量完成制作',
        contentText: '确定批量完成制作吗？',
        currentStatus: [500],
        // 当前状态 过滤用
        deliveryType: [3],
        // 批量制作针对:堂食
        status: 510 // 制作完成，待取餐（堂食）

      }, {
        batchType: _constant.BATCHFAHUO,
        name: '批量发货',
        title: '批量发货',
        contentText: '确定批量发货吗？',
        currentStatus: [400],
        // 当前状态 过滤用
        deliveryType: [1],
        // 批量发货针对:外卖
        status: 410 // 配送中（外卖）

      }, {
        batchType: _constant.BATCHWANCHENG,
        name: '批量完成',
        title: '批量完成',
        contentText: '确定批量完成吗？',
        currentStatus: [410, 600, 510],
        // 当前状态 过滤用
        deliveryType: [1, 2, 3],
        // 批量完成针对:外卖 自提 堂食
        status: 700 // 完成

      } // {
      //   name: '批量确认送达',
      //   title: '批量确认送达',
      //   contentText: '确定批量确认送达吗？',
      //   currentStatus:'', // 当前状态 过滤用
      //   status:700,
      // },
      ],
      pageInfo: {
        current: 1,
        pageSize: 10
      },
      loading: {
        tableLoading: false
      },
      printData: {
        productList: [],
        orderPayWay: [],
        shopInfo: {},
        historyStatusList: []
      },
      filterParams: {}
    };
    _this.cacheParams = {};

    _this.onLinkRouter = function (orderNo) {
      _this.setPageParams(); // 如果列表页的loation可能含有查询参数，则当该页跳转子页面时需要传递额外参数state


      _this.props.history.push({
        pathname: "/order/order_list_child/order_detail/".concat(orderNo)
      });
    };

    _this.setPageParams = function () {
      var _this$state$pageInfo = _this.state.pageInfo,
          current = _this$state$pageInfo.current,
          pageSize = _this$state$pageInfo.pageSize;
      var pagination = {
        currentPage: current,
        pageSize: pageSize
      };

      _listPageParams.listPageParams.setParams(_this.listPageProps, pagination);
    };

    _this.getListPageProps = function (props) {
      _this.listPageProps = props;
    };

    _this.getChildOrder = function () {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.cacheParams;
      var pageInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.pageInfo;
      var loading = _this.state.loading;

      if (loading.tableLoading) {
        return;
      }

      _this.setState({
        loading: Object.assign({}, loading, {
          tableLoading: true
        })
      });

      (0, _api.getChildOrderListApi)(Object.assign({}, pageInfo, params)).then(function (_ref) {
        var list = _ref.list,
            total = _ref.total;

        _this.setState({
          dataSource: list,
          loading: Object.assign({}, loading, {
            tableLoading: false
          }),
          pageInfo: Object.assign({}, pageInfo, {
            total: total
          })
        });

        _this.cacheParams = params;

        _this.resetSelectedKeys(list);
      }).catch(function (err) {
        _message2.default.error(err);
      });
    };

    _this.resetSelectedKeys = function (list) {
      var selectedRowKeys = _this.state.selectedRowKeys;

      if (selectedRowKeys.length) {
        var map = new Map();
        selectedRowKeys.forEach(function (item) {
          map.set(item, 1);
        });
        var selectedRows = list.filter(function (item) {
          return map.has(item[orderSubNo]);
        });

        _this.setState({
          selectedRows: selectedRows
        });
      }
    };

    _this.getCompanyList = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _yield$getCompanyList, companyList, filters, targetFilter;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _api.getCompanyListApi)();

            case 2:
              _yield$getCompanyList = _context.sent;
              companyList = _yield$getCompanyList.list;
              filters = _this.state.filters;
              targetFilter = filters.find(function (item) {
                return item.name === 'companyId';
              });
              filters.splice(0, 1, Object.assign({}, targetFilter, {
                dataSource: companyList
              }));

              _this.setState({
                filters: filters
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.selectChange = function (value, filter) {
      var filters = _this.state.filters;

      if (filter['name'] === 'companyId') {
        var companyId = value;
        (0, _api.getShopListApi)({
          companyId: companyId
        }).then(function (_ref3) {
          var shopList = _ref3.list;
          filters.splice(1, 1, Object.assign({}, filters[1], {
            dataSource: shopList
          }));

          _this.setState({
            filters: filters
          });
        });
      }
    };

    _this.onChangePage = function (current, pageSize) {
      _this.getChildOrder(_this.cacheParams, {
        current: current,
        pageSize: pageSize
      });
    };

    _this.onSearch = function () {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var validateFields = arguments.length > 1 ? arguments[1] : undefined;
      validateFields(function (err, vals) {
        if (err) return;

        if (params['createTime'] && params['createTime'][0]) {
          params['startTime'] = params['createTime'][0].format('YYYY-MM-DD');
          params['endTime'] = params['createTime'][1].format('YYYY-MM-DD');
          delete params['createTime'];

          if ((0, _date.isExceedRange)(params['startTime'], params['endTime'])) {
            _message2.default.error('时间范围不能超过3个月');

            return;
          }
        }

        _this.setState({
          filterParams: params
        });

        _this.getChildOrder(_objectSpread(_objectSpread({}, params), {
          orderNo: '',
          orderSubNo: params.orderNo
        }), _objectSpread({}, _this.state.pageInfo));
      });
    };

    _this.onReset = function () {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this.onChangePage(Object.assign({}, params, {
        page: 1,
        page_size: 10
      }));
    };

    _this.onRefresh = function () {
      _this.getChildOrder();
    };

    _this.onCancleOrder = function (orderSubNo) {
      (0, _api.modifyOrderStatusApi)({
        orderNo: orderSubNo,
        orderStatus: 1000
      }).then(function () {
        _this.getChildOrder();

        _message2.default.success('修改成功');
      }, function (err) {
        _message2.default.error(err);
      });
    };

    _this.onFrieightBack = function (record) {
      var params = {
        orderNo: record.orderSubNo,
        transAmount: record.transPrice
      };
      (0, _api.refundOrderTransApi)(params).then(function () {
        _this.getChildOrder();

        _message2.default.success('退款成功');
      }, function (err) {
        _message2.default.error(err);
      });
    };

    _this.toApply = function (record) {
      _this.setPageParams();

      _this.props.history.push({
        pathname: "/order/order_list_child/after_sale_apply/".concat(record.orderSubNo)
      });
    };

    _this.onModifyOrder = function (record, status, item) {
      var orderNo = record.orderSubNo; // 不需要form弹框 不需要改变订单状态的操作（如打印、申请售后。。。）

      if (!item.filter) {
        // 不需要form弹框 如接单等操作
        _this.onModifyOrderState([orderNo], status, item);
      } else if (item.filter) {
        // 需要form弹框 如取餐码/提货码 等
        _this.setModalInfoState(item, [{
          name: 'pickCode',
          title: item.title + '码',
          type: _constant2.INPUT,
          status: item.status
        }], record);
      }
    };

    _this.onModifyOrderState = function (orderNos, status) {
      // 修改订单状态 / 非取餐码、自提码
      var extra = {
        operatorId: window.localStorage.getItem('userId'),
        operatorType: 'admin',
        operatorName: window.localStorage.getItem('userName'),
        operatorMobile: window.localStorage.getItem('userMobile'),
        desc: ''
      };
      (0, _api.modifyOrderStatusApi)({
        orderNo: orderNos,
        orderStatus: status,
        extra: (0, _objectConvert.objectToLine)(extra)
      }).then(function () {
        _message2.default.success('操作成功');

        _this.onModalCancel();

        _this.getChildOrder();
      }, function (err) {
        _message2.default.error(err);
      });
    };

    _this.onModalOk = /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(e, modalInfo) {
        var filter, record, status, currentStatus, deliveryType, dataSource, form, selectedRows, unDealOrders;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                e.preventDefault();
                filter = modalInfo.filter, record = modalInfo.record, status = modalInfo.status, currentStatus = modalInfo.currentStatus, deliveryType = modalInfo.deliveryType;
                dataSource = _this.state.dataSource;

                if (!(filter && filter.length)) {
                  _context3.next = 8;
                  break;
                }

                form = _this.props.form;
                form.validateFields( /*#__PURE__*/function () {
                  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, val) {
                    var target, targetCode;
                    return _regenerator.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!err) {
                              _context2.next = 2;
                              break;
                            }

                            return _context2.abrupt("return");

                          case 2:
                            target = dataSource.filter(function (item) {
                              return item.orderSubNo === record.orderSubNo;
                            });
                            targetCode = target[0].pickCode;

                            if (!(val.pickCode === targetCode)) {
                              _context2.next = 8;
                              break;
                            }

                            _this.onModifyOrderState([target[0].orderSubNo], filter[0].status);

                            _context2.next = 10;
                            break;

                          case 8:
                            _message2.default.error("".concat(filter[0].title, "\u9519\u8BEF"));

                            return _context2.abrupt("return");

                          case 10:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x3, _x4) {
                    return _ref5.apply(this, arguments);
                  };
                }());
                _context3.next = 16;
                break;

              case 8:
                selectedRows = _this.state.selectedRows;
                unDealOrders = [];
                unDealOrders = selectedRows.map(function (item) {
                  if (currentStatus.includes(item.orderStatus) && deliveryType.includes(item.deliveryType)) {
                    return item.orderSubNo;
                  } else {
                    return false;
                  }
                });
                unDealOrders = unDealOrders.filter(function (item) {
                  return item;
                });

                if (unDealOrders.length) {
                  _context3.next = 15;
                  break;
                }

                _message2.default.error('无可操作订单');

                return _context3.abrupt("return");

              case 15:
                _this.onModifyOrderState(unDealOrders, status);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x, _x2) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.onModalCancel = function () {
      var modalInfo = _this.state.modalInfo;

      _this.setState({
        modalInfo: _objectSpread(_objectSpread({}, modalInfo), {
          visible: false
        })
      });
    };

    _this.renderInput = function (filter) {
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      return /*#__PURE__*/_react.default.createElement(_form.default.Item, {
        label: filter['title'],
        key: filter['name']
      }, getFieldDecorator(filter['name'], {
        rules: [{
          required: true,
          message: "\u8BF7\u8F93\u5165".concat(filter['title'])
        }],
        initialValue: ''
      })( /*#__PURE__*/_react.default.createElement(_input.default, null)));
    };

    _this.onPrint = /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(record) {
        var detail;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _api.getChildOrderDetailApi)({
                  orderNo: record.orderSubNo
                });

              case 2:
                detail = _context4.sent;

                // 获取详情 打印用
                _this.setState({
                  printData: detail
                }, function () {
                  _this.prePrint();
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x5) {
        return _ref6.apply(this, arguments);
      };
    }();

    _this.prePrint = function () {
      var el = document.getElementById('i-print-wrapper');
      var iframe = document.createElement('IFRAME');
      var doc = null;
      iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:500px;top:500px;');
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      doc.write(el.innerHTML);
      doc.close();
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      if (navigator.userAgent.indexOf('MSIE') > 0) {
        document.body.removeChild(iframe);
      }
    };

    _this.onRangeChange = function (date) {
      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          cacheParams = _assertThisInitialize.cacheParams;

      if (date.length) {
        var startTime = date[0].format('YYYY-MM-DD');
        var endTime = date[1].format('YYYY-MM-DD');
        Object.assign(cacheParams, {
          startTime: startTime,
          endTime: endTime
        });
      }
    };

    _this.onExport = function () {
      var _this$state$pageInfo2 = _this.state.pageInfo,
          page = _this$state$pageInfo2.page,
          pageSize = _this$state$pageInfo2.pageSize;
      var filterParams = _this.state.filterParams;
      var startTime, endTime;
      startTime = filterParams.startTime;
      endTime = filterParams.endTime; // 未选择时间 默认3个月

      if (!startTime || !endTime) {
        var range = (0, _date.getThreeMonthRange)(3);
        startTime = range.startTime;
        endTime = range.endTime;
      } else {
        startTime = filterParams.startTime;
        endTime = filterParams.endTime;
      }

      var params = _objectSpread({
        page: page,
        pageSize: pageSize,
        userId: window.localStorage.getItem('userId')
      }, _objectSpread(_objectSpread({}, filterParams), {}, {
        order_sub_no: filterParams.orderNo,
        order_no: '',
        startTime: startTime,
        endTime: endTime
      }));

      (0, _api.exportCSVApi)(params).then(function (res) {
        var url = res.data;
        window.open(url, '_self');
      }).catch(function (err) {
        _message2.default.error(err);
      });
    };

    _this.setModalInfoState = function (item, filter, record) {
      var modalInfo = _this.state.modalInfo;

      _this.setState({
        modalInfo: _objectSpread(_objectSpread({}, modalInfo), {
          title: item.title,
          contentText: item.contentText,
          visible: true,
          status: item.status,
          filter: filter,
          record: record
        })
      });
    };

    _this.onBatchOpration = function (item, filter) {
      // 批量操作
      if (!_this.state.selectedRows.length) {
        _message2.default.error('请选择要进行批量操作的订单');

        return;
      }

      var modalInfo = _this.state.modalInfo;

      _this.setState({
        modalInfo: _objectSpread(_objectSpread({}, modalInfo), {
          title: item.title,
          contentText: item.contentText,
          visible: true,
          status: item.status,
          // 下一个状态
          batchType: item.batchType,
          currentStatus: item.currentStatus,
          // 当前状态
          deliveryType: item.deliveryType,
          filter: filter
        })
      });
    };

    return _this;
  }

  (0, _createClass2.default)(ChildOrderContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var orderNo = this.props.match.params.id || '';

      var pagination = _listPageParams.listPageParams.getParams(this.listPageProps, undefined, function (formParams) {
        _this2.selectChange(formParams['companyId'], {
          name: 'companyId'
        });
      });

      if (pagination) {
        var current = pagination.currentPage,
            pageSize = pagination.pageSize;
        this.setState({
          pageInfo: {
            current: current,
            pageSize: pageSize
          }
        }, function () {
          var getFieldsValue = _this2.listPageProps.form.getFieldsValue;
          var params = getFieldsValue();

          _this2.getChildOrder(_objectSpread(_objectSpread({}, params), {}, {
            orderNo: '',
            orderSubNo: params.orderNo
          })); // orderNo: '', orderSubNo: params.orderNo

        });
      } else {
        this.getChildOrder({
          orderNo: orderNo
        });
      }

      this.getCompanyList();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          modalInfo = _this$state.modalInfo,
          batchOperation = _this$state.batchOperation,
          selectedRowKeys = _this$state.selectedRowKeys,
          printData = _this$state.printData;
      var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: function onChange(selectedRowKeys, selectedRows) {
          _this3.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
          });
        }
      };
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ListPage.default, (0, _extends2.default)({
        id: orderSubNo,
        onSearch: this.onSearch,
        onReset: this.onReset,
        onChangePage: this.onChangePage,
        scroll: {
          x: 1700
        }
      }, this.state, {
        rowSelection: rowSelection,
        selectChange: this.selectChange,
        parentFun: this.getListPageProps,
        match: this.props.match
      }), /*#__PURE__*/_react.default.createElement(_row.default, {
        gutter: 24
      }, /*#__PURE__*/_react.default.createElement(_col.default, {
        span: 24
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        onClick: this.onExport,
        style: {
          marginRight: 8
        }
      }, "\u5BFC\u51FA"), /*#__PURE__*/_react.default.createElement(_button.default, {
        onClick: this.onRefresh,
        style: {
          marginRight: 8
        }
      }, "\u5237\u65B0"), batchOperation.map(function (item) {
        return /*#__PURE__*/_react.default.createElement(_button.default, {
          onClick: function onClick() {
            _this3.onBatchOpration(item, null);
          },
          key: item.name,
          style: {
            marginRight: 8
          }
        }, item.name);
      }))), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: 0,
          height: 0,
          overflow: 'hidden'
        }
      }, /*#__PURE__*/_react.default.createElement(_OrderPrint.default, {
        data: printData
      })), /*#__PURE__*/_react.default.createElement(_modal.default, {
        title: modalInfo.title,
        visible: modalInfo.visible,
        onCancel: this.onModalCancel,
        renderInput: this.renderInput,
        footer: null,
        maskClosable: true
      }, /*#__PURE__*/_react.default.createElement(_form.default, {
        name: "modalForm",
        onSubmit: function onSubmit(e) {
          _this3.onModalOk(e, modalInfo);
        }
      }, modalInfo.filter && modalInfo.filter.length ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, modalInfo.filter.map(function (item) {
        return _this3.renderInput(item);
      })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, modalInfo.contentText), /*#__PURE__*/_react.default.createElement(_row.default, null, /*#__PURE__*/_react.default.createElement(_form.default.Item, {
        wrapperCol: {
          span: 24,
          offset: 16
        }
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        onClick: this.onModalCancel,
        style: {
          marginRight: 20
        }
      }, "\u53D6\u6D88"), /*#__PURE__*/_react.default.createElement(_button.default, {
        type: "primary",
        htmlType: "submit",
        loading: modalInfo.confirmLoading
      }, "\u786E\u5B9A")))))));
    }
  }]);
  return ChildOrderContainer;
}(_react.Component);

var ChildOrderContainerWrapper = _form.default.create()(ChildOrderContainer);

var _default = ChildOrderContainerWrapper;
exports.default = _default;