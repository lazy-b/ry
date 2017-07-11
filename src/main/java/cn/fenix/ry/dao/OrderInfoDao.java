package cn.fenix.ry.dao;

import java.util.List;


import cn.fenix.ry.entity.OrderInfos;


public interface OrderInfoDao {
	int insertInfoBatch(List<OrderInfos> orderList );
}
