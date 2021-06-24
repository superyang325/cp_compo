"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// const defualtConfig = []
var CodeForm = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(CodeForm, _Component);

  var _super = _createSuper(CodeForm);

  function CodeForm() {
    var _this;

    (0, _classCallCheck2.default)(this, CodeForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleSubmit = function (e) {
      e.preventDefault();

      _this.props.form.validateFields(function (err, values) {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };

    return _this;
  }

  (0, _createClass2.default)(CodeForm, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          modalControl = _this$props.modalControl,
          hideModal = _this$props.hideModal;
      var getFieldDecorator = this.props.form.getFieldDecorator;
      return /*#__PURE__*/_react.default.createElement(_modal.default, {
        visible: modalControl.visible,
        title: modalControl.title,
        footer: null,
        className: "shop-detail",
        maskClosable: modalControl.maskClosable,
        onCancel: hideModal,
        onOk: this.handleSubmit // width={800}

      }, /*#__PURE__*/_react.default.createElement(_form.default, null, /*#__PURE__*/_react.default.createElement(_form.default.Item, null, getFieldDecorator('code', {
        rules: [{
          required: true,
          message: '请输入自提码'
        }]
      })( /*#__PURE__*/_react.default.createElement(_input.default, {
        placeholder: '请输入自提码'
      }))), /*#__PURE__*/_react.default.createElement(_row.default, null, /*#__PURE__*/_react.default.createElement(_col.default, {
        span: 24,
        offset: 8
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        style: {
          marginRight: 30
        },
        className: "login-form-button",
        onClick: hideModal
      }, "\u5173\u95ED"), /*#__PURE__*/_react.default.createElement(_button.default, {
        type: "primary",
        style: {
          marginLeft: 30
        },
        onClick: this.handleSubmit,
        className: "login-form-button"
      }, "\u786E\u8BA4")))));
    }
  }]);
  return CodeForm;
}(_react.Component);

var _default = _form.default.create({
  name: 'codeForm'
})(CodeForm);

exports.default = _default;