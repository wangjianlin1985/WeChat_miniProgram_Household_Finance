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
import com.chengxusheji.po.IncomeType;
import com.chengxusheji.service.IncomeTypeService;
import com.client.service.AuthService;
import com.client.utils.JsonResult;
import com.client.utils.JsonResultBuilder;
import com.client.utils.ReturnCode;

@RestController
@RequestMapping("/api/incomeType") 
public class ApiIncomeTypeController {
	@Resource IncomeTypeService incomeTypeService;
	@Resource AuthService authService;

	@InitBinder("incomeType")
	public void initBinderIncomeType(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("incomeType.");
	}

	/*客户端ajax方式添加收入类型信息*/
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public JsonResult add(@Validated IncomeType incomeType, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors()) //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR);
        incomeTypeService.addIncomeType(incomeType); //添加到数据库
        return JsonResultBuilder.ok();
	}

	/*客户端ajax更新收入类型信息*/
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public JsonResult update(@Validated IncomeType incomeType, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors())  //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR); 
        incomeTypeService.updateIncomeType(incomeType);  //更新记录到数据库
        return JsonResultBuilder.ok(incomeTypeService.getIncomeType(incomeType.getIncomeTypeId()));
	}

	/*ajax方式显示获取收入类型详细信息*/
	@RequestMapping(value="/get/{incomeTypeId}",method=RequestMethod.POST)
	public JsonResult getIncomeType(@PathVariable int incomeTypeId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
        /*根据主键incomeTypeId获取IncomeType对象*/
        IncomeType incomeType = incomeTypeService.getIncomeType(incomeTypeId); 
        return JsonResultBuilder.ok(incomeType);
	}

	/*ajax方式删除收入类型记录*/
	@RequestMapping(value="/delete/{incomeTypeId}",method=RequestMethod.POST)
	public JsonResult deleteIncomeType(@PathVariable int incomeTypeId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		try {
			incomeTypeService.deleteIncomeType(incomeTypeId);
			return JsonResultBuilder.ok();
		} catch (Exception ex) {
			return JsonResultBuilder.error(ReturnCode.FOREIGN_KEY_CONSTRAINT_ERROR);
		}
	}

	//客户端查询收入类型信息
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public JsonResult list(
Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		if (page==null || page == 0) page = 1;
		if(rows != 0)incomeTypeService.setRows(rows);
		List<IncomeType> incomeTypeList = incomeTypeService.queryIncomeType(page);
	    /*计算总的页数和总的记录数*/
	    incomeTypeService.queryTotalPageAndRecordNumber();
	    /*获取到总的页码数目*/
	    int totalPage = incomeTypeService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = incomeTypeService.getRecordNumber();
	    HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("totalPage", totalPage);
	    resultMap.put("list", incomeTypeList);
	    return JsonResultBuilder.ok(resultMap);
	}

	//客户端ajax获取所有收入类型
	@RequestMapping(value="/listAll",method=RequestMethod.POST)
	public JsonResult listAll() throws Exception{
		List<IncomeType> incomeTypeList = incomeTypeService.queryAllIncomeType(); 
		return JsonResultBuilder.ok(incomeTypeList);
	}
}

