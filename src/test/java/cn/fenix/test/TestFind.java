package cn.fenix.test;

import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.entity.OrderInformation;

public class TestFind {
	ClassPathXmlApplicationContext ctx;
    @Before
    public void init(){
        ctx = new ClassPathXmlApplicationContext(
            "spring-web.xml","spring-mybatis.xml","spring-service.xml"); 
    }
    @Test
    public void testSelectOrder(){
    	OrderDao order=ctx.getBean("orderDao",OrderDao.class);
    	List<Map<String, Object>> all=order.findAllOrder();
    	System.out.println(all);
    }
    @Test
    public void testFindOrderId(){
    	OrderDao order=ctx.getBean("orderDao",OrderDao.class);
    	String id="2";								  
    	OrderInformation orderInformation=order.findByOrderId(id);
    	System.out.println(orderInformation);
    }
    @Test
    public void testFindOrderName(){
    	OrderDao order=ctx.getBean("orderDao",OrderDao.class);
    	String productName="PD35筒身";
    	OrderInformation infor=order.findByProductName(productName);
    	System.out.println(infor);
    }
}
