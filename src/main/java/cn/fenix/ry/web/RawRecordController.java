package cn.fenix.ry.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.fenix.ry.service.RawRecordService;
import cn.fenix.ry.util.JsonResult;

@Controller
@RequestMapping("/rawRecord")
public class RawRecordController {
	@Resource
	private RawRecordService rawRecordService;
	@RequestMapping("/rawlist.do")
	@ResponseBody
	public JsonResult<List<Map<String,Object>>>listRawRecord(){
		List<Map<String, Object>> list=
				rawRecordService.listAllRawRecord();
		return new JsonResult<List<Map<String,Object>>>(list);
		
	}
}
