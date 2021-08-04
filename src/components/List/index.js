import React, { Component } from 'react'
import {
  Button,
  Form,
  Table,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Row,
  Col,
  message,
} from 'antd'
import moment from "moment"
import { fieldTypes } from '../../constant'
import { getEnumerableArray, getFieldProps } from '../../util'
const { Option } = Select
const { RangePicker, MonthPicker } = DatePicker

const COL = 8 // 一个搜索项的展位宽度
const COLNUM = 3 // 搜索项一列3个
const LABELCOLSPAN = 8
const WRAPPERCOLSPAN = 16
const formItemLayout = {
  labelCol: {
    span: LABELCOLSPAN
  },
  wrapperCol: {
    span: WRAPPERCOLSPAN
  },
}

class List extends Component {
  componentDidMount() {
    console.log('componentDidMount-list')
    const { getListForm } = this.props
    typeof getListForm === 'function' && getListForm(this.props.form)
  }
  filterItem = (filter) => {
    const { dataSource, fieldType, component } = filter
    if (component) {
      return component()
    }
    if (Array.isArray(filter.dataSource)) {
      let { selectChange } = this.props
      !selectChange && (selectChange = Boolean)
      return <Select onChange={(value) => {
        selectChange(value, filter)
      }}>
        {
          dataSource.map(item =>
            <Option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </Option>)
        }
      </Select>
    } else if (fieldType === fieldTypes.RangePicker) {
      return <RangePicker
        style={{ width: '100%' }}
      />
    } else if (fieldType === fieldTypes.DatePicker) {
      return <DatePicker
        style={{ width: '100%' }}
      />
    } else if (fieldType === fieldTypes.MonthPicker) {
      return <MonthPicker
        style={{ width: '100%' }}
      />
    } else {
      return <Input />
    }
  }
  getProps = (filters) => {
    let { fieldType } = filters
    if (!fieldType) {
      fieldType = 'Input'
    }
    return getFieldProps(fieldType)(filters)
  }

  renderFilters = (filters=[], form) => {
    const { getFieldDecorator } = form
    const filtersLength = filters.length
    const rowNumber = filtersLength / COLNUM === Math.ceil(filtersLength / COLNUM) ? filtersLength / COLNUM + 1 : Math.ceil(filtersLength / COLNUM) // Row 的行数
    const arr = getEnumerableArray(rowNumber), colArr = getEnumerableArray(COLNUM)
    return arr.map((_, rowIndex) => {
      return <Row key={rowIndex}>
        {
          colArr.map((_, colIndex) => {
            const filter = filters[(rowIndex + 1) * COLNUM - (COLNUM - colIndex)]
            if (filter) {
              const { label, field } = filter
              return <Col span={COL} key={colIndex}>
                <Form.Item label={label.replace(/[^\u4e00-\u9fa5|a-z|A-Z|0-9]/g, '')} >
                  {
                    getFieldDecorator(field, this.getProps(filter))(
                      this.filterItem(filter)
                    )
                  }
                </Form.Item>
              </Col>
            } else {
              if (colIndex === COLNUM - 1 && rowIndex === arr.length - 1) {
                return <Col span={COL} key={colIndex} >
                  <Row>
                    <Col offset={LABELCOLSPAN}>
                      <Button type='primary' onClick={this.onSearch} style={{ marginRight: '20px' }}>查询</Button>
                      <Button onClick={this.onReset}>重置</Button>
                    </Col>
                  </Row>
                </Col>
              } else {
                return <Col span={COL} key={colIndex}></Col>
              }
            }
          })
        }
      </Row>
    })
  }

  onSearch = () => {
    const { onSearch } = this.props
    const { validateFields } = this.props.form
    validateFields((e, values) => {
      if (e) return
      typeof onSearch === 'function' && onSearch(values)
    })
  }

  onReset = () => {
    const { onReset, filters=[] } = this.props
    const { setFieldsValue, resetFields } = this.props.form
    const fieldsValue = {}
    const defultValueMap = {
      [fieldTypes.Input]: '',
      [fieldTypes.InputNumber]: '',
      [fieldTypes.Select]: '',
      [fieldTypes.DatePicker]: moment(),
      [fieldTypes.MonthPicker]: moment(),
    }
    filters.forEach((filter) => {
      const { fieldType, field } = filter
      fieldsValue[field] = defultValueMap[fieldType]
    })
    // setFieldsValue(fieldsValue)
    resetFields()
    typeof onReset === 'function' && onReset()
  }

  render() {
    const {
      filters,
      columns,
      dataSource,
      tableKey,
      size: pageSize,
      page: current,
      total,
      onShowSizeChange,
      onChange,
      scroll
    } = this.props
    return (
      <>
        <Form {...formItemLayout}
          style={{
            background: '#fff',
            margin: '10px 0 20px 0',
            padding: '15px'
          }}>
          {this.renderFilters(filters, this.props.form)}
        </Form>
        {
          this.props.children
        }
        <Table
          style={{ backgroundColor: '#fff', paddingLeft: '20px', paddingRight: '20px' }}
          rowKey={tableKey || 'id'}
          scroll={scroll || { x: 1250 }}
          bordered={true}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize,
            total,
            current,
            showSizeChanger: true,
            onShowSizeChange,
            onChange,
          }}
        />
      </>
    )
  }
}

export default Form.create()(List)
