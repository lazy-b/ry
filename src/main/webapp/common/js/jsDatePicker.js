// 功能支持IE5+
// 样式支持IE8+
// 所有事件处理均未阻止冒泡以及默认操作，如有影响页面其它事件可自行阻止


function showDataPicker(event) {
    "use strict"
    var event = event || window.event,
        bindTag = event.srcElement || event.target;
    if (!document.getElementById || !document.createElement || !document.createTextNode || !document.createDocumentFragment) return false;
    if (document.getElementById("lazzy-date-picker")) return false;

    // 创建日期控件
    createThePicker();

    // 初始化日期控件
    initThePicker();

    // 将日期控件添加到该输入框的下方
    locationThePicker(bindTag);
    
    // 给日期控件绑定一些交互事件
    bindOnclickEvent();
    
    // 当全部结构以及功能都准备完毕后将日期选择器展示出来，提高用户体验
    showThePicker();

    // 将被选中的日期输出到目标元素
    // outputTheTime(event);

    // 让生成的日期选择器可见
    function showThePicker() {
        var datePicker = document.getElementById("lazzy-date-picker");
        datePicker.className = "";
    }

    // 实现日期选择器的功能
    function bindOnclickEvent() {
        var datePicker = document.getElementById("lazzy-date-picker"),
            year = gClass("lazzy-year",datePicker)[0],
            month = gClass("lazzy-month",datePicker)[0],
            weekeday = gClass("lazzy-weekeday",datePicker)[0],
            day = gClass("lazzy-day",datePicker)[0],
            time = gClass("lazzy-time",datePicker)[0],
            inputArr = gTag("input", time), // 获得三个输入框的数组列表
            hours = parseInt(inputArr[0].value,0), // 获得小时输入框的值
            minutes = parseInt(inputArr[1].value,0), // 获得分钟输入框的值
            seconds = parseInt(inputArr[2].value,0), // 获得秒钟输入框的值
            chosenDate = getChosenDate(); // 获得日期对象（存储的时间）

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
                    setChosenDate("lastYear");
                    // 设置顶部文本指示去年
                    toggleTopText("lastYear");
                    // 初始化月份列表视图
                    initTheMonths();
                } else if (eventTag.className == "lazzy-right-triangle") {
                    // 更改存储的日期为明年对应日期
                    setChosenDate("nextYear");
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
                    setChosenDate("lastMonth");
                    // 设置顶部文本指示上一个月
                    toggleTopText("lastMonth");
                    // 初始化日期视图
                    initTheDays();
                } else if (eventTag.className == "lazzy-right-triangle") {
                    // 更改存储的日期为下个月的对应日期
                    setChosenDate("nextMonth");
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
                setChosenDate("month",n);

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
                setChosenDate("lastMonth");
                // 再更改存储的日期为该span对应的日期 
                n = parseInt(eventTag.innerHTML,0);
                setChosenDate("date",n);

                // 设置顶部文本指示选中日期的当年当月
                toggleTopText("chosenMonth");

                // 初始化日期视图
                initTheDays();
            } else if (eventTag.parentNode.className == "lazzy-next-month") {
                // 先将存储的日期月份减一
                setChosenDate("nextMonth");
                // 再更改存储的日期为该span对应的日期 
                n = parseInt(eventTag.innerHTML,0);
                setChosenDate("date",n);

                // 设置顶部文本指示选中日期的当年当月
                toggleTopText("chosenMonth");

                // 初始化日期视图
                initTheDays();
            } else if (eventTag.className == "lazzy-date-text") {
                // 更改存储的日期为该span对应的日期 
                n = parseInt(eventTag.innerHTML,0);
                setChosenDate("date",n);

                // 初始化日期视图
                initTheDays();
            }
        });

        // 给时间输入框的单击事件添加交互功能
        addHandler(time, "click", function(event) {
            var event = event || window.event,
                eventTag = event.srcElement || event.target,
                clock;

            // 连续触发点击事件时（取消前一个定时器）延迟更新（存储的时间）
            if (showDataPicker.info.getClickClock()) {
                clearTimeout(showDataPicker.info.getClickClock());
            }

            // 进行事件代理
            // 对时分秒进行加减的逻辑稍微有些不同，故不做封装
            if (eventTag.parentNode.className == "lazzy-time-hours") {

                // 二次代理
                if  (eventTag.className == "lazzy-top-triangle") {

                    // 点击上三角，当小于23点的时候才做操作,也就是对小时不做溢出处理
                    if (hours < 23) {
                        hours += 1;
                        inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                    } 
                } else if (eventTag.className == "lazzy-bottom-triangle") {

                    // 点击下三角，当大于0点的时候才做操作,也就是对小时不做溢出处理
                    if (hours > 0) {
                        hours -= 1;
                        inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                    }
                }
            } else if (eventTag.parentNode.className == "lazzy-time-minutes") {
                
                // 二次代理
                if  (eventTag.className == "lazzy-top-triangle") {

                    // 点击上三角，当小于59分钟的时候直接做操作，当等于59分钟的时候设置分钟为0分，并对小时进行加1操作（不管操作成不成功）
                    if (minutes < 59) {
                        minutes += 1;
                        inputArr[1].value = (minutes < 10) ? ("0" + minutes) : minutes;
                    } else if (minutes === 59) {

                        if (hours < 23) {
                            hours += 1;
                            inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                        }
                        inputArr[1].value = "00";
                    }
                } else if (eventTag.className == "lazzy-bottom-triangle") {

                    // 点击下三角，当大于0分钟的时候直接做操作，当等于0分钟的时候设置分钟为59分，并对小时进行减1操作（不管操作成不成功）
                    if (minutes > 0) {
                        minutes -= 1;
                        inputArr[1].value = (minutes < 10) ? ("0" + minutes) : minutes;
                    } else if (minutes === 0) {

                        if (hours > 0) {
                            hours -= 1;
                            inputArr[0].value = (hours < 10) ? ("0" + hours) : hours;
                        }
                        inputArr[1].value = "59";
                    }
                }
            } else if (eventTag.parentNode.className == "lazzy-time-seconds") {
                
                // 二次代理
                if  (eventTag.className == "lazzy-top-triangle") {

                    // 点击上三角，当小于59秒钟的时候直接做操作，当等于59秒钟的时候设置秒钟为0分，并对分钟进行加1操作（可能发生溢出）
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
                            }
                            inputArr[1].value = "00";
                        }
                        inputArr[2].value = "00";
                    }
                } else if (eventTag.className == "lazzy-bottom-triangle") {

                    // 点击下三角，当大于1秒钟的时候直接做操作，当等于0秒钟的时候设置秒钟为59分，并对分钟进行减1操作（可能发生溢出）
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
                            }
                            inputArr[1].value = "59";
                        }
                        inputArr[2].value = "59";
                    }
                }
            }

            

            // 对点击事件处理完的2秒后更新（存储的时间）
            // 设置2秒后执行时为了避免用户连续点击造成频繁更改的情况
            // 对输入框的单击事件也会触发该定时器，但是我认为这点性能损耗影响不大
            clock = setTimeout(setTimeOutHandler,2000);

            // 将该定时器存储为showDataPicker函数的属性
            showDataPicker.info.setClickClock(clock);
        });

        // 由于change事件冒泡的兼容性（IE6 IE7 IE8 IE9(Q)不支持冒泡），而监听键盘事件不能准确判断用户意图
        // 故最后选择分别监听change事件
        addHandler(inputArr[0], "change", function(event) {
            changeHandler(event);
        });

        addHandler(inputArr[1], "change", function(event) {
            changeHandler(event);
        });

        addHandler(inputArr[2], "change", function(event) {
            changeHandler(event);
        });

        // 简单校验用户输入有效性函数
        function checkOut(event) {
            var event = event || window.event,
                eventTag = event.srcElement || event.target;

            // 重新对输入框进行取值
            hours = parseInt(inputArr[0].value,0);
            minutes = parseInt(inputArr[1].value,0);
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


        function changeHandler(event) {
            var clock;

            // 连续触发change事件时（取消前一个定时器）延迟更新（存储的时间）
            if (showDataPicker.info.getChangeClock) {
                clearTimeout(showDataPicker.info.getChangeClock());
            }

            // 先校验用户输入合法性
            checkOut(event);

            // checkOut();处理完的2秒后更新（存储的时间）
            // 设置2秒后执行时为了避免用户连续修改造成无效更改的情况
            clock = setTimeout(setTimeOutHandler,2000);

            // 将该定时器存储为showDataPicker函数的属性
            showDataPicker.info.setChangeClock(clock);

        }

        // 切换顶部年月显示文本
        function toggleTopText(state) {
            var datePicker = document.getElementById("lazzy-date-picker"),
                year = gClass("lazzy-year",datePicker)[0],
                span = gClass("lazzy-date-text",year)[0],
                chosenDate = getChosenDate(),
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
        function setTimeOutHandler() {
            // 该函数只做一个操作：根据三个输入框的值更新（存储的时间）
            chosenDate.setHours(hours);
            chosenDate.setMinutes(minutes);
            chosenDate.setSeconds(seconds);
            setChosenDate(chosenDate);
        }
    }

    // 添加事件句柄
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }

    // 根据调用函数的对象来确定日期选择器的位置
    function locationThePicker(bindTag) {
        var rect = bindTag.getBoundingClientRect(),
            datePicker = document.getElementById("lazzy-date-picker"),
            top,left,str;

        top = rect.bottom;
        left = rect.left;
        str = "top:" + top + "px;left:" + left + "px";
        datePicker.setAttribute("style",str);
    }

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
        // 设置一个data-chosen-date属性用来存放被选中的日期,初始化为控件创建时间
        datePicker.setAttribute("data-chosen-date",new Date());
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

    // 根据当前时间初始化日期选择器
    function initThePicker() {
        var datePicker = document.getElementById("lazzy-date-picker"),
            theTime = new Date(),
            // currentDay = theTime.getDate(),
            // currentMonth = theTime.getMonth(),
            lazzyYear,/*lazzyMonth,i,lazzyDay,liArr,*/lazzyTime,spanArr,inputArr,
            str;

        // 初始化被选中时间为日期选择器初始化时间
        datePicker.setAttribute("data-chosen-date",theTime);

        // 初始化顶部年月
        lazzyYear = gClass("lazzy-year")[0];
        spanArr = gTag("span",lazzyYear);
        str = formatMonth(theTime);
        spanArr[0].innerHTML = str;

        // 初始化月份视图的当前月
        initTheMonths(theTime);

        // 星期是固定的不需要初始化
        // 初始化天数部分，首先输出实际的日期分布，然后给当天增加样式
        initTheDays(theTime);

        // 初始化时间部分
        lazzyTime = gClass("lazzy-time")[0];
        inputArr = gTag("input",lazzyTime);
        inputArr[0].value = (theTime.getHours() < 10) ? ("0" + theTime.getHours()) : theTime.getHours();
        inputArr[1].value = (theTime.getMinutes() < 10) ? ("0" + theTime.getMinutes()) : theTime.getMinutes();
        inputArr[2].value = (theTime.getSeconds() < 10) ? ("0" + theTime.getSeconds()) : theTime.getSeconds();
    }

    // 根据日期控件存放的日期来刷新月份列表的显示情况
    // 允许传入一个可选的日期对象参数，如果传入参数，则用传入的日期初始化
    function initTheMonths(date) {
        var datePicker = document.getElementById("lazzy-date-picker"),
            lazzyMonth = gClass("lazzy-month")[0],
            liArr = gTag("li",lazzyMonth),
            date = date || getChosenDate(),
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
            date = date || getChosenDate(),
            firstWeekday = getTheWeekedayOfFirstDay(date),
            lastDay = getTheLastDayOfLastMonth(date),
            currentDays = getDaysInMonth(date),
            lastDays,nextDays,//视图中上个月与下个月的天数
            lazzyDay,liArr,spanArr,//需要操作的DOM元素
            len,i,j;

        // 确保存储的日期和初始化的日期一致
        setChosenDate(date);
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

    // 获取当前日期所处月份的总天数
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
            weekeday = [6,0,1,2,3,4,5];//将js默认的每周从周日开始改为从周一开始。
        date.setDate(1);
        return weekeday[date.getDay()];
    }

    // 获取日期选择器data-chosen-date属性中存储的被选中时间
    function getChosenDate() {
        var datePicker = document.getElementById("lazzy-date-picker"),
            date;
        date = datePicker.getAttribute("data-chosen-date");
        return new Date(date);
    }

    // 设置日期选择器data-chosen-date属性中存储的被选中时间
    // 可以传入一个日期对象或者字符串，如果是字符串则会匹配快捷指令，匹配成功同样可以进行设置
    // 第二个参数可选，配合“month”或者“date”快捷指令设置为的第n月或者第n天，对于“month”n从0开始，对于“date”n从1开始
    function setChosenDate(date/*shortcut|date*/,n) {
        var datePicker = document.getElementById("lazzy-date-picker"),
            currentDate = getChosenDate(),
            newDate = new Date(currentDate),// 一份被选中时间的静态拷贝
            oYear = currentDate.getFullYear(),
            oMonth = currentDate.getMonth(),
            oDate = currentDate.getDate(); 

        if (typeof date === "object") { // 根据给定的日期直接设置
            datePicker.setAttribute("data-chosen-date",date);
        } else {

            switch(date) {
                case "lastMonth": // 上个月 
                    newDate.setMonth(oMonth - 1);
                    break;

                case "nextMonth": // 下个月
                    newDate.setMonth(oMonth + 1);
                    break;

                case "lastYear": // 去年
                    newDate.setFullYear(oYear - 1);
                    break;

                case "nextYear": // 明年
                    newDate.setFullYear(oYear + 1);
                    break;

                case "month": // 明年
                    newDate.setMonth(n);
                    break;

                case "date": // 明年
                    newDate.setDate(n);
                    break;

                // 没有default
            }

            // 通过快捷指令设置日期如发生月份改变且在月尾发生溢出现象则强制修正为对应月尾。
            if (!n && newDate.getDate() !== oDate) {
                newDate.setDate(0);
            }

            datePicker.setAttribute("data-chosen-date",newDate);
        }
    }
}

// 给showDataPicker函数定义一个info属性来保存需要持久化的数据
showDataPicker.info = (function() {
    var info = {};
    return {
        // 设置单击事件的计时器
        setClickClock: function(clock) {
            info.clock = clock;
        },
        // 获得单击事件的计时器
        getClickClock: function() {
            return info.clock;
        },
        // 设置按键事件的计时器
        setChangeClock: function(clock) {
            info.clock = clock;
        },
        // 获得按键事件的计时器
        getChangeClock: function() {
            return info.clock;
        }
    }
}());

