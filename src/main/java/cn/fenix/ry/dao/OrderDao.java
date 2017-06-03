package cn.fenix.ry.dao;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.Contact;
import cn.fenix.ry.entity.OrderInformation;
/**
 * 订单信息处理Dao接口
 * @author wenye
 *
 */
public interface OrderDao {
	//订单信息查询
	List<Map<String, Object>> findAllOrder();
	//根据订单Id查询订单信息内容
	OrderInformation findByOrderId(String orderId);
	
	//根据订单Id查询订单信息内容
	OrderInformation findByProductName(String productName);
	//添加订单
	int addOrder(OrderInformation order);
	//修改订单
	int updateOrder(Map<String,Object> order);
	//根据Id删除订单
	void deleteOrder(String id);
	//批量删除
	void deleteOrders(Map<String, Object> params);
}
