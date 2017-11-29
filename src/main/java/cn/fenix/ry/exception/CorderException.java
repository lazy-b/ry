package cn.fenix.ry.exception;

public class CorderException extends RuntimeException{
	private static final long serialVersionUID = 7725399423783176320L;

	public CorderException() {
		super();
	}

	public CorderException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public CorderException(String message, Throwable cause) {
		super(message, cause);
	}

	public CorderException(String message) {
		super(message);
	}

	public CorderException(Throwable cause) {
		super(cause);
	}
	
}
