// JavaScript Document
	function changecolor(){
     // 鼠标移动改变背景,可以通过给每行绑定鼠标移上事件和鼠标移除事件来改变所在行背景色。
        var myrow=document.getElementsByTagName("tr");
        for(var i=0;i<myrow.length;i++){
			var bgColor=myrow[i].style.backgroundColor;
            myrow[i].setAttribute("onmouseover",'javascript:this.style.backgroundColor="#eed3d2"');
            myrow[i].setAttribute("onmouseout",'javascript:this.style.backgroundColor=bgColor');
        }
}