/*严格模式*/
"use strict"

/*1、生成命名空间-FENIX*/
var FENIX = {
	namespace: function(ns) {
		var parts = ns.split("."),
			object = this,
			i,len;
			
		for (i=0, len=parts.length; i < len; i++) {
			if (!object[parts[i]]) {
				object[parts[i]] = {};
			}
			object = object[parts[i]];
		}
		
		return object;
	}
};

/*2、获取HTTP连接对象*/
FENIX.getHTTPObject = function(){
	var request = false ;
	
	if (window.XMLHttpRequest) { 
		request = new XMLHttpRequest();//IE7+,Firefox,Chrome,Opera,Safari...
	} else if (window.ActiveXObject) {
		request = new ActiveXObject('Microsoft.XMLHTTP');//IE6,IE5
	}
	
	return request;
}

/*3、通过id查找元素的方法*/
FENIX.getById = function(id) {
	if (!document.getElementById||!document.getElementById(id)) {
		return false;
	}
	
	return document.getElementById(id);
}

/*4、封装绑定页面加载函数,在需要绑定一个事件时只需运行一次这个函数*/
FENIX.addLoadEvent = function(func) {
	var oldonload = window.onload;
	
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

/*5、给DOM元素追加类*/
FENIX.addClass = function(element, value) {
	var reg =new RegExp("\\b"+value+"\\b"),
		newClassName = "";
	
	if (!element.className){
		element.className = value;
	} else if (!reg.test(element.className)) {
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

/*6、给DOM元素删除类*/
FENIX.removeClass = function(element, value) {
	var reg = new RegExp("\\b"+value+"\\b","g"),
		newClassName = "";
		
	if (reg.test(element.className)){
		
		//简化版本，实际还应当对空格进行适当的删除，此处应用场景可以不做处理
		newClassName = element.className.replace(reg, "");
		element.className = newClassName;
	}
}

/*7、通过类名查找DOM对象（单个类名）*/
FENIX.getElementsByClassName = function(classname, node) {
	var node = node || document;
	
	if (node.getElementsByClassName) {
		//如果浏览器支持getElementsByClassName方法，则使用浏览器提供的方法
		return node.getElementsByClassName(classname);
	} else {
		var results=[],
			reg = new RegExp("\\b"+classname+"\\b"),
			elems = null;
			
		if (!document.getElementsByTagName) return false;
		elems=node.getElementsByTagName("*");
		
		for (var i = 0; i < elems.length; i++) {
			if (reg.test(elems[i].className)) {
				results[results.length] = elems[i];
			}
		}
		return results;
	}
}


