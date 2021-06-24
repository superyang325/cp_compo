import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";
import _extends from "@babel/runtime/helpers/esm/extends";
import "antd/es/input/style";
import _Input from "antd/es/input";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import "antd/es/form/style";
import _Form from "antd/es/form";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["form", "index"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from "react";
import { DATERANGE, INPUT, SELECT, INPUTNUMBER } from '../constant';
var EditableContext = React.createContext();

var EditableRow = function EditableRow(_ref) {
  var form = _ref.form,
      index = _ref.index,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(EditableContext.Provider, {
    value: form
  }, /*#__PURE__*/React.createElement("tr", props));
};

var noop = function noop() {
  return null;
};

export var EditableFormRow = _Form.create()(EditableRow);
export var EditableCell = /*#__PURE__*/function (_React$Component) {
  _inherits(EditableCell, _React$Component);

  var _super = _createSuper(EditableCell);

  function EditableCell() {
    var _this;

    _classCallCheck(this, EditableCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      editing: true
    };
    _this.form = void 0;

    _this.onSave = function () {
      setTimeout(function () {
        var _this$props = _this.props,
            record = _this$props.record,
            handleSave = _this$props.handleSave,
            editKey = _this$props.editKey;

        _this.form.validateFields(function (errs, values) {
          if (errs && errs[editKey]) {
            return;
          }

          handleSave(_objectSpread(_objectSpread({}, record), values), editKey, _this.form);
        });
      });
    };

    _this.renderFilterItem = function (filter, inputProps, record) {
      var _renderholderMap;

      var renderholderMap = (_renderholderMap = {}, _defineProperty(_renderholderMap, DATERANGE, _this.renderDateRange || noop), _defineProperty(_renderholderMap, INPUT, _this.renderInput || noop), _defineProperty(_renderholderMap, SELECT, _this.renderSelect || noop), _defineProperty(_renderholderMap, INPUTNUMBER, _this.renderInputNumber || noop), _renderholderMap);
      var type = filter.fieldType || INPUT; // 默认input框

      return renderholderMap[type](filter, inputProps, record);
    };

    _this.renderInput = function (filter, inputProps, record) {
      var getFieldDecorator = _this.form.getFieldDecorator;
      return /*#__PURE__*/React.createElement(_Form.Item, null, getFieldDecorator(filter['dataIndex'], {
        rules: [{
          required: filter.required,
          message: "\u8BF7\u8F93\u5165".concat(filter.title)
        }],
        initialValue: ''
      })( /*#__PURE__*/React.createElement(_Input, null)));
    };

    _this.renderInputNumber = function (filter, inputProps, record) {
      var _this$props2 = _this.props,
          min = _this$props2.min,
          max = _this$props2.max,
          setInitialValue = _this$props2.setInitialValue;
      var initialValue, getMin, getMax;

      if (typeof min === 'function') {
        getMin = min(record);
      } else {
        getMin = min;
      }

      if (typeof max === 'function') {
        getMax = max(record);
      } else {
        getMax = max;
      }

      if (setInitialValue === 'min') {
        initialValue = getMin;
      } else if (setInitialValue === 'max') {
        initialValue = getMax;
      } else {// initialValue = getMin
      }

      var getFieldDecorator = _this.form.getFieldDecorator;
      var onChange = filter.onChange ? _this.onSave : noop;
      return /*#__PURE__*/React.createElement(_Form.Item, null, getFieldDecorator(filter['dataIndex'], {
        rules: [{
          required: typeof filter.required === 'function' ? filter.required(record) : filter.required,
          message: "\u8BF7\u8F93\u5165".concat(filter.title)
        }],
        initialValue: initialValue
      })( /*#__PURE__*/React.createElement(_InputNumber, _extends({
        onChange: onChange,
        ref: function ref(node) {
          _this.input = node;
        },
        disabled: filter.disabled()
      }, inputProps))));
    };

    _this.renderInputCell = function (form) {
      _this.form = form;
      var _this$props3 = _this.props,
          dataIndex = _this$props3.dataIndex,
          children = _this$props3.children,
          record = _this$props3.record,
          fieldType = _this$props3.fieldType,
          editKey = _this$props3.editKey,
          disabled = _this$props3.disabled,
          required = _this$props3.required,
          title = _this$props3.title,
          onChange = _this$props3.onChange;
      var inputProps = _this.getInputProps(_this.props) || {};
      var filter = {
        fieldType: fieldType,
        dataIndex: dataIndex,
        record: record,
        disabled: disabled,
        required: required,
        title: title,
        onChange: onChange
      };

      if (editKey) {
        return _this.renderFilterItem(filter, inputProps, record);
      } else {
        return {
          children: children
        };
      }
    };

    _this.getInputProps = function (props) {
      var editKey = props.editKey,
          fieldType = props.fieldType,
          title = props.title,
          record = props.record,
          precision = props.precision,
          max = props.max,
          min = props.min,
          step = props.step;

      if (editKey && fieldType === INPUTNUMBER) {
        var getMax, getMin;

        if (max && typeof max === 'function') {
          getMax = max(record);
        } else {
          getMax = max || 99999;
        }

        if (min && typeof min === 'function') {
          getMin = min(record);
        } else {
          getMin = min || 0;
        }

        return {
          max: getMax,
          min: getMin,
          precision: precision,
          // 数值精度
          step: step || 1,
          placeholder: "\u8BF7\u8F93\u5165".concat(title) //record.refundableNum === 0 ? '0' : '1',

        };
      } else {
        return {};
      }
    };

    return _this;
  }

  _createClass(EditableCell, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          editKey = _this$props4.editKey,
          children = _this$props4.children;
      var com = null;

      if (editKey) {
        com = /*#__PURE__*/React.createElement(EditableContext.Consumer, null, function (form) {
          return _this2.renderInputCell(form);
        });
      } else {
        com = children;
      } // return <td {...restProps}>{com}</td>


      return /*#__PURE__*/React.createElement("td", null, com);
    }
  }]);

  return EditableCell;
}(React.Component);