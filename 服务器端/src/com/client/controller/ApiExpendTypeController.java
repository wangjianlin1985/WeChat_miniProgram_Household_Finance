package com.client.controller;

import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.ui.Model;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import org.springframework.web.bind.annotation.ModelAttribute;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.chengxusheji.po.ExpendType;
import com.chengxusheji.service.ExpendTypeService;
import com.client.service.AuthService;
import com.client.utils.JsonResult;
import com.client.utils.JsonResultBuilder;
import com.client.utils.ReturnCode;

@RestController
@RequestMapping("/api/expendType") 
public class ApiExpendTypeController {
	@Resource ExpendTypeService expendTypeService;
	@Resource AuthService authService;

	@InitBinder("expendType")
	public void initBinderExpendType(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("expendType.");
	}

	/*客户端ajax方式添加支出类型信息*/
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public JsonResult add(@Validated ExpendType expendType, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors()) //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR);
        expendTypeService.addExpendType(expendType); //添加到数据库
        return JsonResultBuilder.ok();
	}

	/*客户端ajax更新支出类型信息*/
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public JsonResult update(@Validated ExpendType expendType, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors())  //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR); 
        expendTypeService.updateExpendType(expendType);  //更新记录到数据库
        return JsonResultBuilder.ok(expendTypeService.getExpendType(expendType.getExpendTypeId()));
	}

	/*ajax方式显示获取支出类型详细信息*/
	@RequestMapping(value="/get/{expendTypeId}",method=RequestMethod.POST)
	public JsonResult getExpendType(@PathVariable int expendTypeId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
        /*根据主键expendTypeId获取ExpendType对象*/
        ExpendType expendType = expendTypeService.getExpendType(expendTypeId); 
        return JsonResultBuilder.ok(expendType);
	}

	/*ajax方式删除支出类型记录*/
	@RequestMapping(value="/delete/{expendTypeId}",method=RequestMethod.POST)
	public JsonResult deleteExpendType(@PathVariable int expendTypeId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		try {
			expendTypeService.deleteExpendType(expendTypeId);
			return JsonResultBuilder.ok();
		} catch (Exception ex) {
			return JsonResultBuilder.error(ReturnCode.FOREIGN_KEY_CONSTRAINT_ERROR);
		}
	}

	//客户端查询支出类型信息
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public JsonResult list(
Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		if (page==null || page == 0) page = 1;
		if(rows != 0)expendTypeService.setRows(rows);
		List<ExpendType> expendTypeList = expendTypeService.queryExpendType(page);
	    /*计算总的页数和总的记录数*/
	    expendTypeService.queryTotalPageAndRecordNumber();
	    /*获取到总的页码数目*/
	    int totalPage = expendTypeService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = expendTypeService.getRecordNumber();
	    HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("totalPage", totalPage);
	    resultMap.put("list", expendTypeList);
	    return JsonResultBuilder.ok(resultMap);
	}

	//客户端ajax获取所有支出类型
	@RequestMapping(value="/listAll",method=RequestMethod.POST)
	public JsonResult listAll() throws Exception{
		List<ExpendType> expendTypeList = expendTypeService.queryAllExpendType(); 
		return JsonResultBuilder.ok(expendTypeList);
	}
}

