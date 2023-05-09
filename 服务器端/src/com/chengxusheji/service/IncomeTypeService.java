package com.chengxusheji.service;

import java.util.ArrayList;
import javax.annotation.Resource; 
import org.springframework.stereotype.Service;
import com.chengxusheji.po.IncomeType;

import com.chengxusheji.mapper.IncomeTypeMapper;
@Service
public class IncomeTypeService {

	@Resource IncomeTypeMapper incomeTypeMapper;
    /*每页显示记录数目*/
    private int rows = 10;;
    public int getRows() {
		return rows;
	}
	public void setRows(int rows) {
		this.rows = rows;
	}

    /*保存查询后总的页数*/
    private int totalPage;
    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }
    public int getTotalPage() {
        return totalPage;
    }

    /*保存查询到的总记录数*/
    private int recordNumber;
    public void setRecordNumber(int recordNumber) {
        this.recordNumber = recordNumber;
    }
    public int getRecordNumber() {
        return recordNumber;
    }

    /*添加收入类型记录*/
    public void addIncomeType(IncomeType incomeType) throws Exception {
    	incomeTypeMapper.addIncomeType(incomeType);
    }

    /*按照查询条件分页查询收入类型记录*/
    public ArrayList<IncomeType> queryIncomeType(int currentPage) throws Exception { 
     	String where = "where 1=1";
    	int startIndex = (currentPage-1) * this.rows;
    	return incomeTypeMapper.queryIncomeType(where, startIndex, this.rows);
    }

    /*按照查询条件查询所有记录*/
    public ArrayList<IncomeType> queryIncomeType() throws Exception  { 
     	String where = "where 1=1";
    	return incomeTypeMapper.queryIncomeTypeList(where);
    }

    /*查询所有收入类型记录*/
    public ArrayList<IncomeType> queryAllIncomeType()  throws Exception {
        return incomeTypeMapper.queryIncomeTypeList("where 1=1");
    }

    /*当前查询条件下计算总的页数和记录数*/
    public void queryTotalPageAndRecordNumber() throws Exception {
     	String where = "where 1=1";
        recordNumber = incomeTypeMapper.queryIncomeTypeCount(where);
        int mod = recordNumber % this.rows;
        totalPage = recordNumber / this.rows;
        if(mod != 0) totalPage++;
    }

    /*根据主键获取收入类型记录*/
    public IncomeType getIncomeType(int incomeTypeId) throws Exception  {
        IncomeType incomeType = incomeTypeMapper.getIncomeType(incomeTypeId);
        return incomeType;
    }

    /*更新收入类型记录*/
    public void updateIncomeType(IncomeType incomeType) throws Exception {
        incomeTypeMapper.updateIncomeType(incomeType);
    }

    /*删除一条收入类型记录*/
    public void deleteIncomeType (int incomeTypeId) throws Exception {
        incomeTypeMapper.deleteIncomeType(incomeTypeId);
    }

    /*删除多条收入类型信息*/
    public int deleteIncomeTypes (String incomeTypeIds) throws Exception {
    	String _incomeTypeIds[] = incomeTypeIds.split(",");
    	for(String _incomeTypeId: _incomeTypeIds) {
    		incomeTypeMapper.deleteIncomeType(Integer.parseInt(_incomeTypeId));
    	}
    	return _incomeTypeIds.length;
    }
}
