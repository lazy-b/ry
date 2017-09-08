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

// 表格类
FENIX.Table = function Table(loadParameter, otherParameter, instanceName) {
    this.loadPara = loadParameter;
    this.opts = otherParameter; 
    this.instanceName = instanceName;
    this.rows = [];                 // 保存表格数据
}
FENIX.Table.prototype = {
    initalize: function() {
        // 对dom进行小小的改动
        this.changeDom();

        // 由于jquery.easyui.min.js加载后会立即执行，
        // 导致给搜索框添加处理程序困难
        // 必须在jquery.easyui.min.js加载之前修改dom
        // 故在修改完dom之后再手动添加JS文件
        this.addJSFile();

        // 使用easyUI框架加载datagrid
        this.load();

        // 给页面绑定交互功能
        this.bind();
    },
    changeDom: function() {
        // 给input的data-options属性添加",searcher:newTable.doSearch"属性值
        // 达到给input绑定处理程序的目的
        var $input = $("#searchBox input.easyui-searchbox").first(),
            dataOptions = $input.attr("data-options");

        $input = $("#searchBox input.easyui-searchbox").first();
        dataOptions = $input.attr("data-options");
        dataOptions += (",searcher:" + this.instanceName + ".doSearch");
        $input.attr("data-options", dataOptions); 
    },
    addJSFile: function() {
        // 手动加载需要延迟加载的JS文件
        var $script = $("script"),
            str = "<script src='../../common/easyUI/jquery.easyui.min.js'></script><br />" +
                  "<script src='../../common/js/fenixValidateByJQuery.js'></script>";

        $script.last().before(str);
    },
    load: function() {
        $("#datagrid").datagrid(this.loadPara);
    },
    bind: function() {
        var _this = this;
        // 给表格菜单栏绑定功能
        $("#toolbar").bind("click", function(event) {
            var $targetA = $(event.target).parents().andSelf().filter("a"),         // 获得事件目标所在的a元素（包括事件目标就是a元素）
                $targetText = $targetA.text().trim();                   // 获得目标a元素的去除空格后的文本内容

            if ($targetText === "添加行") {
                _this.addRow($targetA);
            } else if ($targetText === "删除选中行") {
                _this.removeRows($targetA);
            } else if ($targetText === "修改行") {
                _this.editRow($targetA);
            } else if ($targetText === "重新加载表格") {
                _this.reloadTable();
            } else if ($targetText === "查看详情") {
                _this.showDetails($targetA);
            }
            
            return false;
        });

        // 表单页面的按钮绑定函数
        $("#infoSubmit").bind("click", function(event) {
            var $targetA = $(event.target).parents().andSelf().filter("a"),         // 获得事件目标所在的a元素（包括事件目标就是a元素）
                $targetText = $targetA.text().trim();                   // 获得目标a元素的去除空格后的文本内容

            if ($targetText === "保存") {
                _this.save();
            }else if ($targetText === "放弃编辑并关闭窗口") {
                _this.closeDialog();
            }

            return false;
        });

    },
    addRow: function() {
        var url = this.opts.addUrl; // 获得a元素的href

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
    },
    removeRows: function() {
        var rows = $("#datagrid").datagrid("getSelections"),
            url = this.opts.removeUrl,
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
    },
    editRow: function() {
        var rows = $("#datagrid").datagrid("getSelections"),
            url = this.opts.editUrl,
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
    },
    reloadTable: function() {
        $("#datagrid").datagrid("reload");
        // 弹窗通知更新成功
    },
    showDetails: function() {
        // 获取被选择的行，后面用来获取主键，然后查找对应的详细信息
        var _row = $('#datagrid').datagrid('getSelected'),
            url = this.opts.detailUrl,      //拼接url以及参数
            str;                            //拼接出来的字符串，用来在标签行添加标签

        // 如果存在被选择的行跳转到对应页面，否则弹窗提醒
        if (_row) {
            // var rowIndex=$('#datagrid').datagrid('getRowIndex',_row)+1;
            // alert('行号:'+rowIndex);
            url += "?orderNo="+_row.orderNo+"&productName="+_row.productName;
            
            // 下面三句可以将新打开的页面添加进入菜单中（临时）
            // var str = $("<a href='details/demo.html'><i class='icon-font'>&#xe610;</i><span>订单进度详情</span></a>");
            // var $parent=$(window.top.$(".menu-item-child")[0]);
            // $parent.append(str);//可以直接在父页面中添加菜单列
            

            // 将对应页面在框架中打开
            var str = $("<a href="+url+"><span>查看详情</span></a>");

            window.top.addIframe(str);
        }else{
            alert("请先选择需要查看的数据！");
        }
    },
    save: function() {
        //定义提交表单的回调函数
        $.ajax({
            url: $("#dlg").dialog("options")["queryParams"].url,    //配置表单提交的URL
            type: "POST",
            data: $("#fm").serialize(),             // 序列化表单
            dataType: "json",
            beforeSend: function(){
                var result = $("#fm").form("validate"); // 表单验证结果
                if (!result) {
                    $.messager.show({
                        title: "表单验证错误",
                        msg: "数据未能提交，请检查您的输入是否无误"
                    });
                }
                return result;  // 返回验证结果，验证通过才会提交表单
            },
            success: function(data, textStatus){    // 表单提交成功的回调函数
                if (data.status !== 200) {
                    $.messager.show({
                        title: "发生了一个错误",
                        msg: data.msg
                    });
                }else{
                    $("#dlg").dialog("close");          //关闭弹窗
                    $("#datagrid").datagrid("reload");  //更新表格
                    $.messager.show({
                        title: "更新成功",
                        msg: "数据修改成功，并且重新加载表格数据"
                    });
                    //如果FENIX.INFO.rows已经被赋值了，刷新为最新的表格
                    if (FENIX.INFO.rows) {
                        FENIX.INFO.rows = null;
                    };
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                   console.log(jqXHR, textStatus, errorThrown);
                } 
        });
    },
    closeDialog: function() {
        $("#dlg").dialog("close");
        return false;
    },
    doSearch: function(value, name) {   // 具体调用方法被easyUI封装，此处需传入键值作为参数
        var rows_info = this.rows || $("#datagrid").datagrid("getRows"),
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
            this.rows = rows_info;
        } else {
            $("#datagrid").datagrid("loadData",rows_info);
            alert("请输入正确的参数！")
        } 
    }
};
