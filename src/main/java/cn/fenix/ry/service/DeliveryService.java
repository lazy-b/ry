package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;

import cn.fenix.ry.util.CustomResult;

public interface DeliveryService{
	//查询订单
	List<Map<String,Object>>listDeliveryTracking() throws Exception;
	
	//增加订单
	CustomResult insert(DeliveryTracking delivery) throws Exception;
	
	//删除订单
	CustomResult deleteDelivery(String deliveryRecordId) throws Exception;
	
	//批量删除订单
	CustomResult deleteBatch(String[] Ids) throws Exception;
	
	//部分修改订单
	CustomResult updateOrder(DeliveryTracking delivery) throws Exception;
	
}
