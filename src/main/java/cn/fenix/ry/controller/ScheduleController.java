package cn.fenix.ry.controller;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.entity.Schedule;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.service.ScheduleService;
import cn.fenix.ry.serviceImple.NotOrderInformationFound;
import cn.fenix.ry.serviceImple.NotParamterException;
import cn.fenix.ry.util.CustomResult;
import cn.fenix.ry.util.JsonResult;


@Controller
@RequestMapping("schedule")
public class ScheduleController extends AbstractController{
	
	@Resource
	ScheduleService scheduleService;
	@Resource
	private OrderService orderService;
	@RequestMapping("/findAll.do")
	@ResponseBody
	public JsonResult<List<Map<String,Object>>> findAllSchedule(){
		List<Map<String,Object>> list=scheduleService.findAllSchedule();
		return new JsonResult<List<Map<String,Object>>>(list);
	}
	
	@RequestMapping("/list.do")
	@ResponseBody
	public JsonResult<List<Map<String,Object>>> list()throws Exception {
	    List<Map<String, Object>> list=
	            orderService.listOrderInformation();
	            return new JsonResult<List<Map<String,Object>>>(list);
    }
	
	
	@RequestMapping("/find.do")
	@ResponseBody
	/**
	 *根据订单号和产品名称查出进度表
	 */
	public JsonResult<List<Map<String,Object>>> findSchedule(String orderNo,String productName)throws Exception {
		List<Map<String,Object>> list=scheduleService.listSchedule(orderNo,productName);
		return new JsonResult<List<Map<String,Object>>>(list);
	}
	
	/**
	 * 插入订单进度表
	 * aaa
	 * @param schedule
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/insert.do")
    @ResponseBody
    public CustomResult insert(@Valid Schedule schedule,BindingResult bindingResult)throws Exception{
        CustomResult result;
        if(bindingResult.hasErrors()){
            FieldError fieldError=bindingResult.getFieldError();
            System.out.println(fieldError.getDefaultMessage());
            return CustomResult.build(100,fieldError.getDefaultMessage());
        }   
        return scheduleService.insert(schedule);
    }
	/**
	 * 修改订单进度
	 * @param schedule
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/update.do")
	@ResponseBody
	public CustomResult updateOrder(@Valid Schedule schedule, BindingResult bindingResult)throws Exception{
		if(bindingResult.hasErrors()){
			FieldError fieldError = bindingResult.getFieldError();
			return CustomResult.build(100, fieldError.getDefaultMessage());
		}
		return scheduleService.updateSchedule(schedule);
	}
	/**
	 * 批量删除订单
	 * @param orderIds
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/deleteBatch.do")
	@ResponseBody
	public  CustomResult delete(String[] ids) throws Exception {
	    if(ids==null||ids.equals(" ")){
			throw new NotParamterException("ids不存在");
		}
	    CustomResult result = scheduleService.deleteBatchs(ids);
	    return result;
	    
	}
	
}
