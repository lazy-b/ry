package Test;




import java.util.HashMap;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;

import org.junit.Before;
import org.junit.Test;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.dao.ScheduleDao;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.Schedule;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.service.ScheduleService;
import cn.fenix.ry.util.CustomResult;


public class TestJava {
	ClassPathXmlApplicationContext ctx;
    @Before
    public void init(){
        ctx = new ClassPathXmlApplicationContext(
            "classpath*:spring/applicationContext-*.xml",
        	"classpath*:spring/springmvc-servlet.xml");
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
    public void testSelectOrder(){
    	OrderDao order=ctx.getBean("orderDao",OrderDao.class);
    	List<Map<String, Object>> all=order.findAllOrder();
    	System.out.println(all);
    }
   @Test
   public void testInsertOrder(){
		OrderDao orders=ctx.getBean("orderDao",OrderDao.class);
		OrderInformation order=new OrderInformation("88","2017-06-08","2017-06-23","PO20175111","11.210.310.225","PD35筒尾",3000,20,10, 
				3020,"白件","二次加工","2017-06-16",1," ", 9.9, " ",0);
	    int i=orders.addOrder(order);
   }
   
   @Test
   public void testInsertOrderService() throws Exception{
	   OrderService orderService=ctx.getBean("orderService",OrderService.class);
	   OrderInformation corder=new OrderInformation("77","2017-06-10","2017-06-23","PO20175111","11.210.310.225","PD35反光杯",3000,50,10, 
				3050,"白件","二次加工","2017-06-16",1," ", 9.9, " ",0);
	  CustomResult i= orderService.insert(corder);
	  System.out.println(i);
   }

   @Test
   public void testUpdateService(){
	   OrderDao orders=ctx.getBean("orderDao",OrderDao.class);
	   OrderService orderService=ctx.getBean("orderService",OrderService.class);
	   OrderInformation order=new OrderInformation("77","2017-06-10","2017-06-23","PO20175111","11.210.310.225","PD35反光杯",3000,50,10, 
				3050,"白件","二次加工","2017-06-16",1," ", 9.9, " ",0); 
   }
   @Test
   public void testsSchedule(){
	   ScheduleDao schedule=ctx.getBean("scheduleDao",ScheduleDao.class);
	   String orderNo="PO2017055";
	   String productName="PD35筒身";
	 
	   List<Map<String,Object>> list=schedule.findScheduleByParames(orderNo, productName);
	   System.out.println(list);
   }
}