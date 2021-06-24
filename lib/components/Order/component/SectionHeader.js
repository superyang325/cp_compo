"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SectionHeader;

var _react = _interopRequireDefault(require("react"));

function SectionHeader(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "mp-section-header",
    style: {
      marginTop: '20px',
      backgroundColor: '#fff',
      padding: '12px 0',
      color: 'rgb(0, 21, 41)',
      fontWeight: 'bold',
      fontSize: '14px',
      borderBottom: '1px solid #e8e8e8'
    }
  }, props.children);
}