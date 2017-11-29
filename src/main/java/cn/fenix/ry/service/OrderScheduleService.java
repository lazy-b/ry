package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.OrderSchedule;
import cn.fenix.ry.exception.ScheduleException;

public interface OrderScheduleService{
	List<String> find();
	public OrderSchedule get(String id)throws ScheduleException;			//只查询一个，常用于修改
	public int insert(OrderSchedule schedule) throws ScheduleException;	    //插入，用实体作为参数
	public boolean update(OrderSchedule schedule)throws ScheduleException;	//修改，用实体作为参数
	public int delete(String[] ids)throws ScheduleException;		        //批量删除；支持整数型和字符串类型ID	
}
