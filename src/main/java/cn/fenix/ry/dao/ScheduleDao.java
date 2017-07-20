package cn.fenix.ry.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.Schedule;


public interface ScheduleDao {
	/**
	 * 测试
	 * @param orderNo
	 * @param productName
	 * @return
	 */
	//根据订单号和产品名称查出进度表
	List<Map<String,Object>> findScheduleByParames(@Param("orderNo")String orderNo,@Param("productName")String productName);
	//添加订单
	int addSchedule(Schedule schedule);
	//修改订单
	int updateByPrimaryKey(Schedule  schedule);
	//批量删除
	int deleteBatchs(String[] ids);
}
