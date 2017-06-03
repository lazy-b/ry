package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.entity.OrderInformation;

@Service("orderService")
public class OrderServiceImple implements OrderService {
	@Resource
	private OrderDao orderDao;
	public List<Map<String, Object>> listOrderInformation() {
		
		return orderDao.findAllOrder();
	}
	@Override
	public OrderInformation addOrder(String orderInformationId) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public void deleteOrder(String id) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public int updateNote(Map<String, Object> note) {
		// TODO Auto-generated method stub
		return 0;
	}
}
