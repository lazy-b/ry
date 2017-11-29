package cn.fenix.ry.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.github.pagehelper.Page;

import cn.fenix.ry.entity.Corder;
import cn.fenix.ry.exception.CorderException;

public interface CorderService {
	public List<Corder> findPage(Page page);					//分页查询
	public List<Map<String,Object>> find(Map paraMap);	        //带条件查询
	public Corder get(String id)throws CorderException;			//只查询一个，常用于修改
	public int insert(Corder corder) throws CorderException;	//插入，用实体作为参数
	public boolean update(Corder corder)throws CorderException;	//修改，用实体作为参数
	public int delete(String[] ids)throws CorderException;		//批量删除；支持整数型和字符串类型ID	
}
