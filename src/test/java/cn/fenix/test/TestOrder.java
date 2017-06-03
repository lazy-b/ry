package cn.fenix.test;

import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.fenix.ry.dao.DeliveryTrackingDao;
import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.dao.ProductTrackingDao;
import cn.fenix.ry.dao.RawRecordDao;
import cn.fenix.ry.entity.OrderInformation;

public class TestOrder {
	ClassPathXmlApplicationContext ctx;
    @Before
    public void init(){
        ctx = new ClassPathXmlApplicationContext(
            "spring-web.xml","spring-mybatis.xml","spring-service.xml"); 
    }
    @Test
    public void testInsertOrder(){
    	OrderDao orderDao=ctx.getBean("orderDao",OrderDao.class);
		OrderInformation order=new OrderInformation("10", "2", 1, "3",
				"2017-5-29","2017-6-25","PO20170522","11.210.310.002","PD32筒身",
				5000,20,30,5010,"白件","白件/25.6*56.2","2017-6-30",1,1,1,2.3,"预测订单",null,null); 
		int n=orderDao.addOrder(order);
		System.out.println(n);
    }
    @Test
    public void testSelectOrder(){
    	OrderDao order=ctx.getBean("orderDao",OrderDao.class);
    	List<Map<String, Object>> all=order.findAllOrder();
    	System.out.println(all);
    }
    @Test
    public void testSelectRawRecord(){
    	RawRecordDao record=ctx.getBean("rawRecordDao",RawRecordDao.class);
    	List<Map<String, Object>> all=record.findAllRawRecord();
    	System.out.println(all);
    }
    @Test
    public void testDeleteOrder(){
    	OrderDao orderDao=ctx.getBean("orderDao",OrderDao.class);
    	String id="2";
    	orderDao.deleteOrder(id);
    }
    @Test
    public void testSelectDeliveryTracking(){
    	DeliveryTrackingDao record=ctx.getBean("deliveryTrackingDao",DeliveryTrackingDao.class);
    	List<Map<String, Object>> all=record.findAllDelvieryTrack();
    	System.out.println(all);
    }
 
    @Test
    public void testSelectProcuctTracking(){
    	ProductTrackingDao record=ctx.getBean("productTrackingDao",ProductTrackingDao.class);
    	List<Map<String, Object>> all=record.findAllProductTrack();
    	System.out.println(all);
    }
    
}
