package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.RawRecord;
import cn.fenix.ry.util.CustomResult;

public interface RawRecordService{
	//查询原料记录
	List<Map<String,Object>>listRawRecord() throws Exception;
	
	//增加原料记录
	CustomResult insert(RawRecord rawRecord) throws Exception;
	
	//删除原料记录
	CustomResult deleteRawRecord(String rowRecordId) throws Exception;
	
	//批量删除原料记录
	CustomResult deleteBatch(String[] Ids) throws Exception;
	
	//部分修改原料记录
	CustomResult updateRawRecord(RawRecord rawRecord) throws Exception;
	
}
