package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.dao.ProductTrackingDao;
@Service("ProductTrackingService")
public class ProductTrackingServiceImple implements ProductTrackingService {
	@Resource
	private ProductTrackingDao productTrackingDao;
	
	public List<Map<String, Object>> listProductTracking(){
		
		return productTrackingDao.findAllProductTrack();
	}

}
