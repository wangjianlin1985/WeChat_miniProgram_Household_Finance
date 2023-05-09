package com.chengxusheji.mapper;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.chengxusheji.po.IncomeType;

public interface IncomeTypeMapper {
	/*添加收入类型信息*/
	public void addIncomeType(IncomeType incomeType) throws Exception;

	/*按照查询条件分页查询收入类型记录*/
	public ArrayList<IncomeType> queryIncomeType(@Param("where") String where,@Param("startIndex") int startIndex,@Param("pageSize") int pageSize) throws Exception;

	/*按照查询条件查询所有收入类型记录*/
	public ArrayList<IncomeType> queryIncomeTypeList(@Param("where") String where) throws Exception;

	/*按照查询条件的收入类型记录数*/
	public int queryIncomeTypeCount(@Param("where") String where) throws Exception; 

	/*根据主键查询某条收入类型记录*/
	public IncomeType getIncomeType(int incomeTypeId) throws Exception;

	/*更新收入类型记录*/
	public void updateIncomeType(IncomeType incomeType) throws Exception;

	/*删除收入类型记录*/
	public void deleteIncomeType(int incomeTypeId) throws Exception;

}
