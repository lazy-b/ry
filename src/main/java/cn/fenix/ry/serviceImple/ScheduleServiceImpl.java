package cn.fenix.ry.serviceImple;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.controller.converter.CustomDateConverter;
import cn.fenix.ry.dao.ScheduleDao;
import cn.fenix.ry.entity.Schedule;
import cn.fenix.ry.service.ScheduleService;
import cn.fenix.ry.util.CustomResult;

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService {
	@Resource
	ScheduleDao scheduleDao;
	@Override
	/**
	 * 根据订单号和产品名称查出进度表
	 */
	public List<Map<String,Object>> listSchedule(String orderNo,String productName) throws Exception {
		if(orderNo==null&&productName==null){
			throw new NotParamterException("请输入订单号和产品名称");
		}
		if(orderNo==null||orderNo.trim().isEmpty()){
			throw new NotParamterException("请输入订单号");
		}
		if(productName==null||productName.trim().isEmpty()){
			throw new NotParamterException("请输入产品名称");
		}
		List<Map<String,Object>> list= scheduleDao.findScheduleByParames(orderNo.trim(),productName.trim());
		if(list.size()==0){
			throw new NotParamterException("无此订单及产品");
			
		}
		return list;
	}
	/**
	 * 新增订单进度表
	 */
	@Override
	public CustomResult insert(Schedule schedule) throws Exception {
		if(schedule==null){
			throw new NotParamterException("进度信息不存在");
		}
		String id=UUID.randomUUID().toString();
		schedule.setId(id);
		int i = scheduleDao.addSchedule(schedule);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(100, "新增订单进度失败");
		}
	}
	/**
	 * 修改进度表
	 */
	@Override
	public CustomResult updateSchedule(Schedule schedule) throws NotOrderInformationFound {
		if(schedule==null){
			throw new NotParamterException("schedule不存在");
		}
		int i=scheduleDao.updateByPrimaryKey(schedule);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(100,"修改订单进度失败");
		}	
	}
	/**
	 * 批量删除
	 */
	@Override
	public CustomResult deleteBatchs(String[] ids) throws Exception {
		if(ids==null){
			throw new NotParamterException("ids不存在");
		}
		System.out.println(ids);
		int i = scheduleDao.deleteBatchs(ids);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}
	/**
	 * 查找所有的订单进度
	 */
	@Override
	public List<Map<String, Object>> findAllSchedule() {
		
		return scheduleDao.findAllSchedule();
	}
}
