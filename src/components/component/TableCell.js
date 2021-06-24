import React from "react"
import { Form, InputNumber, Input } from "antd"
import { DATERANGE, INPUT, SELECT, INPUTNUMBER } from '../constant'
const EditableContext = React.createContext()
const EditableRow = ({ form, index, ...props }) => {
  return (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  )
}
const noop = () => null
export const EditableFormRow = Form.create()(EditableRow)
export class EditableCell extends React.Component {
  state = {
    editing: true
  }
  form;
  onSave = () => {
    setTimeout(()=>{
      const { record, handleSave, editKey } = this.props
      this.form.validateFields((errs, values) => {
        if (errs && errs[editKey]) {
          return
        }
        handleSave({ ...record, ...values }, editKey, this.form)
      })
    })
  }

  renderFilterItem = (filter, inputProps, record) => {
    const renderholderMap = {
      [DATERANGE]: this.renderDateRange || noop,
      [INPUT]: this.renderInput || noop,
      [SELECT]: this.renderSelect || noop,
      [INPUTNUMBER]: this.renderInputNumber || noop,
    };
    let type = filter.fieldType || INPUT; // 默认input框
    return renderholderMap[type](filter, inputProps, record);
  };
  renderInput = (filter, inputProps, record) => {
    const { getFieldDecorator } = this.form;
    return (
      <Form.Item>
        {getFieldDecorator(filter['dataIndex'], {
          rules: [{
            required: filter.required,
            message: `请输入${filter.title}`
          }],
          initialValue: ''
        })(<Input />)}
      </Form.Item>
    );
  };
  renderInputNumber = (filter, inputProps, record) => {
    const { min, max, setInitialValue } = this.props

    let initialValue, getMin, getMax
    if (typeof min === 'function') {
      getMin = min(record)
    } else {
      getMin = min
    }
    if (typeof max === 'function') {
      getMax = max(record)
    } else {
      getMax = max
    }
    if (setInitialValue === 'min') {
      initialValue = getMin
    } else if (setInitialValue === 'max') {
      initialValue = getMax
    } else {
      // initialValue = getMin
    }
    const { getFieldDecorator } = this.form;
    const onChange = filter.onChange ? this.onSave : noop
    return (
      <Form.Item>
        {getFieldDecorator(filter['dataIndex'], {
          rules: [{
            required: typeof filter.required === 'function' ? filter.required(record) : filter.required,
            message: `请输入${filter.title}`
          }], initialValue
        })(
          <InputNumber
            onChange={onChange}
            ref={node => {
              this.input = node
            }}
            disabled={filter.disabled()}
            {...inputProps}
          />
        )}
      </Form.Item>
    );
  };

  renderInputCell = (form) => {
    this.form = form
    const { dataIndex, children, record, fieldType, editKey, disabled, required, title, onChange } = this.props
    const inputProps = this.getInputProps(this.props) || {}
    const filter = {
      fieldType,
      dataIndex,
      record,
      disabled,
      required,
      title,
      onChange
    }
    if (editKey) {
      return (
        this.renderFilterItem(filter, inputProps, record)
      )
    } else {
      return { children }
    }
  }

  getInputProps = (props) => {
    const { editKey, fieldType, title, record, precision, max, min, step } = props
    if (editKey && fieldType === INPUTNUMBER) {
      let getMax, getMin
      if (max && typeof max === 'function') {
        getMax = max(record)
      } else {
        getMax = max || 99999
      }
      if (min && typeof min === 'function') {
        getMin = min(record)
      } else {
        getMin = min || 0
      }
      return {
        max: getMax,
        min: getMin,
        precision, // 数值精度
        step: step || 1,
        placeholder: `请输入${title}`//record.refundableNum === 0 ? '0' : '1',
      }
    } else {
      return {}
    }
  }

  render() {
    const {
      editKey,
      children,
      // ...restProps
    } = this.props
    let com = null
    if (editKey) {
      com = (
        <EditableContext.Consumer>
          {(form) => this.renderInputCell(form)}
        </EditableContext.Consumer>
      )
    } else {
      com = children
    }
    // return <td {...restProps}>{com}</td>
    return <td>{com}</td>
  }
}
