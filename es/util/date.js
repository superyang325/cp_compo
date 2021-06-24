import moment from 'moment';

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
    startTime = moment(startTime);
  }

  if (typeof endTime === 'string') {
    endTime = moment(endTime);
  }

  console.log('时间差:', endTime.diff(startTime, 'months', true));
  return endTime.diff(startTime, 'months', true) > 3;
}

function getThreeMonthRange(num) {
  var endTime = moment(Date.now()).format('YYYY-MM-DD');
  var startTime = moment(endTime).subtract('months', num).format('YYYY-MM-DD');
  return {
    startTime: startTime,
    endTime: endTime
  };
}

export { formatDate, isExceedRange, getThreeMonthRange };