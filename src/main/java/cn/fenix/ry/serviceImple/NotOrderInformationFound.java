package cn.fenix.ry.serviceImple;

public class NotOrderInformationFound extends RuntimeException {

	private static final long serialVersionUID = -3594342790625995908L;

	public NotOrderInformationFound() {
		
	}
	public NotOrderInformationFound(String message) {
		super(message);
		
	}

	public NotOrderInformationFound(Throwable cause) {
		super(cause);
		
	}

	public NotOrderInformationFound(String message, Throwable cause) {
		super(message, cause);
		
	}

	public NotOrderInformationFound(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);

	}

}
