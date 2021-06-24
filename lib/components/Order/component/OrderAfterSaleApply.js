"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/card/style");

var _card = _interopRequireDefault(require("antd/es/card"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/es/radio"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

var _react = _interopRequireWildcard(require("react"));

var _PageSection = _interopRequireDefault(require("../../../component/PageSection/PageSection"));

var _TableCell = require("../../../component/TableCell");

var _InfoListCart = _interopRequireDefault(require("../component/InfoListCart"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Option = _select.default.Option;
var TextArea = _input.default.TextArea;

var OrderServiceApply = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(OrderServiceApply, _Component);

  var _super = _createSuper(OrderServiceApply);

  function OrderServiceApply() {
    var _this;

    (0, _classCallCheck2.default)(this, OrderServiceApply);

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

  (0, _createClass2.default)(OrderServiceApply, [{
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
          row: _TableCell.EditableFormRow,
          cell: _TableCell.EditableCell
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

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "mp-detail-page",
        style: {
          backgroundColor: '#fff'
        }
      }, /*#__PURE__*/_react.default.createElement(_card.default, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "after-sale-detail-body",
        style: {
          backGround: '#fff'
        }
      }, /*#__PURE__*/_react.default.createElement(_form.default, {
        onSubmit: this.submit
      }, /*#__PURE__*/_react.default.createElement(_InfoListCart.default, {
        title: "\u57FA\u7840\u4FE1\u606F",
        fieldList: basicInfo
      }), /*#__PURE__*/_react.default.createElement(_PageSection.default, {
        name: "\u552E\u540E\u7C7B\u578B"
      }, /*#__PURE__*/_react.default.createElement(_row.default, {
        style: rowStyle
      }, /*#__PURE__*/_react.default.createElement(_form.default.Item, null, getFieldDecorator('refundType', {
        rules: [{
          required: true,
          message: '请选择售后类型'
        }],
        initialValue: ''
      })( /*#__PURE__*/_react.default.createElement(_radio.default.Group, {
        onChange: this.onChangeServieType
      }, refundTypes.map(function (item) {
        var isHiden = item.hideCondition[detail.deliveryType] ? item.hideCondition[detail.deliveryType].code.includes(detail.status) : false;
        return isHiden ? null : /*#__PURE__*/_react.default.createElement(_radio.default, {
          value: item.value,
          key: item.value
        }, item.text);
      } // (item.hideCondition.deliveryType === detail.deliveryType && item.hideCondition.code.includes(detail.status)) ? null :
      // <Radio value={item.value} key={item.value}>{item.text}</Radio>
      )))))), /*#__PURE__*/_react.default.createElement(_PageSection.default, {
        name: "\u552E\u540E\u539F\u56E0"
      }, /*#__PURE__*/_react.default.createElement(_row.default, {
        style: rowStyle
      }, /*#__PURE__*/_react.default.createElement(_form.default.Item, null, getFieldDecorator('reasonId', {
        rules: [{
          required: true,
          message: '请选择售后原因'
        }]
      })( /*#__PURE__*/_react.default.createElement(_select.default, {
        placeholder: "\u8BF7\u9009\u62E9\u552E\u540E\u539F\u56E0",
        style: {
          width: 220
        }
      }, refundReason.map(function (item) {
        return /*#__PURE__*/_react.default.createElement(Option, {
          value: item.reasonId,
          key: item.reasonId
        }, item.reasonInfo);
      })))))), /*#__PURE__*/_react.default.createElement(_PageSection.default, {
        name: "\u5907\u6CE8"
      }, /*#__PURE__*/_react.default.createElement(_row.default, {
        style: rowStyle
      }, /*#__PURE__*/_react.default.createElement(_form.default.Item, null, getFieldDecorator('refundNotes', {
        rules: [{
          required: false,
          message: '请输入备注'
        }],
        initialValue: ''
      })( /*#__PURE__*/_react.default.createElement(TextArea, {
        rows: 4,
        onChange: this.onChangeReason,
        placeholder: "\u8BF7\u63CF\u8FF0\u7533\u8BF7\u552E\u540E\u7684\u5177\u4F53\u539F\u56E0\uFF0C50\u5B57\u4EE5\u5185",
        autoSize: {
          minRows: 3,
          maxRows: 5
        },
        maxLength: "50"
      }))))), /*#__PURE__*/_react.default.createElement(_PageSection.default, {
        name: "\u9009\u62E9\u5546\u54C1"
      }, /*#__PURE__*/_react.default.createElement(_table.default, {
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
      })), /*#__PURE__*/_react.default.createElement(_row.default, null, /*#__PURE__*/_react.default.createElement(_form.default.Item, {
        wrapperCol: {
          span: 24,
          offset: 10
        }
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        onClick: goBack,
        style: {
          marginRight: 20
        }
      }, "\u8FD4\u56DE"), /*#__PURE__*/_react.default.createElement(_button.default, {
        type: "primary",
        disabled: this.saveBtnState(),
        htmlType: "submit",
        loading: btnLoading
      }, "\u4FDD\u5B58")))))));
    }
  }]);
  return OrderServiceApply;
}(_react.Component);

var _default = _form.default.create()(OrderServiceApply);

exports.default = _default;