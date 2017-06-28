package cn.fenix.ry.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;


public interface ScheduleDao {
	List<Map<String,Object>> findScheduleByParames(@Param("orderNo")String orderNo,@Param("productName")String productName);
	
}
