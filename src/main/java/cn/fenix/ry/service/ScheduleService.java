package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.Schedule;

public interface ScheduleService {
	//根据订单号和产品名称查出进度表
	List<Map<String,Object>> listSchedule(String orderNo,String productName) throws Exception;
	
}
