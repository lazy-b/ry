package cn.fenix.ry.serviceImple;

public class NotParamterException extends RuntimeException {
	private static final long serialVersionUID = -3629230449821211857L;

	public NotParamterException() {
		super();
		
	}

	public NotParamterException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		
	}

	public NotParamterException(String message, Throwable cause) {
		super(message, cause);
		
	}

	public NotParamterException(String message) {
		super(message);
		
	}

	public NotParamterException(Throwable cause) {
		super(cause);
		
	}
	
}
