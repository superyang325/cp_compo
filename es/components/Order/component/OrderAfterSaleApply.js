import "antd/es/card/style";
import _Card from "antd/es/card";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/form/style";
import _Form from "antd/es/form";
import "antd/es/radio/style";
import _Radio from "antd/es/radio";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/select/style";
import _Select from "antd/es/select";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import PageSection from '../../../component/PageSection/PageSection'; // import { Row, Button,message ,Table, Form,Select, Input ,Radio,InputNumber,Modal, Col, Card} from 'antd'

import { EditableFormRow, EditableCell } from '../../../component/TableCell'; // import UploadImg from '../../../component/ImageCardList/upload'
// import { ROOTPATH } from '../../../config/config'

import InfoListCart from '../component/InfoListCart';
var Option = _Select.Option;
var TextArea = _Input.TextArea;

var OrderServiceApply = /*#__PURE__*/function (_Component) {
  _inherits(OrderServiceApply, _Component);

  var _super = _createSuper(OrderServiceApply);

  function OrderServiceApply() {
    var _this;

    _classCallCheck(this, OrderServiceApply);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.saveBtnState = function () {
      var _this$props = _this.props,
          productList = _this$props.productList,
          selectedRowKeys = _this$props.selectedRowKeys;
      var noSelect = selectedRowKeys.length === 0;
      if (noSelect) return true;
      return productList.reduce(function (pre, cur) {
        return pre + cur.refundableNum;
      }, 0) === 0;
    };

    _this.submit = function (e) {
      var submitGood = _this.props.submitGood;
      e.preventDefault();
      var form = _this.props.form;
      form.validateFields(function (err, val) {
        if (err) return;
        submitGood(val);
      });
    };

    return _this;
  }

  _createClass(OrderServiceApply, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          filters = _this$props2.filters,
          columns = _this$props2.columns,
          productList = _this$props2.productList,
          detail = _this$props2.detail,
          onChange = _this$props2.selectOnChange,
          selectedRowKeys = _this$props2.selectedRowKeys,
          btnLoading = _this$props2.btnLoading,
          goBack = _this$props2.goBack,
          handleSave = _this$props2.handleSave,
          basicInfo = _this$props2.basicInfo;
      var refundTypes = filters['refundTypes'].dataSource;
      var refundReason = filters['refundReason'].dataSource; // const {imgList, isPreview, previewImage} = imgInfo
      // const { imgList } = imgInfo

      var productColumns = columns.map(function (col) {
        return _objectSpread(_objectSpread({}, col), {}, {
          align: 'center',
          onCell: function onCell(record) {
            return _objectSpread(_objectSpread({}, col), {}, {
              record: record,
              handleSave: handleSave,
              // tableCell 是否可以编辑
              disabled: function disabled() {
                var dataIndex = col.dataIndex;
                var disabled = false;
                var wightKeys = ['pickWeight', 'productAllRefundWeight', 'refundWeight'];

                if (!record.hasWight) {
                  // 非标品，有重量 数量重量都可以输入
                  // 标品，没有重量 wightKeys 里的不可输入
                  disabled = wightKeys.includes(dataIndex) || record['refundableNum'] === 0;
                }

                return disabled;
              }
            });
          }
        });
      });
      var components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell
        }
      };
      var getFieldDecorator = this.props.form.getFieldDecorator;
      var rowStyle = {
        paddingTop: 10,
        paddingBottom: 10
      };
      var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        getCheckboxProps: function getCheckboxProps(value) {
          return {
            // defaultChecked: false,
            disabled: value.refundableNum === 0
          };
        },
        onChange: onChange
      }; // const uploadButton = (
      //   imgList.length > 2 ? '' :
      //     <div>
      //       <Button icon="upload">上传</Button>
      //     </div>
      // );

      return /*#__PURE__*/React.createElement("div", {
        className: "mp-detail-page",
        style: {
          backgroundColor: '#fff'
        }
      }, /*#__PURE__*/React.createElement(_Card, null, /*#__PURE__*/React.createElement("div", {
        className: "after-sale-detail-body",
        style: {
          backGround: '#fff'
        }
      }, /*#__PURE__*/React.createElement(_Form, {
        onSubmit: this.submit
      }, /*#__PURE__*/React.createElement(InfoListCart, {
        title: "\u57FA\u7840\u4FE1\u606F",
        fieldList: basicInfo
      }), /*#__PURE__*/React.createElement(PageSection, {
        name: "\u552E\u540E\u7C7B\u578B"
      }, /*#__PURE__*/React.createElement(_Row, {
        style: rowStyle
      }, /*#__PURE__*/React.createElement(_Form.Item, null, getFieldDecorator('refundType', {
        rules: [{
          required: true,
          message: '请选择售后类型'
        }],
        initialValue: ''
      })( /*#__PURE__*/React.createElement(_Radio.Group, {
        onChange: this.onChangeServieType
      }, refundTypes.map(function (item) {
        var isHiden = item.hideCondition[detail.deliveryType] ? item.hideCondition[detail.deliveryType].code.includes(detail.status) : false;
        return isHiden ? null : /*#__PURE__*/React.createElement(_Radio, {
          value: item.value,
          key: item.value
        }, item.text);
      } // (item.hideCondition.deliveryType === detail.deliveryType && item.hideCondition.code.includes(detail.status)) ? null :
      // <Radio value={item.value} key={item.value}>{item.text}</Radio>
      )))))), /*#__PURE__*/React.createElement(PageSection, {
        name: "\u552E\u540E\u539F\u56E0"
      }, /*#__PURE__*/React.createElement(_Row, {
        style: rowStyle
      }, /*#__PURE__*/React.createElement(_Form.Item, null, getFieldDecorator('reasonId', {
        rules: [{
          required: true,
          message: '请选择售后原因'
        }]
      })( /*#__PURE__*/React.createElement(_Select, {
        placeholder: "\u8BF7\u9009\u62E9\u552E\u540E\u539F\u56E0",
        style: {
          width: 220
        }
      }, refundReason.map(function (item) {
        return /*#__PURE__*/React.createElement(Option, {
          value: item.reasonId,
          key: item.reasonId
        }, item.reasonInfo);
      })))))), /*#__PURE__*/React.createElement(PageSection, {
        name: "\u5907\u6CE8"
      }, /*#__PURE__*/React.createElement(_Row, {
        style: rowStyle
      }, /*#__PURE__*/React.createElement(_Form.Item, null, getFieldDecorator('refundNotes', {
        rules: [{
          required: false,
          message: '请输入备注'
        }],
        initialValue: ''
      })( /*#__PURE__*/React.createElement(TextArea, {
        rows: 4,
        onChange: this.onChangeReason,
        placeholder: "\u8BF7\u63CF\u8FF0\u7533\u8BF7\u552E\u540E\u7684\u5177\u4F53\u539F\u56E0\uFF0C50\u5B57\u4EE5\u5185",
        autoSize: {
          minRows: 3,
          maxRows: 5
        },
        maxLength: "50"
      }))))), /*#__PURE__*/React.createElement(PageSection, {
        name: "\u9009\u62E9\u5546\u54C1"
      }, /*#__PURE__*/React.createElement(_Table, {
        rowKey: function rowKey(record) {
          return record.productId;
        },
        style: {
          background: '#fff'
        },
        bordered: true,
        components: components,
        dataSource: productList,
        columns: productColumns // editColums={editColums}
        ,
        pagination: false,
        rowSelection: rowSelection,
        scroll: {
          x: 1660
        }
      })), /*#__PURE__*/React.createElement(_Row, null, /*#__PURE__*/React.createElement(_Form.Item, {
        wrapperCol: {
          span: 24,
          offset: 10
        }
      }, /*#__PURE__*/React.createElement(_Button, {
        onClick: goBack,
        style: {
          marginRight: 20
        }
      }, "\u8FD4\u56DE"), /*#__PURE__*/React.createElement(_Button, {
        type: "primary",
        disabled: this.saveBtnState(),
        htmlType: "submit",
        loading: btnLoading
      }, "\u4FDD\u5B58")))))));
    }
  }]);

  return OrderServiceApply;
}(Component);

export default _Form.create()(OrderServiceApply);