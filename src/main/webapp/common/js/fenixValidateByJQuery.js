$.extend($.fn.validatebox.defaults.rules,{
	lazzyNumber: {//验证订单号
        validator: function(value,param) {
            var reg = "^\d",
                regExp;

            if (param.length === 0) {
            	reg += "*$";//不输入 参数则默认任意个数字
            } else if (param.length === 1) {
            	reg += "{" + param[0] +",}$";//至少param[0]个数字
            } else if (param.length > 1) {
            	reg += "{" + param[0] + "," + param[1] + "}$";//给定范围内的个数的数字，2个参数之后的参数被忽略
            }
            regExp = new RegExp(reg);
            return regExp.test(value);
        },
        message: "请输入正确位数的数字、、、"
    },
    lazzyOrderNo: {//验证订单号
        validator: function(value,param) {
            var reg = "^PO\d{4}$",
                regExp;
            regExp = new RegExp(reg);
            return regExp.test(value);
        },
        message: "请输入正确的订单号、、、"
    },
    lazzyMaterialCoding: {//验证物料长代码
        validator: function(value,param) {
            var reg = "^\d{2}\.(\d{3}\.){2}\d{3}$",
                regExp;
            regExp = new RegExp(reg);
            return regExp.test(value);
        },
        message: "请输入正确的物料长代码、、、"
    },
    lazzyExcel: {//验证excel文件
        validator: function(value,param) {
            var availableSuffix = [".xls",".xlsx"],//允许接收的后缀
                reg = "^\\S.*(",
                regExp,
                i;
            for (i = 0; i < availableSuffix.length; i++) {
                reg += (availableSuffix[i] + "|");
            }
            reg = reg.slice(0,-1);//去除最后一个多余的"|"
            reg += ")$";
            regExp = new RegExp(reg);
            return regExp.test(value);
        },
        message: "请选择后缀为.xls或者.xlsx且文件名合法的文件、、、"
    }
});
