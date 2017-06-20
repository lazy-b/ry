package cn.fenix.ry.dao;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;

public interface DeliveryTrackingDao {
	//展示交货记录
	List<Map<String,Object>> findAllDelivery();
	
	//添加交货记录
	int addDeliveryTracking(DeliveryTracking order);
	
	//修改交货记录
	int updateByPrimaryKey(DeliveryTracking  cOrder);
	
	//根据Id删除交货记录
	int deleteByPrimaryKey(String deliveryRecordId);
	
	//批量删除
	int deleteBatch(String[] ids);
}
