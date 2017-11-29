package cn.fenix.ry.serviceImple;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;

import cn.fenix.ry.dao.CorderDao;
import cn.fenix.ry.entity.Corder;
import cn.fenix.ry.exception.CorderException;
import cn.fenix.ry.service.CorderService;

@Service
public class CorderServiceImple implements CorderService{
	@Resource
	private CorderDao corderDao;
	
	//查询所有订单
	public List<Map<String, Object>> find(Map paraMap) {
		
		return corderDao.find(null);
	}
	//增加订单信息；
	public int insert(Corder corder)throws CorderException {
		String id=UUID.randomUUID().toString();
		corder.setId(id);
		int count = corderDao.insert(corder);
		if(corder==null){
			 throw new CorderException("订单不存在");
		}
		if(count<=0){
			 throw new CorderException("增加订单信息失败");
		}
		return count;
	}

	@Override
	//修改订单
	public boolean update(Corder corder)throws CorderException {
		if(corder==null){
			throw new CorderException("订单不存在");
		}
		int n=corderDao.update(corder);
		return n==1;
	}

	@Override
	//删除订单
	public int delete(String[] ids)throws CorderException {
		int n=corderDao.delete(ids);
		if(n<=0){
			throw new CorderException("删除失败");
		}
		return n;
	}
	
	@Override
	public List<Corder> findPage(Page page)throws CorderException{
		return corderDao.findPage(page);
	}
	
	@Override
	public Corder get(String id) throws CorderException {
		return  corderDao.get(id);
	}
	
}
