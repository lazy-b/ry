package cn.fenix.ry.dao;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.OrderInformation;


/**
 * 订单信息处理Dao接口
 * @author wenye
 *
 */
public interface OrderDao{
	//展示所有订单
	List<Map<String,Object>> findAllOrder();
	
	//多条件查找订单(订单号&物料编码)
	List<Map<String, Object>> selectOrderByParams(Map<String,Object> params);

	//根据产品名称查找订单
	List<Map<String,Object>> selectOrderByName(String productName);
	
	//根据物料编码查找订单
	List<Map<String,Object>> selectOrderByMaterialCoding(String materialCoding);
	
	//添加订单
	int addOrder(OrderInformation order);
	
	//修改订单
	int updateByPrimaryKey(OrderInformation  cOrder);
	
	//int updateAll(OrderInformation  cOrder);
	int updateAll(OrderInformation  cOrder);
	//根据Id删除订单
	int deleteByPrimaryKey(String orderInformationId);
	
	//批量删除
	int deleteBatch(String[] ids);
}
