package cn.fenix.ry.serviceImple;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import cn.fenix.ry.dao.OrderScheduleDao;
import cn.fenix.ry.service.OrderScheduleService;

@Service
public class OrderScheduleServiceImpl implements OrderScheduleService {
	@Resource
	private OrderScheduleDao orderScheduleDao;
	
	@Override
	public List<String> find() {
		List<Map<String,Object>> olist=orderScheduleDao.find(null);
		List list=new ArrayList();
		String str="";
		for(Map<String,Object> m:olist){
			String id=(String) m.get("test_id");
			String orderNo=(String) m.get("order_no");
			String productName =(String) m.get("product_name");
			String placeOrder=(String) m.get("place_order");
			String pPlanetime=m.get("p_planetime")+"";
			String pFacttime=m.get("p_facttime")+"";
			String pRemarks=(String) m.get("p_remarks");
			String picking=(String) m.get("picking");
			String pickPlanetime=m.get("pick_planetime")+"";
			String pickFacttime=m.get("pick_facttime")+"";
			String pickRemarks=(String) m.get("pick_remarks");
			String arrange=(String) m.get("arrange");
			String arrangePlanetime=m.get("arrange_planetime")+"";
			String arrangeFacttime=m.get("arrange_facttime")+"";
			String arrangeRemarks=(String) m.get("arrange_remarks");
			String product=(String) m.get("product");
			String proPlanetime=m.get("pro_planetime")+"";
			String proFacttime=m.get("pro_facttime")+"";
			String proRemarks=(String) m.get("pro_remarks");
			String delivery=(String) m.get("delivery");
			String deliveryPlanetime=m.get("delivery_planetime")+"";
			String deliveryFacttime=m.get("delivery_facttime")+"";
			String deliveryRemarks=(String) m.get("delivery_remarks");
			
			str="{\"id\":\""+id+"\",\"orderNo\":\""+orderNo+"\",\"productName\":\""+productName+"\""
					+ ",\"scheduleInfo\": [{\"name\":\""+placeOrder+"\",\"planeDate\":\""+pPlanetime+"\",\"factDate\":\""+pFacttime+"\",\"remarks\":\""+pRemarks+"\"},"
					+ "{\"name\":\""+picking+"\",\"planeDate\":\""+pickPlanetime+"\",\"factDate\":\""+pickFacttime+"\",\"remarks\":\""+pickRemarks+"\"},"
					+"{\"name\":\""+arrange+"\",\"planeDate\":\""+arrangePlanetime+"\",\"factDate\":\""+arrangeFacttime+"\",\"remarks\":\""+arrangeRemarks+"\"},"
					+"{\"name\":\""+product+"\",\"planeDate\":\""+proPlanetime+"\",\"factDate\":\""+proFacttime+"\",\"remarks\":"+proRemarks+"\"},"
					+"{\"name\":\""+delivery+"\",\"planeDate\":\""+deliveryPlanetime+"\",\"factDate\":\""+deliveryFacttime+"\",\"remarks\":\""+deliveryRemarks+"\"}]}";
			
			list.add(str);
		}
		return list;
	}
	
	
	
	
	
}
