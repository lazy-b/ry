/**
 * 展示数据表格封装类
 * @param {obj} loadParameter  easyUI加载datagrid需要的初始化参数，必须
 * @param {obj} otherParameter 对数据增删改查的url或页面的iframeId，必须
 * @param {string} instanceName  由于easyUI封装的原因，需要暴露出来的供搜索按钮调用的函数名
 *                               此处传入实际页面上写死的函数名，必须
 */
FENIX.Table = function Table(loadParameter, otherParameter, instanceName) {
    this.loadPara = loadParameter;
    this.opts = otherParameter; 
    this.instanceName = instanceName;
    this.rows = [];                 // 保存表格数据
}
FENIX.Table.prototype = {
    initalize: function() {

        // 增加遮罩层，并同时添加事件监听函数，待ajax请求结束删除遮罩层。
        // this.addMask();

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

        // 展示内容
        this.show();
    },
    addMask: function() {   // 增加遮罩层
        var mask = $("<div class='mask'><p>数据加载中，请稍后、、、</p></div>"),
            _this = this;

        $("body").append(mask);   
    },
    show: function() {
        var $mask = $(".mask");

        // 添加ajaxStop事件一次性监听函数，
        // 该函数从jQuery 1.8之后只能绑定在$(document)上
        $(document).one("ajaxStop", function() {
            $mask.remove();
        });
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
        var $tab = window.top.$(".content-tab"),    // 调用顶层框架 window.top的jQuery
            $iframe = window.top.$(".body-iframe"),
            dataId = this.opts.targetIframeId,
            _row = $('#datagrid').datagrid('getSelected'),  // 获取被选择的行，后面用来获取主键，然后查找对应的详细信息
            para;                            //拼接出来的查询参数
            // iframeName;             // 目标框架iframe的name，暂时没用

        // 如果存在被选择的行跳转到对应页面，否则弹窗提醒
        if (_row) {
            // 展示详情页以及对应tab并隐藏其他页面以及对应tab
            $tab.each(function() {
                if($(this).data("id") == dataId) {
                    $(this).addClass("active").siblings(".content-tab").removeClass("active");
                }
            });
            $iframe.each(function() {
                // 找到目标iframe
                if ($(this).data("id") == dataId) {
                    // iframeName = "iframe" + $(this).data("index");
                    // 调用该页面的方法发起一次ajax请求
                    window.top.frames[0].FENIX.STATE.ORDER.getStateDetails(_row.orderNo, _row.productName);
                    // 同时为了显示效果，将对应输入框中填入参数
                    window.top.frames[0].FENIX.getById("orderNo").value = _row.orderNo;
                    window.top.frames[0].FENIX.getById("productName").value = _row.productName;
                    // var rowIndex=$('#datagrid').datagrid('getRowIndex',_row)+1;
                    // alert('行号:'+rowIndex);
                    // 拼接发起ajax需要的参数
                    // para += "?orderNo="+_row.orderNo+"&productName="+_row.productName;

                    $(this).show().siblings(".body-iframe").hide();
                }
            });
            
        }else{
            alert("请先选择需要查看的数据！");
        }
    },
    save: function() {
        var _this = this;
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
                    //如果_this.rows已经被赋值了，刷新为最新的表格
                    if (_this.rows) {
                        _this.rows = null;
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

/**
 * 输入框自动完成封装类 
 * @param {obj} para 初始化参数对象
 * para.target：需要绑定自动完成的jQuery对象，必须
 * para.msgList：自动完成的备选列表，一个数组类型，必须
 * para.ignoreCase：自动完成筛选过程是否忽略大小写，可选，默认忽略
 */
FENIX.Tips = function Tips(para) {
    this.target = para.target;
    this.list = para.msgList;    // 展示的列表项
    this.cache = para.msgList;   // 请求一次之后就将结果缓存起来
    this.ignoreCase = !!para.ignoreCase; // 是否忽略大小写，默认不忽略（传入真值则忽略）
    this.dropDown = null;     // 整个列表
    this.first = true;      // 是否第一次聚焦在该输入框
    this.KEY_CODE = {
        up: 38,     // 上
        down: 40,   // 下
        enter: 13,   // 回车
        tab: 9,     // table键
        backspace: 8    // 后退键
    }
};
FENIX.Tips.prototype = {
    init: function() {
        // 绑定事件
        this.bindTarget();
    },
    bindTarget: function() {
        var _this = this;
        // 绑定目标输入框的聚焦事件
        this.target.on({
            focus: function() {
                if (_this.first) {
                    // 生成父元素
                    _this.createDiv();
                    // 添加列表子元素
                    _this.appendUl();
                    // 绑定交互事件
                    _this.bind();
                    // 设置目标输入框样式
                    _this.setInputStyle();
                    // 设置标识，标识已经被加载过
                    _this.first = false;
                }

                // 如果被列表被隐藏才需要展示并定位
                if (!_this.dropDown.is(":visible")){
                    // 先展示下拉列表然后再定位，反过来会导致定位出问题
                    _this.show();
                    // 正确定位列表父元素
                    _this.location();
                }
            },
            keyup: function(event) {
                var key = event.which,      // 事件的键值
                    keycode = _this.KEY_CODE,
                    val = _this.target.val(),
                    list;   // 存放列表数据的数组

                // 如果按的是后退键或者输入框中没有了数据
                // 则将备选列表重置为缓存数据 
                if (key == keycode.backspace || !val) {
                    _this.list = _this.cache;
                }

                list = _this.list;

                // 在外部做是否转换大小写判断避免在迭代内部做判断
                if (_this.ignoreCase) {
                    val = val.toLowerCase();
                    list = list.filter(function(item) {
                                // 使用"" + item转换为字符串
                                return ("" + item).toLowerCase().indexOf(val) != -1;
                            });
                } else {
                    list = list.filter(function(item) {
                                // 使用"" + item转换为字符串
                                return ("" + item).indexOf(val) != -1;
                            });
                }
                _this.list = list;
                _this.appendUl();
            }
        });
    },
    setInputStyle: function() {
        var val = this.target.val() ? this.target.val() :
            this.dropDown.find("li").first().text();
        this.target.attr({
            autocomplete: "off",
            disableautocomplete: true
        });
        this.target.val(val);
    },
    bind: function() {
        var _this = this;
        this.dropDown.on({
            click: function() {
                var val = $(this).text();
                // 将兄弟节点中类名为sel的节点的sel类名移除
                $(this).siblings().filter(".sel").removeClass("sel");
                $(this).addClass("sel");
                _this.target.val(val);
            },
            mouseenter: function() {
                $(this).siblings().removeClass("fo");
                $(this).addClass("fo");
            },
            mouseleave: function() {
                $(this).removeClass("fo");
            }
        }, "li");
        this.target.on("keydown", function(event) {
            var key = event.which,
                keycode = _this.KEY_CODE,
                $chosen = _this.dropDown.find(".fo").length != 0 ?
                          _this.dropDown.find(".fo") : _this.dropDown.find(".sel");    // 被选中的元素

            if (key == keycode.up && $chosen.prev().length != 0) {
                $chosen.removeClass("fo");
                $chosen.prev().addClass("fo");
                return false;
            } else if ((key == keycode.down || key == keycode.tab) && $chosen.next().length != 0) {
                $chosen.removeClass("fo");
                $chosen.next().addClass("fo");
                return false;
            } else if(key == keycode.enter) {
                $chosen.siblings().removeClass("sel");
                $chosen.addClass("sel");
                _this.target.val($chosen.text());
                return false;
            }
        });
        $(document).on({
            click: function(event) {
                var target = event.target,
                    input = _this.target.get(0),
                    dropDown = _this.dropDown.get(0);
                // 如果点击的是目标或者下拉列表区域，则直接退出
                while(target) {
                    // 循环判断至根节点
                    if (target == input || target == dropDown) {
                        return;
                    }
                    target = target.parentNode;
                }
                // 点击的不是目标元素或其子元素,隐藏下拉列表
                _this.hide();
            }
        });
    },
    createDiv: function() {
        this.dropDown = $("<div class='lazy-drop-down hidden'></div>");
    },
    appendUl: function() {
        var listArr = [],   // 用数组实现字符串连接
            list = this.list,
            len = list.length,
            str, i;

        this.dropDown.empty();

        listArr.push("</ul>");
        for(i = len; i--; /*无循环体*/) {
            listArr.push("</li>");
            listArr.push(list[i]);
            if(i) {
                listArr.push("<li>");
            } else {
                listArr.push("<li class='sel'>");
            }
        }
        listArr.push("<ul>");
        listArr.reverse();
        // 连接字符串
        str = listArr.join("");
        this.dropDown.append(str);
    },
    change: function() {
        var inputText, list = this.list,
        inputText = this.target.text();

        // 如果输入框有数据，则根据输入框的数据进行筛选
        // 如果输入框没有数据，则将缓存数据（原始数据）输出
        this.list = inputText ? list.filter(function(item) {
            return item.indexOf(inputText) != -1;
        }) : this.cache;
    },
    location: function() {
        var $dropDown = this.dropDown,
            $tar = this.target,
            $tarLeft = $tar.offset().left,
            $tarWidth = $tar.innerWidth();

        this.target.after($dropDown);
        $dropDown.offset({left: $tarLeft});
        $dropDown.css({width: $tarWidth});
    },
    show: function() {
        this.dropDown.slideDown(200);
    },
    hide: function() {
        this.dropDown.slideUp(200);
    }
};

/**
 * 此方法依赖于上面的FENIX.Tips类
 * 给目标jQuery对象添加自动完成下列列表的函数
 * @param  {jQuery对象} $targetList 目标对象
 * @param  {二维数组 } msgList      对应对象需要显示的备选值
 * @return {undefined}              无返回值
 */
FENIX.bindAutoComplete = function bindAutoComplete($targetList, msgList) {
    var len = $targetList.length,
        para,   // 初始化自动完成列表的参数
        tip,    // Tips的实例
        i;

    // 循环初始化
    for(i = len; i--; /*空语句*/) {
        para = {
            target: $targetList.eq(j),
            msgList: msgList[j],
            ignoreCase: true
        }
        tip = new FENIX.Tips(para);
        tip.init();
    }
};