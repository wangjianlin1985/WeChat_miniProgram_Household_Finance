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
import com.chengxusheji.po.Income;
import com.chengxusheji.po.IncomeType;
import com.chengxusheji.po.PayWay;
import com.chengxusheji.po.UserInfo;
import com.chengxusheji.service.IncomeService;
import com.chengxusheji.service.UserInfoService;
import com.client.service.AuthService;
import com.client.utils.JsonResult;
import com.client.utils.JsonResultBuilder;
import com.client.utils.ReturnCode;

@RestController
@RequestMapping("/api/income") 
public class ApiIncomeController {
	@Resource IncomeService incomeService;
	@Resource AuthService authService;
	@Resource UserInfoService userInfoService;

	@InitBinder("incomeTypeObj")
	public void initBinderincomeTypeObj(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("incomeTypeObj.");
	}
	@InitBinder("payWayObj")
	public void initBinderpayWayObj(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("payWayObj.");
	}
	@InitBinder("userObj")
	public void initBinderuserObj(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("userObj.");
	}
	@InitBinder("income")
	public void initBinderIncome(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("income.");
	}

	/*客户端ajax方式添加收入信息信息*/
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public JsonResult add(@Validated Income income, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors()) //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR);
        incomeService.addIncome(income); //添加到数据库
        return JsonResultBuilder.ok();
	}
	
	
	/*客户端ajax方式添加收入信息信息*/
	@RequestMapping(value = "/userAdd", method = RequestMethod.POST)
	public JsonResult userAdd(@Validated Income income, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors()) //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR);
		UserInfo userInfo = userInfoService.getUserInfo(userName);
		income.setUserObj(userInfo);
		
        incomeService.addIncome(income); //添加到数据库
        return JsonResultBuilder.ok();
	}
	

	/*客户端ajax更新收入信息信息*/
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public JsonResult update(@Validated Income income, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors())  //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR); 
        incomeService.updateIncome(income);  //更新记录到数据库
        return JsonResultBuilder.ok(incomeService.getIncome(income.getIncomeId()));
	}

	/*ajax方式显示获取收入信息详细信息*/
	@RequestMapping(value="/get/{incomeId}",method=RequestMethod.POST)
	public JsonResult getIncome(@PathVariable int incomeId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
        /*根据主键incomeId获取Income对象*/
        Income income = incomeService.getIncome(incomeId); 
        return JsonResultBuilder.ok(income);
	}

	/*ajax方式删除收入信息记录*/
	@RequestMapping(value="/delete/{incomeId}",method=RequestMethod.POST)
	public JsonResult deleteIncome(@PathVariable int incomeId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		try {
			incomeService.deleteIncome(incomeId);
			return JsonResultBuilder.ok();
		} catch (Exception ex) {
			return JsonResultBuilder.error(ReturnCode.FOREIGN_KEY_CONSTRAINT_ERROR);
		}
	}

	//客户端查询收入信息信息
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public JsonResult list(
@ModelAttribute("incomeTypeObj") IncomeType incomeTypeObj,String incomeFrom,@ModelAttribute("payWayObj") PayWay payWayObj,String payAccount,String incomeDate,@ModelAttribute("userObj") UserInfo userObj,Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		if (page==null || page == 0) page = 1;
		if (incomeFrom == null) incomeFrom = "";
		if (payAccount == null) payAccount = "";
		if (incomeDate == null) incomeDate = "";
		if(rows != 0)incomeService.setRows(rows);
		List<Income> incomeList = incomeService.queryIncome(incomeTypeObj, incomeFrom, payWayObj, payAccount, incomeDate, userObj, page);
	    /*计算总的页数和总的记录数*/
	    incomeService.queryTotalPageAndRecordNumber(incomeTypeObj, incomeFrom, payWayObj, payAccount, incomeDate, userObj);
	    /*获取到总的页码数目*/
	    int totalPage = incomeService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = incomeService.getRecordNumber();
	    HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("totalPage", totalPage);
	    resultMap.put("list", incomeList);
	    return JsonResultBuilder.ok(resultMap);
	}
	
	//客户端查询收入信息信息
	@RequestMapping(value="/zxList",method=RequestMethod.POST)
	public JsonResult zxList(Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		 
		List<Income> incomeList = incomeService.queryZxIncome();
	    
	    HashMap<String, Object> resultMap = new HashMap<String, Object>(); 
	    resultMap.put("list", incomeList);
	    return JsonResultBuilder.ok(resultMap);
	}
	
	
	
	
	//客户端查询收入信息信息
	@RequestMapping(value="/userList",method=RequestMethod.POST)
	public JsonResult userList(@ModelAttribute("incomeTypeObj") IncomeType incomeTypeObj,String incomeFrom,@ModelAttribute("payWayObj") PayWay payWayObj,String payAccount,String incomeDate,@ModelAttribute("userObj") UserInfo userObj,Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		
		if (page==null || page == 0) page = 1;
		if (incomeFrom == null) incomeFrom = "";
		if (payAccount == null) payAccount = "";
		if (incomeDate == null) incomeDate = "";
		if(rows != 0)incomeService.setRows(rows);
		userObj = new UserInfo();
		userObj.setUser_name(userName);
		
		List<Income> incomeList = incomeService.queryIncome(incomeTypeObj, incomeFrom, payWayObj, payAccount, incomeDate, userObj, page);
	    /*计算总的页数和总的记录数*/
	    incomeService.queryTotalPageAndRecordNumber(incomeTypeObj, incomeFrom, payWayObj, payAccount, incomeDate, userObj);
	    /*获取到总的页码数目*/
	    int totalPage = incomeService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = incomeService.getRecordNumber();
	    HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("totalPage", totalPage);
	    resultMap.put("list", incomeList);
	    return JsonResultBuilder.ok(resultMap);
	}
	

	//客户端ajax获取所有收入信息
	@RequestMapping(value="/listAll",method=RequestMethod.POST)
	public JsonResult listAll() throws Exception{
		List<Income> incomeList = incomeService.queryAllIncome(); 
		return JsonResultBuilder.ok(incomeList);
	}
}

