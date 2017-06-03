package cn.fenix.ry.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.util.JsonResult;

@Controller
@RequestMapping("order")
public class OrderController {
	@Resource
	private OrderService orderService;
	
	@RequestMapping("/list.do")
	@ResponseBody
	public JsonResult<List<Map<String, Object>>>
	listOrder(){
	List<Map<String, Object>> list=
		orderService.listOrderInformation();
	return new JsonResult<List<Map<String,Object>>>(list);
	}
}
