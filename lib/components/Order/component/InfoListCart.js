"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InfoListCart;

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

var _react = _interopRequireWildcard(require("react"));

var _SectionHeader = _interopRequireDefault(require("./SectionHeader"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ROWSPACE = 4;

function InfoListCart(props) {
  var fieldList = props.fieldList,
      title = props.title;
  var groupList = [];
  var counter = 0;
  var group = [];
  groupList.push(group);
  fieldList.forEach(function (item) {
    var space = item.space || 1;

    if (counter + space > ROWSPACE) {
      counter = space;
      group = [item];
      groupList.push(group);
    } else {
      counter += space;
      group.push(item);
    }
  });
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, title), groupList.map(function (group, index) {
    return /*#__PURE__*/_react.default.createElement(_row.default, {
      key: index,
      style: {
        paddingTop: '32px'
      }
    }, group.map(function (item, subIndex) {
      var space = item.space || 1;
      var weight = 6;
      return /*#__PURE__*/_react.default.createElement(_col.default, {
        key: subIndex,
        span: weight * space
      }, "".concat(item.label, " : ").concat(item.value || '-'));
    }));
  }));
}