package cn.fenix.ry.serviceImple;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.dao.DeliveryTrackingDao;
import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.dao.ProductTrackingDao;
import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.ProductTracking;
import cn.fenix.ry.service.DeliveryService;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.service.ProductTrackingService;
import cn.fenix.ry.util.CustomResult;
/**
 * 生产跟踪业务层
 * @author Administrator
 *
 */
@Service("productService")
public class ProductTrackingServiceImple implements ProductTrackingService {
	@Resource
	private ProductTrackingDao productTrackingDao;
	@Override
	public List<Map<String, Object>> listProductTracking() throws Exception {
		 return productTrackingDao.findAllProductTracking();
	}

	@Override
	public CustomResult insert(ProductTracking productTracking) throws Exception {
		String productTrackingId=UUID.randomUUID().toString();
		productTracking.setProductTackingId(productTrackingId);
		int i = productTrackingDao.addProductTracking(productTracking);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101, "新增生产记录失败");
		}
	}

	@Override
	public CustomResult deleteProductTracking(String productTackingId) throws Exception {
		int i =productTrackingDao.deleteByPrimaryKey(productTackingId);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}

	@Override
	public CustomResult deleteBatch(String[] Ids) throws Exception {
		int i =productTrackingDao.deleteBatch(Ids);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}

	@Override
	public CustomResult updateProductTracking(ProductTracking productTracking) throws Exception {
		int i= productTrackingDao.updateByPrimaryKey(productTracking);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101,"修改生产记录失败");
		}
	}
}
