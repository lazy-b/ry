function showDataPicker(outputEle) {
    "use strict"
    if (!document.createElement ||!document.createTextNode || !document.createDocumentFrament) return false;
    
    // 创建日期控件
    createThePicker();
    
    // 初始化日期控件
    initThePicker();
    
    // 将日期控件添加到该输入框的下方
    appendThePicker();
    
    bindOnclickEvent();
    
    showThePicker();


    // 创建包含日期选择器主要结构的文档碎片
    function createThePicker() {
        var f = document.createDocumentFrament(),
            monthArry = [1,2,3,4,5,6,7,8,9,10,11,12],//方便修改月份显示模式
            weekArry = ["一","二","三","四","五","六","日"],//方便修改星期显示模式
            separator = ":",//设置时分秒的分隔符
            datePicker,time,parentDiv,childDiv,ul,li,span,text,input,str,
            i;

        // 创建datePicker容器
        datePicker = c("div");
        datePicker.setAttribute("id","lazzy-date-picker");
        
        // 创建顶部引导三角形
        parentDiv = c("div");
        parentDiv.className = "lazzy-marking-triangle";
        datePicker.appendChild(parentDiv);

        // 创建头部年月部分
        parentDiv = c("div");
        parentDiv.className = "lazzy-year";
        datePicker.appendChild(parentDiv);
        childDiv = c("div");
        childDiv.className = "lazzy-left-triangle";
        parentDiv.appendChild(childDiv);
        childDiv = c("div");
        childDiv.className = "lazzy-right-triangle";
        parentDiv.appendChild(childDiv);
        childDiv = c("div");
        childDiv.className = "lazzy-date-text";
        parentDiv.appendChild(childDiv);

        // 创建月份模块
        parentDiv = c("div");
        parentDiv.className = "lazzy-month lazzy-hidden";
        datePicker.appendChild(parentDiv);
        ul = c("ul");
        parentDiv.appendChild(ul);
        // 固定为12个月，直接循环输出
        for (i = 0; i < 12; i += 1) {
            li = c("li");
            ul.appendChild(li);
            span = c("span");
            span.className = "lazzy-date-text";
            li.appendChild(span);
            str = monthArry[i] +"月";
            text = document.createTextNode(str);
            span.appendChild(text);
        }

        // 创建每周的星期
        parentDiv = c("div");
        parentDiv.className = "lazzy-weekeday";
        datePicker.appendChild(parentDiv);
        ul = c("ul");
        parentDiv.appendChild(ul);
        // 固定一周为7天，直接循环输出，每周周一开始
        for (i = 0; i < 7; i += 1) {
            li = c("li");
            ul.appendChild(li);
            span = c("span");
            span.className = "lazzy-date-text";
            li.appendChild(span);
            str = weekArry[i];
            text = document.createTextNode(str);
            span.appendChild(text);
        }

        // 创建每月的天
        parentDiv = c("div");
        parentDiv.className = "lazzy-day";
        datePicker.appendChild(parentDiv);
        ul = c("ul");
        parentDiv.appendChild(ul);
        // 固定展示 7*6=42天，具体日期在初始化的时候创建，其他直接循环输出
        for (i = 0; i < 42; i += 1) {
            li = c("li");
            ul.appendChild(li);
            span = c("span");
            span.className = "lazzy-date-text";
            li.appendChild(span);
        }

        // 创建时间选择模块
        time = c("div");
        parentDiv.className = "lazzy-time";
        datePicker.appendChild(time);
        // 小时部分
        parentDiv = c("div");
        parentDiv.className = "lazzy-time-hours";
        time.appendChild(parentDiv);
        input = c("input");
        input.setAttribute("type","text");
        parentDiv.appendChild(input);
        childDiv = c("div");
        childDiv.className = "lazzy-top-triangle";
        parentDiv.appendChild(childDiv);
        childDiv = c("div");
        childDiv.className = "lazzy-bottom-triangle";
        parentDiv.appendChild(childDiv);
        // 分隔符
        span = c("span");
        span.className = "lazzy-separator";
        time.appendChild(span);
        text = document.createTextNode(separator);
        span.appendChild(text);
        // 分钟部分
        parentDiv = c("div");
        parentDiv.className = "lazzy-time-minutes";
        time.appendChild(parentDiv);
        input = c("input");
        input.setAttribute("type","text");
        parentDiv.appendChild(input);
        childDiv = c("div");
        childDiv.className = "lazzy-top-triangle";
        parentDiv.appendChild(childDiv);
        childDiv = c("div");
        childDiv.className = "lazzy-bottom-triangle";
        parentDiv.appendChild(childDiv);
        // 分隔符
        span = c("span");
        span.className = "lazzy-separator";
        time.appendChild(span);
        text = document.createTextNode(separator);
        span.appendChild(text);
        // 秒钟部分
        parentDiv = c("div");
        parentDiv.className = "lazzy-time-seconds";
        time.appendChild(parentDiv);
        input = c("input");
        input.setAttribute("type","text");
        parentDiv.appendChild(input);
        childDiv = c("div");
        childDiv.className = "lazzy-top-triangle";
        parentDiv.appendChild(childDiv);
        childDiv = c("div");
        childDiv.className = "lazzy-bottom-triangle";
        parentDiv.appendChild(childDiv);

        // 将最终得到的时间选择器主结构挂在文档碎片上
        f.appendChild(datePicker);
        return f;
    }

    // 根据当前时间初始化日期选择器
    function initThePicker() {
        var theTime = new Date(),
            currentDay = theTime.getDate(),
            lazzyYear,lazzyDay,liArr,spanArr,
            str,i,

        // 初始化顶部年月
        lazzyYear = gClass("lazzy-year")[0];
        spanArr = gTag("span",lazzyYear);
        str = formatMonth(theTime);
        spanArr[0].innerHTML = str;

        // 月份和星期是固定的不需要初始化
        // 初始化天数部分，即给当天增加样式
        lazzyDay = gClass("lazzy-day")[0];
        liArr = gTag("li",lazzyDay);
        spanArr = gTag("span",lazzyDay);












    // 通过li的类名和span的内容判断当天是哪个DOM元素并给对于li添加样式
        for (i = 0; i < liArr.length; i += 1) {
            str = 
            if ()
        }

        initTheDays(theTime);
    }


    // 根据给定日期更改当前视图的日期显示情况
    function initTheDays(date) {
        var dates = [],
            firstWeekday = getTheWeekedayOfFirstDay(date),
            lastDay = getTheLastDayOfLastMonth(date),
            currentDays = getDaysInMonth(date),
            lastDays,nextDays,//视图中上个月与下个月的天数
            lazzyDay,liArr,spanArr,//需要操作的DOM元素
            len,i,j;

        lazzyDay = gClass("lazzy-day")[0];
        liArr = gTag("li",lazzyDay);
        spanArr = gTag("span",lazzyDay);
        // 如果该月第一天为周一，则第一行均为上个月的日期，
        if (firstWeekday = 0) {
            lastDays = 7;
        } else {
            lastDays = firstWeekday;
        }

        len = lastDays;
        j = lastDay - lastDays + 1;
        //给上个月的日期增加样式并输出日期
        for (i = 0; i < len; i += 1) {
            liArr[i].className = "lazzy-other-month";
            spanArr[i].innerHTML = j++;
        }

        len += currentDays;
        j = 1;
        for (;i < len; i += 1) {
            spanArr[i].innerHTML = j++;
        }

        len -= 42;//总共7*6=42天
        j = 1;
        for (; i < len; i += 1) {
            liArr[i].className = "lazzy-other-month";
            spanArr[i].innerHTML = j++;
        }

    }

    // 获得给定日期的年月并格式化成字符串
    function formatMonth(date) {
        var str,year,month;

        year = date.getFullYear();
        month = date.getMonth() +1;
        str = year + "年" + month +"月";
        return str;
    }


    // 根据给定字符串更改年月的显示情况
    function changeTheTop(str) {
        var lazzyYear,span;

        lazzyYear = gClass("lazzy-year")[0];
        span = gTag("span",lazzyYear)[0];
            spanArr[i].innerHTML = str; 
    }

    // 需要用到大量的创建节点操作，简化一下操作
    function c(nodeName) {
        return document.createElement(nodeName);
    }

    // 通过id查找元素的简写方法
    function gTag(tagName, node) {
        var node = node || document;
        return node.getElementsByTagName(tagName);
    }

    // 通过类名查找DOM对象（单个类名）
    function gClass(classname, node) {
        var node = node || document;
        
        if (node.getElementsByClassName) {
            //如果浏览器支持getElementsByClassName方法，则使用浏览器提供的方法
            return node.getElementsByClassName(classname);
        } else {
            var results=[],
                reg = new RegExp("\\b"+classname+"\\b"),
                elems = null;
                
            if (!document.getElementsByTagName) return false;
            elems=node.getElementsByTagName("*");
            
            for (var i = 0; i < elems.length; i++) {
                if (reg.test(elems[i].className)) {
                    results[results.length] = elems[i];
                }
            }
            return results;
        }
    }

    // 获取当前日期所处月份的总天数
    function getDaysInMonth(date) {
        var year = date.getFullYear(),
            month = date.getMonth(),
            days,
            is_leap_year = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)),
            day_list=[];
        day_list = [31,(is_leap_year ? 29 : 28), 31, 0, 31, 30, 31, 31, 30, 31, 30, 31];//枚举出所有可能的天数
        days = day_list[month];
        return days;
    }

    // 获取上个月的最后一天为几号
    function getTheLastDayOfLastMonth(date) {
        var date = new Date(date),//通过毫秒数创建一个日期，避免修改原对象
            lastDay;
        date.setDate(0);
        return date.getDate();
    }

    // 获取当月第一天为周几
    function getTheWeekedayOfFirstDay(date) {
        var date = new Date(date),//通过毫秒数创建一个日期，避免修改原对象
            weekeday;
        date.setDate(1);
        return date.getDay();
    }

    
}

