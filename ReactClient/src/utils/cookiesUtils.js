/**
 * coookie信息的处理
 */
function setCookie(name,value,n){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+n);
	document.cookie = name+"="+value+";expires="+oDate;
}

function getCookie(name){
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++){
		//console.log(arr[i]);
		var newArr = arr[i].split("=");
		if(newArr[0]===name){
			return newArr[1];
		}
	}
}

function delCookie(name){
	setCookie(name,1,-1);
}

export default {
    setCookie,
    getCookie,
    delCookie
}

