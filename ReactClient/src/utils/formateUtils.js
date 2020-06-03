/**
 * 格式化数据
 */

// 格式化时间
function formateDate(time){
    if(!time)return '';
    let date=new Date(time)
    function zero(num) { return num<10?"0"+num:num; }
    var newTime = date.getFullYear()+'-'+zero(date.getMonth()+1)+'-'+zero(date.getDate())+'--'+zero(date.getHours())+':'+zero(date.getMinutes())+':'+zero(date.getSeconds());
    return newTime;
}
// 格式化价格
function formateMoney(value,sign) {
    if (!value) return sign + '0.00';
    let intPart = value.toFixed(0); //获取整数部分
    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    let floatPart = ".00"; //预定义小数部分
    value = parseInt(value)
    let valueArray = String(value).split(".");
    if (valueArray.length === 2) {
        floatPart = valueArray[1].toString(); //拿到小数部分
        if (floatPart.length === 1) { //只有一位小数则补多一位
            return sign + intPartFormat + "." + floatPart + '0';
        }else{
            return sign + intPartFormat + "." + floatPart;
        }
    } else {
        return sign + intPartFormat + floatPart;
    }
}

export default {
    formateDate,
    formateMoney
}
