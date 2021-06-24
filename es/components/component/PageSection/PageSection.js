import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import PropTypes from 'prop-types'; // import './PageSection.less';

var pageSectionHeader = {
  color: 'rgb(0, 21, 41)',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
  borderBottom: '1px solid #e8e8e8'
};
var pageSectionBody = {
  padding: '10px 0 10px 10px'
};

var PageSection = /*#__PURE__*/function (_Component) {
  _inherits(PageSection, _Component);

  var _super = _createSuper(PageSection);

  function PageSection() {
    _classCallCheck(this, PageSection);

    return _super.apply(this, arguments);
  }

  _createClass(PageSection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$name = _this$props.name,
          name = _this$props$name === void 0 ? '' : _this$props$name,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      return /*#__PURE__*/React.createElement("div", {
        className: "page-section-component",
        style: style
      }, /*#__PURE__*/React.createElement("div", {
        className: "page-section-header",
        style: pageSectionHeader
      }, name), /*#__PURE__*/React.createElement("div", {
        className: "page-section-body",
        style: pageSectionBody
      }, this.props.children));
    }
  }]);

  return PageSection;
}(Component);

export { PageSection as default };
PageSection.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  headStyle: PropTypes.object,
  bodyStyle: PropTypes.object
};