/* 
    后端返回的信息格式例子：
    {
        status:200,     //返回操作状态
        msg:msg,        //返回提示信息
        data:null       //返回数据
    }
*/

/*命名空间FENIX在fenixCommon.js文件定义*/
/*创建命名空间FENIX.STATE*/
FENIX.namespace("STATE");

/*根据传入参数确定详情是否隐藏*/
FENIX.STATE.toggleDetails = function(state){
	var searchBox = FENIX.getById("search-box"),
		stateBar = FENIX.getById("state-bar");

	if (state == "show") {
		FENIX.addClass(searchBox, "search-success");
		FENIX.removeClass(stateBar, "hidden");                
	} else if (state == "hide") {
		FENIX.removeClass(searchBox, "search-success");
		FENIX.addClass(stateBar, "hidden");
	}
}

/*传入时间毫秒数，返回一个对象，对象包含日期和时间*/
FENIX.STATE.getTimeObj = function(times) {
	var timeObj = null,
		dateBeforeChange = null,
		objTime,objDate;

	dateBeforeChange = new Date(times);
	objDate = dateBeforeChange.getFullYear() + "/" +
			  (dateBeforeChange.getMonth() + 1) + "/" +
			  dateBeforeChange.getDate();
	objTime = dateBeforeChange.getHours() + ":" +
			  dateBeforeChange.getMinutes();
	timeObj = {
		"time": objTime,
		"date": objDate
	}
	return timeObj;

}

/*根据提供的数据，初始化节点信息*/
FENIX.STATE.initNodes = function(stateNodes,stepDatesPrepare) {
	var text1,text4,p,br,textNodeDate,textNodeTime,
		i;

	text1 = FENIX.getElementsByClassName("text1");
	text4 = FENIX.getElementsByClassName("text4");

	for (i = 0; i < stateNodes.length; i++) {
		text1[i].innerHTML = stepDatesPrepare[i].date;

		if (document.createElement && document.createTextNode) {
			text4[i].innerHTML = "";//先清除数据（不管有没有）

			br = document.createElement("br");
			p = document.createElement("p");
			textNodeDate = document.createTextNode(stepDatesPrepare[i].date);
			textNodeTime = document.createTextNode(stepDatesPrepare[i].time);

			p.appendChild(textNodeDate);
			p.appendChild(br);
			p.appendChild(textNodeTime);
			text4[i].appendChild(p);
		} else {
			text4[i].innerHTML = stepDatesPrepare[i].date + "\n" +
								 stepDatesPrepare[i].time;
		}
	}
}

/*更新进度信息*/
FENIX.STATE.reloadDetails = function(responseText) {
	var stateBar = FENIX.getById("state-bar"),
		selectOrder = FENIX.getById("selectOrder"),
		selectProduct = FENIX.getById("selectProduct"),
		stateText = stateBar.getElementsByTagName("h3")[0],
		stateNodes = FENIX.getElementsByClassName("order-state-node",stateBar),
		stateConnector = FENIX.getElementsByClassName("order-state-connector",stateBar),
		rightTexts = FENIX.getElementsByClassName("right-text",stateBar),
		barTextsPrepare = ["订单处理中","订单生产中","订单待交货","订单已完成"],
		details = null,
		stepDatesPrepare = [],
		statusPrepare = [],
		BarText,text1,text4,
		i,j;

		/*将后台数据进行转化，防止后台修改数据格式*/
		details = {
			orderNo: responseText.rows[0].orderNo,
			productName: responseText.rows[0].productName,
			planProductFinish: responseText.rows[0].planProductFinish,
			productFinishStatus: responseText.rows[0].productFinishStatus,
			productStatus: responseText.rows[0].productStatus,
			planOrderFinish: responseText.rows[0].planOrderFinish,
			batch: responseText.rows[0].batch,
			orderFinishStatus: responseText.rows[0].orderFinishStatus,
			planPrductTime: responseText.rows[0].planPrductTime,
			reciverOrder: responseText.rows[0].reciverOrder
		};

		//获取后台每个计划节点的实际状态(第一个节点状态始终为1)
		statusPrepare[0] = 1;
		statusPrepare[1] = parseInt(details.productStatus);
		statusPrepare[2] = parseInt(details.productFinishStatus);
		statusPrepare[3] = parseInt(details.orderFinishStatus);

		BarText = barTextsPrepare[0];//初始化为“订单处理中”
		
		/*确定生产状态*/
		for (i = 0; i < statusPrepare.length;) {
			BarText = barTextsPrepare[i];

			/*如果下一计划节点未开始则退出*/
			if (statusPrepare[++i] === 0) {
				break;
			}
		}

		//更新订单主要信息，包括订单号，产品名以及生产状态
		rightTexts[0].innerHTML = details.orderNo;
		rightTexts[1].innerHTML = details.productName;
		//stateText.innerHTML = details.stateText;
		stateText.innerHTML = BarText;//更新状态

		//将后台传递的时间转化为需要的字符串格式并按节点顺序存入数组
		stepDatesPrepare[0] = FENIX.STATE.getTimeObj(details.reciverOrder);
		stepDatesPrepare[1] = FENIX.STATE.getTimeObj(details.planPrductTime);
		stepDatesPrepare[2] = FENIX.STATE.getTimeObj(details.planProductFinish);
		stepDatesPrepare[3] = FENIX.STATE.getTimeObj(details.planOrderFinish);

		/*根据后台数据初始化一下节点信息*/
		FENIX.STATE.initNodes(stateNodes,stepDatesPrepare);
		
		//获取计划节点的文本子节点
		text1 = FENIX.getElementsByClassName("text1");
		text4 = FENIX.getElementsByClassName("text4");

		//根据计划节点状态更新进度展示情况
		for (i = 0, j = 1; i < statusPrepare.length; i++,j++) {

			if (statusPrepare[i] === 0) {
				// 设置节点为未开始状态
				FENIX.removeClass(stateNodes[i],"done");
				FENIX.removeClass(stateNodes[i],"prepare");
				FENIX.addClass(stateNodes[i],"inital");

				//将实际时间清除
				text4[i].innerHTML = "";
			} else if (statusPrepare[i] === 1) {
				// 设置节点为已完成状态
				FENIX.removeClass(stateNodes[i],"inital");
				FENIX.removeClass(stateNodes[i],"prepare");
				FENIX.addClass(stateNodes[i],"done");

				// 将计划时间清除，并用一个空格占位，维持布局
				text1[i].innerHTML = "&nbsp;";
			}

			// 最后一个节点之后没有连接符，故不参与下面循环
			if (i < statusPrepare.length - 1) {

				if (statusPrepare[i] === 0 && statusPrepare[j] === 0) {
					// 设置连接符为已未开始状态
					FENIX.removeClass(stateConnector[i],"done");
					FENIX.removeClass(stateConnector[i],"prepare");
					FENIX.addClass(stateConnector[i],"inital");
				} else if (statusPrepare[i] === 1 && statusPrepare[j] === 0) {
					// 设置连接符为处理中状态
					FENIX.removeClass(stateConnector[i],"done");
					FENIX.removeClass(stateConnector[i],"inital");
					FENIX.addClass(stateConnector[i],"prepare");
				} else if (statusPrepare[i] === 1 && statusPrepare[j] === 1) {
					// 设置连接符为已完成状态
					FENIX.removeClass(stateConnector[i],"prepare");
					FENIX.removeClass(stateConnector[i],"inital");
					FENIX.addClass(stateConnector[i],"done");
				} else {
					alert("后台数据有误！");
				}
			} 
		}
}

/*根据传入参数确定详情是否输出提示信息*/
FENIX.STATE.toggleMsg = function(state,message) {
	var msg = FENIX.getById("msg");

	if (state == "show") {
		msg.innerHTML = message;
		FENIX.removeClass(msg,"hidden");                
	} else if (state == "hide") {
		msg.innerHTML = "&nbsp;";
		FENIX.addClass(msg, "hidden");
	}
}

/*异步搜索结果，如果查询成功则无跳转加载内容*/
FENIX.STATE.getStateDetails = function() {
	var request = FENIX.getHTTPObject(),
		success = true,//操作结果标识
		orderNo = FENIX.getById("orderNo"),
		productName = FENIX.getById("productName"),
		responseText = null,		
		orderNoValue,productNameValue;

		orderNoValue = orderNo.value;
		productNameValue = productName.value;

	if (request) {
		request.onreadystatechange = function() {

			if (request.readyState == 4){//响应完成

				if (request.status == 200){//正常响应
					responseText = JSON.parse(request.responseText);
					
					if (responseText.status == 200) {//查询成功
						FENIX.STATE.reloadDetails(responseText);
						FENIX.STATE.toggleMsg("hide");
						FENIX.STATE.toggleDetails("show");
					} else {//查询失败
						FENIX.STATE.toggleDetails("hide");
						FENIX.STATE.toggleMsg("show","查询错误："+responseText.msg);
					}
				} else {//响应异常
					FENIX.STATE.toggleDetails("hide");
					FENIX.STATE.toggleMsg("show","服务器异常响应"+request.msg);
				}
			}
		};
		request.open("GET", "../../schedule/find.do?orderNo="+orderNoValue+"&productName="+productNameValue, true);
		request.send(null);
		success = false; //请求成功则阻止页面跳转
	} else {
		alert("抱歉，页面刷新失败，将在新窗口展示搜索结果！");
		FENIX.STATE.toggleDetails("hide");
	}
	return success;
}