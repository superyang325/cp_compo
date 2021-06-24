"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/progress/style");

var _progress = _interopRequireDefault(require("antd/es/progress"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcUpload = _interopRequireDefault(require("rc-upload"));

var _previewImage = _interopRequireDefault(require("../../util/previewImage"));

require("./upload.less");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CustomerUpload = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(CustomerUpload, _React$Component);

  var _super = _createSuper(CustomerUpload);

  function CustomerUpload() {
    var _this;

    (0, _classCallCheck2.default)(this, CustomerUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onStart = function (file) {
      var onChange = _this.props.onChange;
      (0, _previewImage.default)(file).then(function (thumbUrl) {
        var fileList = _this.props.fileList ? (0, _toConsumableArray2.default)(_this.props.fileList) : [];
        fileList.push(Object.assign(file, {
          thumbUrl: thumbUrl,
          status: 'uploading',
          percent: 0
        }));
        typeof onChange === 'function' && onChange(fileList);
      });
    };

    _this.onProgress = function (event, file) {
      var fileList = _this.props.fileList ? (0, _toConsumableArray2.default)(_this.props.fileList) : [];
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
      var fileList = _this.props.fileList ? (0, _toConsumableArray2.default)(_this.props.fileList) : [];
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

      var fileList = (0, _toConsumableArray2.default)(_this.props.fileList);
      fileList.splice(index, 1);
      onChange(fileList);
    };

    _this.onUp = function (index) {
      var onChange = _this.props.onChange;

      if (!onChange) {
        return;
      }

      var fileList = (0, _toConsumableArray2.default)(_this.props.fileList);
      fileList[index - 1] = fileList.splice(index, 1, fileList[index - 1])[0];
      onChange(fileList);
    };

    _this.onDown = function (index) {
      var onChange = _this.props.onChange;

      if (!onChange) {
        return;
      }

      var fileList = (0, _toConsumableArray2.default)(_this.props.fileList);
      fileList[index + 1] = fileList.splice(index, 1, fileList[index + 1])[0];
      onChange(fileList);
    };

    _this.onError = function () {};

    return _this;
  }

  (0, _createClass2.default)(CustomerUpload, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      //参数与回调函数对应
      //图片 列表显示 删除 添加 预览
      var _this$props = this.props,
          fileList = _this$props.fileList,
          beforeUpload = _this$props.beforeUpload,
          onPreview = _this$props.onPreview;
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_rcUpload.default, (0, _extends2.default)({}, this.props, {
        multiple: true,
        onStart: this.onStart,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
        onError: this.onError,
        beforeUpload: beforeUpload
      }), this.props.children), Array.isArray(fileList) ? fileList.map(function (file, index, arr) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: file.uid,
          className: "customer-file-container"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "left"
        }, /*#__PURE__*/_react.default.createElement("img", {
          className: "pic",
          src: file.thumbUrl || file.url,
          alt: file.name
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "pic-detail"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "pic-name"
        }, file.name), file.status !== 'done' ? /*#__PURE__*/_react.default.createElement(_progress.default, {
          size: "small",
          percent: file.percent,
          showInfo: false,
          strokeWidth: 2,
          strokeColor: "#72c140",
          status: file.percent === 100 ? 'success' : 'active'
        }) : null)), /*#__PURE__*/_react.default.createElement("div", {
          className: "right"
        }, /*#__PURE__*/_react.default.createElement("span", null, file.status === 'done' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, arr.length !== 1 && index !== 0 ? /*#__PURE__*/_react.default.createElement(_icon.default, {
          onClick: function onClick() {
            _this2.onUp(index);
          },
          className: "pic-btn",
          type: "arrow-up"
        }) : null, arr.length !== 1 && index !== arr.length - 1 ? /*#__PURE__*/_react.default.createElement(_icon.default, {
          onClick: function onClick() {
            _this2.onDown(index);
          },
          className: "pic-btn",
          type: "arrow-down"
        }) : null, /*#__PURE__*/_react.default.createElement(_icon.default, {
          type: "eye",
          className: "pic-btn",
          onClick: function onClick() {
            typeof onPreview === 'function' && onPreview(file);
          }
        }), /*#__PURE__*/_react.default.createElement(_icon.default, {
          className: "pic-btn",
          onClick: function onClick() {
            window.open(file.url ? file.url : file.response && file.response.data && file.response.data[0]);
          },
          type: "download"
        })) : null, /*#__PURE__*/_react.default.createElement(_icon.default, {
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
}(_react.default.Component);

exports.default = CustomerUpload;
CustomerUpload.propTypes = {
  onChange: _propTypes.default.func,
  fileList: _propTypes.default.array
};