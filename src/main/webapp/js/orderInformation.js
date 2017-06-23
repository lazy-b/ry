/*命名空间FENIX在namespace.js文件定义*/
/*创建命名空间FENIX.INFO.orderInfo*/
FENIX.namespace("INFO.orderInfo");

/*初始化全局变量*/
FENIX.INFO.orderInfo = {
    saveUrl: "../../order/insert.do",
    updateUrl: "../../order/update.do",
    destroyUrl: "../../order/delete.do",
    rows: null
}

/*打开新增行的表单*/
function addRow() {

    var url = FENIX.INFO.orderInfo.saveUrl;

    $("#dlg").dialog({
        top: "10px",
        modal: true,
        queryParams: {//传递两个参数给表单
                url: url,
                id: null
            }
    });
    $("#ftitle").html("新增信息");
    $("#dlg").dialog("open").dialog("setTitle","新增信息").hcenter();
    $("#fm").form("clear");
}

/*根据选择行的id删除一条记录*/
function removeRows() {

    var rows = $("#datagrid").datagrid("getSelections"),
        url = FENIX.INFO.orderInfo.destroyUrl,
        a;

    //var ids=[];
    if (rows) {
        a = rows[0].id;
        /*for (var i=0;i<rows.length;i++){
            ids.push(rows[i][id]);
        }*/
        $.messager.confirm("警告！", "你确定需要删除选中的"+rows.length+"条记录嘛？", function(r){

            if (r) {
                $.post(url, {id: a}, function(result){

                    if (result.status === 200) {
                        $("#datagrid").datagrid("reload");//删除成功则刷新表格
                    } else {
                        $.messager.show({
                            title: "删除失败！",
                            msg: result.errorMsg
                        });
                    }
                }, "json");
            }
        });
    }else{
        alert("请选择一条需要删除的数据！");
    }
}

/*打开修改行的表单*/
function editRow() {
            var row = $("#datagrid").datagrid("getSelected"),
                url = FENIX.INFO.orderInfo.updateUrl;

            if (row) {
                $("#ftitle").html("编辑信息");
                $("#dlg").dialog({
                    top:"10px",
                    modal:true,
                    queryParams: {//传递两个参数给表单
                        url: url,
                        id: row.id
                    }
                });
                $("#dlg").dialog("open").dialog("setTitle","编辑信息");
                $("#fm").form("load",row);
            }else{
                alert("请选择一条需要修改的数据！");
            }
        }

/*保存表单记录（新增的记录或者被修改后的记录）*/
function save() {

    //定义提交表单的回调函数
    $("#fm").form("submit",{
        url: $("#dlg").dialog("options")["queryParams"].url,//设置表单提交的URL
        onSubmit: function(param){//验证表单，验证通过才会提交表单
            param.id = $("#dlg").dialog("options")["queryParams"].id;
            return $(this).form("validate");
        },
        success: function(result){//表单提交成功的回调函数
            var result = eval("("+result+")");

            if (result.errorMsg) {
                $.messager.show({
                    title: "发生了一个错误",
                    msg: result.errorMsg
                });
            }else{
                $("#dlg").dialog("close");//关闭弹窗
                $("#datagrid").datagrid("reload");//更新表格
            }
        }
    });
} 

/*重新从后台加载表格*/
function reloadTable() {$("#datagrid").datagrid("reload");}

/*前台搜索逻辑，不再从后台重新获取数据*/
function doSearch(value, name) {
    var rows_info = FENIX.INFO.orderInfo.rows || $("#datagrid").datagrid("getRows"),
        resultRows = [],
        reload = false;

    if (value != "") {
        for (var i = 0;i < rows_info.length;i++) {
            if (rows_info[i][name] == value) {
                resultRows.push(rows_info[i]);
            }
        }
    }
    if (resultRows.length>0 && resultRows.length<=rows_info.length) {
        reload = true;
    }
    if (reload) {
        $("#datagrid").datagrid("loadData",resultRows);
        FENIX.INFO.orderInfo.rows = rows_info;
    } else {
        $("#datagrid").datagrid("loadData",rows_info);
        alert("请输入正确的参数！")
    } 
}

/*跳转到订单进度页面*/
function showDetails() {

    /*获取被选择的行，后面用来获取主键，然后查找对应的详细信息*/
    var _row = $('#datagrid').datagrid('getSelected'),
        url,//拼接url以及参数
        str;//拼接出来的字符串，用来在标签行添加标签

    /*如果存在被选择的行跳转到对应页面，否则弹窗提醒*/
    if (_row) {
        /*var rowIndex=$('#datagrid').datagrid('getRowIndex',_row)+1;
        alert('行号:'+rowIndex);*/
        url = "details/detailTest.html?id="+_row.id+"&productName="+_row.productName;
        /*
            下面三句可以将新打开的页面添加进入菜单中（临时）
            var str = $("<a href='details/demo.html'><i class='icon-font'>&#xe610;</i><span>订单进度详情</span></a>");
            var $parent=$(window.top.$(".menu-item-child")[0]);
            $parent.append(str);//可以直接在父页面中添加菜单列
        */

        /*将对应页面在框架中打开*/
        var str = $("<a href="+url+"><span>订单进度详情</span></a>");

        window.top.addIframe(str);
    }else{
        alert("请先选择需要查看的数据！");
    }
}