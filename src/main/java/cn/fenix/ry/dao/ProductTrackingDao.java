package cn.fenix.ry.dao;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.ProductTracking;

public interface ProductTrackingDao {
	// 展示生产跟踪记录 
	List<Map<String,Object>> findAllProductTracking();
	
	//添加生产跟踪记录
	int addProductTracking(ProductTracking product);
	
	//修改生产跟踪记录
	int updateByPrimaryKey(ProductTracking product);
	
	//根据Id删除生产跟踪记录
	int deleteByPrimaryKey(String productTackingId);
	
	//批量删除
	int deleteBatch(String[] ids);
}
