package cn.fenix.ry.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.dao.RawRecordDao;
@Service("rawRecordService")
public class RawRecordServiceImple implements RawRecordService {
	@Resource
	private RawRecordDao rawRecordDao;
	public List<Map<String, Object>> listAllRawRecord() {
		return rawRecordDao.findAllRawRecord();
	}
}
