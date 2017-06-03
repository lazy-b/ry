package cn.fenix.ry.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.fenix.ry.service.ProductTrackingService;
import cn.fenix.ry.util.JsonResult;

@Controller
@RequestMapping("/product")
public class ProductTrackingController{
	@Resource
	private ProductTrackingService productTrackingService;
	@RequestMapping("/tracking.do")
	@ResponseBody
	public JsonResult<List<Map<String,Object>>>listProductTracking(){
		List<Map<String,Object>> list=productTrackingService.listProductTracking();
		return new JsonResult<List<Map<String,Object>>>(list);
	}
}
