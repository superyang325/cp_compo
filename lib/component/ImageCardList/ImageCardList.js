"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./ImageCardList.less");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ImageCardList = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ImageCardList, _Component);

  var _super = _createSuper(ImageCardList);

  function ImageCardList() {
    var _this;

    (0, _classCallCheck2.default)(this, ImageCardList);

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

  (0, _createClass2.default)(ImageCardList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$imageUrlL = this.props.imageUrlList,
          imageUrlList = _this$props$imageUrlL === void 0 ? [] : _this$props$imageUrlL;
      var _this$state = this.state,
          visible = _this$state.visible,
          previewUrl = _this$state.previewUrl;
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "image-card-list-component"
      }, imageUrlList.map(function (imageUrl, index) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "image-item-container",
          key: index,
          onClick: function onClick() {
            _this2.openModal(imageUrl);
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: imageUrl,
          className: "image-item",
          alt: 'img'
        }));
      })), /*#__PURE__*/_react.default.createElement(_modal.default, {
        visible: visible,
        footer: null,
        onCancel: this.closeModal,
        destroyOnClose: true,
        width: 820
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          textAlign: 'center',
          padding: '0 10px'
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
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
}(_react.Component);

exports.default = ImageCardList;
ImageCardList.propTypes = {
  imageUrlList: _propTypes.default.array // 图片url数组 默认[]

};