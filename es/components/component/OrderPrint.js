import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
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
  _inherits(OrderPrint, _Component);

  var _super = _createSuper(OrderPrint);

  function OrderPrint(props) {
    _classCallCheck(this, OrderPrint);

    return _super.call(this, props);
  }

  _createClass(OrderPrint, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        id: "i-print-wrapper"
      }, data && data.length > 0 && data.map(function (item, val) {
        return /*#__PURE__*/React.createElement("div", {
          key: val,
          style: {
            width: '190mm',
            background: '#fff',
            padding: '4mm 6mm',
            margin: '.4mm',
            border: '.3mm black solid',
            color: '#000'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            borderBottom: '.3mm black solid',
            paddingBottom: '5mm'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '110mm'
          }
        }, "\u8BA2\u5355: ", item.order_no), /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '90mm'
          }
        }, "\u914D\u9001\u65B9\u5F0F: ", DELIVERYTYPE[item.delivery_type])), /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '110mm'
          }
        }, "\u4E0B\u5355\u65F6\u95F4: ", item.create_time), /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '16pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '90mm'
          }
        }, "\u9884\u8BA1\u9001\u8FBE: ", item.expected_delivery)), /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '16pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '110mm'
          }
        }, "\u95E8\u5E97\u5730\u5740: ", item.shop_address), /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '16pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '90mm'
          }
        }, "\u5BA2\u670D\u7535\u8BDD: ", item.service_mobile))), /*#__PURE__*/React.createElement("div", {
          style: {
            borderBottom: '.3mm black solid',
            paddingBottom: '5mm'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '80mm'
          }
        }, "\u6536\u8D27\u4EBA: ", item.consignee_name), /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '90mm'
          }
        }, "\u624B\u673A\u53F7: ", item.consignee_mobile)), /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '80mm'
          }
        }, "\u5730\u5740: ", item.address))), /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            wordBreak: 'break-all',
            wordWrap: 'break-word',
            borderBottom: '.3mm block solid',
            background: '#fff'
          }
        }, item.product_info.length > 0 && item.product_info.map(function (val, index) {
          return /*#__PURE__*/React.createElement("table", {
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
          }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
            style: {
              borderBottom: '.3mm black solid',
              fontSize: '12pt'
            }
          }, /*#__PURE__*/React.createElement("th", {
            style: {
              width: '46mm',
              padding: '7pt',
              textAlign: 'left'
            }
          }, "\u5546\u54C1"), /*#__PURE__*/React.createElement("th", {
            style: {
              width: '18mm',
              padding: '7pt',
              textAlign: 'center'
            }
          }, "\u5355\u4EF7"), /*#__PURE__*/React.createElement("th", {
            style: {
              width: '18mm',
              padding: '7pt',
              textAlign: 'center'
            }
          }, "\u6570\u91CF"), /*#__PURE__*/React.createElement("th", {
            style: {
              width: '19mm',
              padding: '7pt',
              textAlign: 'center'
            }
          }, "\u91D1\u989D"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
            style: {
              padding: '5pt',
              wordBreak: 'break-all'
            }
          }, val.product_name), /*#__PURE__*/React.createElement("td", {
            style: {
              padding: '5pt',
              wordBreak: 'break-all',
              textAlign: 'center'
            }
          }, val.price), /*#__PURE__*/React.createElement("td", {
            style: {
              padding: '5pt',
              wordBreak: 'break-all',
              textAlign: 'center'
            }
          }, val.product_number), /*#__PURE__*/React.createElement("td", {
            style: {
              padding: '5pt',
              wordBreak: 'break-all',
              textAlign: 'center'
            }
          }, val.sum_price))));
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            borderBottom: '.3mm black solid',
            paddingBottom: '5mm'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '70mm'
          }
        }, "\u5546\u54C1\u5408\u8BA1: ", item.total_num), /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '70mm'
          }
        }, "\u914D\u9001\u8D39: ", item.transportation_expenses), /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '70mm'
          }
        }, "\u4F18\u60E0\u6263\u51CF: ", item.coupon_price))), /*#__PURE__*/React.createElement("div", {
          style: {
            borderBottom: '.3mm black solid',
            paddingBottom: '5mm'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '14pt',
            padding: '2mm',
            width: '120mm',
            fontWeight: 600
          }
        }, "\u5546\u54C1\u5B9E\u4ED8: ", item.real_price), /*#__PURE__*/React.createElement("span", {
          style: {
            lineHeight: '18pt',
            fontSize: '12pt',
            padding: '2mm',
            width: '80mm',
            fontWeight: 600
          }
        }, "\u652F\u4ED8\u65B9\u5F0F: ", PAYINFO[item.pay_channel])), /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            marginTop: '5mm'
          }
        }, /*#__PURE__*/React.createElement("span", {
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
}(Component);

export { OrderPrint as default };