package cn.fenix.ry.controller;

import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.fenix.ry.entity.Corder;
import cn.fenix.ry.entity.OrderSchedule;
import cn.fenix.ry.service.OrderScheduleService;
import cn.fenix.ry.util.JsonResult;

@Controller
@RequestMapping("schedule")
public class OrderScheduleController extends AbstractController {
	@Resource
	private OrderScheduleService orderScheduleService;
	
	@RequestMapping("/find.do")
	@ResponseBody
	public void tfindInfo(HttpServletResponse response) throws Exception{
				
		List<String> list=orderScheduleService.find();
				String date = "";
				date += "{\"status\":";
				PrintWriter out = null;  
				response.setCharacterEncoding("gbk");  //防止ajax接受到的中文信息乱码  
		        out = response.getWriter();
		        if(list!=null){
		        	date += "\"200\",\"data\":"+list+",\"msg\":\"}";
		        	out.print(date); 
		        }else{
	                date += "\"100\",\"data\":\"null\",\"msg\":\"查询失败！\"}";
	                out.print(date);
	                }  
                out.flush();  
                out.close(); 
		}
	
		//增加订单
		@RequestMapping("/insert.do")
		@ResponseBody
		public JsonResult<Integer> insert(OrderSchedule schedule){
			int n=orderScheduleService.insert(schedule);
			return new JsonResult<Integer>(n);
		}
		
		//修改订单
		@RequestMapping("/update.do")
		@ResponseBody
		public JsonResult<Boolean> update(OrderSchedule schedule){
			Boolean boo=orderScheduleService.update(schedule);
			return new JsonResult<Boolean>(boo);
		}
		
		//批量删除订单
		@RequestMapping("/delete.do")
		@ResponseBody
		public JsonResult<Integer> delete(String[] ids){
			int n=orderScheduleService.delete(ids);
			return new JsonResult<Integer>(n);
		}
	
}
