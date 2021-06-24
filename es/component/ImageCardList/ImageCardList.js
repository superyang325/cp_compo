import "antd/es/modal/style";
import _Modal from "antd/es/modal";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import './ImageCardList.less';

var ImageCardList = /*#__PURE__*/function (_Component) {
  _inherits(ImageCardList, _Component);

  var _super = _createSuper(ImageCardList);

  function ImageCardList() {
    var _this;

    _classCallCheck(this, ImageCardList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      visible: false,
      previewUrl: ''
    };

    _this.openModal = function (previewUrl) {
      _this.setState({
        previewUrl: previewUrl,
        visible: true
      });
    };

    _this.closeModal = function () {
      _this.setState({
        visible: false
      });
    };

    return _this;
  }

  _createClass(ImageCardList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$imageUrlL = this.props.imageUrlList,
          imageUrlList = _this$props$imageUrlL === void 0 ? [] : _this$props$imageUrlL;
      var _this$state = this.state,
          visible = _this$state.visible,
          previewUrl = _this$state.previewUrl;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "image-card-list-component"
      }, imageUrlList.map(function (imageUrl, index) {
        return /*#__PURE__*/React.createElement("span", {
          className: "image-item-container",
          key: index,
          onClick: function onClick() {
            _this2.openModal(imageUrl);
          }
        }, /*#__PURE__*/React.createElement("img", {
          src: imageUrl,
          className: "image-item",
          alt: 'img'
        }));
      })), /*#__PURE__*/React.createElement(_Modal, {
        visible: visible,
        footer: null,
        onCancel: this.closeModal,
        destroyOnClose: true,
        width: 820
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: 'center',
          padding: '0 10px'
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: previewUrl,
        alt: "img",
        style: {
          maxHeight: 500,
          maxWidth: '100%'
        }
      }))));
    }
  }]);

  return ImageCardList;
}(Component);

export { ImageCardList as default };
ImageCardList.propTypes = {
  imageUrlList: PropTypes.array // 图片url数组 默认[]

};