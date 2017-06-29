package cn.fenix.ry.controller;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.fenix.ry.entity.Schedule;
import cn.fenix.ry.service.ScheduleService;
import cn.fenix.ry.util.JsonResult;


@Controller
@RequestMapping("schedule")
public class ScheduleController extends AbstractController{
	
	@Resource
	ScheduleService scheduleService;
	@RequestMapping("/find.do")
	@ResponseBody
	/**
	 *根据订单号和产品名称查出进度表
	 */
	public JsonResult<List<Map<String,Object>>> findSchedule(String orderNo,String productName)throws Exception {
		List<Map<String,Object>> list=scheduleService.listSchedule(orderNo,productName);
		return new JsonResult<List<Map<String,Object>>>(list);
	}
}
