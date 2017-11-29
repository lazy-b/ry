package cn.fenix.ry.controller;

import java.io.InputStream;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import cn.fenix.ry.service.UploadService;

@Controller
@RequestMapping("upload")
public class UploadController extends AbstractController {
	@Resource
	private UploadService uploadService;
	@RequestMapping("/corder.do")
	@ResponseBody
	public void testOrderInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//将HttpServletRequest 请求转为MultipartHttpServlet;
				MultipartHttpServletRequest multipartRequest=(MultipartHttpServletRequest)request;
				//获取请求文件
				MultipartFile file=multipartRequest.getFile("uploadfile");
				String fileName=file.getOriginalFilename();
				if(file.isEmpty()){							 
					throw new Exception("文件不存在");
				}
				//获取输入流
				InputStream in=file.getInputStream();
				response.setCharacterEncoding("utf-8");  //防止ajax接受到的中文信息乱码  
				int count= uploadService.OrderInfo(in, file);
				String date = "";
				date += "{\"status\":";
				PrintWriter out = null;  
		        out = response.getWriter();
		        if(count!=0){
                    date += "\"200\",\"data\":\"null\",\"msg\":\"导入" + count + "条成功！\"}";
                    out.print(date);  
                }else{
                    date += "\"100\",\"data\":\"null\",\"msg\":\"导入文件失败，请检查后重新导入或者联系管理员！\"}";
                    out.print(date);  
                }
                out.flush();  
                out.close(); 
	}
	
}