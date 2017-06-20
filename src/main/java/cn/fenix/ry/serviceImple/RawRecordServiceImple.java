package cn.fenix.ry.serviceImple;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.dao.DeliveryTrackingDao;
import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.dao.RawRecordDao;
import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.RawRecord;
import cn.fenix.ry.service.DeliveryService;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.service.RawRecordService;
import cn.fenix.ry.util.CustomResult;
/**
 * 订单业务层
 * @author Administrator
 *
 */
@Service("rawRecordService")
public class RawRecordServiceImple implements RawRecordService {
	@Resource
	private RawRecordDao rawRecordDao;

	@Override
	public List<Map<String, Object>> listRawRecord() throws Exception {
		 return rawRecordDao.findAllRawRecord();
	}

	@Override
	public CustomResult insert(RawRecord rawRecord) throws Exception {
		String rowRecordId=UUID.randomUUID().toString();
		rawRecord.setRowRecordId(rowRecordId);
		int i = rawRecordDao.addRawRecord(rawRecord);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101,"新增原材料记录失败");
		}
	}

	@Override
	public CustomResult deleteRawRecord(String rowRecordId) throws Exception {
		int i =rawRecordDao.deleteByPrimaryKey(rowRecordId);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}

	@Override
	public CustomResult deleteBatch(String[] Ids) throws Exception {
		int i =rawRecordDao.deleteBatch(Ids);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}

	@Override
	public CustomResult updateRawRecord(RawRecord rawRecord) throws Exception {
		int i= rawRecordDao.updateByPrimaryKey(rawRecord);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101,"修改原料记录失败");
		}
	}
}
