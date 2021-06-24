export function toHump(name) {
  return name.replace(/_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
/* 驼峰转换下划线*/
export function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function objectToHump(obj) {
  const result = {}
  Object.keys(obj).forEach(key=>{
    result[toHump(key)] = obj[key]
  })
  return result
} 
export function objectToLine(obj) {
  const result = {}
  Object.keys(obj).forEach(key=>{
    result[toLine(key)] = obj[key]
  })
  return result
}
export function arrToLine(arr) {
  return arr.reduce((pre,item) => {
    pre.push(objectToLine(item))
    return pre
  },[])
}