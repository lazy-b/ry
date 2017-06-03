package cn.fenix.ry.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.fenix.ry.service.DeliveryTrackingService;
import cn.fenix.ry.util.JsonResult;

@Controller
@RequestMapping("delivery")
public class DeliveryTrackingController {
	@Resource
	private DeliveryTrackingService deliveryTrackingService;
	@ResponseBody
	@RequestMapping("/deliverylist.do")
	public JsonResult<List<Map<String,Object>>> listDelivery(){
		List<Map<String,Object>> list=deliveryTrackingService.listdeliveryTracking();
		
		return new JsonResult<List<Map<String,Object>>>(list);
	}
}
