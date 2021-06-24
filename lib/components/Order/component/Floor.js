"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Floor;

require("antd/es/list/style");

var _list = _interopRequireDefault(require("antd/es/list"));

var _react = _interopRequireDefault(require("react"));

function Floor(props) {
  // let others = {a:1,b:2}
  if (typeof props.render === 'function') {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_list.default.Item, {
      style: {
        color: '#001529',
        fontWeight: 'bold'
      }
    }, props.title), props.render.call(this));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.children);
}