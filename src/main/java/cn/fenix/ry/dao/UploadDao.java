package cn.fenix.ry.dao;

import java.util.List;

import cn.fenix.ry.entity.Corder;

public interface UploadDao {
	int insertInfoBatch(List<Corder> orderList);
}
