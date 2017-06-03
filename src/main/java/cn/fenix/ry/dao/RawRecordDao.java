package cn.fenix.ry.dao;

import java.util.List;
import java.util.Map;

public interface RawRecordDao {
	List<Map<String, Object>> findAllRawRecord();
}
