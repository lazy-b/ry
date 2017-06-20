(function(){
"use strict"//如果浏览器支持，则开启严格模式
/*1、封装绑定页面加载函数,在需要绑定一个事件时只需运行一次这个函数*/
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
/*2、初始化*/
function init(){
	if(!data) return false;
	var min_and_max_date,
		gantt_start_date,
		gantt_start_day,
		gantt_start_month,
		gantt_start_year,
		min_and_max_date,
		days_array,
		ganttview = get("ganttview");
	ganttview.innerHTML = ""; //粗暴的清除ganttview中原有的内容，防止干扰布局
	min_and_max_date = getMinAndMaxDate(data);
	days_array = getDates(min_and_max_date);
	
	/*初始化甘特图背景模块*/
	loadGanttBackground(days_array,data);
	
	gantt_start_day = days_array[0].start;
	gantt_start_month = days_array[0].month;
	gantt_start_year = days_array[0].year;
	gantt_start_date = new Date(gantt_start_year +"/"+ gantt_start_month +"/"+ gantt_start_day);
	/*初始化甘特图计划模块*/
	loadGanttProject(gantt_start_date,data);
	createTips(ganttview);
}
/*4、加载甘特图背景网格函数*/
//days_array:包含甘特图背景网格所需要的一些参数的对象的数组
//data:计划数据
function loadGanttBackground(days_array,data){
	if(data.length <= 0) return false;
	if(!document.getElementById) return false;//如果浏览器不支持document.getElementById方法，返回false
	if(!document.getElementById("ganttview")) return false;//如果不存在id为ganttview的元素，返回false
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.createDocumentFragment) return false;
	var ganttview=get("ganttview"),//获得id为ganttview的元素
		total_size = 0,//总天数
		start_date,//甘特图开始的日期
		week_day,//甘特图开始日期是星期几
		table_class,
		table_class_array = ["weekend0","weekend1","weekend2","weekend3","weekend4","weekend5","weekend6"],
		i,
		j,
		k,
		fragment = document.createDocumentFragment(),//创建文档碎片，减少对DOM的操作
		table_node,//JavaScript创建的一些DOM节点
		tr_node,
		th_node,
		td_node,
		text_node;
	for(i = 0 ; i < days_array.length;i++){//得到总天数
		total_size += days_array[i].size;
	};
	start_date=new Date(days_array[0].year + "/" + days_array[0].month + "/" + days_array[0].start);
	//days_array做处理的时候已经将月份从“0~11”加1转化为了“0~12”
	week_day = start_date.getDay();
	table_class = table_class_array[week_day];
	table_node=document.createElement("table");
	table_node.setAttribute("class",table_class);
	
	fragment.appendChild(table_node);//插入table标签至文档碎片
	
	/*插入前三行开始*/
	
	tr_node=document.createElement("tr");
	tr_node.setAttribute("class","firstRow");
	table_node.appendChild(tr_node);//插入第一行
	th_node=document.createElement("th");
	th_node.setAttribute("class","title");
	tr_node.appendChild(th_node);//插入表头	
	for(i=1;i <= total_size;i++){
		td_node=document.createElement("td");
		tr_node.appendChild(td_node);//插入单元格
	};
	
	tr_node=document.createElement("tr");
	tr_node.setAttribute("class","month");
	table_node.appendChild(tr_node);//插入第二行	
	th_node=document.createElement("th");
	th_node.setAttribute("class","title");
	text_node = document.createTextNode("月份");
	th_node.appendChild(text_node);//插入文本节点
	tr_node.appendChild(th_node);//插入表头
	for(i=0;i < days_array.length;i++){		
		td_node=document.createElement("td");
		td_node.setAttribute("class","colMonth");
		td_node.setAttribute("colspan",days_array[i].size);
		text_node = document.createTextNode(days_array[i].year + "年" + days_array[i].month + "月");
		td_node.appendChild(text_node);//插入文本节点
		tr_node.appendChild(td_node);//插入一个单元格
	};
	
	tr_node=document.createElement("tr");
	tr_node.setAttribute("class","days");
	table_node.appendChild(tr_node);//插入第三行
	th_node=document.createElement("th");
	th_node.setAttribute("class","title");
	text_node = document.createTextNode("日期");
	th_node.appendChild(text_node);//插入文本节点
	tr_node.appendChild(th_node);//插入表头	
	for(i = 0; i < days_array.length;i++){	
		k = days_array[i].start;
		for(j=0; j < days_array[i].size; j++ ,k++){
			td_node=document.createElement("td");
			text_node = document.createTextNode(k);
			td_node.appendChild(text_node);//插入文本节点
			tr_node.appendChild(td_node);//插入一个单元格
		}
	};
	/*插入表头结束*/
	
	/*循环插入主体部分开始*/
	for(i = 0; i < data.length; i++){//一条计划新增一行
		tr_node=document.createElement("tr");
		table_node.appendChild(tr_node);//插入行
		th_node=document.createElement("th");
		th_node.setAttribute("class","title");//先不插入数据，数据在输出计划函数中一并插入
		/*插入计划名开始*/
		text_node = document.createTextNode(data[i].productName);
		th_node.appendChild(text_node);
		/*插入计划名结束*/
		tr_node.appendChild(th_node);//插入表头	
		for(j=1;j <= total_size;j++){
			td_node=document.createElement("td");
			tr_node.appendChild(td_node);//插入单元格
		};
	}
	/*循环插入主体部分结束*/
	ganttview.appendChild(fragment);//将文档碎片插入
}
/*5、获取计划中的最早开始日期和最迟结束日期*/
function getMinAndMaxDate(data){
		var min_and_max_date=[],//结果存放数组
			min_date,//最早日期
			max_date,//最晚日期
			i,//循环控制变量
			o_date,//orderTaking对应日期对象
			d_date;//delivery对应日期对象
		if(data.length > 0){
			for(i=0;i<data.length;i++){//冒泡法得出开始结束日期
				o_date=new Date(data[i].orderTaking);
				d_date=new Date(data[i].delivery);
				min_date=(min_date||o_date)<o_date?min_date:o_date;
				max_date=(max_date||d_date)>d_date?max_date:d_date;
			}
		}else{
			min_date=new Date("2017-06-06 08:00");
			max_date=new Date("2017-07-07 08:00");
		};
		min_and_max_date[0]=min_date;
		min_and_max_date[1]=max_date;
		return  min_and_max_date;
}
/*6、获取背景网格一些数据——开始日期，结束日期，每个月的天数*/
function getDates(min_and_max_date){
	var days_array = [],//存放背景网格需要的每个月的数据，数组的每个元素都为一个对象。
		start = min_and_max_date[0],//甘特图背景网格的开始日期，初始化为数据最早开始日期
		end = min_and_max_date[1],//甘特图背景网格的结束日期，初始化为数据最晚结束日期
		start_year,//甘特图开始的年份
		start_month,//甘特图开始的月份
		start_date,//甘特图开始日期
		end_year,//甘特图结束的年份
		end_month,//甘特图结束的月份
		//details={},//存放背景网格每个月详细信息的对象
		i,//年份循环参数
		j,//月份循环参数
		end_or_last_month,//一个辅助变量，存放每年的结束月份
		total_size;//存放总天数
	start_date=start.getDate();
	start_month=start.getMonth();
	start_year=start.getFullYear();
	if(start_date > 20){//如果开始日期大于20号，则甘特图从20号开始，避免第一个月天数太少不方便展示。
		start.setDate(20);
		start_date=start.getDate();
	};
	end=moveToLastDay(end);//将结束日期设置为数据最晚结束所在月的最后一天。(简单粗暴）
	end_year=end.getFullYear();//甘特图结束的年份
	end_month=end.getMonth();//甘特图结束的月份
	/*甘特图第一个月单独添加*/
	/*
	details.start=start.getDate();
	details.size=(getDaysInMonth(start_year,start_month)-start.getDate()+1);
	details.year=start_year;
	details.month=start_month+1;//直接转化为习惯使用的“1~12”表示的月份
	days_array.push(details);
	*/
	days_array.push({//直接存入一个对象，比上面的方法更好理解
		"start":start.getDate(),
		"size":getDaysInMonth(start_year,start_month)-start.getDate()+1,
		"year":start_year,
		"month":start_month+1
		});
	/*添加剩下的月份*/
	i=start_year;
	j=start_month+1;
	while(i <= end_year){
		if(i === end_year){//只有当循环到了结束所在月的那一年时，才以end_month作为结束月份，否则都以自然年结束月份结束（12月份）
			end_or_last_month = end_month;
		}else{
			end_or_last_month = 11;
		};
		while(j <= end_or_last_month){
			/*
			details={};//将details重新指向一个内存地址。否则函数没错都会将最后计算结果的details对象存入数组，而与预期不符。
			details.start=1;
			details.size=getDaysInMonth(i,j);
			details.year=i;
			details.month=j+1;
			days_array.push(details);
			*/
			days_array.push({//直接存入一个对象，比上面的方法更好理解
				"start":1,
				"size":getDaysInMonth(i,j),
				"year":i,
				"month":j+1
			});
			j++;
		}
		j = 0;//初始化j，否则下次循环j会从上次结束的值开始。
		i++;
	}
	return days_array;	
}
/*7、将当前日期移动到当月最后一天*/
function moveToLastDay(data){
	data.setDate(3);//数字在“1~28”都可以，目的是防止从大月份增加一个月会增加两个月。
	data.setMonth(data.getMonth()+1);//移动到下一个月，1月31日月份+1会移动到3月3日（或3月2日）
	data.setDate(0);//移动到这个月的月末
	return data;
}
/*8、获取当前日期所处月份的总天数*/
function getDaysInMonth(year,month){
	var days,
		is_leap_year=((year % 4 === 0 && year % 100 !== 0)||(year % 400 === 0)),
		day_list=[];
	day_list=[31,(is_leap_year?29:28),31,30,31,30,31,31,30,31,30,31];//枚举出所有可能的天数
	days=day_list[month];
	return days;
}
/*9、封装通过id查找元素的方法*/
function get(id){
	return document.getElementById(id);
}
/*10、加载甘特图计划函数*/
function loadGanttProject(gantt_start_date,data){
	if(data.length < 0) return false;
	if(!document.getElementById) return false;//如果浏览器不支持document.getElementById方法，返回false
	if(!document.getElementById("ganttview")) return false;//如果不存在id为ganttview的元素，返回false
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.createDocumentFragment) return false;
	var ganttview = get("ganttview"),
		gantt_start_date,//甘特图开始日期，用来确定各计划偏移的基线
		data_date,//存储转换为日期类型数据的data
		div_node,
		div_clear_node,
		div_product_node,
		div_child_node,
		text_node,
		margin_left,//每个日期相对于基线的偏移量
		width,//每个分计划的宽度
		cell_width = 20,//单元格宽度，初始化为20
		fragment=document.createDocumentFragment(),
		days_between_two_date,//两个日期之间间隔的天数
		i;
	
	data_date = getDataDate(data);//将data数据中的日期字符串转化为日期对象
	
	div_node=document.createElement("div");
	div_node.setAttribute("id","details");	
	fragment.appendChild(div_node);//插入details标签至文档碎片	
	for(i = 0; i < data_date.length; i++){
		/*生成容器盒子*/
		days_between_two_date = getDaysBetween(gantt_start_date,data_date[i].orderTaking);
		margin_left = days_between_two_date*cell_width;//计算出相对于基线的偏移量
		div_product_node=document.createElement("div");//生成容器盒子
		div_product_node.setAttribute("class","product");
		div_product_node.setAttribute("style","margin-left:" + margin_left + "px");
		div_node.appendChild(div_product_node);//将容器盒子插入details盒子
		
		/*生成分工序div*/
		days_between_two_date = getDaysBetween(data_date[i].orderTaking,data_date[i].begin);
		width = days_between_two_date*cell_width;
		div_child_node=document.createElement("div");//生成第一道分工序
		div_child_node.setAttribute("title","安排计划，回复交期");
		div_child_node.setAttribute("class","manage");
		div_child_node.setAttribute("style","width:" + width +"px");
		div_product_node.appendChild(div_child_node);//将第一道分工序插入容器盒子
		text_node = document.createTextNode(days_between_two_date + "天");
		div_child_node.appendChild(text_node);//将文本节点插入第一道工序
		
		days_between_two_date = getDaysBetween(data_date[i].begin,data_date[i].complete);
		width = days_between_two_date*cell_width;
		div_child_node=document.createElement("div");//生成第二道分工序
		div_child_node.setAttribute("title","预计生成需要时间");
		div_child_node.setAttribute("class","produce");
		div_child_node.setAttribute("style","width:" + width +"px");
		div_product_node.appendChild(div_child_node);//将第二道分工序插入容器盒子
		text_node = document.createTextNode(days_between_two_date + "天");
		div_child_node.appendChild(text_node);//将文本节点插入第二道工序
		
		days_between_two_date = getDaysBetween(data_date[i].complete,data_date[i].delivery);
		width = days_between_two_date*cell_width;
		div_child_node=document.createElement("div");//生成第三道分工序
		div_child_node.setAttribute("title","准备交货");
		div_child_node.setAttribute("class","delivery");
		div_child_node.setAttribute("style","width:" + width +"px");
		div_product_node.appendChild(div_child_node);//将第三道分工序插入容器盒子
		text_node = document.createTextNode(days_between_two_date + "天");
		div_child_node.appendChild(text_node);//将文本节点插入第三道工序
	};
	/*生成清除浮动盒子*/
	div_clear_node=document.createElement("div");
	div_clear_node.setAttribute("class","clearFix");	
	div_node.appendChild(div_clear_node);//插入details标签至文档碎片
	
	ganttview.appendChild(fragment);//将文档碎片插入ganttview
	/*设置details的宽度为表格宽度减去140px，防止布局出现问题*/
	var table = document.getElementsByTagName("table")[0];
	var width = table.offsetWidth;
	get("details").style.width = (width - 140) +"px";
}
/*11、计算两个日期之间间隔的天数*/		
function getDaysBetween(date1,date2){
	if(date1 === "undefined" ||date2 === "undefined" ) return false;
	if(!(date1 instanceof Date) ||!(date2 instanceof Date) ) return false;
	if(date2 < date1) return false;
	var days_between_two_date = 0;//初始化为零。
	days_between_two_date = (date2 - date1)/(24*60*60*1000);
	return days_between_two_date;
}
/*12、将data数据中的日期字符串转化为日期对象*/
function getDataDate(data){
	var data_date = [],//转化后的数据
		date_array = [],//将date字符串分割成字符串数组
		i;
	for (i = 0 ; i < data.length;i++){
		date_array[0] = data[i].orderTaking.split("-");
		date_array[1] = data[i].begin.split("-");
		date_array[2] = data[i].complete.split("-");
		date_array[3] = data[i].delivery.split("-");
		data_date.push({
			"productName":data[i].productName,
			"orderTaking":new Date(date_array[0][0],date_array[0][1] - 1,date_array[0][2]),
			"begin":new Date(date_array[1][0],date_array[1][1] - 1,date_array[1][2]),
			"complete":new Date(date_array[2][0],date_array[2][1] - 1,date_array[2][2]),
			"delivery":new Date(date_array[3][0],date_array[3][1] - 1,date_array[3][2])
		});
		/*
		data_date[i].productName = data[i].productName;
		data_date[i].orderTaking = new Date(data[i].orderTaking);
		data_date[i].begin = new Date(data[i].begin);
		data_date[i].complete = new Date(data[i].complete);
		data_date[i].delivery = new Date(data[i].delivery);
		*/
	};
	return data_date;
}
/*13、在现有元素后插入一个元素*/
function  insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.appendChild(newElement,targetElement.nextSibling);
	}
}
/*14、在甘特图之后创建提示图例*/
function createTips(ganttview){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	var div_node,
		p_node,
		i_node,
		text_node;
	div_node=document.createElement("div");//生成tips盒子
	div_node.setAttribute("id","tips");
	
	p_node=document.createElement("p");
	p_node.setAttribute("class","reminder");
	div_node.appendChild(p_node);//插入reminder段落
	
	i_node=document.createElement("i");
	i_node.setAttribute("class","color1");
	p_node.appendChild(i_node);//插入第一个颜色小方块
	
	text_node = document.createTextNode(" 安排计划，回复交期 ");
	p_node.appendChild(text_node);
	
	i_node=document.createElement("i");
	i_node.setAttribute("class","color2");
	p_node.appendChild(i_node);//插入第一个颜色小方块
	
	text_node = document.createTextNode(" 预计生产需要时间 ");
	p_node.appendChild(text_node);
	
	i_node=document.createElement("i");
	i_node.setAttribute("class","color3");
	p_node.appendChild(i_node);//插入第一个颜色小方块
	
	text_node = document.createTextNode(" 准备交货 ");
	p_node.appendChild(text_node);
	
	ganttview.appendChild(div_node);
}
/*绑定window.onload事件*/
addLoadEvent(init);
})();
