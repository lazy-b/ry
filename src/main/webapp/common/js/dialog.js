

// 对话窗口类
FENIX.Dialog = function Dialog(para) {
    this.mask = true;
}
FENIX.Dialog.prototype = {
    init: function() {
        if (this.mask) {
            addMask();
        }
        
    },
    addMask: function() {   // 增加遮罩层
        var mask = new Mask();

        mask.init();
    },
    removeMask: function() {    // 删除遮罩层

    },
    create: function() {    // 创建窗口内容（表单）

    },
    open: function() {  // 打开对话窗口
        
    },
    close: function() { // 关闭对话窗口

    },
    location: function() {  // 定位对话窗口
    },
    bind: function() {      // 添加窗口交互效果
        
    },
    submit: function() {    // 提交表单信息
        
    },
    cancle: function() {    // 取消提交表单

    }
};

// 遮罩层类
FENIX.Mask = function Mask(para) {
    this.zIndex = para.zIndex || 100;
};
FENIX.Mask.prototype = {
    init: function() {
        // 初始化遮罩层
    }
};