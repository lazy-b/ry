package cn.fenix.ry.util;

import java.io.Serializable;

public class JsonResult<T> 
	implements Serializable{
	private static final long serialVersionUID = 6380914148822193542L;
	public static final int SUCCESS=200;
	public static final int ERROR=1;
	
	private int state;
	private T rows;
	public T getRows() {
		return rows;
	}

	public void setRows(T rows) {
		this.rows = rows;
	}

	private String message;
	
	public JsonResult() {
	}
	
	public JsonResult(T t){
		state = SUCCESS;
		rows = t;
		message="";
	}
	
	public JsonResult(Throwable e){
		state = ERROR;
		rows=null;
		message = e.getMessage();
	}

	public JsonResult(int state, 
			Throwable e) {
		this.state = state;
		this.message = e.getMessage();
		this.rows = null;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}
	


	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
