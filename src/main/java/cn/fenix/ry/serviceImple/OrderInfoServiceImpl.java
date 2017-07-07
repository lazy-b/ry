package cn.fenix.ry.serviceImple;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import cn.fenix.ry.dao.OrderInfoDao;
import cn.fenix.ry.entity.OrderInfos;
import cn.fenix.ry.service.OrderInfoService;
import cn.fenix.ry.util.ExcelUtil;

@Service
public class OrderInfoServiceImpl implements OrderInfoService {
	@Resource
	private OrderInfoDao orderInfoDao;
	@Override
	public int OrderInfo(InputStream in, MultipartFile file) throws Exception {
		List<List<Object>> listob=ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
		List<OrderInfos> orderList=new ArrayList<OrderInfos>();
		if(listob!=null){
		for(int i=0;i<listob.size();i++){
			String id=UUID.randomUUID().toString();
			List<Object> list=listob.get(i);
			OrderInfos order=new OrderInfos();
				order.setId(id);
				if(list.get(0)==null||list.get(0)==" "){
					order.setOrderDate(" ");
				}else{
					order.setOrderDate(String.valueOf(list.get(0)));
				}
				if(list.get(1)==null||list.get(1)==" "){
					order.setRequiredDate(" ");
				}else{
					order.setRequiredDate(String.valueOf(list.get(2)));
				}
				if(list.get(2)==null||list.get(2)==" "){
					order.setOrderNo(" ");
				}else{
					order.setOrderNo(String.valueOf(list.get(2)));
				}
				if(list.get(3)==null||list.get(3)==" "){
					order.setMaterialCoding(" ");
				}else{
					order.setMaterialCoding(String.valueOf(list.get(3)));
				}
				if(list.get(4)==null||list.get(4)==" "){
					order.setProductName(" ");
				}else{
					order.setProductName(String.valueOf(list.get(4)));
				}
				if(list.get(5)==null||list.get(5)==" "){
					order.setOrderAmount(-1);
				}else{
					order.setOrderAmount(Integer.parseInt((String) list.get(5)));
				}
				if(list.get(6)==null||list.get(6)==" "){
					order.setSpareParts(-1);
				}else{
					order.setSpareParts(Integer.parseInt((String) list.get(6)));
				}
				if(list.get(7)==null||list.get(7)==" "){
					order.setStockAmount(-1);
				}else{
					order.setStockAmount(Integer.parseInt((String) list.get(7)));
				}
				if(list.get(8)==null||list.get(8)==" "){
					order.setPlanAmount(-1);
				}else{
					order.setPlanAmount(Integer.parseInt((String) list.get(8)));
				}
				if(list.get(9)==null||list.get(9)==" "){
					order.setMaterialModel(" ");
				}else{
					order.setMaterialModel(String.valueOf(list.get(9)));
				}
				if(list.get(10)==null||list.get(10)==" "){
					order.setPurchaseRequirement(" ");
				}else{
					order.setPurchaseRequirement(String.valueOf(list.get(10)));
				}
				
				if(list.get(11)==null||list.get(11)==" "){
					order.setReplyDate(" ");
				}else{
					order.setReplyDate(String.valueOf(list.get(11)));
				}
				if(list.get(12)==null||list.get(12)==" "){
					order.setOrderStatus(-1);
				}else{
					order.setOrderStatus(Integer.parseInt((String) list.get(12)));
				}
				if(list.get(13)==null||list.get(13)==" "){
					order.setExceptionReason(" ");
				}else{
					order.setExceptionReason(String.valueOf(list.get(13)));
				}
				if(list.get(14)==null||list.get(14)==" "){
					order.setPrice(0.0);
				}else{
					order.setPrice(Double.parseDouble((String) list.get(14)));
				}
				if(list.get(15)==null||list.get(15)==" "){
					order.setRemark(" ");
				}else{
					order.setRemark(String.valueOf(list.get(15)));
				}
				if(list.get(16)==null||list.get(16)==" "){
					order.setOrderType(-1);
				}else{
					order.setOrderType(Integer.valueOf((String) list.get(16)));
				}
			orderList.add(order);
			}
		} 
		
		return orderInfoDao.insertInfoBatch(orderList);
	}
}
