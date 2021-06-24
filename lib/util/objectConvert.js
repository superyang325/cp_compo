"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHump = toHump;
exports.toLine = toLine;
exports.objectToHump = objectToHump;
exports.objectToLine = objectToLine;
exports.arrToLine = arrToLine;

function toHump(name) {
  return name.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
/* 驼峰转换下划线*/


function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

function objectToHump(obj) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    result[toHump(key)] = obj[key];
  });
  return result;
}

function objectToLine(obj) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    result[toLine(key)] = obj[key];
  });
  return result;
}

function arrToLine(arr) {
  return arr.reduce(function (pre, item) {
    pre.push(objectToLine(item));
    return pre;
  }, []);
}