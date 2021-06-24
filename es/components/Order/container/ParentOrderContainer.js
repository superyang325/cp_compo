import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import "antd/es/message/style";
import _message from "antd/es/message";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import ListPage from '../../../component/ListPage';
import { getParentOrderListApi, exportCSVApi } from '../api';
import { PAYSTATUS, PAYTYPE } from '../constant';
import { DATERANGE } from '../../../constant';
import { isExceedRange, getThreeMonthRange } from '../../../util/date'; // import { listPageParams } from '../../../util/listPageParams'
// import moment from 'moment'

var ParentOrder = /*#__PURE__*/function (_Component) {
  _inherits(ParentOrder, _Component);

  var _super = _createSuper(ParentOrder);

  function ParentOrder() {
    var _this;

    _classCallCheck(this, ParentOrder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.orderNo = void 0;
    _this.listPageProps = void 0;
    _this.state = {
      filters: [{
        title: '主订单号',
        name: 'orderNo'
      }, {
        title: '创建时间',
        name: 'createTime',
        dataSource: DATERANGE
      }, {
        title: '支付方式',
        name: 'orderPayWay',
        dataSource: [{
          label: '全部',
          value: ''
        }, {
          label: '微信',
          value: '1'
        }, {
          label: '储值',
          value: '2'
        }]
      }, {
        title: '支付状态',
        name: 'orderPayStatus',
        dataSource: [{
          label: '全部',
          value: ''
        }, {
          label: '未付款',
          value: '0'
        }, {
          label: '已付款',
          value: '1'
        }]
      }, {
        title: '用户手机号',
        name: 'phone'
      }],
      dataSource: [],
      columns: [// {
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
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        align: 'center'
      }, {
        title: '支付状态',
        dataIndex: 'payStatus',
        align: 'center',
        render: function render(val) {
          return PAYSTATUS[val];
        }
      }, {
        title: '用户手机号',
        dataIndex: 'phone',
        align: 'center',
        width: 130
      }, {
        title: '订单金额（元）',
        dataIndex: 'realPrice',
        align: 'center'
      }, {
        title: '运费（元）',
        dataIndex: 'transPrice',
        align: 'center'
      }, {
        title: '支付方式',
        dataIndex: 'orderPayWay',
        align: 'center',
        render: function render(val) {
          return val.map(function (item) {
            return PAYTYPE[item];
          }).join(' | ');
        }
      }, {
        title: '支付时间',
        dataIndex: 'orderPayTime',
        align: 'center'
      }, {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        fixed: 'right',
        width: 120,
        render: function render(val, record) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
            onClick: function onClick() {
              return _this.onLinkRouter(record.orderNo);
            }
          }, "\u67E5\u770B\u5B50\u5355"));
        }
      }],
      pageInfo: {
        // total: 0,
        current: 1,
        pageSize: 10
      },
      loading: {
        tableLoading: false
      },
      filterParams: {}
    };
    _this.cacheParams = {};

    _this.onLinkRouter = function (orderNo) {
      _this.setPageParams();

      _this.props.history.push({
        pathname: "/order/order_list_child/".concat(orderNo)
      });
    };

    _this.setPageParams = function () {
      var _this$state$pageInfo = _this.state.pageInfo,
          current = _this$state$pageInfo.current,
          pageSize = _this$state$pageInfo.pageSize;
      var pagination = {
        currentPage: current,
        pageSize: pageSize
      }; // listPageParams.setParams(this.listPageProps, pagination);
    };

    _this.getListPageProps = function (props) {
      _this.listPageProps = props;
    };

    _this.getParentOrder = function () {
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

      getParentOrderListApi(Object.assign({}, pageInfo, params)).then(function (_ref) {
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
      }).catch(function (err) {
        _message.error(err);
      });
    };

    _this.onChangePage = function (current, pageSize) {
      _this.getParentOrder(_this.cacheParams, {
        current: current,
        pageSize: pageSize
      });
    };

    _this.onSearch = function () {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params['createTime'] && params['createTime'][0]) {
        params['startTime'] = params['createTime'][0].format('YYYY-MM-DD');
        params['endTime'] = params['createTime'][1].format('YYYY-MM-DD');
        delete params['createTime'];

        if (isExceedRange(params['startTime'], params['endTime'])) {
          _message.error('时间范围不能超过3个月');

          return;
        }
      } // else{
      //   const {startTime,endTime} = getThreeMonthRange(3)
      //   params['startTime'] = startTime
      //   params['endTime'] = endTime
      // }


      _this.setState({
        filterParams: params
      });

      _this.getParentOrder(params, _objectSpread(_objectSpread({}, _this.state.pageInfo), {}, {
        page: 1
      }));
    };

    _this.onReset = function () {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this.onChangePage(Object.assign({}, params, {
        page: 1,
        page_size: 10
      }));
    };

    _this.onRefresh = function () {
      _this.getParentOrder();
    };

    _this.onExport = function () {
      var _this$state$pageInfo2 = _this.state.pageInfo,
          page = _this$state$pageInfo2.page,
          pageSize = _this$state$pageInfo2.pageSize;
      var filterParams = _this.state.filterParams;
      var startTime, endTime;
      startTime = filterParams.startTime;
      endTime = filterParams.endTime;
      console.log(startTime, endTime); // 未选择时间 默认3个月

      if (!startTime || !endTime) {
        var range = getThreeMonthRange(3);
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
        startTime: startTime,
        endTime: endTime
      }));

      console.log('导出接口参数', params);
      exportCSVApi(params).then(function (res) {
        var url = res.data;
        window.open(url, '_self');
      }).catch(function (err) {
        _message.error(err);
      });
    };

    return _this;
  }

  _createClass(ParentOrder, [{
    key: "componentDidMount",
    value: function componentDidMount() {
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
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          dataSource = _this$state.dataSource,
          columns = _this$state.columns,
          filters = _this$state.filters,
          pageInfo = _this$state.pageInfo;
      return /*#__PURE__*/React.createElement("div", null, "listPage \u7EC4\u4EF6");
    }
  }]);

  return ParentOrder;
}(Component);

export default ParentOrder;