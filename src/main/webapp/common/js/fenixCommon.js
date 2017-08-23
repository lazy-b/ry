/*严格模式*/
"use strict"

/*1、生成命名空间-FENIX*/
var FENIX = {
	namespace: function(ns) {
		var parts = ns.split("."),
			object = this,
			i,len;
			
		for (i = 0, len = parts.length; i < len; i++) {
			if (!object[parts[i]]) {
				object[parts[i]] = {};
			}
			object = object[parts[i]];
		}
		
		return object;
	}
};

FENIX.namespace("INFO");      // 订单信息表的命名空间

// （增）打开新增行的表单
FENIX.INFO.addRow = function addRow($target) {
    
    var url = $target.attr("href"); // 获得a元素的href

    //部分样式必须使用js定义，剩下部分在dialog-layout类中定义
    $("#dlg").dialog({
        top: 20,//单位为px
        modal: true,
        resizable:true,
        cls:"dialog-layout",//新增类，控制弹窗的部分样式
        queryParams: {//传递url给表单
                url: url
        }
    }).dialog("hcenter");
    $("#ftitle").html("新增信息");
    $("#dlg").dialog("open").dialog("setTitle","新增信息");
    $("#fm").form("clear");
}

// （删）根据选择行的id集合删除一条记录或者多条记录
FENIX.INFO.removeRows = function removeRows($target) {

    var rows = $("#datagrid").datagrid("getSelections"),
        url = $target.attr("href"),
        idArr=[], ids,
        i;
    
    if (rows.length > 0) {
        for (i=0; i < rows.length; i +=1) {
             idArr.push(rows[i].id);
         }
        ids = idArr.join(","); 
        $.messager.confirm("警告！", "你确定需要删除选中的"+rows.length+"条记录嘛？", function(r){

            if (r) {
                $.post(url,{ids:ids}, function(result){

                    if (result.status === 200) {
                        $.messager.show({
                            title: "删除成功！",
                            msg: result.msg
                        });
                        $("#datagrid").datagrid("reload");//删除成功则刷新表格
                    } else {
                        $.messager.show({
                            title: "删除失败！",
                            msg: result.msg
                        });
                    }
                }, "json");
            }
        });
    }else{
        alert("请先选择一条需要删除的数据！");
    }
}

// （改）打开修改行的表单
FENIX.INFO.editRow = function editRow($target) {
    
    var rows = $("#datagrid").datagrid("getSelections"),
        url = $target.attr("href"),
        remind_message,                 //提示信息
        openDialog;                     //打开会话窗口函数

    //定义打开会话窗口函数
    openDialog = function openDialog(rows){
        $("#ftitle").html("编辑信息");
        $("#dlg").dialog({
            top: 20,//单位为px
            modal: true,
            resizable:true,
            cls:"dialog-layout",//新增类，控制弹窗的部分样式
            queryParams: {//传递url给表单
                url: url
            }
        }).dialog("hcenter");
        $("#dlg").dialog("open").dialog("setTitle","编辑信息");
        $("#fm").form("load",rows[0]);
    }

    //如果用户选择了一条以上记录，提示用户，如果用户仍然需要修改，则修改选中的第一条记录
    if (rows.length > 1) {
        remind_message = "<p>您选择了&nbsp;"+rows.length+"&nbsp;条数据！</p><p>本次操作只能修改第一条数据：</p>"+
                        "<p style='text-indent:6em'>订单号："+
                        rows[0].orderNo+"，产品名称："+rows[0].productName+
                        "</p><p style='text-indent:4em'>您确定需要继续进行操作嘛？</p>";
        $.messager.defaults = {
            ok: "仍然确认",
            cancel: "返回选择",
            width:"500px"
        }         
        $.messager.confirm("警告！", remind_message, function(r){

            //用户仍然确认修改，则打开修改会话窗口
            if (r) {
                openDialog(rows);
            }
        });
    } else if (rows.length === 1) {
        openDialog(rows);
    } else {
        alert("请选择一条需要修改的数据！");
    }
}

// 保存表单记录（新增的记录或者被修改后的记录）
FENIX.INFO.save = function save() {
	//定义提交表单的回调函数
	$.ajax({
		url: $("#dlg").dialog("options")["queryParams"].url,	//配置表单提交的URL
		type: "POST",
		data: $("#fm").serialize(),				// 序列化表单
		dataType: "json",
		beforeSend: function(){
			var result = $("#fm").form("validate");	// 表单验证结果
			if (!result) {
				$.messager.show({
                    title: "表单验证错误",
                    msg: "数据未能提交，请检查您的输入是否无误"
                });
			}
			return result;	// 返回验证结果，验证通过才会提交表单
		},
		success: function(data, textStatus){	// 表单提交成功的回调函数
            if (data.status !== 200) {
                $.messager.show({
                    title: "发生了一个错误",
                    msg: data.msg
                });
            }else{
                $("#dlg").dialog("close");			//关闭弹窗
                $("#datagrid").datagrid("reload");	//更新表格
                $.messager.show({
                    title: "更新成功",
                    msg: "数据修改成功，并且重新加载表格数据"
                });
                //如果FENIX.INFO.rows已经被赋值了，刷新为最新的表格
                if (FENIX.INFO.rows) {
                    FENIX.INFO.rows = null;
                };
            }
            console.log(textStatus);
        },
        error: function (jqXHR, textStatus, errorThrown) {
               console.log(jqXHR, textStatus, errorThrown);
            } 
	});
} 

// （查）前台搜索逻辑，不再从后台重新获取数据
FENIX.INFO.doSearch = function(value, name) {
    var rows_info = FENIX.INFO.rows || $("#datagrid").datagrid("getRows"),
        resultRows = [],
        reload = false;

    if (value != "") {
        for (var i = 0;i < rows_info.length;i++) {
            if (rows_info[i][name] == value) {
                resultRows.push(rows_info[i]);
            }
        }
    } else {//如果输入为空则刷新表格
        $("#datagrid").datagrid("loadData",rows_info);
        return ;
    }

    if (resultRows.length>0 && resultRows.length<=rows_info.length) {
        reload = true;
    }

    if (reload) {
        $("#datagrid").datagrid("loadData",resultRows);
        FENIX.INFO.rows = rows_info;
    } else {
        $("#datagrid").datagrid("loadData",rows_info);
        alert("请输入正确的参数！")
    } 
}

// 重新从后台加载表格
FENIX.INFO.reloadTable = function reloadTable() {
    $("#datagrid").datagrid("reload");
}

// 关闭表单页面
FENIX.INFO.closeDialog = function closeDialog() {
    $("#dlg").dialog("close");
    return false;
}
    
    
/*2、获取HTTP连接对象*/
FENIX.getHTTPObject = function getHTTPObject() {
	var request = false ;
	
	if (window.XMLHttpRequest) { 
		request = new XMLHttpRequest();//IE7+,Firefox,Chrome,Opera,Safari...
	} else if (window.ActiveXObject) {
		request = new ActiveXObject('Microsoft.XMLHTTP');//IE6,IE5
	}
	
	return request;
};

/*3、通过id查找元素的方法*/
FENIX.getById = function getById(id) {
	if (!document.getElementById || !document.getElementById(id)) {
		return false;
	}
	
	return document.getElementById(id);
};

/*4、封装绑定页面加载函数,在需要绑定一个事件时只需运行一次这个函数*/
FENIX.addLoadEvent = function addLoadEvent(func) {
	var oldonload = window.onload;
	
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
};

/*5、给DOM元素追加类*/
FENIX.addClass = function addClass(element, value) {
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
};

/*6、给DOM元素删除类*/
FENIX.removeClass = function removeClass(element, value) {
	var reg = new RegExp("\\b"+value+"\\b","g"),
		newClassName = "";
		
	if (reg.test(element.className)){
		
		//简化版本，实际还应当对空格进行适当的删除，此处应用场景可以不做处理
		newClassName = element.className.replace(reg, "");
		element.className = newClassName;
	}
};

/*7、通过类名查找DOM对象（单个类名）*/
FENIX.getElementsByClassName = function getElementsByClassName(classname, node) {
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
};

/*8、封装添加事件句柄的函数*/
FENIX.addHandler = function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element['on' + type] = handler;
    }
};

/*9、阻止默认事件比如a链接跳转*/
FENIX.preventDefault = function preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault(); // 标准技术
        } else if (event.returnValue) {
            event.returnValue = false; // IE
        } else {
            return false; // 用于处理使用对象属性注册的处理程序
        }
    }
