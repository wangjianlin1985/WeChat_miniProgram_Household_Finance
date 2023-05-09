package com.chengxusheji.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.chengxusheji.utils.ExportExcelUtil;
import com.chengxusheji.utils.UserException;
import com.chengxusheji.service.IncomeTypeService;
import com.chengxusheji.po.IncomeType;

//IncomeType管理控制层
@Controller
@RequestMapping("/IncomeType")
public class IncomeTypeController extends BaseController {

    /*业务层对象*/
    @Resource IncomeTypeService incomeTypeService;

	@InitBinder("incomeType")
	public void initBinderIncomeType(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("incomeType.");
	}
	/*跳转到添加IncomeType视图*/
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public String add(Model model,HttpServletRequest request) throws Exception {
		model.addAttribute(new IncomeType());
		return "IncomeType_add";
	}

	/*客户端ajax方式提交添加收入类型信息*/
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void add(@Validated IncomeType incomeType, BindingResult br,
			Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		String message = "";
		boolean success = false;
		if (br.hasErrors()) {
			message = "输入信息不符合要求！";
			writeJsonResponse(response, success, message);
			return ;
		}
        incomeTypeService.addIncomeType(incomeType);
        message = "收入类型添加成功!";
        success = true;
        writeJsonResponse(response, success, message);
	}
	/*ajax方式按照查询条件分页查询收入类型信息*/
	@RequestMapping(value = { "/list" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void list(Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		if (page==null || page == 0) page = 1;
		if(rows != 0)incomeTypeService.setRows(rows);
		List<IncomeType> incomeTypeList = incomeTypeService.queryIncomeType(page);
	    /*计算总的页数和总的记录数*/
	    incomeTypeService.queryTotalPageAndRecordNumber();
	    /*获取到总的页码数目*/
	    int totalPage = incomeTypeService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = incomeTypeService.getRecordNumber();
        response.setContentType("text/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		//将要被返回到客户端的对象
		JSONObject jsonObj=new JSONObject();
		jsonObj.accumulate("total", recordNumber);
		JSONArray jsonArray = new JSONArray();
		for(IncomeType incomeType:incomeTypeList) {
			JSONObject jsonIncomeType = incomeType.getJsonObject();
			jsonArray.put(jsonIncomeType);
		}
		jsonObj.accumulate("rows", jsonArray);
		out.println(jsonObj.toString());
		out.flush();
		out.close();
	}

	/*ajax方式按照查询条件分页查询收入类型信息*/
	@RequestMapping(value = { "/listAll" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void listAll(HttpServletResponse response) throws Exception {
		List<IncomeType> incomeTypeList = incomeTypeService.queryAllIncomeType();
        response.setContentType("text/json;charset=UTF-8"); 
		PrintWriter out = response.getWriter();
		JSONArray jsonArray = new JSONArray();
		for(IncomeType incomeType:incomeTypeList) {
			JSONObject jsonIncomeType = new JSONObject();
			jsonIncomeType.accumulate("incomeTypeId", incomeType.getIncomeTypeId());
			jsonIncomeType.accumulate("incomeTypeName", incomeType.getIncomeTypeName());
			jsonArray.put(jsonIncomeType);
		}
		out.println(jsonArray.toString());
		out.flush();
		out.close();
	}

	/*前台按照查询条件分页查询收入类型信息*/
	@RequestMapping(value = { "/frontlist" }, method = {RequestMethod.GET,RequestMethod.POST})
	public String frontlist(Integer currentPage, Model model, HttpServletRequest request) throws Exception  {
		if (currentPage==null || currentPage == 0) currentPage = 1;
		List<IncomeType> incomeTypeList = incomeTypeService.queryIncomeType(currentPage);
	    /*计算总的页数和总的记录数*/
	    incomeTypeService.queryTotalPageAndRecordNumber();
	    /*获取到总的页码数目*/
	    int totalPage = incomeTypeService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = incomeTypeService.getRecordNumber();
	    request.setAttribute("incomeTypeList",  incomeTypeList);
	    request.setAttribute("totalPage", totalPage);
	    request.setAttribute("recordNumber", recordNumber);
	    request.setAttribute("currentPage", currentPage);
		return "IncomeType/incomeType_frontquery_result"; 
	}

     /*前台查询IncomeType信息*/
	@RequestMapping(value="/{incomeTypeId}/frontshow",method=RequestMethod.GET)
	public String frontshow(@PathVariable Integer incomeTypeId,Model model,HttpServletRequest request) throws Exception {
		/*根据主键incomeTypeId获取IncomeType对象*/
        IncomeType incomeType = incomeTypeService.getIncomeType(incomeTypeId);

        request.setAttribute("incomeType",  incomeType);
        return "IncomeType/incomeType_frontshow";
	}

	/*ajax方式显示收入类型修改jsp视图页*/
	@RequestMapping(value="/{incomeTypeId}/update",method=RequestMethod.GET)
	public void update(@PathVariable Integer incomeTypeId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
        /*根据主键incomeTypeId获取IncomeType对象*/
        IncomeType incomeType = incomeTypeService.getIncomeType(incomeTypeId);

        response.setContentType("text/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
		//将要被返回到客户端的对象 
		JSONObject jsonIncomeType = incomeType.getJsonObject();
		out.println(jsonIncomeType.toString());
		out.flush();
		out.close();
	}

	/*ajax方式更新收入类型信息*/
	@RequestMapping(value = "/{incomeTypeId}/update", method = RequestMethod.POST)
	public void update(@Validated IncomeType incomeType, BindingResult br,
			Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		String message = "";
    	boolean success = false;
		if (br.hasErrors()) { 
			message = "输入的信息有错误！";
			writeJsonResponse(response, success, message);
			return;
		}
		try {
			incomeTypeService.updateIncomeType(incomeType);
			message = "收入类型更新成功!";
			success = true;
			writeJsonResponse(response, success, message);
		} catch (Exception e) {
			e.printStackTrace();
			message = "收入类型更新失败!";
			writeJsonResponse(response, success, message); 
		}
	}
    /*删除收入类型信息*/
	@RequestMapping(value="/{incomeTypeId}/delete",method=RequestMethod.GET)
	public String delete(@PathVariable Integer incomeTypeId,HttpServletRequest request) throws UnsupportedEncodingException {
		  try {
			  incomeTypeService.deleteIncomeType(incomeTypeId);
	            request.setAttribute("message", "收入类型删除成功!");
	            return "message";
	        } catch (Exception e) { 
	            e.printStackTrace();
	            request.setAttribute("error", "收入类型删除失败!");
				return "error";

	        }

	}

	/*ajax方式删除多条收入类型记录*/
	@RequestMapping(value="/deletes",method=RequestMethod.POST)
	public void delete(String incomeTypeIds,HttpServletRequest request,HttpServletResponse response) throws IOException, JSONException {
		String message = "";
    	boolean success = false;
        try { 
        	int count = incomeTypeService.deleteIncomeTypes(incomeTypeIds);
        	success = true;
        	message = count + "条记录删除成功";
        	writeJsonResponse(response, success, message);
        } catch (Exception e) { 
            //e.printStackTrace();
            message = "有记录存在外键约束,删除失败";
            writeJsonResponse(response, success, message);
        }
	}

	/*按照查询条件导出收入类型信息到Excel*/
	@RequestMapping(value = { "/OutToExcel" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void OutToExcel( Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
        List<IncomeType> incomeTypeList = incomeTypeService.queryIncomeType();
        ExportExcelUtil ex = new ExportExcelUtil();
        String _title = "IncomeType信息记录"; 
        String[] headers = { "收入类别id","收入类别名称"};
        List<String[]> dataset = new ArrayList<String[]>(); 
        for(int i=0;i<incomeTypeList.size();i++) {
        	IncomeType incomeType = incomeTypeList.get(i); 
        	dataset.add(new String[]{incomeType.getIncomeTypeId() + "",incomeType.getIncomeTypeName()});
        }
        /*
        OutputStream out = null;
		try {
			out = new FileOutputStream("C://output.xls");
			ex.exportExcel(title,headers, dataset, out);
		    out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		*/
		OutputStream out = null;//创建一个输出流对象 
		try { 
			out = response.getOutputStream();//
			response.setHeader("Content-disposition","attachment; filename="+"IncomeType.xls");//filename是下载的xls的名，建议最好用英文 
			response.setContentType("application/msexcel;charset=UTF-8");//设置类型 
			response.setHeader("Pragma","No-cache");//设置头 
			response.setHeader("Cache-Control","no-cache");//设置头 
			response.setDateHeader("Expires", 0);//设置日期头  
			String rootPath = request.getSession().getServletContext().getRealPath("/");
			ex.exportExcel(rootPath,_title,headers, dataset, out);
			out.flush();
		} catch (IOException e) { 
			e.printStackTrace(); 
		}finally{
			try{
				if(out!=null){ 
					out.close(); 
				}
			}catch(IOException e){ 
				e.printStackTrace(); 
			} 
		}
    }
}
