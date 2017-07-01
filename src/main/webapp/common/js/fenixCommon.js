/*�ϸ�ģʽ*/
"use strict"

/*1�����������ռ�-FENIX*/
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

/*2����ȡHTTP���Ӷ���*/
FENIX.getHTTPObject = function(){
	var request = false ;
	
	if (window.XMLHttpRequest) { 
		request = new XMLHttpRequest();//IE7+,Firefox,Chrome,Opera,Safari...
	} else if (window.ActiveXObject) {
		request = new ActiveXObject('Microsoft.XMLHTTP');//IE6,IE5
	}
	
	return request;
}

/*3��ͨ��id����Ԫ�صķ���*/
FENIX.getById = function(id) {
	if (!document.getElementById||!document.getElementById(id)) {
		return false;
	}
	
	return document.getElementById(id);
}

/*4����װ��ҳ����غ���,����Ҫ��һ���¼�ʱֻ������һ���������*/
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

/*5����DOMԪ��׷����*/
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

/*6����DOMԪ��ɾ����*/
FENIX.removeClass = function(element, value) {
	var reg = new RegExp("\\b"+value+"\\b","g"),
		newClassName = "";
		
	if (reg.test(element.className)){
		
		//�򻯰汾��ʵ�ʻ�Ӧ���Կո�����ʵ���ɾ�����˴�Ӧ�ó������Բ�������
		newClassName = element.className.replace(reg, "");
		element.className = newClassName;
	}
}

/*7��ͨ����������DOM���󣨵���������*/
FENIX.getElementsByClassName = function(classname, node) {
	var node = node || document;
	
	if (node.getElementsByClassName) {
		//��������֧��getElementsByClassName��������ʹ��������ṩ�ķ���
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


