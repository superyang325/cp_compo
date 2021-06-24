import "antd/es/modal/style";
import _Modal from "antd/es/modal";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/form/style";
import _Form from "antd/es/form";
import "antd/es/input/style";
import _Input from "antd/es/input";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';

// const defualtConfig = []
var CodeForm = /*#__PURE__*/function (_Component) {
  _inherits(CodeForm, _Component);

  var _super = _createSuper(CodeForm);

  function CodeForm() {
    var _this;

    _classCallCheck(this, CodeForm);

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

  _createClass(CodeForm, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          modalControl = _this$props.modalControl,
          hideModal = _this$props.hideModal;
      var getFieldDecorator = this.props.form.getFieldDecorator;
      return /*#__PURE__*/React.createElement(_Modal, {
        visible: modalControl.visible,
        title: modalControl.title,
        footer: null,
        className: "shop-detail",
        maskClosable: modalControl.maskClosable,
        onCancel: hideModal,
        onOk: this.handleSubmit // width={800}

      }, /*#__PURE__*/React.createElement(_Form, null, /*#__PURE__*/React.createElement(_Form.Item, null, getFieldDecorator('code', {
        rules: [{
          required: true,
          message: '请输入自提码'
        }]
      })( /*#__PURE__*/React.createElement(_Input, {
        placeholder: '请输入自提码'
      }))), /*#__PURE__*/React.createElement(_Row, null, /*#__PURE__*/React.createElement(_Col, {
        span: 24,
        offset: 8
      }, /*#__PURE__*/React.createElement(_Button, {
        style: {
          marginRight: 30
        },
        className: "login-form-button",
        onClick: hideModal
      }, "\u5173\u95ED"), /*#__PURE__*/React.createElement(_Button, {
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
}(Component);

export default _Form.create({
  name: 'codeForm'
})(CodeForm);