"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditableCell = exports.EditableFormRow = void 0;

require("antd/es/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _constant = require("../constant");

var _excluded = ["form", "index"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var EditableContext = _react.default.createContext();

var EditableRow = function EditableRow(_ref) {
  var form = _ref.form,
      index = _ref.index,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(EditableContext.Provider, {
    value: form
  }, /*#__PURE__*/_react.default.createElement("tr", props));
};

var noop = function noop() {
  return null;
};

var EditableFormRow = _form.default.create()(EditableRow);

exports.EditableFormRow = EditableFormRow;

var EditableCell = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(EditableCell, _React$Component);

  var _super = _createSuper(EditableCell);

  function EditableCell() {
    var _this;

    (0, _classCallCheck2.default)(this, EditableCell);

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

      var renderholderMap = (_renderholderMap = {}, (0, _defineProperty2.default)(_renderholderMap, _constant.DATERANGE, _this.renderDateRange || noop), (0, _defineProperty2.default)(_renderholderMap, _constant.INPUT, _this.renderInput || noop), (0, _defineProperty2.default)(_renderholderMap, _constant.SELECT, _this.renderSelect || noop), (0, _defineProperty2.default)(_renderholderMap, _constant.INPUTNUMBER, _this.renderInputNumber || noop), _renderholderMap);
      var type = filter.fieldType || _constant.INPUT; // 默认input框

      return renderholderMap[type](filter, inputProps, record);
    };

    _this.renderInput = function (filter, inputProps, record) {
      var getFieldDecorator = _this.form.getFieldDecorator;
      return /*#__PURE__*/_react.default.createElement(_form.default.Item, null, getFieldDecorator(filter['dataIndex'], {
        rules: [{
          required: filter.required,
          message: "\u8BF7\u8F93\u5165".concat(filter.title)
        }],
        initialValue: ''
      })( /*#__PURE__*/_react.default.createElement(_input.default, null)));
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
      return /*#__PURE__*/_react.default.createElement(_form.default.Item, null, getFieldDecorator(filter['dataIndex'], {
        rules: [{
          required: typeof filter.required === 'function' ? filter.required(record) : filter.required,
          message: "\u8BF7\u8F93\u5165".concat(filter.title)
        }],
        initialValue: initialValue
      })( /*#__PURE__*/_react.default.createElement(_inputNumber.default, (0, _extends2.default)({
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

      if (editKey && fieldType === _constant.INPUTNUMBER) {
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

  (0, _createClass2.default)(EditableCell, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          editKey = _this$props4.editKey,
          children = _this$props4.children;
      var com = null;

      if (editKey) {
        com = /*#__PURE__*/_react.default.createElement(EditableContext.Consumer, null, function (form) {
          return _this2.renderInputCell(form);
        });
      } else {
        com = children;
      } // return <td {...restProps}>{com}</td>


      return /*#__PURE__*/_react.default.createElement("td", null, com);
    }
  }]);
  return EditableCell;
}(_react.default.Component);

exports.EditableCell = EditableCell;