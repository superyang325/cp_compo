"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _OrderAfterSaleApply = _interopRequireDefault(require("../component/OrderAfterSaleApply"));

var _constant = require("../constant");

var _constant2 = require("../../../constant");

var _data = require("../../../util/data");

var _api = require("../api");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var limitSize = 5 * 1024 * 1024;

var AfterSaleApplyContainer = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(AfterSaleApplyContainer, _Component);

  var _super = _createSuper(AfterSaleApplyContainer);

  function AfterSaleApplyContainer() {
    var _this;

    (0, _classCallCheck2.default)(this, AfterSaleApplyContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      DELIVERYTYPE: _constant.DELIVERYTYPE,
      ORDERSTATUS: _constant.ORDERSTATUS,
      filters: {
        refundTypes: {
          dataSource: _constant.REFUNDTYPES
        },
        refundReason: {
          dataSource: []
        }
      },
      detail: {},
      // 订单详情
      productList: [],
      // 商品列表
      selectedRowKeys: [],
      // 列表多选选择
      selectedRows: [],
      // 列表多选选择
      imgInfo: {
        imgList: [],
        // 附件图片列表
        previewImage: '',
        // 图片预览modal
        isPreview: '' // 图片预览modal 显示隐藏控制

      },
      columns: [{
        title: '商品名称',
        dataIndex: 'productName'
      }, {
        title: '69码',
        dataIndex: 'barcode'
      }, {
        title: '商品编码',
        dataIndex: 'productSn'
      }, {
        title: '商品图片',
        dataIndex: 'productThumbImg',
        render: function render(text, record, index) {
          return /*#__PURE__*/_react.default.createElement("img", {
            src: record.productThumbImg,
            alt: "\u5546\u54C1\u56FE\u7247",
            style: {
              width: 60
            }
          });
        }
      }, {
        title: '售卖价',
        dataIndex: 'saleUnitPrice' // 售卖价与支付金额一样 占龙

      }, {
        title: '购买数量',
        dataIndex: 'productNumber'
      }, {
        title: '支付金额',
        dataIndex: 'payPrice'
      }, {
        title: '可售后商品数量',
        dataIndex: 'refundableNum'
      }, {
        title: '退款数量',
        dataIndex: 'refundNum',
        editKey: 'refundNum',
        fieldType: _constant2.INPUTNUMBER,
        max: function max(record) {
          return record.refundableNum * 1;
        },
        min: function min(record) {
          // if (record.refundableNum * 1 === 0) {
          //   return 0
          // } else {
          //   return 1
          // }
          return 0;
        },
        setInitialValue: 'min',
        required: false,
        // 是否为必输项
        onChange: true,
        // 改变数值后需要回调
        precision: 0 // 数值精度

      }, // {
      //   title: '单件退款金额',
      //   dataIndex: 'refundTotalPrice',
      //   editKey: 'refundTotalPrice',
      //   fieldType: INPUTNUMBER,
      //   max: (record) => {
      //     return record.payPrice * 1
      //   },
      //   setInitialValue: 'max',
      //   min: 0.01,
      //   required: false,
      //   onChange: true,
      //   precision: 2 // 数值精度
      // },
      {
        title: '可售后重量（针对非标品，kg）',
        dataIndex: 'productAllRefundWeight'
      }, {
        title: '商品重量（针对非标品，kg）',
        dataIndex: 'productAllWeight'
      }, // {
      //   title: '拣货重量（针对非标品，kg）',
      //   dataIndex: 'pickWeight',
      //   editKey: 'pickWeight',
      //   fieldType: INPUTNUMBER,
      //   onChange: true, // 改变数值后需要回调
      //   precision: 2, // 数值精度
      //   step: 0.1,
      //   min: 0,
      //   max: (record) => {
      //     return record.productAllRefundWeight * 1
      //   },
      //   setInitialValue: 'min',
      // },
      {
        title: '退货重量（针对非标品，kg）',
        dataIndex: 'refundWeight',
        editKey: 'refundWeight',
        fieldType: _constant2.INPUTNUMBER,
        onChange: true,
        // 改变数值后需要回调
        precision: 2,
        // 数值精度
        step: 0.1,
        min: 0,
        max: function max(record) {
          return record.productAllRefundWeight * 1;
        },
        setInitialValue: 'min'
      }, {
        title: '退款金额',
        dataIndex: 'productAllRefundSum',
        editKey: 'productAllRefundSum',
        fieldType: _constant2.INPUTNUMBER,
        precision: 2,
        // 数值精度
        step: 0.1,
        min: 0,
        max: function max(record) {
          return record.payPrice * 1;
        },
        setInitialValue: 'min'
      }],
      basicInfo: [],
      // 基础信息
      applyInfo: [{
        name: '',
        type: _constant2.RADIO,
        dataSource: _constant.REFUNDTYPES
      }, {
        name: '',
        type: _constant2.SELECT,
        dataSource: []
      }] // 申请页面显示信息

    };

    _this.getDetailInfo = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(orderSubNo) {
        var res, basicInfo;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _api.getChildOrderDetailApi)({
                  orderNo: orderSubNo
                });

              case 2:
                res = _context.sent;
                basicInfo = _this.getBasicInfo(res);

                _this.setState({
                  detail: res,
                  basicInfo: basicInfo
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.getProductList = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(orderSubNo) {
        var res, product;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _api.getProductListApi)({
                  orderSubNo: orderSubNo
                });

              case 2:
                res = _context2.sent;
                product = res;

                _this.setState({
                  productList: product
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.getRefundReason = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
      var filters, list;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              filters = _this.state.filters;
              _context3.next = 3;
              return (0, _api.getReasonApi)();

            case 3:
              list = _context3.sent;
              filters['refundReason'].dataSource = list;

              _this.setState({
                filters: filters
              });

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    _this.findTarget = function (pList, record) {
      var targetProduct,
          targetIndex = -1;

      for (var i = 0; i < pList.length; i++) {
        var cur = pList[i];

        if (cur.productId === record.productId) {
          // cur.refundNum = record.refundNum
          targetProduct = cur;
          targetIndex = i;
          break;
        }
      }

      return {
        targetProduct: targetProduct,
        targetIndex: targetIndex
      };
    };

    _this.handleSave = function (record, editKey, form) {
      var productList = _this.state.productList;
      var setFieldsValue = form.setFieldsValue;
      var pList = (0, _toConsumableArray2.default)(productList);

      var _this$findTarget = _this.findTarget(pList, record),
          targetProduct = _this$findTarget.targetProduct,
          targetIndex = _this$findTarget.targetIndex; // const dataIndex = record.dataIndex


      if (targetProduct && targetIndex !== -1) {
        if (editKey === 'refundNum') {
          // const params = {
          //   orderSubNo: this.props.match.params.id,
          //   productId: targetProduct.productId,
          //   isPartRefund: true,//isPartRefund(),
          //   applyRefundNum: targetProduct.refundNum * 1
          // }
          // getPriceApi(params).then(res => {
          //   targetProduct.refundTotalPrice = res
          //   pList.splice(targetIndex, 1, { ...targetProduct })
          //   this.setState({
          //     productList: pList
          //   })
          // }).catch(error => {
          //   message.error(error)
          //   return
          // })
          // 按数量退款
          var saleUnitPrice = record.saleUnitPrice,
              refundNum = record.refundNum,
              refundWeight = record.refundWeight; // 改变数量时，如果输入了重量

          if (refundWeight) {
            return;
          } // 如果没有输入重量


          record.productAllRefundSum = Number(saleUnitPrice * refundNum).toFixed(2);
          setFieldsValue({
            productAllRefundSum: record.productAllRefundSum
          });
          pList.splice(targetIndex, 1, record);

          _this.setState({
            productList: pList
          });
        } // else if (editKey === 'refundTotalPrice') {
        //   pList.splice(targetIndex, 1, record)
        //   this.setState({
        //     productList: pList
        //   })
        // }
        else if (editKey === 'pickWeight') {
            // 拣货重量
            debugger;
            var productAllWeight = record.productAllWeight,
                pickWeight = record.pickWeight,
                payPrice = record.payPrice; // 退货重量

            var newRefundWeight = productAllWeight - pickWeight;
            record.refundWeight = Number(newRefundWeight).toFixed(2); // 销售重量 - 拣货重量
            // 退款金额

            record.productAllRefundSum = Number(newRefundWeight / productAllWeight * payPrice).toFixed(2);
            setFieldsValue({
              refundWeight: record.refundWeight,
              productAllRefundSum: record.productAllRefundSum
            }); // 退款数量

            var productWeight = record.productWeight,
                _refundWeight = record.refundWeight; // 退款数量

            record.refundNum = Math.floor(Number(_refundWeight / productWeight)); // debugger

            setFieldsValue({
              refundNum: record.refundNum
            });
            pList.splice(targetIndex, 1, record);

            _this.setState({
              productList: pList
            });
          } else if (editKey === 'refundWeight') {
            // 退货重量
            var _productAllWeight = record.productAllWeight,
                _productWeight = record.productWeight,
                _payPrice = record.payPrice,
                _refundWeight2 = record.refundWeight; // 退款金额

            record.productAllRefundSum = Number(_refundWeight2 / _productAllWeight * _payPrice).toFixed(2); // 退款数量

            record.refundNum = Math.floor(Number(_refundWeight2 / _productWeight));
            setFieldsValue({
              productAllRefundSum: record.productAllRefundSum,
              refundNum: record.refundNum
            });
            pList.splice(targetIndex, 1, record);

            _this.setState({
              productList: pList
            });
          } else {
            pList.splice(targetIndex, 1, record);

            _this.setState({
              productList: pList
            });
          }
      } else {
        console.log('未找到targetProduct~~');
      }
    };

    _this.selectOnChange = function (selectedRowKeys, selectedRows) {
      _this.setState({
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
      });
    };

    _this.submitGood = /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(val) {
        var _this$state, selectedRows, selectedRowKeys, productList, subImgList, isPartRefund, genSelectedProduct, selectedItems, realPrice, params, _yield$afterSaleApply, res;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$state = _this.state, selectedRows = _this$state.selectedRows, selectedRowKeys = _this$state.selectedRowKeys, productList = _this$state.productList;

                if (selectedRowKeys.length) {
                  _context4.next = 4;
                  break;
                }

                _message2.default.error('请勾选要申请售后的商品');

                return _context4.abrupt("return");

              case 4:
                subImgList = [];

                isPartRefund = function isPartRefund() {
                  var allProductNum = productList.reduce(function (pre, item) {
                    return pre + item.refundableNum * 1;
                  }, 0);
                  var allSelectedProductNum = selectedRows.reduce(function (pre, item) {
                    return pre + item.refundNum * 1;
                  }, 0);
                  return allSelectedProductNum < allProductNum;
                };

                genSelectedProduct = function genSelectedProduct() {
                  var map = new Map();
                  selectedRowKeys.forEach(function (item) {
                    map.set(item, 1);
                  });
                  var result = [];
                  productList.forEach(function (item) {
                    if (map.has(item['productId'])) {
                      result.push({
                        productId: item.productId,
                        refundNum: item.refundNum,
                        refundWeight: (0, _data.accMul)(item.refundWeight, 1000),
                        // refundTotalPrice: accMul(item.refundTotalPrice, 100)
                        productAllRefundSum: (0, _data.accMul)(item.productAllRefundSum, 100)
                      });
                    }
                  });
                  return result;
                };

                selectedItems = genSelectedProduct();
                realPrice = selectedItems.reduce(function (pre, cur) {
                  // return pre + cur.refundTotalPrice * 1
                  return pre + cur.productAllRefundSum * 1;
                }, 0);
                params = {
                  orderSubNo: _this.props.match.params.id,
                  productInfo: selectedItems,
                  reasonId: val.reasonId,
                  refundNotes: val.refundNotes,
                  refundType: val.refundType,
                  picInfo: subImgList.join(','),
                  realPrice: Number(realPrice).toFixed(2),
                  isPartRefund: isPartRefund(),
                  applyType: _constant.APPLYTYPE,
                  applyUser: window.localStorage.getItem('userId'),
                  applyMobile: window.localStorage.getItem('userMobile'),
                  applyName: window.localStorage.getItem('userName')
                };
                console.log(JSON.stringify(params), 'params~~'); // return 

                _context4.next = 13;
                return (0, _api.afterSaleApplyApi)(params);

              case 13:
                _yield$afterSaleApply = _context4.sent;
                res = _yield$afterSaleApply.res;

                if (!res) {
                  _context4.next = 19;
                  break;
                }

                _message2.default.success('保存成功', .5, function () {
                  _this.goBack();
                });

                _context4.next = 21;
                break;

              case 19:
                _message2.default.error(res.data.msg, .5);

                return _context4.abrupt("return");

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.beforeUpload = function (file) {
      var isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        _message2.default.error('上传类型错误jpg png格式');

        return false;
      }

      var limit = file.size < limitSize;

      if (!limit) {
        _message2.default.error('图片不能大于5M');

        return false;
      }
    };

    _this.imgChange = function (fileList) {
      var imgInfo = _this.state.imgInfo; // imgList

      _this.setState({
        imgInfo: _objectSpread(_objectSpread({}, imgInfo), {
          imgList: fileList
        })
      });
    };

    _this.handlePreview = function (file) {
      var imgInfo = _this.state.imgInfo;

      _this.setState({
        imgInfo: _objectSpread(_objectSpread({}, imgInfo), {
          previewImage: file.url || file.thumbUrl,
          isPreview: true
        })
      });
    };

    _this.handleCancel = function () {
      var imgInfo = _this.state.imgInfo;

      _this.setState({
        imgInfo: _objectSpread(_objectSpread({}, imgInfo), {
          isPreview: false
        })
      });
    };

    _this.uploadAction = /*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(file) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log(file, 'file~'); // await uploadImgApi()

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }();

    _this.goBack = function () {
      _this.props.history.goBack();
    };

    return _this;
  }

  (0, _createClass2.default)(AfterSaleApplyContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var orderSubNo = this.props.match.params.id;

      if (orderSubNo) {
        this.getDetailInfo(orderSubNo);
        this.getProductList(orderSubNo); // 已经申请售后且审核通过的订单，再次申请售后，“拣货重量”不可再编辑
      }

      this.getRefundReason();
    }
  }, {
    key: "getBasicInfo",
    value: function getBasicInfo(data) {
      return [{
        label: '订单号',
        value: data.orderSubNo,
        space: 2
      }, {
        label: '订单状态',
        value: _constant.ORDERSTATUS[data.status]
      }, {
        label: '配送类型',
        value: _constant.DELIVERYTYPE[data.deliveryType]
      }, {
        label: '收货人',
        value: data.receiveName
      }, {
        label: '收货人手机号',
        value: data.phone
      }];
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_OrderAfterSaleApply.default, (0, _extends2.default)({}, this.state, {
        refundType: _constant.REFUNDTYPES,
        handleSave: this.handleSave,
        submitGood: this.submitGood,
        goBack: this.goBack,
        selectOnChange: this.selectOnChange,
        beforeUpload: this.beforeUpload,
        handleCancel: this.handleCancel,
        handlePreview: this.handlePreview,
        uploadAction: this.uploadAction
      }));
    }
  }]);
  return AfterSaleApplyContainer;
}(_react.Component);

exports.default = AfterSaleApplyContainer;