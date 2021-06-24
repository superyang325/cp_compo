import "antd/es/steps/style";
import _Steps from "antd/es/steps";
import React, { Fragment } from 'react';
import SectionHeader from './SectionHeader';
export default function OrderSteps(props) {
  var statusList = props.statusList,
      current = props.current;
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, null, "\u8FDB\u5EA6"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 0'
    }
  }, "\u8BA2\u5355\u72B6\u6001 :", current !== -1 ? statusList[current].label : ''), /*#__PURE__*/React.createElement(_Steps, {
    current: current
  }, statusList.map(function (info, index) {
    return /*#__PURE__*/React.createElement(_Steps.Step, {
      key: index,
      title: info.label,
      description: info.createTime
    });
  })));
}