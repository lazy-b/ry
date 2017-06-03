/*左侧菜单点击*/
/*利用委托机制。事件绑定在.side-menu上，当在菜单栏任意位置点击时，遇到了选择器'li a'匹配的元素，则触发回调函数。*/
/*此'li a'匹配的元素由两种，主菜单和次级菜单*/
$(".side-menu").on('click', 'li a', function(e) {
	/*设定动画速度*/
	var animationSpeed = 300;
	var $this = $(this);
	/*选择当前节点的下一个兄弟节点的集合*/
	var checkElement = $this.next();
	
	/*主菜单的单击回调处理开始*/
	/*判断是否为主菜单被单击*/
	/*checkElement为子菜单ul且子菜单可见*/
	if (checkElement.is('.menu-item-child') && checkElement.is(':visible')) {
		/*关闭子菜单，并触发一个回调函数移除menu-open类*/
	  checkElement.slideUp(animationSpeed, function() {
		checkElement.removeClass('menu-open');
	  });
	  /*移除该链接的active类标识，重新设为未激活状态*/
	  checkElement.parent("li").removeClass("active");
	}
	/*checkElement为子菜单ul且子菜单不可见*/
	/*首先关闭已打开的主节点（如果有的话），然后打开该主节点*/
	else if ((checkElement.is('.menu-item-child')) && (!checkElement.is(':visible'))) {
	  //获取上级菜单（ul）
	  var parent = $this.parents('ul').first();
	  //从父级开始找所有打开的主节点（如果有的话）并关闭
	  var ul = parent.find('ul:visible').slideUp(animationSpeed);
	  //在父级中移除menu-open标记
	  ul.removeClass('menu-open');
	  //获取该菜单的父级（li）
	  var parent_li = $this.parent("li");
	  //打开该菜单的次级菜单，并添加menu-open标记
	  checkElement.slideDown(animationSpeed, function() {
		//给次级菜单添加menu-open类作为标记
		checkElement.addClass('menu-open');
		//删除其他主节点的active类（如果有的话）
		parent.find('li.active').removeClass('active');
		//给该主菜单所在li添加active类。
		parent_li.addClass('active');
	  });
	}
	//取消事件的默认动作
	//防止主节点链接跳转
	e.preventDefault();
	/*主菜单的单击回调处理结束*/

	/*子菜单的单击回调处理开始*/
	/*将菜单加入框架中*/
	addIframe($this);
	/*子菜单的单击回调处理结束*/
});

/*添加iframe*/
function addIframe(cur){
	var $this = cur;
	/*背景：在该框架中，tab中的元素href设置为"JavaScript:;‘,而data-id设置为url*/
	var h = $this.attr("href"),
		m = $this.data("index"),
		label = $this.find("span").text(),
		isHas = false;
		/*如果href的值为空或者去除空格后的长度为零（地址为空），返回false*/
	if (h == "" || $.trim(h).length == 0) {
		return false;
	}
	/*获取窗口的宽度*/
	var fullWidth = $(window).width();
	/*根据窗口宽度的大小决定是否显示侧边栏*/
	if(fullWidth >= 750){
		$(".layout-side").show();
	}else{
		$(".layout-side").hide();
	}
	/*找到所有的tab（标签）进行遍历（查找是否该页面已经被打开过）*/
	$(".content-tab").each(function() {
		/*如果该tab标签的data-id值为h（传入cur的href值）（证明该页面已经被打开过，则只需将该页面的tab添加active类标记）*/
		if ($(this).data("id") == h) {
			/*如果没有active类标记*/
			if (!$(this).hasClass("active")) {
				/*给该tab标签加上active类标记并移除其他标签的active标记*/
				$(this).addClass("active").siblings(".content-tab").removeClass("active");
				
				addTab(this);
			}
			isHas = true;
		}
	});
	/*如果存在该页面对应的标签，即该页面已存在，则直接显示该标签对应的内容并隐藏已显示的内容*/
	if(isHas){
		$(".body-iframe").each(function() {
			if ($(this).data("id") == h) {
				$(this).show().siblings(".body-iframe").hide();
			}
		});
	}
	/*如果该页面是第一次打开，则新建该页面对应tab标签同时新建iframe展示对应内容*/
	if (!isHas) {
		var tab = "<a href='javascript:;' class='content-tab active' data-id='"+h+"'>"+ label +" <i class='icon-font'>&#xe617;</i></a>";
		$(".content-tab").removeClass("active");
		$(".tab-nav-content").append(tab);
		var iframe = "<iframe class='body-iframe' name='iframe"+ m +"' width='100%' height='100%' src='"+ h +"' frameborder='0' data-id='"+ h +"' seamless></iframe>";
		$(".layout-main-body").find("iframe.body-iframe").hide().parents(".layout-main-body").append(iframe);
		/**/
		addTab($(".content-tab.active"));
	}
	return false;
}


/*添加tab*/
function addTab(cur) {
	/*获得传入元素的所有前面的同胞元素的宽度*/
	var prev_all = tabWidth($(cur).prevAll()),
	/*获得传入元素的所有后面的同胞元素的宽度*/
		next_all = tabWidth($(cur).nextAll());
		/*除了标签之外的宽度（两个前进后退符号的宽度）*/
	var other_width = tabWidth($(".layout-main-tab").children().not(".tab-nav"));
	/*标签栏的外宽度（包括外边距）减去两个符号的宽度，即标签栏的可视宽度*/
	var navWidth = $(".layout-main-tab").outerWidth(true)-other_width;//tab标签所处导航栏可视宽度
	/*下面实现当tab标签数量太多时对当前标签的前面或后面进行部分隐藏的效果*/
	/*（实现效果其实不人性化）*/
	var hidewidth = 0;
	if ($(".tab-nav-content").width() < navWidth) {
		hidewidth = 0
	} else {
		if (next_all <= (navWidth - $(cur).outerWidth(true) - $(cur).next().outerWidth(true))) {
			if ((navWidth - $(cur).next().outerWidth(true)) > next_all) {
				hidewidth = prev_all;
				var m = cur;
				while ((hidewidth - $(m).outerWidth()) > ($(".tab-nav-content").outerWidth() - navWidth)) {
					hidewidth -= $(m).prev().outerWidth();
					m = $(m).prev()
				}
			}
		} else {
			if (prev_all > (navWidth - $(cur).outerWidth(true) - $(cur).prev().outerWidth(true))) {
				hidewidth = prev_all - $(cur).prev().outerWidth(true)
			}
		}
	}
	$(".tab-nav-content").animate({
		marginLeft: 0 - hidewidth + "px"
	},
	"fast")
}

/*获取tab标签的总宽度*/
function tabWidth(tabarr) {
	var allwidth = 0;
	$(tabarr).each(function() {
		allwidth += $(this).outerWidth(true)
	});
	return allwidth;
}

/*左按钮事件，如果左边有隐藏选项卡，定位到第一个选项卡*/
$(".btn-left").on("click", leftBtnFun);
/*右按钮事件，如果右边有隐藏选项卡，定位到最后一个选项卡*/
$(".btn-right").on("click", rightBtnFun);
/*选项卡切换事件*/
$(".tab-nav-content").on("click", ".content-tab", navChange);
/*选项卡关闭事件*/
$(".tab-nav-content").on("click", ".content-tab i", closePage);
/*选项卡双击关闭事件*/
$(".tab-nav-content").on("dblclick", ".content-tab", closePage);


/*左按钮方法*/
function leftBtnFun() {
	var ml = Math.abs(parseInt($(".tab-nav-content").css("margin-left")));
	var other_width = tabWidth($(".layout-main-tab").children().not(".tab-nav"));
	var navWidth = $(".layout-main-tab").outerWidth(true)-other_width;//可视宽度
	var hidewidth = 0;
	if ($(".tab-nav-content").width() < navWidth) {
		return false
	} else {
		var tabIndex = $(".content-tab:first");
		var n = 0;
		while ((n + $(tabIndex).outerWidth(true)) <= ml) {
			n += $(tabIndex).outerWidth(true);
			tabIndex = $(tabIndex).next();
		}
		n = 0;
		if (tabWidth($(tabIndex).prevAll()) > navWidth) {
			while ((n + $(tabIndex).outerWidth(true)) < (navWidth) && tabIndex.length > 0) {
				n += $(tabIndex).outerWidth(true);
				tabIndex = $(tabIndex).prev();
			}
			hidewidth = tabWidth($(tabIndex).prevAll());
		}
	}
	$(".tab-nav-content").animate({
		marginLeft: 0 - hidewidth + "px"
	},
	"fast");
}

/*右按钮方法*/
function rightBtnFun() {
	var ml = Math.abs(parseInt($(".tab-nav-content").css("margin-left")));
	var other_width = tabWidth($(".layout-main-tab").children().not(".tab-nav"));
	var navWidth = $(".layout-main-tab").outerWidth(true)-other_width;//可视宽度
	var hidewidth = 0;
	if ($(".tab-nav-content").width() < navWidth) {
		return false
	} else {
		var tabIndex = $(".content-tab:first");
		var n = 0;
		while ((n + $(tabIndex).outerWidth(true)) <= ml) {
			n += $(tabIndex).outerWidth(true);
			tabIndex = $(tabIndex).next();
		}
		n = 0;
		while ((n + $(tabIndex).outerWidth(true)) < (navWidth) && tabIndex.length > 0) {
			n += $(tabIndex).outerWidth(true);
			tabIndex = $(tabIndex).next()
		}
		hidewidth = tabWidth($(tabIndex).prevAll());
		if (hidewidth > 0) {
			$(".tab-nav-content").animate({
				marginLeft: 0 - hidewidth + "px"
			},
			"fast");
		}
	}
}

/*选项卡切换方法*/
function navChange() {
	if (!$(this).hasClass("active")) {
		var k = $(this).data("id");
		$(".body-iframe").each(function() {
			if ($(this).data("id") == k) {
				$(this).show().siblings(".body-iframe").hide();
				return false
			}
		});
		$(this).addClass("active").siblings(".content-tab").removeClass("active");
		addTab(this);
	}
}

/*选项卡关闭方法*/
function closePage() {
	var url = $(this).parents(".content-tab").data("id");
	var cur_width = $(this).parents(".content-tab").width();
	if ($(this).parents(".content-tab").hasClass("active")) {
		if ($(this).parents(".content-tab").next(".content-tab").size()) {
			var next_url = $(this).parents(".content-tab").next(".content-tab:eq(0)").data("id");
			$(this).parents(".content-tab").next(".content-tab:eq(0)").addClass("active");
			$(".body-iframe").each(function() {
				if ($(this).data("id") == next_url) {
					$(this).show().siblings(".body-iframe").hide();
					return false
				}
			});
			var n = parseInt($(".tab-nav-content").css("margin-left"));
			if (n < 0) {
				$(".tab-nav-content").animate({
					marginLeft: (n + cur_width) + "px"
				},
				"fast")
			}
			$(this).parents(".content-tab").remove();
			$(".body-iframe").each(function() {
				if ($(this).data("id") == url) {
					$(this).remove();
					return false
				}
			})
		}
		if ($(this).parents(".content-tab").prev(".content-tab").size()) {
			var prev_url = $(this).parents(".content-tab").prev(".content-tab:last").data("id");
			$(this).parents(".content-tab").prev(".content-tab:last").addClass("active");
			$(".body-iframe").each(function() {
				if ($(this).data("id") == prev_url) {
					$(this).show().siblings(".body-iframe").hide();
					return false
				}
			});
			$(this).parents(".content-tab").remove();
			$(".body-iframe").each(function() {
				if ($(this).data("id") == url) {
					$(this).remove();
					return false
				}
			})
		}
	} else {
		$(this).parents(".content-tab").remove();
		$(".body-iframe").each(function() {
			if ($(this).data("id") == url) {
				$(this).remove();
				return false
			}
		});
		addTab($(".content-tab.active"))
	}
	return false
}


/*循环菜单，将菜单添加到菜单栏，并添加链接*/
function initMenu(menu,parent){
	for(var i=0; i<menu.length; i++){   
		var item = menu[i];
		var str = "";
		try{
			if(item.isHeader == "1"){
				str = "<li class='menu-header'>"+item.name+"</li>";
				$(parent).append(str);
				if(item.childMenus != ""){
					initMenu(item.childMenus,parent);
				}
			}else{
				item.icon == "" ? item.icon = "&#xe610" : item.icon = item.icon;
				if(item.childMenus == ""){
					str = "<li><a href='"+item.url+"'><i class='icon-font'>"+item.icon+"</i><span>"+item.name+"</span></a></li>";
					$(parent).append(str);
				}else{
					str = "<li><a href='"+item.url+"'><i class='icon-font '>"+item.icon+"</i><span>"+item.name+"</span><i class='icon-font icon-right'>&#xe60b;</i></a>";
					str +="<ul class='menu-item-child' id='menu-child-"+item.id+"'></ul></li>";
					$(parent).append(str);
					var childParent = $("#menu-child-"+item.id);
					initMenu(item.childMenus,childParent);
				}
			}
		}catch(e){}
	}
}



/*头部下拉框移入移出*/
$(document).on("mouseenter",".header-bar-nav",function(){
	$(this).addClass("open");
});
$(document).on("mouseleave",".header-bar-nav",function(){
	$(this).removeClass("open");
});

/*左侧菜单展开和关闭按钮事件*/
$(document).on("click",".layout-side-arrow",function(){
	if($(".layout-side").hasClass("close")){
		$(".layout-side").removeClass("close");
		$(".layout-main").removeClass("full-page");
		$(".layout-footer").removeClass("full-page");
		$(this).removeClass("close");
		$(".layout-side-arrow-icon").removeClass("close");
	}else{
		$(".layout-side").addClass("close");
		$(".layout-main").addClass("full-page");
		$(".layout-footer").addClass("full-page");
		$(this).addClass("close");
		$(".layout-side-arrow-icon").addClass("close");
	}
});

/*头部菜单按钮点击事件（对左侧菜单栏进行操作）*/
$(".header-menu-btn").click(function(){
	if($(".layout-side").hasClass("close")){
		$(".layout-side").removeClass("close");
		$(".layout-main").removeClass("full-page");
		$(".layout-footer").removeClass("full-page");
		$(".layout-side-arrow").removeClass("close");
		$(".layout-side-arrow-icon").removeClass("close");
	}else{
		$(".layout-side").addClass("close");
		$(".layout-main").addClass("full-page");
		$(".layout-footer").addClass("full-page");
		$(".layout-side-arrow").addClass("close");
		$(".layout-side-arrow-icon").addClass("close");
	}
});

/*左侧菜单响应式*/
$(window).resize(function() {  
	var width = $(this).width();  
	if(width >= 750){
		$(".layout-side").show();
	}else{
		$(".layout-side").hide();
	}
});

/*皮肤选择*/
$(".dropdown-skin li a").click(function(){
	var v = $(this).attr("data-val");
	var hrefStr=$("#layout-skin").attr("href");
	var hrefRes=hrefStr.substring(0,hrefStr.lastIndexOf('skin/'))+'skin/'+v+'/skin.css';
	$(window.frames.document).contents().find("#layout-skin").attr("href",hrefRes);
	
	setCookie("scclui-skin", v);
});

/*获取cookie中的皮肤*/
function getSkinByCookie(){
	var v = getCookie("scclui-skin");
	var hrefStr=$("#layout-skin").attr("href");
	if(v == null || v == ""){
		v="qingxin";
	}
	if(hrefStr != undefined){
		var hrefRes=hrefStr.substring(0,hrefStr.lastIndexOf('skin/'))+'skin/'+v+'/skin.css';
		$("#skin").attr("href",hrefRes);
	}
}

/*给icon设置随机颜色*/
function getMathColor(){
	var arr = new Array();
	arr[0] = "#ffac13";
	arr[1] = "#83c44e";
	arr[2] = "#2196f3";
	arr[3] = "#e53935";
	arr[4] = "#00c0a5";
	arr[5] = "#16A085";
	arr[6] = "#ee3768";

	var le = $(".menu-item > a").length;
	for(var i=0;i<le;i++){
		var num = Math.round(Math.random()*5+1);
		var color = arr[num-1];
		$(".menu-item > a").eq(i).find("i:first").css("color",color);
	}
}

/*
  初始化加载
*/
$(function(){
	/*获取皮肤*/
	//getSkinByCookie();
	getSkinByCookie;
	/*菜单json*/
	var menu = [{"id":"1","name":"主菜单","parentId":"0","url":"","icon":"","order":"1","isHeader":"1","childMenus":[
					{"id":"10","name":"量产订单管理","parentId":"1","url":"","icon":"&#xe602;","order":"1","isHeader":"0","childMenus":[
						{"id":"11","name":"订单安排管理","parentId":"10","url":"orderManagement/orderInformationTable.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"12","name":"订单进度管理","parentId":"10","url":"orderManagement/productionTrackingTable.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"13","name":"交货信息管理","parentId":"10","url":"orderManagement/deliveryTrackingTable.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"14","name":"原材料信息管理","parentId":"10","url":"orderManagement/rawRecordTable.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"15","name":"生产计划管理","parentId":"10","url":"orderManagement/inventoryQueryTable.html","icon":"","order":"1","isHeader":"0","childMenus":""}
					]},
					{"id":"20","name":"样品订单管理","parentId":"1","url":"","icon":"&#xe602;","order":"1","isHeader":"0","childMenus":[
						{"id":"21","name":"订单安排管理","parentId":"20","url":"orderManagement/orderInformationTable.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"22","name":"订单进度管理","parentId":"20","url":"orderManagement/orderScheduleTable.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"23","name":"交货信息管理","parentId":"20","url":"orderManagement/deliveryTrackingTable.html","icon":"","order":"1","isHeader":"0","childMenus":""}
					]},
					{"id":"30","name":"量产信息采集","parentId":"1","url":"","icon":"&#xe604;","order":"1","isHeader":"0","childMenus":[
						{"id":"31","name":"生产记录采集","parentId":"30","url":"collectionInfo/info.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"32","name":"订单信息采集","parentId":"30","url":"test2.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"33","name":"库存信息采集","parentId":"30","url":"test3.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"34","name":"交货信息采集","parentId":"30","url":"test2.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"35","name":"工艺信息采集","parentId":"30","url":"test2.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"36","name":"部件信息采集","parentId":"30","url":"test2.html","icon":"","order":"1","isHeader":"0","childMenus":""}
					]},
					{"id":"40","name":"系统管理","parentId":"1","url":"","icon":"&#xe602;","order":"1","isHeader":"0","childMenus":[
						{"id":"41","name":"用户信息管理","parentId":"4","url":"home3.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"42","name":"系统界面管理","parentId":"4","url":"home4.html","icon":"","order":"1","isHeader":"0","childMenus":""}
					]}
				]},
				{"id":"2","name":"框架案例","parentId":"0","url":"","icon":"","order":"2","isHeader":"1","childMenus":[
					{"id":"91","name":"新功能","parentId":"2","url":"","icon":"","order":"1","isHeader":"0","childMenus":""},
					{"id":"101","name":"多级","parentId":"2","url":"","icon":"","order":"1","isHeader":"0","childMenus":[
						{"id":"111","name":"一级","parentId":"10","url":"","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"121","name":"一级","parentId":"10","url":"","icon":"","order":"1","isHeader":"0","childMenus":[
							{"id":"131","name":"二级","parentId":"12","url":"","icon":"","order":"1","isHeader":"0","childMenus":""},
							{"id":"141","name":"二级","parentId":"12","url":"","icon":"","order":"1","isHeader":"0","childMenus":[
								{"id":"151","name":"三级","parentId":"14","url":"","icon":"","order":"1","isHeader":"0","childMenus":""},
								{"id":"161","name":"三级","parentId":"14","url":"","icon":"","order":"1","isHeader":"0","childMenus":[
									{"id":"171","name":"四级","parentId":"16","url":"","icon":"","order":"1","isHeader":"0","childMenus":""},
									{"id":"181","name":"四级","parentId":"16","url":"","icon":"","order":"1","isHeader":"0","childMenus":""}
								]}
							]}
						]}
					]}
				]}
				];
	initMenu(menu,$(".side-menu"));
	$(".side-menu > li").addClass("menu-item");
	
	/*获取菜单icon随机色*/
	//getMathColor();
}); 