"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var DELIVERYTYPE = {
  '1': '外卖',
  '2': '自提'
};
var PAYINFO = {
  '1': '微信支付',
  '2': '余额支付',
  '3': '线下支付',
  '4': '信用支付'
};

var OrderPrint = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(OrderPrint, _Component);

  var _super = _createSuper(OrderPrint);

  function OrderPrint(props) {
    (0, _classCallCheck2.default)(this, OrderPrint);
    return _super.call(this, props);
  }

  (0, _createClass2.default)(OrderPrint, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        id: "i-print-wrapper"
      }, data && data.length > 0 && data.map(function (item, val) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: val,
          style: {
            width: '190mm',
            background: '#fff',
            padding: '4mm 6mm',
            margin: '.4mm',
            border: '.3mm black solid',
            color: '#000'
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            borderBottom: '.3mm black solid',
            paddingBottom: '5mm'
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '110mm'
          }
        }, "\u8BA2\u5355: ", item.order_no), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '90mm'
          }
        }, "\u914D\u9001\u65B9\u5F0F: ", DELIVERYTYPE[item.delivery_type])), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '110mm'
          }
        }, "\u4E0B\u5355\u65F6\u95F4: ", item.create_time), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '16pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '90mm'
          }
        }, "\u9884\u8BA1\u9001\u8FBE: ", item.expected_delivery)), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '16pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '110mm'
          }
        }, "\u95E8\u5E97\u5730\u5740: ", item.shop_address), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '16pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '90mm'
          }
        }, "\u5BA2\u670D\u7535\u8BDD: ", item.service_mobile))), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            borderBottom: '.3mm black solid',
            paddingBottom: '5mm'
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '80mm'
          }
        }, "\u6536\u8D27\u4EBA: ", item.consignee_name), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '90mm'
          }
        }, "\u624B\u673A\u53F7: ", item.consignee_mobile)), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '80mm'
          }
        }, "\u5730\u5740: ", item.address))), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            wordBreak: 'break-all',
            wordWrap: 'break-word',
            borderBottom: '.3mm block solid',
            background: '#fff'
          }
        }, item.product_info.length > 0 && item.product_info.map(function (val, index) {
          return /*#__PURE__*/_react.default.createElement("table", {
            key: index,
            style: index % 2 === 0 ? {
              width: '94.6mm',
              borderBottom: '.3mm black solid',
              borderRight: '.3mm black solid',
              display: 'inline-block'
            } : {
              width: '94.6mm',
              borderBottom: '.3mm black solid',
              display: 'inline-block'
            }
          }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
            style: {
              borderBottom: '.3mm black solid',
              fontSize: '12pt'
            }
          }, /*#__PURE__*/_react.default.createElement("th", {
            style: {
              width: '46mm',
              padding: '7pt',
              textAlign: 'left'
            }
          }, "\u5546\u54C1"), /*#__PURE__*/_react.default.createElement("th", {
            style: {
              width: '18mm',
              padding: '7pt',
              textAlign: 'center'
            }
          }, "\u5355\u4EF7"), /*#__PURE__*/_react.default.createElement("th", {
            style: {
              width: '18mm',
              padding: '7pt',
              textAlign: 'center'
            }
          }, "\u6570\u91CF"), /*#__PURE__*/_react.default.createElement("th", {
            style: {
              width: '19mm',
              padding: '7pt',
              textAlign: 'center'
            }
          }, "\u91D1\u989D"))), /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
            style: {
              padding: '5pt',
              wordBreak: 'break-all'
            }
          }, val.product_name), /*#__PURE__*/_react.default.createElement("td", {
            style: {
              padding: '5pt',
              wordBreak: 'break-all',
              textAlign: 'center'
            }
          }, val.price), /*#__PURE__*/_react.default.createElement("td", {
            style: {
              padding: '5pt',
              wordBreak: 'break-all',
              textAlign: 'center'
            }
          }, val.product_number), /*#__PURE__*/_react.default.createElement("td", {
            style: {
              padding: '5pt',
              wordBreak: 'break-all',
              textAlign: 'center'
            }
          }, val.sum_price))));
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            borderBottom: '.3mm black solid',
            paddingBottom: '5mm'
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '70mm'
          }
        }, "\u5546\u54C1\u5408\u8BA1: ", item.total_num), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '70mm'
          }
        }, "\u914D\u9001\u8D39: ", item.transportation_expenses), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '70mm'
          }
        }, "\u4F18\u60E0\u6263\u51CF: ", item.coupon_price))), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            borderBottom: '.3mm black solid',
            paddingBottom: '5mm'
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '14pt',
            padding: '2mm',
            width: '120mm',
            fontWeight: 600
          }
        }, "\u5546\u54C1\u5B9E\u4ED8: ", item.real_price), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '80mm',
            fontWeight: 600
          }
        }, "\u652F\u4ED8\u65B9\u5F0F: ", PAYINFO[item.pay_channel])), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex',
            marginTop: '5mm'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '14pt',
            padding: '2mm',
            width: '120mm',
            fontWeight: 600
          }
        }, "\u5907\u6CE8: ", item.desc))));
      })));
    }
  }]);
  return OrderPrint;
}(_react.Component);

exports.default = OrderPrint;