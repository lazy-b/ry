package cn.fenix.ry.serviceImple;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.dao.DeliveryTrackingDao;
import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.service.DeliveryService;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.util.CustomResult;
/**
 * 订单业务层
 * @author Administrator
 *
 */
@Service("deliveryService")
public class DeliveryServiceImple implements DeliveryService {
	@Resource
	private DeliveryTrackingDao deliveryDao;
	@Override
	public List<Map<String, Object>> listDeliveryTracking() throws Exception {
		
		 return deliveryDao.findAllDelivery();
	}

	@Override
	public CustomResult insert(DeliveryTracking deliveryTracking) throws Exception {
		String deliveryRecordId=UUID.randomUUID().toString();
		deliveryTracking.setDeliveryRecordId(deliveryRecordId);
		int i = deliveryDao.addDeliveryTracking(deliveryTracking);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101, "新增交货记录失败");
		}
	}

	@Override
	public CustomResult deleteDelivery(String deliveryRecordId) throws Exception {
		int i =deliveryDao.deleteByPrimaryKey(deliveryRecordId);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}

	@Override
	public CustomResult deleteBatch(String[] Ids) throws Exception {
		int i =deliveryDao.deleteBatch(Ids);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}

	@Override
	public CustomResult updateOrder(DeliveryTracking delivery) throws Exception {
		int i= deliveryDao.updateByPrimaryKey(delivery);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101,"修改交货记录失败");
		}
	}
}
