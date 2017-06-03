package cn.fenix.test;



import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Before;
import org.junit.Test;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.fenix.ry.dao.ContactsDao;
import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.entity.Contact;
import cn.fenix.ry.entity.OrderInformation;

public class TestJava {
	ClassPathXmlApplicationContext ctx;
    @Before
    public void init(){
        ctx = new ClassPathXmlApplicationContext(
            "spring-web.xml",
            "spring-mybatis.xml");
    }
    @Test
    public void testDataSource(){
        DataSource ds = ctx.getBean(
            "dataSource", DataSource.class);
        System.out.println(ds); 
    }
    @Test
    public void testSqlsessionFactory(){
    	SqlSessionFactory sq=ctx.getBean("sqlSessionFactory",SqlSessionFactory.class);;
    	System.out.println(sq);
    }
    @Test
    public void testMapper(){
    	MapperScannerConfigurer scanner=
    	        ctx.getBean("mapperScanner",
    	        MapperScannerConfigurer.class);
    	    System.out.println(scanner); 
    }
    @Test
    public void testInsertContact(){
    	ContactsDao contacts=ctx.getBean("contactsDao",ContactsDao.class);
    	Contact contact=new Contact(8,1,"Tom","采购","负责塑胶件","1342589464","620","656761313@qq.com");
    	contacts.saveContact(contact);
    }
    
  
    
    @Test
    public void  testSelectContact(){
    	ContactsDao contacts=ctx.getBean("contactsDao",ContactsDao.class);
    	int id=1;
    	Contact contact=contacts.findContactById(id);
		System.out.println(contact);
    }
    @Test
    public void testSelectOrder(){
    	OrderDao order=ctx.getBean("orderDao",OrderDao.class);
    	List<Map<String, Object>> all=order.findAllOrder();
    	System.out.println(all);
    }
    @Test
    public void testInsertOrder(){
    	OrderDao orderDao=ctx.getBean("orderDao",OrderDao.class);
		OrderInformation order=new OrderInformation("9", "1", 1, "3",
				"2017-5-23","2017-5-25","PO20170522","11.210.310.002","PD35筒身",
				5000,20,30,5010,"白件","白件/25.6*56.2","2017-5-30",1,1,1,2.3,"预测订单",null,null); 
		int n=orderDao.addOrder(order);
		System.out.println(n);
    }
}
