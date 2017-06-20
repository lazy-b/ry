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
import cn.fenix.ry.entity.ProductTracking;
import cn.fenix.ry.entity.RawRecord;
import cn.fenix.ry.service.DeliveryService;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.service.ProductTrackingService;
import cn.fenix.ry.service.RawRecordService;
import cn.fenix.ry.util.CustomResult;
import cn.fenix.ry.util.JsonResult;

/**
 * 订单管理控制器
 * @author wenye
 *
 */
@Controller
@RequestMapping("rawRecord")
public class RawRecordController {
	@Resource
	private RawRecordService rawRecordService;
	/**
	 * @return list原材料记录表
	 * @throws Exception
	 */
	@RequestMapping("/list.do")
	@ResponseBody
	public JsonResult<List<Map<String, Object>>>listOrder()throws Exception {
		List<Map<String, Object>> list=
		rawRecordService.listRawRecord();
		return new JsonResult<List<Map<String,Object>>>(list);
	}
	
	/**
	 * 插入原材料记录
	 * @param order
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/insert.do")
	@ResponseBody
	public CustomResult insert(@Valid RawRecord rawRecord,BindingResult bindingResult)throws Exception{
		CustomResult result;
		if(bindingResult.hasErrors()){
			FieldError fieldError=bindingResult.getFieldError();
			System.out.println(fieldError.getDefaultMessage());
			return CustomResult.build(100,fieldError.getDefaultMessage());
		}	
		return rawRecordService.insert(rawRecord);
	}
	
	/**
	 * Id删除原材料记录
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/delete.do")
	@ResponseBody
	public CustomResult delete(String rowRecordId) throws Exception {
		CustomResult result =rawRecordService.deleteRawRecord(rowRecordId);
		return result;
	}
	
	/**
	 * 批量删除原材料记录
	 * @param orderIds
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteBatch.do")
	@ResponseBody
	public  CustomResult delete(String[] Ids) throws Exception {
		CustomResult result =rawRecordService.deleteBatch(Ids);
		return result;
	}
	
	/**
	 * 修改原材料记录
	 * @param cOrder
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/update.do")
	@ResponseBody
	public CustomResult updateOrder(@Valid RawRecord rawRecord, BindingResult bindingResult)throws Exception{
		if(bindingResult.hasErrors()){
			FieldError fieldError = bindingResult.getFieldError();
			return CustomResult.build(100, fieldError.getDefaultMessage());
		}
		return rawRecordService.updateRawRecord(rawRecord);
	}
}
