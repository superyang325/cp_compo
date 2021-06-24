import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/card/style";
import _Card from "antd/es/card";
import "antd/es/form/style";
import _Form from "antd/es/form";
import "antd/es/row/style";
import _Row from "antd/es/row";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";
import "antd/es/select/style";
import _Select from "antd/es/select";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
// import CustomerBreadcrumb from '../../../components/CustomerBreadcrumb';
import { DATERANGE, INPUT, SELECT } from '../constant';
var COLNUM = 3;
var Option = _Select.Option;
var RangePicker = _DatePicker.RangePicker;
var formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};

var listPage = /*#__PURE__*/function (_React$Component) {
  _inherits(listPage, _React$Component);

  var _super = _createSuper(listPage);

  function listPage() {
    var _this;

    _classCallCheck(this, listPage);

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
      var defultValueMap = (_defultValueMap = {}, _defineProperty(_defultValueMap, DATERANGE, []), _defineProperty(_defultValueMap, INPUT, ''), _defineProperty(_defultValueMap, SELECT, ''), _defultValueMap);
      filters.forEach(function (filter) {
        var dataSource = filter.dataSource;
        var type = INPUT;

        if (Array.isArray(dataSource)) {
          type = SELECT;
        } else if (dataSource === DATERANGE) {
          type = DATERANGE;
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
        rowEls.push( /*#__PURE__*/React.createElement(_Row, {
          key: i
        }, _this.renderFormItem(i, filters)));
      }

      return /*#__PURE__*/React.createElement(_Card, {
        style: {
          border: 'none'
        }
      }, /*#__PURE__*/React.createElement(_Form, formItemLayout, rowEls));
    };

    _this.renderFormItem = function (rowIndex, filters) {
      var colELs = [];

      for (var i = 0, len = COLNUM; i < len; i++) {
        var filter = filters[rowIndex * COLNUM + i];

        if (filter) {
          colELs.push( /*#__PURE__*/React.createElement(_Col, {
            key: i,
            span: 8
          }, _this.renderFilterItem(filter)));
        } else if (i === COLNUM - 1) {
          colELs.push( /*#__PURE__*/React.createElement(_Col, {
            key: i,
            offset: 2,
            span: 6
          }, /*#__PURE__*/React.createElement(_Button, {
            onClick: _this.onSubmit,
            type: "primary"
          }, "\u786E\u5B9A"), /*#__PURE__*/React.createElement(_Button, {
            onClick: _this.onReset,
            style: {
              marginLeft: 20
            }
          }, "\u91CD\u7F6E")));
        } else {
          colELs.push( /*#__PURE__*/React.createElement(_Col, {
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
      var renderholderMap = (_renderholderMap = {}, _defineProperty(_renderholderMap, DATERANGE, _this.renderDateRange), _defineProperty(_renderholderMap, INPUT, _this.renderInput), _defineProperty(_renderholderMap, SELECT, _this.renderSelect), _renderholderMap);
      var type = INPUT;

      if (Array.isArray(dataSource)) {
        type = SELECT;
      } else if (dataSource === DATERANGE) {
        type = DATERANGE;
      }

      return renderholderMap[type](filter);
    };

    _this.renderInput = function (filter) {
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      return /*#__PURE__*/React.createElement(_Form.Item, {
        label: filter['title']
      }, getFieldDecorator(filter['name'])( /*#__PURE__*/React.createElement(_Input, null)));
    };

    _this.renderSelect = function (filter) {
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      var selectChange = _this.props.selectChange;

      if (!selectChange) {
        selectChange = function selectChange() {};
      }

      return /*#__PURE__*/React.createElement(_Form.Item, {
        label: filter['title']
      }, getFieldDecorator(filter['name'], {
        rules: [{
          required: filter['required'] || false,
          message: filter['message'] || ''
        }]
      })( /*#__PURE__*/React.createElement(_Select, {
        onChange: function onChange(e) {
          selectChange(e, filter);
        }
      }, filter.dataSource.map(function (item) {
        return /*#__PURE__*/React.createElement(Option, {
          key: item.value,
          value: item.value
        }, item.label);
      }))));
    };

    _this.renderDateRange = function (filter) {
      var onRangeChange = _this.props.onRangeChange;
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      return /*#__PURE__*/React.createElement(_Form.Item, {
        label: filter['title']
      }, getFieldDecorator(filter['name'])( /*#__PURE__*/React.createElement(RangePicker, {
        onChange: onRangeChange
      })));
    };

    return _this;
  }

  _createClass(listPage, [{
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
      return /*#__PURE__*/React.createElement(React.Fragment, null, this.renderForm(filters), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
        style: {
          minHeight: '600px',
          backgroundColor: '#fff',
          padding: 20
        }
      }, this.props.children, /*#__PURE__*/React.createElement(_Table, {
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
}(React.Component);

export default _Form.create()(listPage);