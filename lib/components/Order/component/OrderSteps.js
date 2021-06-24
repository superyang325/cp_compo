"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OrderSteps;

require("antd/es/steps/style");

var _steps = _interopRequireDefault(require("antd/es/steps"));

var _react = _interopRequireWildcard(require("react"));

var _SectionHeader = _interopRequireDefault(require("./SectionHeader"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function OrderSteps(props) {
  var statusList = props.statusList,
      current = props.current;
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, "\u8FDB\u5EA6"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '12px 0'
    }
  }, "\u8BA2\u5355\u72B6\u6001 :", current !== -1 ? statusList[current].label : ''), /*#__PURE__*/_react.default.createElement(_steps.default, {
    current: current
  }, statusList.map(function (info, index) {
    return /*#__PURE__*/_react.default.createElement(_steps.default.Step, {
      key: index,
      title: info.label,
      description: info.createTime
    });
  })));
}