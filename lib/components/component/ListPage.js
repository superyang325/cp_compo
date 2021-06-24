"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/card/style");

var _card = _interopRequireDefault(require("antd/es/card"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

require("antd/es/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/es/date-picker"));

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

var _react = _interopRequireDefault(require("react"));

var _constant = require("../constant");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var COLNUM = 3;
var Option = _select.default.Option;
var RangePicker = _datePicker.default.RangePicker;
var formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};

var listPage = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(listPage, _React$Component);

  var _super = _createSuper(listPage);

  function listPage() {
    var _this;

    (0, _classCallCheck2.default)(this, listPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onSubmit = function () {
      var onSearch = _this.props.onSearch;
      var _this$props$form = _this.props.form,
          getFieldsValue = _this$props$form.getFieldsValue,
          validateFields = _this$props$form.validateFields;
      onSearch(getFieldsValue(), validateFields);
    };

    _this.onReset = function () {
      var _defultValueMap;

      var _this$props = _this.props,
          onSearch = _this$props.onSearch,
          filters = _this$props.filters;
      var _this$props$form2 = _this.props.form,
          setFieldsValue = _this$props$form2.setFieldsValue,
          validateFields = _this$props$form2.validateFields;
      var fieldsValue = {};
      var defultValueMap = (_defultValueMap = {}, (0, _defineProperty2.default)(_defultValueMap, _constant.DATERANGE, []), (0, _defineProperty2.default)(_defultValueMap, _constant.INPUT, ''), (0, _defineProperty2.default)(_defultValueMap, _constant.SELECT, ''), _defultValueMap);
      filters.forEach(function (filter) {
        var dataSource = filter.dataSource;
        var type = _constant.INPUT;

        if (Array.isArray(dataSource)) {
          type = _constant.SELECT;
        } else if (dataSource === _constant.DATERANGE) {
          type = _constant.DATERANGE;
        }

        fieldsValue[filter['name']] = defultValueMap[type];
      });
      setFieldsValue(fieldsValue);
      onSearch(fieldsValue, validateFields);
    };

    _this.renderForm = function (filters) {
      var rowNum = filters && filters.length > 0 ? filters.length % COLNUM === 0 ? Math.ceil(filters.length / COLNUM) + 1 : Math.ceil(filters.length / COLNUM) : 0;
      var rowEls = [];

      for (var i = 0, len = rowNum; i < len; i++) {
        rowEls.push( /*#__PURE__*/_react.default.createElement(_row.default, {
          key: i
        }, _this.renderFormItem(i, filters)));
      }

      return /*#__PURE__*/_react.default.createElement(_card.default, {
        style: {
          border: 'none'
        }
      }, /*#__PURE__*/_react.default.createElement(_form.default, formItemLayout, rowEls));
    };

    _this.renderFormItem = function (rowIndex, filters) {
      var colELs = [];

      for (var i = 0, len = COLNUM; i < len; i++) {
        var filter = filters[rowIndex * COLNUM + i];

        if (filter) {
          colELs.push( /*#__PURE__*/_react.default.createElement(_col.default, {
            key: i,
            span: 8
          }, _this.renderFilterItem(filter)));
        } else if (i === COLNUM - 1) {
          colELs.push( /*#__PURE__*/_react.default.createElement(_col.default, {
            key: i,
            offset: 2,
            span: 6
          }, /*#__PURE__*/_react.default.createElement(_button.default, {
            onClick: _this.onSubmit,
            type: "primary"
          }, "\u786E\u5B9A"), /*#__PURE__*/_react.default.createElement(_button.default, {
            onClick: _this.onReset,
            style: {
              marginLeft: 20
            }
          }, "\u91CD\u7F6E")));
        } else {
          colELs.push( /*#__PURE__*/_react.default.createElement(_col.default, {
            key: i,
            span: 8
          }));
        }
      }

      return colELs;
    };

    _this.renderFilterItem = function (filter) {
      var _renderholderMap;

      var dataSource = filter.dataSource;
      var renderholderMap = (_renderholderMap = {}, (0, _defineProperty2.default)(_renderholderMap, _constant.DATERANGE, _this.renderDateRange), (0, _defineProperty2.default)(_renderholderMap, _constant.INPUT, _this.renderInput), (0, _defineProperty2.default)(_renderholderMap, _constant.SELECT, _this.renderSelect), _renderholderMap);
      var type = _constant.INPUT;

      if (Array.isArray(dataSource)) {
        type = _constant.SELECT;
      } else if (dataSource === _constant.DATERANGE) {
        type = _constant.DATERANGE;
      }

      return renderholderMap[type](filter);
    };

    _this.renderInput = function (filter) {
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      return /*#__PURE__*/_react.default.createElement(_form.default.Item, {
        label: filter['title']
      }, getFieldDecorator(filter['name'])( /*#__PURE__*/_react.default.createElement(_input.default, null)));
    };

    _this.renderSelect = function (filter) {
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      var selectChange = _this.props.selectChange;

      if (!selectChange) {
        selectChange = function selectChange() {};
      }

      return /*#__PURE__*/_react.default.createElement(_form.default.Item, {
        label: filter['title']
      }, getFieldDecorator(filter['name'], {
        rules: [{
          required: filter['required'] || false,
          message: filter['message'] || ''
        }]
      })( /*#__PURE__*/_react.default.createElement(_select.default, {
        onChange: function onChange(e) {
          selectChange(e, filter);
        }
      }, filter.dataSource.map(function (item) {
        return /*#__PURE__*/_react.default.createElement(Option, {
          key: item.value,
          value: item.value
        }, item.label);
      }))));
    };

    _this.renderDateRange = function (filter) {
      var onRangeChange = _this.props.onRangeChange;
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      return /*#__PURE__*/_react.default.createElement(_form.default.Item, {
        label: filter['title']
      }, getFieldDecorator(filter['name'])( /*#__PURE__*/_react.default.createElement(RangePicker, {
        onChange: onRangeChange
      })));
    };

    return _this;
  }

  (0, _createClass2.default)(listPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var parentFun = this.props.parentFun;
      parentFun?.(this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          dataSource = _this$props2.dataSource,
          _this$props2$pageInfo = _this$props2.pageInfo,
          pageSize = _this$props2$pageInfo.pageSize,
          total = _this$props2$pageInfo.total,
          current = _this$props2$pageInfo.current,
          columns = _this$props2.columns,
          onChangePage = _this$props2.onChangePage,
          filters = _this$props2.filters,
          loading = _this$props2.loading,
          id = _this$props2.id,
          scroll = _this$props2.scroll,
          rowSelection = _this$props2.rowSelection;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.renderForm(filters), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          minHeight: '600px',
          backgroundColor: '#fff',
          padding: 20
        }
      }, this.props.children, /*#__PURE__*/_react.default.createElement(_table.default, {
        rowKey: function rowKey(record) {
          return record[id];
        },
        columns: columns,
        dataSource: dataSource,
        loading: loading && loading.tableLoading,
        scroll: scroll,
        rowSelection: rowSelection // pagination={{
        //   pageSize,
        //   total,
        //   current: current + 1,
        //   onChange: (current, pageSize) => {
        //     onChangePage && onChangePage(current - 1, pageSize);
        //   },
        // }}
        ,
        pagination: {
          pageSize: pageSize,
          total: total,
          current: current,
          onChange: function onChange(current, pageSize) {
            onChangePage && onChangePage(current, pageSize);
          }
        }
      })));
    }
  }]);
  return listPage;
}(_react.default.Component);

var _default = _form.default.create()(listPage);

exports.default = _default;