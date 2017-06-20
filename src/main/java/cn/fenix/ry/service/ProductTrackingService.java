package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.ProductTracking;
import cn.fenix.ry.util.CustomResult;

public interface ProductTrackingService{
	//查询生产跟踪
	List<Map<String,Object>>listProductTracking() throws Exception;
	
	//增加生产跟踪
	CustomResult insert(ProductTracking productTracking) throws Exception;
	
	//删除生产跟踪
	CustomResult deleteProductTracking(String productTackingId) throws Exception;
	
	//批量删除生产跟踪
	CustomResult deleteBatch(String[] Ids) throws Exception;
	
	//部分修改生产跟踪
	CustomResult updateProductTracking(ProductTracking productTracking) throws Exception;
	
}
