import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/col/style";
import _Col from "antd/es/col";
import React from 'react';
import SectionHeader from './SectionHeader';
import { Fragment } from 'react';
var ROWSPACE = 4;
export default function InfoListCart(props) {
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
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, null, title), groupList.map(function (group, index) {
    return /*#__PURE__*/React.createElement(_Row, {
      key: index,
      style: {
        paddingTop: '32px'
      }
    }, group.map(function (item, subIndex) {
      var space = item.space || 1;
      var weight = 6;
      return /*#__PURE__*/React.createElement(_Col, {
        key: subIndex,
        span: weight * space
      }, "".concat(item.label, " : ").concat(item.value || '-'));
    }));
  }));
}