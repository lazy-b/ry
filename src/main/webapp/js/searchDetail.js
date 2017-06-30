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

/*更新进度信息*/
FENIX.STATE.reloadDetails = function(responseText) {
	var details = {},
		stateBar = FENIX.getById("state-bar"),
		selectOrder = FENIX.getById("selectOrder"),
		selectProduct = FENIX.getById("selectProduct"),
		stateText = stateBar.getElementsByTagName("h3")[0];

		selectOrder.value = details.Order;
		selectProduct.value = details.Product;
		stateText.innerHTML = details.stateText;

}

/*查询成功则无刷新加载内容*/
FENIX.STATE.getStateDetails = function() {
	var request = FENIX.getHTTPObject(),
		success = true,//操作结果标识
		orderNo = FENIX.getById("orderNo"),
		productName = FENIX.getById("productName"),
		orderNoValue,productNameValue;

		orderNoValue = orderNo.value;
		productNameValue = productName.value;

	if (request) {
		request.onreadystatechange = function() {

			if (request.readyState == 4){//响应完成

				if (request.status == 200){//正常响应

					if (responseText.status == 200) {//查询成功
						FENIX.STATE.toggleDetails("show");
					} else {//查询失败
						aleat("查询错误："+responseText.msg);
						FENIX.STATE.toggleDetails("hide");
					}
				} else {//响应异常
					aleat("服务器异常响应"+request.msg);
						FENIX.STATE.toggleDetails("hide");
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