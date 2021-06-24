"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.isExceedRange = isExceedRange;
exports.getThreeMonthRange = getThreeMonthRange;

var _moment = _interopRequireDefault(require("moment"));

function formatDate(nS) {
  var date = new Date(parseInt(nS) * 1000);
  var year = date.getFullYear();
  var mon = date.getMonth() + 1;
  var day = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return year + '-' + p(mon) + '-' + p(day) + ' ' + p(h) + ':' + p(m) + ':' + p(s);
}

function p(s) {
  return s < 10 ? '0' + s : s;
}

function isExceedRange(startTime, endTime) {
  if (!startTime || !endTime) {
    return false;
  }

  if (typeof startTime === 'string') {
    startTime = (0, _moment.default)(startTime);
  }

  if (typeof endTime === 'string') {
    endTime = (0, _moment.default)(endTime);
  }

  console.log('时间差:', endTime.diff(startTime, 'months', true));
  return endTime.diff(startTime, 'months', true) > 3;
}

function getThreeMonthRange(num) {
  var endTime = (0, _moment.default)(Date.now()).format('YYYY-MM-DD');
  var startTime = (0, _moment.default)(endTime).subtract('months', num).format('YYYY-MM-DD');
  return {
    startTime: startTime,
    endTime: endTime
  };
}