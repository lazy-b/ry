package cn.fenix.ry.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.github.pagehelper.Page;


public interface BaseDao<T> {
	public List<T> findPage(Page page);					//分页查询
	public List<Map<String,Object>> find(Map paraMap);	//带条件查询
	public T get(String id);						//只查询一个，常用于修改
	public int insert(T entity);						//插入，用实体作为参数
	public int update(T entity);						//修改，用实体作为参数
	public int delete(String[] ids);				//批量删除；支持整数型和字符串类型ID
}
