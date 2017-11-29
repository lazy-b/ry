package cn.fenix.ry.serviceImple;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import cn.fenix.ry.dao.CorderDao;
import cn.fenix.ry.dao.UploadDao;
import cn.fenix.ry.entity.Corder;
import cn.fenix.ry.service.UploadService;
import cn.fenix.ry.util.ExcelUtil;

@Service
public class UploadServiceImpl implements UploadService {
	@Resource
	private UploadDao uploadDao;
	@Override
	public int OrderInfo(InputStream in, MultipartFile file) throws Exception {
		List<List<Object>> listob=ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
		List<Corder> orderList=new ArrayList<Corder>();
		String regex="([\\D]*)"; 
		if(listob!=null){
		for(int i=0;i<listob.size();i++){
			String id=UUID.randomUUID().toString();
			List<Object> list=listob.get(i);
			Corder order=new Corder();
				order.setId(id);
				if(list.get(0)==null||list.get(0)==" "||list.get(0)==""){
					order.setOrderDate(" ");
				}else{
					order.setOrderDate(String.valueOf(list.get(0)));
				}
				if(list.get(1)==null||list.get(1)==" "||list.get(1)==""){
					order.setRequiredDate(" ");
				}else{
					order.setRequiredDate(String.valueOf(list.get(1)));
				}
				if(list.get(2)==null||list.get(2)==" "||list.get(2)==""){
					order.setOrderNo(" ");
				}else{
					order.setOrderNo(String.valueOf(list.get(2)));
				}
				if(list.get(3)==null||list.get(3)==" "||list.get(3)==""){
					order.setMaterialCoding(" ");
				}else{
					order.setMaterialCoding(String.valueOf(list.get(3)));
				}
				if(list.get(4)==null||list.get(4)==" "||list.get(4)==""){
					order.setProductName(" ");
				}else{
					order.setProductName(String.valueOf(list.get(4)));
				}
				if(list.get(5)==null||list.get(5)==" "||list.get(5)==""||list.get(5).toString().matches(regex)){
					order.setOrderAmount(0);
				}else{
					order.setOrderAmount(Integer.parseInt((String)list.get(5)));
				}
				if(list.get(6)==null||list.get(6)==" "||list.get(6)==""||list.get(6).toString().matches(regex)){
					order.setSpareParts(0);
				}else{
					order.setSpareParts(Integer.parseInt((String) list.get(6)));
				}
				if(list.get(7)==null||list.get(7)==" "||list.get(7)==""||list.get(7).toString().matches(regex)){
					order.setStockAmount(0);
				}else{
					order.setStockAmount(Integer.parseInt((String) list.get(7)));
				}
				if(list.get(8)==null||list.get(8)==" "||list.get(8)==""||list.get(8).toString().matches(regex)){
					order.setPlanAmount(0);
				}else{
					order.setPlanAmount(Integer.parseInt((String) list.get(8)));
				}
				if(list.get(9)==null||list.get(9)==" "||list.get(9)==""){
					order.setMaterialModel(" ");
				}else{
					order.setMaterialModel(String.valueOf(list.get(9)));
				}
				if(list.get(10)==null||list.get(10)==" "||list.get(10)==""){
					order.setPurchaseRequirement(" ");
				}else{
					order.setPurchaseRequirement(String.valueOf(list.get(10)));
				}
				
				if(list.get(11)==null||list.get(11)==" "||list.get(11)==""){
					order.setReplyDate(" ");
				}else{
					order.setReplyDate(String.valueOf(list.get(11)));
				}
				if(list.get(12)==null||list.get(12)==" "||list.get(12)==""||list.get(12).toString().matches(regex)){
					order.setOrderStatus(0);
				}else{
					order.setOrderStatus(Integer.parseInt((String) list.get(12)));
				}
				if(list.get(13)==null||list.get(13)==" "||list.get(13)==""){
					order.setExceptionReason(" ");
				}else{
					order.setExceptionReason(String.valueOf(list.get(13)));
				}
				if(list.get(14)==null||list.get(14)==" "||list.get(14)==""||list.get(14).toString().matches(regex)){
					order.setPrice(0.0);
				}else{
					order.setPrice(Double.parseDouble((String) list.get(14)));
				}
				if(list.get(15)==null||list.get(15)==" "||list.get(15)==""){
					order.setRemark(" ");
				}else{
					order.setRemark(String.valueOf(list.get(15)));
				}
				if(list.get(16)==null||list.get(16)==" "||list.get(16)==""||list.get(16).toString().matches(regex)){
					order.setOrderType(0);
				}else{
					order.setOrderType(Integer.valueOf((String) list.get(16)));
				}
			orderList.add(order);
			}
		} 		
		return  uploadDao.insertInfoBatch(orderList);
	}

}
