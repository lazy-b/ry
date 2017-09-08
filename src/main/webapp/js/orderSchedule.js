$(function() {
    var showDetails, initTable, bindFunction;        // 定义一些需要用到的函数        

    // 初始化函数
    initTable = function() {
        $("#datagrid").datagrid({
                url:$("#datagrid").attr("data-info"),//将url存放在data属性中
                toolbar: "#toolbar",
                fit: true,//表格宽度自适应，不设置默认为false（对于长表格最好设置为true，否则使用体验很差）
                //fitColumns: true,//列宽度自适应，设置为true后设置的固定宽度不起作用
                autoRowHeight: false,//设为true则基于该行内容设置行高度，同时降低加载
                striped: true,//设为true则奇偶行使用不同背景色
                nowrap: true,//设置为true，把数据显示在一行，可提高加载性能
                loadMsg: "加载中、、、、",//从远程加载数据时，显示的提示信息
                pagination: false,//底部分页栏
                rownumbers: true,//显示行号

                columns: [[
                    {field: "ck",checkbox: true},
                    {field: "orderNo",title: "订单号",width: 100,align: "center"},
                    {field: "productName",title: "产品名称",width: 80,align: "center"},
                    {field: "orderAmount",title: "订单数量",width: 50,align: "center"},
                    {field: "stockAmount",title: "库存",width: 40,align: "center"},
                    {field: "spareParts",title: "备品",width: 40,align: "center"},
                    {field: "planAmount",title: "需生产数",width: 60,fontsize: 20,align: "center"},
                    {field: "orderDate",title: "下单日期",width: 80,align: "center"},
                    {field: "requiredDate",title: "要求交货日期",width: 80,align: "center"},
                    {field: "replyDate",title: "交期",width: 180,align: "center"},
                    {field: "purchaseRequirement",title: "特别要求",width: 180,align: "center"},
                    {field: "materialCoding",title: "物料长代码",width: 100,align: "center"},                
                    {field: "materialModel",title: "规格型号",width: 50,width: 80,height: 30,align: "center"}, 
                    {field: "orderStatus",title: "生产状态",width: 50,align: "center"},
                    {field: "remark",title: "备注",width: 80,align: "center"},
                    {field: "exceptionReason",title: "异常原因",width: 80,align: "center"},
                    {field: "-----",title: "交货结果",width: 80,align: "center"},
                    {field: "orderType",title: "订单类型",width: 50,align: "center"},
                    {field: "price",title: "单价",width: 40,align: "center"},
                    {field: "id",title: "表id",width: 80,align: "center",hidden:true}
                ]]
            });
    }

    // 给菜单栏添加功能，根据菜单文字进行操作的判断
    bindFunction = function bindFunction() {
        
        // 给表格菜单栏绑定功能
        $("#toolbar").bind("click", function(event) {
            var $targetA = $(event.target).parents().andSelf().filter("a"),         // 获得事件目标所在的a元素（包括事件目标就是a元素）
                $targetText = $targetA.text().trim();                   // 获得目标a元素的去除空格后的文本内容

            if ($targetText === "添加行") {
                FENIX.INFO.addRow($targetA);
            }else if ($targetText === "删除选中行") {
                FENIX.INFO.removeRows($targetA);
            }else if ($targetText === "修改行") {
                FENIX.INFO.editRow($targetA);
            }else if ($targetText === "重新加载表格") {
                FENIX.INFO.reloadTable();
            }else if ($targetText === "查看订单进度") {
                showDetails($targetA);
            }
            
            return false;
        });

        // 表单页面的按钮绑定函数
        $("#infoSubmit").bind("click", function(event) {
            var $targetA = $(event.target).parents().andSelf().filter("a"),         // 获得事件目标所在的a元素（包括事件目标就是a元素）
                $targetText = $targetA.text().trim();                   // 获得目标a元素的去除空格后的文本内容

            if ($targetText === "保存") {
                FENIX.INFO.save();
            }else if ($targetText === "放弃编辑并关闭窗口") {
                FENIX.INFO.closeDialog();
            }

            return false;
        });
    }

    // 跳转到订单进度页面
    showDetails = function showDetails($target) {
        // 获取被选择的行，后面用来获取主键，然后查找对应的详细信息
        var _row = $('#datagrid').datagrid('getSelected'),
            url = $target.attr("href"),     //拼接url以及参数
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
            var str = $("<a href="+url+"><span>订单进度详情</span></a>");

            window.top.addIframe(str);
        }else{
            alert("请先选择需要查看的数据！");
        }
    }

    initTable();       // 页面结构加载完毕就加载表格   
   
    bindFunction();    // 给菜单栏添加功能

});

