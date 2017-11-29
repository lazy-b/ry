package cn.fenix.ry.service;

import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface UploadService {
	int  OrderInfo(InputStream in, MultipartFile file) throws Exception;
}
