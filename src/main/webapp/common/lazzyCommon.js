/*��װ��ҳ����غ���,����Ҫ��һ���¼�ʱֻ������һ���������*/
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

/*��װͨ��id����Ԫ�صķ���*/
function getById(id){
	if (!document.getElementById||!document.getElementById(id)) {
		return false;
	}
	return document.getElementById(id);
}