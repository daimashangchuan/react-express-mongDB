// 重写alert方法，alert()方法重写，不能传多余参数
function alertFun() {
	window.alert = function(name) {
		let iframe = document.createElement("IFRAME");
		iframe.style.display="none";
		iframe.setAttribute("src", 'data:text/plain');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	}
}