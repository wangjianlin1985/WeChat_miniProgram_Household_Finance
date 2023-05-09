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
import com.chengxusheji.po.Expend;
import com.chengxusheji.po.ExpendType;
import com.chengxusheji.po.PayWay;
import com.chengxusheji.po.UserInfo;
import com.chengxusheji.service.ExpendService;
import com.chengxusheji.service.UserInfoService;
import com.client.service.AuthService;
import com.client.utils.JsonResult;
import com.client.utils.JsonResultBuilder;
import com.client.utils.ReturnCode;

@RestController
@RequestMapping("/api/expend") 
public class ApiExpendController {
	@Resource ExpendService expendService;
	@Resource AuthService authService;
	@Resource UserInfoService userInfoService;

	@InitBinder("expendTypeObj")
	public void initBinderexpendTypeObj(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("expendTypeObj.");
	}
	@InitBinder("payWayObj")
	public void initBinderpayWayObj(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("payWayObj.");
	}
	@InitBinder("userInfoObj")
	public void initBinderuserInfoObj(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("userInfoObj.");
	}
	@InitBinder("expend")
	public void initBinderExpend(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("expend.");
	}

	/*客户端ajax方式添加支出信息信息*/
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public JsonResult add(@Validated Expend expend, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors()) //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR);
        expendService.addExpend(expend); //添加到数据库
        return JsonResultBuilder.ok();
	}
	
	
	/*客户端ajax方式添加支出信息信息*/
	@RequestMapping(value = "/userAdd", method = RequestMethod.POST)
	public JsonResult userAdd(@Validated Expend expend, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors()) //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR);
        UserInfo userInfo = userInfoService.getUserInfo(userName);
        expend.setUserInfoObj(userInfo);
        
		expendService.addExpend(expend); //添加到数据库
        return JsonResultBuilder.ok();
	}
	
	

	/*客户端ajax更新支出信息信息*/
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public JsonResult update(@Validated Expend expend, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors())  //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR); 
        expendService.updateExpend(expend);  //更新记录到数据库
        return JsonResultBuilder.ok(expendService.getExpend(expend.getExpendId()));
	}

	/*ajax方式显示获取支出信息详细信息*/
	@RequestMapping(value="/get/{expendId}",method=RequestMethod.POST)
	public JsonResult getExpend(@PathVariable int expendId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
        /*根据主键expendId获取Expend对象*/
        Expend expend = expendService.getExpend(expendId); 
        return JsonResultBuilder.ok(expend);
	}

	/*ajax方式删除支出信息记录*/
	@RequestMapping(value="/delete/{expendId}",method=RequestMethod.POST)
	public JsonResult deleteExpend(@PathVariable int expendId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		try {
			expendService.deleteExpend(expendId);
			return JsonResultBuilder.ok();
		} catch (Exception ex) {
			return JsonResultBuilder.error(ReturnCode.FOREIGN_KEY_CONSTRAINT_ERROR);
		}
	}

	//客户端查询支出信息信息
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public JsonResult list(
@ModelAttribute("expendTypeObj") ExpendType expendTypeObj,String expendPurpose,@ModelAttribute("payWayObj") PayWay payWayObj,String payAccount,String expendDate,@ModelAttribute("userInfoObj") UserInfo userInfoObj,Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		if (page==null || page == 0) page = 1;
		if (expendPurpose == null) expendPurpose = "";
		if (payAccount == null) payAccount = "";
		if (expendDate == null) expendDate = "";
		if(rows != 0)expendService.setRows(rows);
		List<Expend> expendList = expendService.queryExpend(expendTypeObj, expendPurpose, payWayObj, payAccount, expendDate, userInfoObj, page);
	    /*计算总的页数和总的记录数*/
	    expendService.queryTotalPageAndRecordNumber(expendTypeObj, expendPurpose, payWayObj, payAccount, expendDate, userInfoObj);
	    /*获取到总的页码数目*/
	    int totalPage = expendService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = expendService.getRecordNumber();
	    HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("totalPage", totalPage);
	    resultMap.put("list", expendList);
	    return JsonResultBuilder.ok(resultMap);
	}
	
	//客户端查询支出信息信息
	@RequestMapping(value="/userList",method=RequestMethod.POST)
	public JsonResult userList(@ModelAttribute("expendTypeObj") ExpendType expendTypeObj,String expendPurpose,@ModelAttribute("payWayObj") PayWay payWayObj,String payAccount,String expendDate,@ModelAttribute("userInfoObj") UserInfo userInfoObj,Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		userInfoObj = new UserInfo();
		userInfoObj.setUser_name(userName);
		
		if (page==null || page == 0) page = 1;
		if (expendPurpose == null) expendPurpose = "";
		if (payAccount == null) payAccount = "";
		if (expendDate == null) expendDate = "";
		if(rows != 0)expendService.setRows(rows);
		List<Expend> expendList = expendService.queryExpend(expendTypeObj, expendPurpose, payWayObj, payAccount, expendDate, userInfoObj, page);
	    /*计算总的页数和总的记录数*/
	    expendService.queryTotalPageAndRecordNumber(expendTypeObj, expendPurpose, payWayObj, payAccount, expendDate, userInfoObj);
	    /*获取到总的页码数目*/
	    int totalPage = expendService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = expendService.getRecordNumber();
	    HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("totalPage", totalPage);
	    resultMap.put("list", expendList);
	    return JsonResultBuilder.ok(resultMap);
	}
	
	//客户端查询最新支出信息信息
	@RequestMapping(value="/zxList",method=RequestMethod.POST)
	public JsonResult userList(Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		 
		List<Expend> expendList = expendService.queryZxExpend();
	    
	    HashMap<String, Object> resultMap = new HashMap<String, Object>(); 
	    resultMap.put("list", expendList);
	    return JsonResultBuilder.ok(resultMap);
	}

	//客户端ajax获取所有支出信息
	@RequestMapping(value="/listAll",method=RequestMethod.POST)
	public JsonResult listAll() throws Exception{
		List<Expend> expendList = expendService.queryAllExpend(); 
		return JsonResultBuilder.ok(expendList);
	}
}

