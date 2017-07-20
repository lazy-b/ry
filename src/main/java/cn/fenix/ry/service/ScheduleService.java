package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.Schedule;
import cn.fenix.ry.serviceImple.NotOrderInformationFound;
import cn.fenix.ry.util.CustomResult;

public interface ScheduleService {
	//根据订单号和产品名称查出进度表
	List<Map<String,Object>> listSchedule(String orderNo,String productName) throws Exception;
	//增加进度信息
	CustomResult insert(Schedule schedule) throws Exception;
	//部分修改
	CustomResult updateSchedule(Schedule schedule) throws NotOrderInformationFound;
	//批量删除订单
	CustomResult deleteBatchs(String[] ids) throws Exception;
}
