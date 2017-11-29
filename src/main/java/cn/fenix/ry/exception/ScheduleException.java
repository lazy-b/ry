package cn.fenix.ry.exception;

public class ScheduleException extends RuntimeException{
	private static final long serialVersionUID = 7725399423783176320L;

	public ScheduleException() {
		super();
	}

	public ScheduleException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ScheduleException(String message, Throwable cause) {
		super(message, cause);
	}

	public ScheduleException(String message) {
		super(message);
	}

	public ScheduleException(Throwable cause) {
		super(cause);
	}
	
}
