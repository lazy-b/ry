package cn.fenix.ry.service;

import java.io.InputStream;


import org.springframework.web.multipart.MultipartFile;

import cn.fenix.ry.util.CustomResult;



public interface OrderInfoService{
	public int  OrderInfo(InputStream in, MultipartFile file) throws Exception;
}
