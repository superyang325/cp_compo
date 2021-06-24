import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col } from 'antd';

// const defualtConfig = []
class CodeForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { modalControl, hideModal } = this.props;

    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={modalControl.visible}
        title={modalControl.title}
        footer={null}
        className="shop-detail"
        maskClosable={modalControl.maskClosable}
        onCancel={hideModal}
        onOk={this.handleSubmit}
      // width={800}
      >
        <Form>
          <Form.Item>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入自提码' }],
            })(<Input placeholder={'请输入自提码'} />)}
          </Form.Item>
          <Row>
            <Col span={24} offset={8}>
              <Button
                style={{ marginRight: 30 }}
                className="login-form-button"
                onClick={hideModal}
              >
                关闭
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 30 }}
                onClick={this.handleSubmit}
                className="login-form-button"
              >
                确认
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'codeForm' })(CodeForm);
