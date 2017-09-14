package cn.fenix.ry.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.fenix.ry.entity.DeliveryTracking;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.service.DeliveryService;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.util.CustomResult;
import cn.fenix.ry.util.JsonResult;

/**
 * 订单管理控制器
 * @author wenye
 *
 */
@Controller
@RequestMapping("deliveryTracking")
public class DeliveryTrackingController {
	@Resource
	private DeliveryService deliveryService;

	/**
	 * @return list交货表
	 * @throws Exception
	 */
	@RequestMapping("/list.do")
	@ResponseBody
	public JsonResult<List<Map<String, Object>>>listOrder()throws Exception {
		List<Map<String, Object>> list=
		deliveryService.listDeliveryTracking();
		return new JsonResult<List<Map<String,Object>>>(list);
	}
	
	/**
	 * 插入交货表
	 * @param order
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/insert.do")
	@ResponseBody
	public CustomResult insert(@Valid DeliveryTracking delivery,BindingResult bindingResult)throws Exception{
		CustomResult result;
		if(bindingResult.hasErrors()){
			FieldError fieldError=bindingResult.getFieldError();
			System.out.println(fieldError.getDefaultMessage());
			return CustomResult.build(100,fieldError.getDefaultMessage());
		}	
		return deliveryService.insert(delivery);
	}
	
	/**
	 * Id删除交货记录
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/delete.do")
	@ResponseBody
	public CustomResult delete(String deliveryRecordId) throws Exception {
		CustomResult result = deliveryService.deleteDelivery(deliveryRecordId);
		return result;
	}
	
	/**
	 * 批量删除交货记录
	 * @param orderIds
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteBatch.do")
	@ResponseBody
	public  CustomResult delete(String[] Ids) throws Exception {
		CustomResult result =deliveryService.deleteBatch(Ids);
		return result;
	}
	
	/**
	 * 修改交货记录
	 * @param cOrder
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/update.do")
	@ResponseBody
	public CustomResult updateOrder(@Valid  DeliveryTracking delivery, BindingResult bindingResult)throws Exception{
		if(bindingResult.hasErrors()){
			FieldError fieldError = bindingResult.getFieldError();
			return CustomResult.build(100, fieldError.getDefaultMessage());
		}
		return deliveryService.updateOrder(delivery);
	}
}
