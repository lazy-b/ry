package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.OrderInformation;

public interface OrderService {
	//查询订单
	List<Map<String, Object>>listOrderInformation();
	//增加订单
	public OrderInformation addOrder(String orderInformationId);
	//删除订单
	void deleteOrder(String id);
	//
	int updateNote(Map<String, Object> note);
	
}
