import React, { Component } from 'react'
import PageSection from '../../../component/PageSection/PageSection'
// import { Row, Button,message ,Table, Form,Select, Input ,Radio,InputNumber,Modal, Col, Card} from 'antd'
import { Row, Button, Table, Form, Select, Input, Radio, Card } from 'antd'
import { EditableFormRow, EditableCell } from '../../../component/TableCell'
// import UploadImg from '../../../component/ImageCardList/upload'
// import { ROOTPATH } from '../../../config/config'
import InfoListCart from '../component/InfoListCart'
const { Option } = Select
const { TextArea } = Input

class OrderServiceApply extends Component {

  // changeOriginPrice = (index,value) => {
  //   let target = this.state.productList;
  //   target[index].enable_refund_num = value;
  //   this.setState({productList: target});
  // }

  saveBtnState = () => {
    const { productList, selectedRowKeys } = this.props
    const noSelect = selectedRowKeys.length === 0
    if (noSelect) return true
    return productList.reduce((pre, cur) => {
      return pre + cur.refundableNum
    }, 0) === 0
  }

  submit = (e) => {
    const { submitGood } = this.props
    e.preventDefault()
    const { form } = this.props
    form.validateFields((err, val) => {
      if (err) return
      submitGood(val)
    })
  }

  render() {
    const {
      // DELIVERYTYPE,
      // ORDERSTATUS,
      filters,
      columns,
      productList,
      detail,
      selectOnChange: onChange,
      selectedRowKeys,
      btnLoading,
      goBack,
      handleSave,
      // uploadAction,
      // imgInfo,
      // beforeUpload,
      // imgChange,
      // handlePreview,
      // handleCancel,
      basicInfo, // 基础信息
      // editColums // table需要输入框的列
    } = this.props
    const refundTypes = filters['refundTypes'].dataSource
    const refundReason = filters['refundReason'].dataSource

    // const {imgList, isPreview, previewImage} = imgInfo
    // const { imgList } = imgInfo

    const productColumns = columns.map(col => {
      return {
        ...col,
        align: 'center',
        onCell: record => ({
          ...col,
          record,
          handleSave,
          // tableCell 是否可以编辑
          disabled: () => {
            let dataIndex = col.dataIndex
            let disabled = false
            let wightKeys = ['pickWeight', 'productAllRefundWeight', 'refundWeight']
            if (!record.hasWight) {
              // 非标品，有重量 数量重量都可以输入
              // 标品，没有重量 wightKeys 里的不可输入
              disabled = wightKeys.includes(dataIndex) || record['refundableNum'] === 0
            }
            return disabled
          }
        }),
      }
    })

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }

    const { getFieldDecorator } = this.props.form
    const rowStyle = { paddingTop: 10, paddingBottom: 10 };
    const rowSelection = {
      selectedRowKeys,
      getCheckboxProps(value) {
        return {
          // defaultChecked: false,
          disabled: value.refundableNum === 0
        }
      },
      onChange
    }

    // const uploadButton = (
    //   imgList.length > 2 ? '' :
    //     <div>
    //       <Button icon="upload">上传</Button>
    //     </div>
    // );
    return (
      <div className="mp-detail-page" style={{ backgroundColor: '#fff' }}>
        <Card >
          {/* <CustomerBreadcrumb className="breadcrumb"></CustomerBreadcrumb> */}
          <div className="after-sale-detail-body" style={{ backGround: '#fff' }}>
            <Form onSubmit={this.submit}>
              <InfoListCart title="基础信息" fieldList={basicInfo} />
              <PageSection name='售后类型'>
                <Row style={rowStyle}>
                  <Form.Item>
                    {
                      getFieldDecorator('refundType', {
                        rules: [{ required: true, message: '请选择售后类型' }], initialValue: ''
                      })(
                        <Radio.Group onChange={this.onChangeServieType} >
                          {
                            refundTypes.map(item => {
                              const isHiden = item.hideCondition[detail.deliveryType] ? item.hideCondition[detail.deliveryType].code.includes(detail.status) : false
                              return isHiden ? null : <Radio value={item.value} key={item.value}>{item.text}</Radio>
                            }
                              // (item.hideCondition.deliveryType === detail.deliveryType && item.hideCondition.code.includes(detail.status)) ? null :
                              // <Radio value={item.value} key={item.value}>{item.text}</Radio>
                            )
                          }
                        </Radio.Group>
                      )
                    }
                  </Form.Item>
                </Row>
              </PageSection>

              <PageSection name="售后原因">
                <Row style={rowStyle}>
                  <Form.Item>
                    {
                      getFieldDecorator('reasonId',
                        {
                          rules: [{ required: true, message: '请选择售后原因' }],
                        })(
                          <Select
                            placeholder="请选择售后原因"
                            style={{ width: 220 }} >
                            {refundReason.map(item => (
                              <Option value={item.reasonId} key={item.reasonId}>{item.reasonInfo}</Option>
                            ))}
                          </Select>
                        )
                    }
                  </Form.Item>
                </Row>
              </PageSection>

              <PageSection name="备注">
                <Row style={rowStyle}>
                  <Form.Item>
                    {
                      getFieldDecorator('refundNotes', {
                        rules: [{ required: false, message: '请输入备注' }], initialValue: ''
                      })(
                        <TextArea
                          rows={4}
                          onChange={this.onChangeReason}
                          placeholder="请描述申请售后的具体原因，50字以内"
                          autoSize={{ minRows: 3, maxRows: 5 }}
                          maxLength="50"
                        />
                      )
                    }
                  </Form.Item>
                </Row>
              </PageSection>

              {/* <PageSection name="附件">
                <Row style={rowStyle}>
                  <div style={{ display: 'flex', paddingTop: 10, paddingBottom: 10 }}>
                      <Form.Item layout="vertical" label="">
                          <p style={{ textAlign: 'center', color: '#ccc' }}>
                              只能上传jpg/png格式文件,文件不能超过5M
                          </p>
                          <UploadImg
                          // ROOTPATH + 'tool/upload-pic'
                              action={uploadAction}
                              fileList={imgList}
                              beforeUpload={beforeUpload}
                              onChange={imgChange}
                              onPreview={handlePreview}
                          >
                              {uploadButton}
                          </UploadImg>
                          <Modal visible={isPreview} footer={null} onCancel={handleCancel}>
                              <img alt="example" style={{ width: '100%' }} src={previewImage} />
                          </Modal>
                      </Form.Item>
                  </div>
                </Row>
              </PageSection> */}

              <PageSection name="选择商品">
                <Table
                  rowKey={record => record.productId}
                  style={{ background: '#fff' }}
                  bordered
                  components={components}
                  dataSource={productList}
                  columns={productColumns}
                  // editColums={editColums}
                  pagination={false}
                  rowSelection={rowSelection}
                  scroll={{ x: 1660 }}
                />
              </PageSection>

              <Row>
                <Form.Item wrapperCol={{ span: 24, offset: 10 }}>
                  <Button onClick={goBack} style={{ marginRight: 20 }}>
                    返回
                  </Button>
                  <Button type="primary" disabled={this.saveBtnState()} htmlType="submit" loading={btnLoading}>
                    保存
                  </Button>
                </Form.Item>
              </Row>

            </Form>
          </div>
        </Card>
      </div>
    )
  }
}

export default Form.create()(OrderServiceApply)