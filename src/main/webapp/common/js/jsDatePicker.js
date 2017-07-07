function showDataPicker(outputEle) {
    "use strict"
    if (!document.createElement ||!!document.createTextNode) return false;
    
    //创建日期控件
    createThePicker();
    
    //初始化日期控件
    initThePicker();
    
    //将日期控件添加到该输入框的下方
    appendThePicker();
    
    bindOnclickEvent();
    
    showThePicker();
    function createThePicker() {
        
        var div = document.createElement("div"),
            
            
        return div;
    }
}

