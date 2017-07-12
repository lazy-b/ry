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

import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.serviceImple.NotOrderInformationFound;
import cn.fenix.ry.util.CustomResult;
import cn.fenix.ry.util.JsonResult;

/**
 * 订单管理控制器
 * @author wenye
 *
 */
@Controller
@RequestMapping("order")
public class OrderController {
	@Resource
	private OrderService orderService;
	/**
	 * @return list订单表
	 * @throws Exception
	 */
	@RequestMapping("/list.do")
	@ResponseBody
	public JsonResult<List<Map<String, Object>>>listOrder()throws Exception {
		List<Map<String, Object>> list=
		orderService.listOrderInformation();
		return new JsonResult<List<Map<String,Object>>>(list);
	}
	
	/**
	 * 插入订单
	 * @param order
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/insert.do")
	@ResponseBody
	public CustomResult insert(@Valid OrderInformation order,BindingResult bindingResult)throws Exception{
		CustomResult result;
		if(bindingResult.hasErrors()){
			FieldError fieldError=bindingResult.getFieldError();
			System.out.println(fieldError.getDefaultMessage());
			return CustomResult.build(100,fieldError.getDefaultMessage());
		}	
		return orderService.insert(order);
	}
	
	/**
	 * 根据物料编码查询订单
	 * @param materialCoding
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getOrderByMaterialCoding.do")
	@ResponseBody
	public JsonResult<List<Map<String, Object>>> getByCoding(String materialCoding) throws Exception{
		List<Map<String,Object>> orders=orderService.getOrdersByCoding(materialCoding);
		return new JsonResult<List<Map<String,Object>>>(orders);	
	}
	
	/**
	 * 根据产品名称查询
	 * @param productName
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getOrderByProductName.do")
	@ResponseBody
	public JsonResult<List<Map<String, Object>>> getByName(String productName) throws Exception{
		List<Map<String,Object>> orders=orderService.getOrdersByName(productName);
		return new JsonResult<List<Map<String,Object>>>(orders);	
	}
	
	/**
	 * 多条件查询订单
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getOrderByParams.do")
	@ResponseBody
	public JsonResult<List<Map<String, Object>>> getByParams(Map<String,Object> params) throws Exception{
		List<Map<String,Object>> orders=orderService.getOrdersByParams(params);
		return new JsonResult<List<Map<String,Object>>>(orders);	
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
		if(ids==null){
			throw new NotOrderInformationFound("ids不存在");
		}
		CustomResult result = orderService.deleteBatchs(ids);
		return result;
	}
	
	/**
	 * 修改订单信息
	 * @param cOrder
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/update.do")
	@ResponseBody
	public CustomResult updateOrder(@Valid OrderInformation cOrder, BindingResult bindingResult)throws Exception{
		if(bindingResult.hasErrors()){
			FieldError fieldError = bindingResult.getFieldError();
			return CustomResult.build(100, fieldError.getDefaultMessage());
		}
		return orderService.updateOrder(cOrder);
	}
	
	@RequestMapping("/updateAll.do")
	@ResponseBody
	public CustomResult updateOrderAll(@Valid OrderInformation cOrder, BindingResult bindingResult)throws Exception{
		if(bindingResult.hasErrors()){
			FieldError fieldError = bindingResult.getFieldError();
			return CustomResult.build(100, fieldError.getDefaultMessage());
		}
		return orderService.updateOrderAll(cOrder);
	}
}
