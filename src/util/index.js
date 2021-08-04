import moment from "moment"

export const getEnumerableArray = (number) => {
  let a, res = []
  for (let i = 0; i < number; i++) {
    res.push(a)
  }
  return res
}


const getInputFieldProps = (filter) => {
  return {
    initialValue: '',
    rules: [
      {
        required: filter.required,
        message: `${filter.label}不能为空`
      }
    ]
  }
}
const getSelectFieldProps = (filter) => {
  return {
    initialValue: filter.initialValue || '',
    rules: [
      {
        required: filter.required,
        message: `${filter.label}不能为空`
      }
    ]
  }
}
const getInputNumberFieldProps = (filter) => {
  return {
    initialValue: '',
    rules: [
      {
        required: filter.required,
        message: `${filter.label}不能为空`
      }
    ]
  }
}
const getDatePickerFieldProps = (filter) => {
  let res = {
    rules: [
      {
        required: filter.required,
        message: `${filter.label}不能为空`
      }
    ]
  }
  if (filter.initialValue) {
    // res.initialValue = filter.initialValue
  }
  return res
}
const getRangePickerFieldProps = (filter) => {
  return {
    // initialValue: filter.initialValue ? filter.initialValue : [],
    rules: [
      {
        required: filter.required,
        message: `${filter.label}不能为空`
      }
    ]
  }
}
const getMonthPickerFieldProps = (filter) => {
  return {
    // initialValue: filter.initialValue ? filter.initialValue : [],
    rules: [
      {
        required: filter.required,
        message: `${filter.label}不能为空`
      }
    ]
  }
}
const obj = {
  getInputFieldProps,
  getSelectFieldProps,
  getInputNumberFieldProps,
  getDatePickerFieldProps,
  getRangePickerFieldProps,
  getMonthPickerFieldProps
}

export function getFieldProps(type) {
  let key = `get${type}FieldProps`
  return obj[key]
}