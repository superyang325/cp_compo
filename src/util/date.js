import moment from 'moment'

function formatDate(nS) {
    let date = new Date(parseInt(nS) * 1000);
    let year = date.getFullYear();
    let mon = date.getMonth() + 1;
    let day = date.getDate();
    let h  = date.getHours();
    let m  = date.getMinutes();
    let s  = date.getSeconds();
    return year + '-' + p(mon) + '-' + p(day)+' '+p(h)+':'+p(m)+':'+p(s)
}
function p(s) {
    return s < 10 ? '0' + s : s;
}
function isExceedRange(startTime,endTime){
    if(!startTime || ! endTime){
        return false
    }
    if(typeof startTime === 'string'){
        startTime = moment(startTime)
    }
    if(typeof endTime === 'string'){
        endTime = moment(endTime)
    }
    console.log('时间差:',endTime.diff(startTime, 'months',true))
    return endTime.diff(startTime, 'months',true) > 3
}
function getThreeMonthRange(num){
    const endTime = moment(Date.now()).format('YYYY-MM-DD')
    const startTime = moment(endTime).subtract('months',num).format('YYYY-MM-DD')
    return {
        startTime,
        endTime
    }
}
export {
    formatDate,
    isExceedRange,
    getThreeMonthRange,
}