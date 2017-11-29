package cn.fenix.ry.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.fenix.ry.service.CorderService;
import cn.fenix.ry.entity.Corder;
import cn.fenix.ry.util.JsonResult;

@Controller
@RequestMapping("corder")
public class CorderController extends AbstractController{
	@Resource
	private CorderService corderService;
	
	//展示所有订单
	@RequestMapping("/list.do")
	@ResponseBody
	public JsonResult<List<Map<String,Object>>> CorderList(){
		List<Map<String,Object>> list=corderService.find(null);
		return new JsonResult<List<Map<String,Object>>>(list);
	}
	
	//增加订单
	@RequestMapping("/insert.do")
	@ResponseBody
	public JsonResult<Integer> insert(Corder corder){
		int n=corderService.insert(corder);
		return new JsonResult<Integer>(n);
	}
	
	//修改订单
	@RequestMapping("/update.do")
	@ResponseBody
	public JsonResult<Boolean> update(Corder corder){
		Boolean boo=corderService.update(corder);
		return new JsonResult<Boolean>(boo);
	}
	
	//批量删除订单
	@RequestMapping("/delete.do")
	@ResponseBody
	public JsonResult<Integer> delete(String[] ids){
		int n=corderService.delete(ids);
		return new JsonResult<Integer>(n);
	}
	
}
