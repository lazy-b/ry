// 后端返回的信息格式例子：
// {
//     status:200,     //返回操作状态
//     msg:msg,        //返回提示信息
//     data:null       //返回数据
// }

// 命名空间FENIX在fenixCommon.js文件定义
// 依赖于fenixCommon.js文件
// 创建命名空间FENIX.INFO
FENIX.namespace("INFO");

// 初始化全局变量
FENIX.INFO.rows = null;

FENIX.INFO.addListener = function addListener() {
    var toolbar = FENIX.getById("toolbar"); // 获得菜单元素

    FENIX.addHandler(toolbar, "click", function(event) {
        var event = event || window.event,
            eventTag = event.srcElement || event.target,
            aList = toolbar.getElementsByTagName("a"); 

        console.log(eventTag.innerHTML);

        if (eventTag == aList[0]) {
            console.log(0);
        } else if (eventTag == aList[1]) {
            console.log(1);
        } else if (eventTag == aList[2]) {
            console.log(2);
        } else if (eventTag == aList[3]) {
            console.log(3);
        } else if (eventTag == aList[4]) {
            console.log(4);
        }

        FENIX.preventDefault(event);
    });

};

// 打开新增行的表单
FENIX.INFO.addRow = function() {

    var url = FENIX.INFO.saveUrl;
    console.log(this);//test

    //部分样式必须使用js定义，剩下部分在dialog-layout类中定义
    $("#dlg").dialog({
        top: 20,//单位为px
        modal: true,
        resizable:true,
        cls:"dialog-layout",//新增类，控制弹窗的部分样式
        queryParams: {//传递两个参数给表单
                url: url,
                id: null
        }
    }).dialog("hcenter");
    $("#ftitle").html("新增信息");
    $("#dlg").dialog("open").dialog("setTitle","新增信息");
    $("#fm").form("clear");
    return false;
}

// 根据选择行的id集合删除一条记录或者多条记录
FENIX.INFO.removeRows = function() {

    console.log(this);//test

    var rows = $("#datagrid").datagrid("getSelections"),
        url = FENIX.INFO.destroyUrl,        idArr=[], ids,
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

    return false;
}

// 打开修改行的表单
FENIX.INFO.editRow = function() {
	var rows = $("#datagrid").datagrid("getSelections"),
		url = FENIX.INFO.updateUrl,
		remind_message;//提示信息
console.log(this);//test
	//定义打开会话窗口函数
	function openDialog(rows){
		$("#ftitle").html("编辑信息");
		$("#dlg").dialog({
			top: 20,//单位为px
            modal: true,
            resizable:true,
            cls:"dialog-layout",//新增类，控制弹窗的部分样式
			queryParams: {//传递两个参数给表单
				url: url,
				id: rows[0].id
			}
		}).dialog("hcenter");
		$("#dlg").dialog("open").dialog("setTitle","编辑信息");
		$("#fm").form("load",rows[0]);
	}

	//如果用户选择了一条以上记录，提示用户，如果用户仍然需要修改，则修改选中的第一条记录
	if (rows.length > 1) {
		remind_message = "您选择了&nbsp;"+rows.length+"&nbsp;条数据！本次操作只能修改第一条数据："+
						"<br><p style='text-indent:2em'>订单号："+
						rows[0].orderNo+"，产品名称："+rows[0].productName+
						"的数据。</p><p style='text-indent:4em'>您确定需要继续进行操作嘛？</p>";
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

    return false;
}

// 保存表单记录（新增的记录或者被修改后的记录）
FENIX.INFO.save = function() {
console.log(this);//test
    // $("#fm").submit();

    //定义提交表单的回调函数
    $("#fm").form("submit",{
        url: $("#dlg").dialog("options")["queryParams"].url,//设置表单提交的URL
        dataType:"json",
        onSubmit: function(param){//验证表单，验证通过才会提交表单
            param.id = $("#dlg").dialog("options")["queryParams"].id;
            return $(this).form("validate");
        },
        success: function(data, success){//表单提交成功的回调函数
            var data = eval("("+data+")");
            console.log(data);

            if (result.status !== 200) {
                $.messager.show({
                    title: "发生了一个错误",
                    msg: result.msg
                });
            }else{
                $("#dlg").dialog("close");//关闭弹窗
                $("#datagrid").datagrid("reload");//更新表格
				
				//如果FENIX.INFO.rows已经被赋值了，刷新为最新的表格
				if (FENIX.INFO.rows) {
					FENIX.INFO.rows = null;
				};
            }
        }
    });

    return false;
} 

// 重新从后台加载表格
FENIX.INFO.reloadTable = function() {
    $("#datagrid").datagrid("reload");

    return false;
}

// 前台搜索逻辑，不再从后台重新获取数据
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

// 跳转到订单进度页面
FENIX.INFO.showDetails = function() {

    // 获取被选择的行，后面用来获取主键，然后查找对应的详细信息
    var _row = $('#datagrid').datagrid('getSelected'),
        url,//拼接url以及参数
        str;//拼接出来的字符串，用来在标签行添加标签

    // 如果存在被选择的行跳转到对应页面，否则弹窗提醒
    if (_row) {
        // var rowIndex=$('#datagrid').datagrid('getRowIndex',_row)+1;
        // alert('行号:'+rowIndex);
        url = "details/detailTest.html?orderNo="+_row.orderNo+"&productName="+_row.productName;
        
        // 下面三句可以将新打开的页面添加进入菜单中（临时）
        // var str = $("<a href='details/demo.html'><i class='icon-font'>&#xe610;</i><span>订单进度详情</span></a>");
        // var $parent=$(window.top.$(".menu-item-child")[0]);
        // $parent.append(str);//可以直接在父页面中添加菜单列
        

        // 将对应页面在框架中打开
        var str = $("<a href="+url+"><span>订单进度详情</span></a>");

        window.top.addIframe(str);
    }else{
        alert("请先选择需要查看的数据！");
    }
}


FENIX.addLoadEvent(FENIX.INFO.addListener);

$(document).ready(function() {

});