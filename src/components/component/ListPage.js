import React from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
} from 'antd';
// import CustomerBreadcrumb from '../../../components/CustomerBreadcrumb';
import { DATERANGE, INPUT, SELECT } from '../constant';

const COLNUM = 3;

const { Option } = Select;
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

class listPage extends React.Component {
  componentDidMount() {
    const { parentFun } = this.props
    parentFun?.(this.props)
  }
  onSubmit = () => {
    const { onSearch } = this.props;
    const { getFieldsValue, validateFields } = this.props.form;
    onSearch(getFieldsValue(), validateFields);
  };
  onReset = () => {
    const { onSearch, filters } = this.props;
    const { setFieldsValue, validateFields } = this.props.form;
    const fieldsValue = {};
    const defultValueMap = {
      [DATERANGE]: [],
      [INPUT]: '',
      [SELECT]: '',
    };
    filters.forEach((filter) => {
      const { dataSource } = filter;
      let type = INPUT;
      if (Array.isArray(dataSource)) {
        type = SELECT;
      } else if (dataSource === DATERANGE) {
        type = DATERANGE;
      }
      fieldsValue[filter['name']] = defultValueMap[type];
    });
    setFieldsValue(fieldsValue);
    onSearch(fieldsValue, validateFields);
  };
  render() {
    const {
      dataSource,
      pageInfo: { pageSize, total, current },
      columns,
      onChangePage,
      filters,
      loading,
      id,
      scroll,
      rowSelection,
    } = this.props;

    return (
      <React.Fragment>
        {this.renderForm(filters)}
        <br />
        <div
          style={{
            minHeight: '600px',
            backgroundColor: '#fff',
            padding: 20,
          }}
        >
          {this.props.children}
          <Table
            rowKey={(record) => record[id]}
            columns={columns}
            dataSource={dataSource}
            loading={loading && loading.tableLoading}
            scroll={scroll}
            rowSelection={rowSelection}
            // pagination={{
            //   pageSize,
            //   total,
            //   current: current + 1,
            //   onChange: (current, pageSize) => {
            //     onChangePage && onChangePage(current - 1, pageSize);
            //   },
            // }}
            pagination={{
              pageSize,
              total,
              current: current,
              onChange: (current, pageSize) => {
                onChangePage && onChangePage(current, pageSize);
              },
            }}
          />
        </div>
      </React.Fragment>
    );
  }
  renderForm = (filters) => {
    const rowNum =
      filters && filters.length > 0 ? (filters.length % COLNUM) === 0 ? Math.ceil(filters.length / COLNUM) + 1 : Math.ceil(filters.length / COLNUM) : 0;

    const rowEls = [];
    for (let i = 0, len = rowNum; i < len; i++) {
      rowEls.push(<Row key={i}>{this.renderFormItem(i, filters)}</Row>);
    }
    return (
      <Card style={{ border: 'none' }}>
        <Form {...formItemLayout}>{rowEls}</Form>
      </Card>
    );
  };
  renderFormItem = (rowIndex, filters) => {
    const colELs = [];
    for (let i = 0, len = COLNUM; i < len; i++) {
      const filter = filters[rowIndex * COLNUM + i];
      if (filter) {
        colELs.push(
          <Col key={i} span={8}>
            {this.renderFilterItem(filter)}
          </Col>
        );
      } else if (i === COLNUM - 1) {
        colELs.push(
          <Col key={i} offset={2} span={6}>
            <Button onClick={this.onSubmit} type="primary">
              确定
            </Button>
            <Button onClick={this.onReset} style={{ marginLeft: 20 }}>
              重置
            </Button>
          </Col>
        );
      } else {
        colELs.push(<Col key={i} span={8}></Col>);
      }
    }
    return colELs;
  };

  renderFilterItem = (filter) => {
    const { dataSource } = filter;
    const renderholderMap = {
      [DATERANGE]: this.renderDateRange,
      [INPUT]: this.renderInput,
      [SELECT]: this.renderSelect,
    };

    let type = INPUT;
    if (Array.isArray(dataSource)) {
      type = SELECT;
    } else if (dataSource === DATERANGE) {
      type = DATERANGE;
    }
    return renderholderMap[type](filter);
  };
  renderInput = (filter) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label={filter['title']}>
        {getFieldDecorator(filter['name'])(<Input />)}
      </Form.Item>
    );
  };
  renderSelect = (filter) => {
    const { getFieldDecorator } = this.props.form;
    let { selectChange } = this.props
    if (!selectChange) {
      selectChange = () => { }
    }
    return (
      <Form.Item label={filter['title']}>
        {getFieldDecorator(filter['name'], {
          rules: [
            {
              required: filter['required'] || false,
              message: filter['message'] || '',
            },
          ],
        })(
          <Select onChange={(e) => { selectChange(e, filter) }}>
            {filter.dataSource.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  };
  renderDateRange = (filter) => {
    const { onRangeChange } = this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label={filter['title']}>
        {getFieldDecorator(filter['name'])(<RangePicker onChange={onRangeChange} />)}
      </Form.Item>
    );
  };
}

export default Form.create()(listPage);