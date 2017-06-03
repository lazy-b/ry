package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.dao.DeliveryTrackingDao;

@Service("deliveryTrackingService")
public class DeliveryTrackingServiceImple implements DeliveryTrackingService{
	@Resource
	private DeliveryTrackingDao deliveryTrackingDao;
	@Override
	public List<Map<String, Object>> listdeliveryTracking() {
		
		return deliveryTrackingDao.findAllDelvieryTrack();
	}

}
