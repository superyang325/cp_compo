import React, { Component } from 'react'
import { PAYTYPE, DELIVERYTYPE } from '../constant'
export default class OrderPrint extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    const { 
      data,
    } = this.props
    const {shopInfo} = data
    return (
      <React.Fragment>
        <div id="i-print-wrapper">
                <div
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
                        订单号: {data.orderSubNo}
                      </span>
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '90mm'
                        }}
                      >
                        配送方式: {DELIVERYTYPE[data.deliveryType]}
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
                        下单时间: {data.historyStatusList[0] && data.historyStatusList[0].createTime}
                      </span>
                      <span
                        style={{
                          lineHeight: '16pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '90mm'
                        }}
                      >
                        预计送达: {data.expectArriveTimeStart}
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
                        门店地址: {shopInfo.shopAddress}
                      </span>
                      <span
                        style={{
                          lineHeight: '16pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '90mm'
                        }}
                      >
                        客服电话: {shopInfo.concatMobile}
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
                        收货人: {data.receiveName || '-'}
                      </span>
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '90mm'
                        }}
                      >
                        手机号: {data.phone || '-'}
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
                        地址: {data.address || '-'}
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
                    {data.productList.length > 0 &&
                      data.productList.map((val, index) => {
                        return (
                          <table
                            key={index}
                            style={
                              index % 2 === 0
                                ? {
                                  width: '100%',
                                  borderBottom: '.3mm black solid',
                                  borderRight: '.3mm black solid',
                                  display: 'inline-block'
                                }
                                : {
                                  width: '100%',
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
                                    wordBreak: 'break-all',
                                    textAlign: 'left'
                                  }}
                                >
                                  {val.productName}
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
                                  {val.productNumber}
                                </td>
                                <td
                                  style={{
                                    padding: '5pt',
                                    wordBreak: 'break-all',
                                    textAlign: 'center'
                                  }}
                                >
                                  {val.realSumPrice}
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
                        商品合计: {data.realPrice}
                      </span>
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '70mm'
                        }}
                      >
                        配送费: {data.transportationExpenses}
                      </span>
                      <span
                        style={{
                          lineHeight: '18pt',
                          fontSize: '12pt',
                          padding: '2mm',
                          width: '70mm'
                        }}
                      >
                        优惠扣减: {data.couponValue}
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
                        商品实付: 
                        { data.realPrice }
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
                        支付方式:
                        {
                          data.orderPayWay.map(item => <span key={{item}}>{
                              PAYTYPE[item]
                          }</span>)
                        }
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
                        备注: {shopInfo.remarks || '-'}
                      </span>
                    </div>
                  </div>
                </div>
        </div>
      </React.Fragment>
    )
  }
}
