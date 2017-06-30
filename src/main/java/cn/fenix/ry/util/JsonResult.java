package cn.fenix.ry.util;

import java.io.Serializable;

public class JsonResult<T> 
	implements Serializable{
	private static final long serialVersionUID = 6380914148822193542L;
	public static final int SUCCESS=200;
	public static final int ERROR=100;
	
	private int status;
	private T rows;
	public T getRows() {
		return rows;
	}

	public void setRows(T rows) {
		this.rows = rows;
	}

	private String msg;
	
	public JsonResult() {
	}
	
	public JsonResult(T t){
		status = SUCCESS;
		rows = t;
		msg="";
	}
	
	public JsonResult(Throwable e){
		status = ERROR;
		rows=null;
		msg = e.getMessage();
	}

	public JsonResult(int status, 
			Throwable e) {
		this.status = status;
		this.msg =e.getMessage();
		this.rows = null;
	}

	public int getstatus() {
		return status;
	}

	public void setstatus(int status) {
		this.status = status;
	}
	


	public String getmsg() {
		return msg;
	}
	
	public void setmsg(String msg) {
		this.msg = msg;
	}
}
