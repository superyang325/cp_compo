import "antd/es/list/style";
import _List from "antd/es/list";
import React from 'react';
export default function Floor(props) {
  // let others = {a:1,b:2}
  if (typeof props.render === 'function') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_List.Item, {
      style: {
        color: '#001529',
        fontWeight: 'bold'
      }
    }, props.title), props.render.call(this));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, props.children);
}