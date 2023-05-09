package com.chengxusheji.mapper;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.chengxusheji.po.Income;

public interface IncomeMapper {
	/*添加收入信息信息*/
	public void addIncome(Income income) throws Exception;

	/*按照查询条件分页查询收入信息记录*/
	public ArrayList<Income> queryIncome(@Param("where") String where,@Param("startIndex") int startIndex,@Param("pageSize") int pageSize) throws Exception;

	/*按照查询条件查询所有收入信息记录*/
	public ArrayList<Income> queryIncomeList(@Param("where") String where) throws Exception;
	
	/*查询最新收入信息记录*/
	public ArrayList<Income> queryZxIncomeList() throws Exception;

	/*按照查询条件的收入信息记录数*/
	public int queryIncomeCount(@Param("where") String where) throws Exception; 

	/*根据主键查询某条收入信息记录*/
	public Income getIncome(int incomeId) throws Exception;

	/*更新收入信息记录*/
	public void updateIncome(Income income) throws Exception;

	/*删除收入信息记录*/
	public void deleteIncome(int incomeId) throws Exception;

}
