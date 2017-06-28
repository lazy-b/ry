package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.Schedule;

public interface ScheduleService {
	//查询进度
	List<Map<String,Object>> listSchedule(String orderNo,String productName) throws Exception;
	
}
