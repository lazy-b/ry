package cn.fenix.ry.serviceImple;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.util.CustomResult;
/**
 * 订单业务层
 * @author Administrator
 *
 */
@Service("orderService")
public class OrderServiceImple implements OrderService {
	/**
	 * 查询所有订单
	 */
	@Resource
	private OrderDao orderDao;
	public List<Map<String, Object>> listOrderInformation()throws Exception{
		
		return orderDao.findAllOrder();
	}
	
	/**
	 * 根据编码查询订单
	 */
	@Override
	public List<Map<String, Object>> getOrdersByCoding(String materialCoding) throws Exception {
		
		return orderDao.selectOrderByMaterialCoding(materialCoding);
	}
	
	/**
	 * 根据产品名称查询订单
	 */
	@Override
	public List<Map<String, Object>> getOrdersByName(String productName) throws Exception {
		
		return orderDao.selectOrderByName(productName);
	}
	
	/**
	 * 多条件查询订单
	 */
	@Override
	public List<Map<String, Object>> getOrdersByParams(Map<String, Object> params) throws Exception {
		
		return orderDao.selectOrderByParams(params);
	}
	
	/**
	 * 增加订单(插入)
	 */
	@Override
	public CustomResult insert(OrderInformation cOrder) throws Exception {
		String id=UUID.randomUUID().toString();
		cOrder.setId(id);
		int i = orderDao.addOrder(cOrder);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101, "新增订单失败");
		}
	}

	/*
	 * 部分修改订单
	 */
	@Override
	public CustomResult updateOrder(OrderInformation order) throws NotOrderInformationFound {
		order.getStockAmount().toString();
		order.getOrderAmount().toString();
		order.getOrderStatus().toString();
		order.getOrderType().toString();
		order.getPlanAmount().toString();
		order.getPrice().toString();
		order.getSpareParts().toString();
		if(order==null){
			throw new NotOrderInformationFound("order不存在");
		}
		int i=orderDao.updateByPrimaryKey(order);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101,"修改订单失败");
		}
	}
	
	
	/**
	 * 选择ID删除订单
	 */
	@Override
	public CustomResult deleteOrder(String id) throws Exception {
		int i =orderDao.deleteByPrimaryKey(id);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}
	
	/**
	 * 批量删除订单
	 */
	@Override
	public CustomResult deleteBatch(String[] orderIds) throws Exception {
		int i = orderDao.deleteBatch(orderIds);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}

	@Override
	public CustomResult updateOrderAll(OrderInformation cOrder) throws NotOrderInformationFound {
		if(cOrder==null){
			throw new NotOrderInformationFound("order不存在");
		}
		int i=orderDao.updateByPrimaryKey(cOrder);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101,"修改订单失败");
		}
	}

	/*@Override
	public Boolean updateOrder(OrderInformation cOrder) throws NotOrderInformationFound {
		if(cOrder==null){
			throw new NotOrderInformationFound("order不存在");
		}
		int n =orderDao.updateByPrimaryKey(cOrder);
		if(n!=1){
			throw new NotOrderInformationFound("更新失败");
		}else{
			return n==1;
		}
	}

	@Override
	public Boolean updateOrderAll(OrderInformation cOrder) throws NotOrderInformationFound {
		if(cOrder==null){
			throw new NotOrderInformationFound("order不存在");
		}
		int n =orderDao.updateAll(cOrder);
		if(n!=1){
			throw new NotOrderInformationFound("更新失败");
		}else{
			return n==1;
		}
	}*/

}
