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