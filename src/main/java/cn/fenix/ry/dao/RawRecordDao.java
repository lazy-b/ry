package cn.fenix.ry.dao;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.ProductTracking;
import cn.fenix.ry.entity.RawRecord;

public interface RawRecordDao {
	//展示原材料记录
	List<Map<String,Object>> findAllRawRecord();
	
	//添加原材料记录
	int addRawRecord(RawRecord raw);
	
	//修改原材料记录
	int updateByPrimaryKey(RawRecord raw);
	
	//根据Id删除原材料记录
	int deleteByPrimaryKey(String producttackingid);
	
	//批量删除
	int deleteBatch(String[] ids);
}
