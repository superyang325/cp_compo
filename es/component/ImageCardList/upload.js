import "antd/es/icon/style";
import _Icon from "antd/es/icon";
import "antd/es/progress/style";
import _Progress from "antd/es/progress";
import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Upload from 'rc-upload';
import previewImage from '../../util/previewImage';
import './upload.less';

var CustomerUpload = /*#__PURE__*/function (_React$Component) {
  _inherits(CustomerUpload, _React$Component);

  var _super = _createSuper(CustomerUpload);

  function CustomerUpload() {
    var _this;

    _classCallCheck(this, CustomerUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onStart = function (file) {
      var onChange = _this.props.onChange;
      previewImage(file).then(function (thumbUrl) {
        var fileList = _this.props.fileList ? _toConsumableArray(_this.props.fileList) : [];
        fileList.push(Object.assign(file, {
          thumbUrl: thumbUrl,
          status: 'uploading',
          percent: 0
        }));
        typeof onChange === 'function' && onChange(fileList);
      });
    };

    _this.onProgress = function (event, file) {
      var fileList = _this.props.fileList ? _toConsumableArray(_this.props.fileList) : [];
      var onChange = _this.props.onChange;

      if (typeof onChange === 'function') {
        file.percent = event.percent;
        file.percent = 100;
        file.status = 'done';
        onChange(fileList);
      }
    };

    _this.onSuccess = function (response, file) {
      // console.log(response,file)
      var fileList = _this.props.fileList ? _toConsumableArray(_this.props.fileList) : [];
      var onChange = _this.props.onChange;

      if (typeof onChange === 'function') {
        file.percent = 100;
        file.status = 'done';
        file.response = response;
        onChange(fileList);
      }
    };

    _this.onRemove = function (index) {
      var onChange = _this.props.onChange;

      if (!onChange) {
        return;
      }

      var fileList = _toConsumableArray(_this.props.fileList);

      fileList.splice(index, 1);
      onChange(fileList);
    };

    _this.onUp = function (index) {
      var onChange = _this.props.onChange;

      if (!onChange) {
        return;
      }

      var fileList = _toConsumableArray(_this.props.fileList);

      fileList[index - 1] = fileList.splice(index, 1, fileList[index - 1])[0];
      onChange(fileList);
    };

    _this.onDown = function (index) {
      var onChange = _this.props.onChange;

      if (!onChange) {
        return;
      }

      var fileList = _toConsumableArray(_this.props.fileList);

      fileList[index + 1] = fileList.splice(index, 1, fileList[index + 1])[0];
      onChange(fileList);
    };

    _this.onError = function () {};

    return _this;
  }

  _createClass(CustomerUpload, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      //参数与回调函数对应
      //图片 列表显示 删除 添加 预览
      var _this$props = this.props,
          fileList = _this$props.fileList,
          beforeUpload = _this$props.beforeUpload,
          onPreview = _this$props.onPreview;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Upload, _extends({}, this.props, {
        multiple: true,
        onStart: this.onStart,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
        onError: this.onError,
        beforeUpload: beforeUpload
      }), this.props.children), Array.isArray(fileList) ? fileList.map(function (file, index, arr) {
        return /*#__PURE__*/React.createElement("div", {
          key: file.uid,
          className: "customer-file-container"
        }, /*#__PURE__*/React.createElement("div", {
          className: "left"
        }, /*#__PURE__*/React.createElement("img", {
          className: "pic",
          src: file.thumbUrl || file.url,
          alt: file.name
        }), /*#__PURE__*/React.createElement("span", {
          className: "pic-detail"
        }, /*#__PURE__*/React.createElement("div", {
          className: "pic-name"
        }, file.name), file.status !== 'done' ? /*#__PURE__*/React.createElement(_Progress, {
          size: "small",
          percent: file.percent,
          showInfo: false,
          strokeWidth: 2,
          strokeColor: "#72c140",
          status: file.percent === 100 ? 'success' : 'active'
        }) : null)), /*#__PURE__*/React.createElement("div", {
          className: "right"
        }, /*#__PURE__*/React.createElement("span", null, file.status === 'done' ? /*#__PURE__*/React.createElement(React.Fragment, null, arr.length !== 1 && index !== 0 ? /*#__PURE__*/React.createElement(_Icon, {
          onClick: function onClick() {
            _this2.onUp(index);
          },
          className: "pic-btn",
          type: "arrow-up"
        }) : null, arr.length !== 1 && index !== arr.length - 1 ? /*#__PURE__*/React.createElement(_Icon, {
          onClick: function onClick() {
            _this2.onDown(index);
          },
          className: "pic-btn",
          type: "arrow-down"
        }) : null, /*#__PURE__*/React.createElement(_Icon, {
          type: "eye",
          className: "pic-btn",
          onClick: function onClick() {
            typeof onPreview === 'function' && onPreview(file);
          }
        }), /*#__PURE__*/React.createElement(_Icon, {
          className: "pic-btn",
          onClick: function onClick() {
            window.open(file.url ? file.url : file.response && file.response.data && file.response.data[0]);
          },
          type: "download"
        })) : null, /*#__PURE__*/React.createElement(_Icon, {
          className: "pic-btn",
          type: "delete",
          onClick: function onClick() {
            _this2.onRemove(index);
          }
        }))));
      }) : null);
    }
  }]);

  return CustomerUpload;
}(React.Component);

export { CustomerUpload as default };
CustomerUpload.propTypes = {
  onChange: PropTypes.func,
  fileList: PropTypes.array
};