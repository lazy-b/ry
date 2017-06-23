/*封装绑定页面加载函数,在需要绑定一个事件时只需运行一次这个函数*/
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

/*封装通过id查找元素的方法*/
function getById(id){
	if (!document.getElementById||!document.getElementById(id)) {
		return false;
	}
	return document.getElementById(id);
}