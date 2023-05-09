package com.chengxusheji.po;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;
import org.json.JSONException;
import org.json.JSONObject;
import com.client.utils.JsonUtils;
import com.client.utils.SessionConsts;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class IncomeType {
    /*收入类别id*/
    private Integer incomeTypeId;
    public Integer getIncomeTypeId(){
        return incomeTypeId;
    }
    public void setIncomeTypeId(Integer incomeTypeId){
        this.incomeTypeId = incomeTypeId;
    }

    /*收入类别名称*/
    @NotEmpty(message="收入类别名称不能为空")
    private String incomeTypeName;
    public String getIncomeTypeName() {
        return incomeTypeName;
    }
    public void setIncomeTypeName(String incomeTypeName) {
        this.incomeTypeName = incomeTypeName;
    }

    @JsonIgnore
    public JSONObject getJsonObject() throws JSONException {
    	JSONObject jsonIncomeType=new JSONObject(); 
		jsonIncomeType.accumulate("incomeTypeId", this.getIncomeTypeId());
		jsonIncomeType.accumulate("incomeTypeName", this.getIncomeTypeName());
		return jsonIncomeType;
    }

    @Override
	public String toString() {
		return JsonUtils.toJson(this);
	}
}