// 功能支持IE5+
// 样式支持IE8+
// 所有事件处理均未阻止冒泡以及默认操作，如有影响页面其它事件可自行阻止
// 2017.01.17 之前版本

function showDataPicker(event) {
    "use strict"
    var event = event || window.event,
        bindTag = event.srcElement || event.target;
    if (!document.getElementById || !document.createElement || !document.createTextNode || !document.createDocumentFragment) return false;

    // 如果没有创建过日期选择器，则创建日期控件以及给日期控件绑定事件处理函数
    if (!document.getElementById("lazzy-date-picker")) {

        // 创建日期控件
        createThePicker();

        // 给日期控件绑定一些交互事件
        bindDateEvent();
    }

    // 初始化日期控件
    initThePicker();

    // 将日期控件添加到该输入框的下方
    locationThePicker(bindTag);
    
    // 当全部结构以及功能都准备完毕后将日期选择器展示出来，提高用户体验
    showThePicker();


    console.log(showDataPicker.info.counter().count());/*test*/

    // 将被选中的日期输出到目标元素
    // outputTheTime(event);

    // 创建包含日期选择器主要结构的文档碎片
    function createThePicker() {
        var f = document.createDocumentFragment(),
            body = gTag("body")[0],// 获得body元素
            script = gTag("script",body)[0],
            monthArry = [1,2,3,4,5,6,7,8,9,10,11,12],//方便修改月份显示模式
            weekArry = ["一","二","三","四","五","六","日"],//方便修改星期显示模式
            separator = ":",//设置时分秒的分隔符
            datePicker,time,parentDiv,childDiv,ul,li,span,text,input,str,
            i;

        // 创建datePicker容器
        datePicker = c("div");
        datePicker.setAttribute("id","lazzy-date-picker");
        datePicker.className = "lazzy-hidden";
        // 将最终得到的时间选择器主结构挂在文档碎片上
        f.appendChild(datePicker);

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
        span = c("span");
        span.className = "lazzy-date-text";
        parentDiv.appendChild(span);

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
        time.className = "lazzy-time";
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

        // 使用文档碎片将日期选择器一次性加载到body元素下
        body.insertBefore(f,script);
    }

    // 给日期选择器绑定相应事件处理程序，增加日期选择器的交互功能
    function bindDateEvent() {
        var datePicker = document.getElementById("lazzy-date-picker"),
            year = gClass("lazzy-year",datePicker)[0],
            month = gClass("lazzy-month",datePicker)[0],
            weekeday = gClass("lazzy-weekeday",datePicker)[0],
            day = gClass("lazzy-day",datePicker)[0],
            time = gClass("lazzy-time",datePicker)[0],
            inputArr = gTag("input", time); // 获得三个输入框的数组列表

        // 下方四个click事件也可以同时委托给datePicker元素，但是考虑代理层数过多，暂不考虑

        // 给顶部添加交互功能
        addHandler(year, "click", function(event) {
            var event = event || window.event,
                eventTag = event.srcElement || event.target,
                datePicker = document.getElementById("lazzy-date-picker"),
                month = gClass("lazzy-month",datePicker)[0];

            if (month.className == "lazzy-month") {// 月份列表被展示

                // 进行事件代理
                if (eventTag.className == "lazzy-date-text") {
                    // 设置顶部文本指示当年当月
                    toggleTopText("currentMonth");
                    // 初始化日期视图
                    initTheDays();
                    // 然后显示日期列表视图
                    toggleMonthDisplay("hide");
                } else if (eventTag.className == "lazzy-left-triangle") {
                    // 更改存储的日期为去年对应日期
                    showDataPicker.info.setChosenDate("lastYear");
                    // 设置顶部文本指示去年
                    toggleTopText("lastYear");
                    // 初始化月份列表视图
                    initTheMonths();
                } else if (eventTag.className == "lazzy-right-triangle") {
                    // 更改存储的日期为明年对应日期
                    showDataPicker.info.setChosenDate("nextYear");
                    // 设置顶部文本指示明年
                    toggleTopText("nextYear");
                    // 初始化月份列表视图
                    initTheMonths();
                }
            } else if (month.className == "lazzy-month lazzy-hidden") {// 月份列表被隐藏

                // 进行事件代理
                if (eventTag.className == "lazzy-date-text") {
                    // 设置顶部文本指示当年
                    toggleTopText("currentYear");
                    // 初始化月份列表视图
                    initTheMonths();
                    // 然后显示月份列表视图
                    toggleMonthDisplay("show");
                } else if (eventTag.className == "lazzy-left-triangle") {
                    // 更改存储的日期为上个月的对应日期
                    showDataPicker.info.setChosenDate("lastMonth");
                    // 设置顶部文本指示上一个月
                    toggleTopText("lastMonth");
                    // 初始化日期视图
                    initTheDays();
                } else if (eventTag.className == "lazzy-right-triangle") {
                    // 更改存储的日期为下个月的对应日期
                    showDataPicker.info.setChosenDate("nextMonth");
                    // 设置顶部文本指示下一个月
                    toggleTopText("nextMonth");
                    // 初始化日期视图
                    initTheDays();
                }
                
            }
        });

        // 给月份列表添加交互功能
        addHandler(month, "click", function(event) {
            var event = event || window.event,
                eventTag = event.srcElement || event.target,
                n;

            // 进行事件代理
            if (eventTag.className == "lazzy-date-text") {
                // 更改存储的日期为该span对应的月份 
                n = parseInt(eventTag.innerHTML,0) - 1;
                showDataPicker.info.setChosenDate("month",n);

                // 设置顶部文本指示选中日期的当年当月
                toggleTopText("chosenMonth");

                // 初始化日期视图
                initTheDays();

                // 然后显示日期列表视图
                toggleMonthDisplay("hide");
            }
        });

        // 给日期添加交互功能
        addHandler(day, "click", function(event) {
            var event = event || window.event,
                eventTag = event.srcElement || event.target,
                n;

            // 进行事件代理
            // 也可以代理li，但是为了整个函数的一致性，均代理span
            if (eventTag.parentNode.className == "lazzy-last-month") {
                // 先将存储的日期月份减一
                showDataPicker.info.setChosenDate("lastMonth");
                // 再更改存储的日期为该span对应的日期 
                n = parseInt(eventTag.innerHTML,0);
                showDataPicker.info.setChosenDate("date",n);

                // 设置顶部文本指示选中日期的当年当月
                toggleTopText("chosenMonth");

                // 初始化日期视图
                initTheDays();
            } else if (eventTag.parentNode.className == "lazzy-next-month") {
                // 先将存储的日期月份减一
                showDataPicker.info.setChosenDate("nextMonth");
                // 再更改存储的日期为该span对应的日期 
                n = parseInt(eventTag.innerHTML,0);
                showDataPicker.info.setChosenDate("date",n);

                // 设置顶部文本指示选中日期的当年当月
                toggleTopText("chosenMonth");

                // 初始化日期视图
                initTheDays();
            } else if (eventTag.className == "lazzy-date-text") {
                // 更改存储的日期为该span对应的日期 
                n = parseInt(eventTag.innerHTML,0);
                showDataPicker.info.setChosenDate("date",n);

                // 初始化日期视图
                initTheDays();
            }
        });

        // 给时间输入框的单击事件添加交互功能
        addHandler(time, "click", function(event) {
            var event = event || window.event,
                eventTag = event.srcElement || event.target,
                hours = parseInt(inputArr[0].value,0), // 获得小时输入框的值
                minutes = parseInt(inputArr[1].value,0), // 获得分钟输入框的值
                seconds = parseInt(inputArr[2].value,0), // 获得秒钟输入框的值
                // 点击输入框发生时间溢出时影响的天数，初始为0，即不影响
                // 例如23点时再次点击增加1小时，则小时置零，天数需要加1
                effectDates = 0,
                chosenDate = showDataPicker.info.getChosenDate(), // 获得日期对象（存储的时间）
                // 设置定时器的返回数，用于取消定时器
                oDate, clock;

            // 连续触发点击事件时（取消前一个定时器）延迟更新（存储的时间）
            if (showDataPicker.info.getClock()) {
                clearTimeout(showDataPicker.info.getClock());
            }

            // 进行事件代理
            // 对时分秒进行加减的逻辑稍微有些不同
            if (eventTag.parentNode.className == "lazzy-time-hours") {

                // 二次代理
                if  (eventTag.className == "lazzy-top-triangle") {

                    // 点击上三角，当小于23点的时候直接做加1操作，当等于23时重置为0点，同时effectDates加1
                    if (hours < 23) {
                        hours += 1;
                        inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                    } else if (hours === 23) {
                        effectDates += 1;
                        inputArr[0].value = "00";
                    }
                } else if (eventTag.className == "lazzy-bottom-triangle") {

                    // 点击下三角，当大于0点的时候直接做减1操作，当等于0时重置为23点，同时effectDates减1
                    if (hours > 0) {
                        hours -= 1;
                        inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                    } else if (hours === 0) {
                        effectDates -= 1;
                        inputArr[0].value = 23;
                    }
                }
            } else if (eventTag.parentNode.className == "lazzy-time-minutes") {
                
                // 二次代理
                if  (eventTag.className == "lazzy-top-triangle") {

                    // 点击上三角，当小于59分钟的时候直接做操作，当等于59分钟的时候设置分钟为0分，并对小时进行加1操作
                    if (minutes < 59) {
                        minutes += 1;
                        inputArr[1].value = (minutes < 10) ? ("0" + minutes) : minutes;
                    } else if (minutes === 59) {

                        if (hours < 23) {
                            hours += 1;
                            inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                        } else if (hours === 23) {
                            effectDates += 1;
                            inputArr[0].value = "00";
                        }

                        inputArr[1].value = "00";
                    }
                } else if (eventTag.className == "lazzy-bottom-triangle") {

                    // 点击下三角，当大于0分钟的时候直接做操作，当等于0分钟的时候设置分钟为59分，并对小时进行减1操作
                    if (minutes > 0) {
                        minutes -= 1;
                        inputArr[1].value = (minutes < 10) ? ("0" + minutes) : minutes;
                    } else if (minutes === 0) {

                        if (hours > 0) {
                            hours -= 1;
                            inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                        } else if (hours === 0) {
                            effectDates -= 1;
                            inputArr[0].value = 23;
                        }

                        inputArr[1].value = "59";
                    }
                }
            } else if (eventTag.parentNode.className == "lazzy-time-seconds") {
                
                // 二次代理
                if  (eventTag.className == "lazzy-top-triangle") {

                    // 点击上三角，当小于59秒钟的时候直接做操作，当等于59秒钟的时候设置秒钟为0分，并对分钟进行加1操作
                    if (seconds < 59) {
                        seconds += 1;
                        inputArr[2].value = (seconds < 10) ? ("0" + seconds) : seconds;
                    } else if (seconds === 59) {

                        if (minutes < 59) {
                            minutes += 1;
                            inputArr[1].value = (minutes < 10) ? ("0" + minutes) : minutes;
                        } else if (minutes === 59) {

                            if (hours < 23) {
                                hours += 1;
                                inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                            } else if (hours === 23) {
                                effectDates += 1;
                                inputArr[0].value = "00";
                            }

                            inputArr[1].value = "00";
                        }

                        inputArr[2].value = "00";
                    }
                } else if (eventTag.className == "lazzy-bottom-triangle") {

                    // 点击下三角，当大于1秒钟的时候直接做操作，当等于0秒钟的时候设置秒钟为59分，并对分钟进行减1操作
                    if (seconds > 0) {
                        seconds -= 1;
                        inputArr[2].value = (seconds < 10) ? ("0" + seconds) : seconds;
                    } else if (seconds === 0) {

                        if (minutes > 0) {
                            minutes -= 1;
                            inputArr[1].value = (minutes < 10) ? ("0" + minutes) : minutes;
                        } else if (minutes === 0) {

                            if (hours > 0) {
                                hours -= 1;
                                inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                            } else if (hours === 0) {
                                effectDates -= 1;
                                inputArr[0].value = 23;
                            }

                            inputArr[1].value = "59";
                        }

                        inputArr[2].value = "59";
                    }
                }
            }

            // 如果“日”被改变了，则调用initTheDays函数初始化一下日期视图(只是视觉效果，实际还是有定时器决定是否存储)
            if (effectDates) {
                oDate = chosenDate.getDate();
                chosenDate.setDate(oDate + effectDates);
                initTheDays(chosenDate);
            }

            // 对点击事件处理完的2秒后更新（存储的时间）
            // 设置2秒后执行时为了避免用户连续点击造成频繁更改的情况
            // 对time对象的任意单击事件都会触发该定时器，但是我认为这点性能损耗影响不大
            // 通过匿名函数封装，给setTimeOutHandler传入参数
            clock = setTimeout(function(){
                setTimeOutHandler(effectDates);
            },2000);

            // 将该定时器存储为showDataPicker函数的属性
            showDataPicker.info.setClock(clock);
        });

        // 由于change事件冒泡的兼容性（IE6 IE7 IE8 IE9(Q)不支持冒泡），而监听键盘事件不能准确判断用户意图
        // 故最后选择分别监听change事件
        // 还有个备选方案——父元素同时代理change事件（针对IE 9+）和focusout事件（针对IE 9及以下）
        addHandler(inputArr[0], "change", function(event) {
            changeHandler(event);
        });

        addHandler(inputArr[1], "change", function(event) {
            changeHandler(event);
        });

        addHandler(inputArr[2], "change", function(event) {
            changeHandler(event);
        });

        function changeHandler(event) {
            var clock;


            // 设置checkOut返回一个数字，如果为1则日期加1天，-1则减一天，0则不修改日期

            // 连续触发change事件时（取消前一个定时器）延迟更新（存储的时间）
            if (showDataPicker.info.getClock) {
                clearTimeout(showDataPicker.info.getClock());
            }

            // 先校验用户输入合法性
            checkOut(event);

            // checkOut();处理完的2秒后更新（存储的时间）
            // 设置2秒后执行时为了避免用户连续修改造成无效更改的情况
            clock = setTimeout(setTimeOutHandler,2000);

            // 将该定时器存储为showDataPicker函数的属性
            showDataPicker.info.setClock(clock);

            // 简单校验用户输入有效性函数
            function checkOut(event) {
                var event = event || window.event,
                    eventTag = event.srcElement || event.target,
                    // 重新对输入框进行取值
                    hours = parseInt(inputArr[0].value,0),
                    minutes = parseInt(inputArr[1].value,0),
                    seconds = parseInt(inputArr[2].value,0);

                if (eventTag === inputArr[0]) {

                    // 对用户输入的小时数进行简单的有效性校验并直接作出更正
                    if (isNaN(hours) || hours < 0) {
                        inputArr[0].value = "00";
                    } else if (hours > 23) {
                        inputArr[0].value = "23";
                    } else {
                        inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                    }
                } else if (eventTag === inputArr[1]) {

                    // 对用户输入的小时数进行简单的有效性校验并直接作出更正
                    if (isNaN(minutes) || minutes < 0) {
                        inputArr[1].value = "00";
                    } else if (minutes > 59) {
                        inputArr[1].value = "59";
                    } else {
                        inputArr[1].value = (minutes < 10) ? ("0" + minutes) : minutes;
                    }
                } else if (eventTag === inputArr[2]) {

                    // 对用户输入的小时数进行简单的有效性校验并直接作出更正
                    if (isNaN(seconds) || seconds < 0) {
                        inputArr[2].value = "00";
                    } else if (seconds > 59) {
                        inputArr[2].value = "59";
                    } else {
                        inputArr[2].value = (seconds < 10) ? ("0" + seconds) : seconds;
                    }
                }
            }

        }

        // 切换顶部年月显示文本
        function toggleTopText(state) {
            var datePicker = document.getElementById("lazzy-date-picker"),
                year = gClass("lazzy-year",datePicker)[0],
                span = gClass("lazzy-date-text",year)[0],
                chosenDate = showDataPicker.info.getChosenDate(),
                str;

            switch(state) {
                case "currentYear":
                case "lastYear":
                case "nextYear":
                    // 三种情况均执行下面语句
                    str = chosenDate.getFullYear() + "年";
                    span.innerHTML = str;
                    break;

                case "currentMonth":
                case "lastMonth":
                case "nextMonth":
                case "chosenMonth":
                    // 三种情况均执行下面语句
                    str = chosenDate.getFullYear() + "年" + (chosenDate.getMonth() + 1) + "月";
                    span.innerHTML = str;
                    break;

                // 没有default
            }
        }

        // 切换展示月份列表还是日期列表
        function toggleMonthDisplay(state) {

            if (state == "show") {
                weekeday.className = "lazzy-weekeday lazzy-hidden";               
                day.className = "lazzy-day lazzy-hidden";               
                month.className = "lazzy-month";               
            } else if (state == "hide") {
                month.className = "lazzy-month lazzy-hidden"; 
                weekeday.className = "lazzy-weekeday"; 
                day.className = "lazzy-day";               
            }
        }

        // 专门供定时器调用的处理函数
        // 该函数只做一个操作：更新存储的时间
        // 这个可选的参数为输入框发生溢出时对"日"的影响
        function setTimeOutHandler(effectDates) {
            // 重新对输入框进行取值
            var hours = parseInt(inputArr[0].value,0),
                minutes = parseInt(inputArr[1].value,0),
                seconds = parseInt(inputArr[2].value,0),
                chosenDate = showDataPicker.info.getChosenDate(), // 获得日期对象（存储的时间）
                oDate; // 原始存储的“日”

            chosenDate.setHours(hours);
            chosenDate.setMinutes(minutes);
            chosenDate.setSeconds(seconds);

            // 如果“日”被改变了，则更改存储的“日”
            if (effectDates) {
                oDate = chosenDate.getDate();
                chosenDate.setDate(oDate + effectDates);
            }

            showDataPicker.info.setChosenDate(chosenDate);
        }
    }

    // 根据当前时间初始化日期选择器
    function initThePicker() {
        var datePicker = document.getElementById("lazzy-date-picker"),
            theTime, // 初始化日期选择器的时间
            lazzyYear,lazzyTime,spanArr,inputArr,
            str;

        // 如果日期选择器没有被初始化过，使用当前函数调用时间进行初始化，然后将是否曾经被初始化标识为true
        if (showDataPicker.info.getHasBeanInitialized() === false) {

            // 将初始化发生时的时间记录为被选中时间
            showDataPicker.info.setChosenDate(new Date());

            // 然后设置该目标对象对应的日期选择器是否曾经被初始化标识为true
            showDataPicker.info.setHasBeanInitialized(true);
        } 

        theTime = showDataPicker.info.getChosenDate();

        // 初始化顶部年月
        lazzyYear = gClass("lazzy-year")[0];
        spanArr = gTag("span",lazzyYear);
        str = formatMonth(theTime);
        spanArr[0].innerHTML = str;

        // 初始化月份视图的当前月
        initTheMonths();

        // 星期是固定的不需要初始化
        // 初始化天数部分，首先输出实际的日期分布，然后给当天增加样式
        initTheDays();

        // 初始化时间部分
        lazzyTime = gClass("lazzy-time")[0];
        inputArr = gTag("input",lazzyTime);
        inputArr[0].value = (theTime.getHours() < 10) ? ("0" + theTime.getHours()) : theTime.getHours();
        inputArr[1].value = (theTime.getMinutes() < 10) ? ("0" + theTime.getMinutes()) : theTime.getMinutes();
        inputArr[2].value = (theTime.getSeconds() < 10) ? ("0" + theTime.getSeconds()) : theTime.getSeconds();

        // 获得给定日期的年月并格式化成字符串的函数
        function formatMonth(date) {
            var str,year,month;

            year = date.getFullYear();
            month = date.getMonth() +1;
            str = year + "年" + month +"月";
            return str;
        }
    }

    // 根据调用函数的对象来确定日期选择器的位置
    function locationThePicker(bindTag) {
        var rect = bindTag.getBoundingClientRect(),
            datePicker = document.getElementById("lazzy-date-picker"),
            scroll = getScrollOffsets(), // 获取页面滚动条位置
            top,left,str;

        top = rect.bottom + scroll.y;
        left = rect.left + scroll.x;
        str = "top:" + top + "px;left:" + left + "px";
        datePicker.setAttribute("style",str);
    }

    // 让生成的日期选择器可见
    function showThePicker() {
        var datePicker = document.getElementById("lazzy-date-picker");
        datePicker.className = "";
    }

    // 根据日期控件存放的日期来刷新月份列表的显示情况
    // 允许传入一个可选的日期对象参数，如果传入参数，则用传入的日期初始化
    function initTheMonths(date) {
        var datePicker = document.getElementById("lazzy-date-picker"),
            lazzyMonth = gClass("lazzy-month")[0],
            liArr = gTag("li",lazzyMonth),
            date = date || showDataPicker.info.getChosenDate(),
            today = new Date(),
            i;

        for (i = 0; i < liArr.length; i += 1) {
            // 重置所有月份列表节点类名为空
            liArr[i].className = "";
        }

        // 如果被存储的日期的年份和当天的年份是同一年（当月在当前视图内）
        if (date.getFullYear() === today.getFullYear()) {
            liArr[today.getMonth()].className = "lazzy-current";
        }

        // 给选中日期对应的月份增加样式
        // 可以直接把当月的样式覆盖掉，因为两者样式重叠也只能显示被选中的样式
        liArr[date.getMonth()].className = "lazzy-chosen";
    }

    // 根据日期控件存放的日期来刷新当前视图的日期显示情况,如果是当月还给当天增加样式
    // 允许传入一个可选的日期对象参数，如果传入参数，则用传入的日期初始化
    function initTheDays(date) {
        var today = new Date(),
            date = date || showDataPicker.info.getChosenDate(),
            firstWeekday = getTheWeekedayOfFirstDay(date),
            lastDay = getTheLastDayOfLastMonth(date),
            currentDays = getDaysInMonth(date),
            lastDays,nextDays,//视图中上个月与下个月的天数
            lazzyDay,liArr,spanArr,//需要操作的DOM元素
            len,i,j;

        // 确保存储的日期和初始化的日期一致
        // showDataPicker.info.setChosenDate(date);
        lazzyDay = gClass("lazzy-day")[0];
        liArr = gTag("li",lazzyDay);
        spanArr = gTag("span",lazzyDay);

        // 如果该月第一天为周一，则第一行均为上个月的日期，
        if (firstWeekday === 0) {
            lastDays = 7;
        } else {
            lastDays = firstWeekday;
        }

        len = lastDays;
        j = lastDay - lastDays + 1;
        //给上个月的日期增加样式并输出日期
        for (i = 0; i < len; i += 1) {
            liArr[i].className = "lazzy-last-month";
            spanArr[i].innerHTML = j++;
        }

        len += currentDays;
        j = 1;
        for (/*空语句*/;i < len; i += 1) {

            // 清除当月日期对应li的类名，防止多次初始化导致的bug
            liArr[i].className = "";
            spanArr[i].innerHTML = j++;
        }

        // 如果被存储的日期的月份和当天的月份是同一个月（当天在当前视图内）
        if (date.getMonth() === today.getMonth()) {
            liArr[today.getDate() + lastDays - 1].className = "lazzy-current";
        }

        // 可以直接把当天的样式覆盖掉，因为两者样式重叠也只能显示被选中的样式
        liArr[date.getDate() + lastDays - 1].className = "lazzy-chosen";

        len = 42;//总共7*6=42天
        j = 1;
        for (/*空语句*/; i < len; i += 1) {
            liArr[i].className = "lazzy-next-month";
            spanArr[i].innerHTML = j++;
        }

        // 获取当前日期所处月份的总天数的函数
        function getDaysInMonth(date) {
            var year = date.getFullYear(),
                month = date.getMonth(),
                days,
                is_leap_year = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)),
                day_list=[];
            day_list = [31,(is_leap_year ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];//枚举出所有可能的天数
            days = day_list[month];
            return days;
        }

        // 获取上个月的最后一天为几号的函数
        function getTheLastDayOfLastMonth(date) {
            var date = new Date(date),//通过毫秒数创建一个日期，避免修改原对象
                lastDay;
            date.setDate(0);
            return date.getDate();
        }

        // 获取当月第一天为周几的函数
        function getTheWeekedayOfFirstDay(date) {
            var date = new Date(date),//通过毫秒数创建一个日期，避免修改原对象
                weekeday = [6,0,1,2,3,4,5];//将js默认的每周从周日开始改为从周一开始。
            date.setDate(1);
            return weekeday[date.getDay()];
        }
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
        var node = node || document,
            results=[],
            i;
        
        if (node.getElementsByClassName) {
            //如果浏览器支持getElementsByClassName方法，则使用浏览器提供的方法
            return node.getElementsByClassName(classname);
        } else {
                reg = new RegExp("\\b"+classname+"\\b"),
                elems = null;
                
            if (!document.getElementsByTagName) return false;
            elems=node.getElementsByTagName("*");
            
            for (i = 0; i < elems.length; i++) {
                if (reg.test(elems[i].className)) {
                    results[results.length] = elems[i];
                }
            }
            return results;
        }
    }

    // 封装添加事件句柄的函数
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }

    // 以一个对象的x和y属性的方式返回滚动条的偏移量
    function getScrollOffsets(w) {
        // 使用指定的窗口，如果不带参数则使用当前的窗口
        var w = w || window,
            d = w.document;

        // 除了IE 8及更早的版本外
        if (w.pageXOffset !== null) {
            return {
                x: w.pageXOffset,
                y: w.pageYOffset
            };
        }

        // 标准模式下的IE（或任何浏览器 ）
        if (document.compatMode === "CSS1Compat") {
            return {
                x: d.documentElement.scrollLeft,
                y: d.documentElement.scrollTop
            };
        }

        // 对怪异模式下的浏览器
        return {
            x: d.body.scrollLeft,
            y: d.body.scrollTop
        };
    }
}

// 给showDataPicker函数定义一个info属性来保存需要持久化的数据
showDataPicker.info = (function() {
    var information = {};

    // 第一次触发showDataPicker函数时设置hasBeanInitialized标识为false
    information.hasBeanInitialized = false;

    return {

        // 设置click事件或者change事件的计时器(由于本函数中两个事件实际操作的是同一个对象，故共用一套定时器)
        setClock: function(clock) {
            information.clickClock = clock;
        },

        // 获得click事件或者change事件的计时器
        getClock: function() {
            return information.clickClock;
        },

        // 设置日期选择器被选中的时间
        // 可以传入一个日期对象或者字符串，如果是字符串则会匹配快捷指令，匹配成功同样可以进行设置
        // 第二个参数可选，配合“month”或者“date”快捷指令设置为的第n月或者第n天，对于“month”n从0开始，对于“date”n从1开始
        setChosenDate: function(date/*shortcut|date*/,n) {
            var m, oYear, oMonth, oDate ;
            var datePicker = document.getElementById("lazzy-date-picker");

            if (typeof date === "object") { // 将给定日期的值赋给chosenDate，而不是直接将chosenDate指向date
                information.chosenDate = new Date(date);
            } else {

                // 先获得原始的年、月、日
                oYear = information.chosenDate.getFullYear();
                oMonth = information.chosenDate.getMonth();
                oDate = information.chosenDate.getDate();

                switch(date) {
                    case "lastMonth": // 上个月 
                        information.chosenDate.setMonth(oMonth - 1);
                        break;

                    case "nextMonth": // 下个月
                        information.chosenDate.setMonth(oMonth + 1);
                        break;

                    case "lastYear": // 去年
                        information.chosenDate.setFullYear(oYear - 1);
                        break;

                    case "nextYear": // 明年
                        information.chosenDate.setFullYear(oYear + 1);
                        break;

                    case "month": // 本年的（n+1)月份

                        // 对n做简单的校验以及修改
                        // 转换为整数之后，假定除了NaN之外的均为预期数字，即使是大于11或者小于0的数
                        m = isNaN(parseInt(n, 0)) ? 0 : parseInt(n, 0);

                        information.chosenDate.setMonth(m);
                        break;

                    case "date": // 本月的n号

                        // 对n做简单的校验以及修改
                        // 转换为整数之后，假定除了NaN之外的均为预期数字，即使是大于31或者小于0的数
                        m = isNaN(parseInt(n, 0)) ? 1 : parseInt(n, 0);

                        information.chosenDate.setDate(m);
                        break;

                    // 没有default
                }

                // 通过快捷指令（修改年份或者月份）设置日期后的“日”发生了变化则说明日期出现溢出现象
                // 例如：将2017.07.31修改为上个月，通过setMonth（5），实际得到2017.07.01。
                // 这这情况肯定是不对的，我的处理是将日期强制修正为上个月的月尾，级通过setDate(0)实现。
                if (information.chosenDate.getDate() !== oDate && date !== "date") {
                    information.chosenDate.setDate(0);
                }
            }

            datePicker.setAttribute("data-lazzy-date",information.chosenDate);

        },

        // 获得日期选择器被选中的时间
        getChosenDate: function() {
            // 返回一份information.chosenDate的拷贝，防止内部的chosenDate被直接修改
            return new Date(information.chosenDate);
        },

        // 设置临时存储时间，只作为视觉效果temporaryDate
        setTemporaryDate: function(temporaryDate) {
            information.temporaryDate = temporaryDate;
        },

        // 获得该目标对象对应的日期选择器是否曾经被初始化的标识
        getTemporaryDate: function() {
            return information.temporaryDate;
        },

        // 设置该目标对象对应的日期选择器是否曾经被初始化
        setHasBeanInitialized: function(aBoolean) {
            information.hasBeanInitialized = aBoolean;
        },

        // 获得该目标对象对应的日期选择器是否曾经被初始化的标识
        getHasBeanInitialized: function() {
            return information.hasBeanInitialized;
        },

        counter: function(){/*test*/
            var n = 0;
            return {
                count: function() {
                    return n += 1;
                }
            }
        }
    }
}());


// initpicker在绑定多个函数时也发生错误
