import React, { Component } from 'react'
const DELIVERYTYPE = {
  '1': '外卖',
  '2': '自提'
}
const PAYINFO = {
  '1': '微信支付',
  '2': '余额支付',
  '3': '线下支付',
  '4': '信用支付'
}
export default class OrderPrint extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data } = this.props
    return (
      <React.Fragment>
        <div id="i-print-wrapper">
          {data &&
            data.length > 0 &&
            data.map((item, val) => {
              return (
                <div
                  key={val}
                  style={{
                    width: '190mm',
                    background: '#fff',
                    padding: '4mm 6mm',
                    margin: '.4mm',
                    border: '.3mm black solid',
                    color: '#000'
                  }}
                >
                  <div
                    style={{
                      borderBottom: '.3mm black solid',
                      paddingBottom: '5mm'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '110mm'
                        }}
                      >
                        订单: {item.order_no}
                      </span>
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '90mm'
                        }}
                      >
                        配送方式: {DELIVERYTYPE[item.delivery_type]}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '110mm'
                        }}
                      >
                        下单时间: {item.create_time}
                      </span>
                      <span
                        style={{
                          lineHeight: '16pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '90mm'
                        }}
                      >
                        预计送达: {item.expected_delivery}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <span
                        style={{
                          lineHeight: '16pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '110mm'
                        }}
                      >
                        门店地址: {item.shop_address}
                      </span>
                      <span
                        style={{
                          lineHeight: '16pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '90mm'
                        }}
                      >
                        客服电话: {item.service_mobile}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      borderBottom: '.3mm black solid',
                      paddingBottom: '5mm'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '80mm'
                        }}
                      >
                        收货人: {item.consignee_name}
                      </span>
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '90mm'
                        }}
                      >
                        手机号: {item.consignee_mobile}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '80mm'
                        }}
                      >
                        地址: {item.address}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      wordBreak: 'break-all',
                      wordWrap: 'break-word',
                      borderBottom: '.3mm block solid',
                      background: '#fff'
                    }}
                  >
                    {item.product_info.length > 0 &&
                      item.product_info.map((val, index) => {
                        return (
                          <table
                            key={index}
                            style={
                              index % 2 === 0
                                ? {
                                    width: '94.6mm',
                                    borderBottom: '.3mm black solid',
                                    borderRight: '.3mm black solid',
                                    display: 'inline-block'
                                  }
                                : {
                                    width: '94.6mm',
                                    borderBottom: '.3mm black solid',
                                    display: 'inline-block'
                                  }
                            }
                          >
                            <thead>
                              <tr
                                style={{
                                  borderBottom: '.3mm black solid',
                                  fontSize: '12pt'
                                }}
                              >
                                <th
                                  style={{
                                    width: '46mm',
                                    padding: '7pt',
                                    textAlign: 'left'
                                  }}
                                >
                                  商品
                                </th>
                                <th
                                  style={{
                                    width: '18mm',
                                    padding: '7pt',
                                    textAlign: 'center'
                                  }}
                                >
                                  单价
                                </th>
                                <th
                                  style={{
                                    width: '18mm',
                                    padding: '7pt',
                                    textAlign: 'center'
                                  }}
                                >
                                  数量
                                </th>
                                <th
                                  style={{
                                    width: '19mm',
                                    padding: '7pt',
                                    textAlign: 'center'
                                  }}
                                >
                                  金额
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    padding: '5pt',
                                    wordBreak: 'break-all'
                                  }}
                                >
                                  {val.product_name}
                                </td>
                                <td
                                  style={{
                                    padding: '5pt',
                                    wordBreak: 'break-all',
                                    textAlign: 'center'
                                  }}
                                >
                                  {val.price}
                                </td>
                                <td
                                  style={{
                                    padding: '5pt',
                                    wordBreak: 'break-all',
                                    textAlign: 'center'
                                  }}
                                >
                                  {val.product_number}
                                </td>
                                <td
                                  style={{
                                    padding: '5pt',
                                    wordBreak: 'break-all',
                                    textAlign: 'center'
                                  }}
                                >
                                  {val.sum_price}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )
                      })}
                  </div>
                  <div
                    style={{
                      borderBottom: '.3mm black solid',
                      paddingBottom: '5mm'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '70mm'
                        }}
                      >
                        商品合计: {item.total_num}
                      </span>
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '70mm'
                        }}
                      >
                        配送费: {item.transportation_expenses}
                      </span>
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '70mm'
                        }}
                      >
                        优惠扣减: {item.coupon_price}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      borderBottom: '.3mm black solid',
                      paddingBottom: '5mm'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '14pt',
                          padding: '2mm',
                          width: '120mm',
                          fontWeight: 600
                        }}
                      >
                        商品实付: {item.real_price}
                      </span>
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '80mm',
                          fontWeight: 600
                        }}
                      >
                        支付方式: {PAYINFO[item.pay_channel]}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '5mm'
                      }}
                    >
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '14pt',
                          padding: '2mm',
                          width: '120mm',
                          fontWeight: 600
                        }}
                      >
                        备注: {item.desc}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </React.Fragment>
    )
  }
}
