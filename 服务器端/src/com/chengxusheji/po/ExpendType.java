package com.chengxusheji.po;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;
import org.json.JSONException;
import org.json.JSONObject;
import com.client.utils.JsonUtils;
import com.client.utils.SessionConsts;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class ExpendType {
    /*支出类型id*/
    private Integer expendTypeId;
    public Integer getExpendTypeId(){
        return expendTypeId;
    }
    public void setExpendTypeId(Integer expendTypeId){
        this.expendTypeId = expendTypeId;
    }

    /*支出类型名称*/
    @NotEmpty(message="支出类型名称不能为空")
    private String expendTypeName;
    public String getExpendTypeName() {
        return expendTypeName;
    }
    public void setExpendTypeName(String expendTypeName) {
        this.expendTypeName = expendTypeName;
    }

    @JsonIgnore
    public JSONObject getJsonObject() throws JSONException {
    	JSONObject jsonExpendType=new JSONObject(); 
		jsonExpendType.accumulate("expendTypeId", this.getExpendTypeId());
		jsonExpendType.accumulate("expendTypeName", this.getExpendTypeName());
		return jsonExpendType;
    }

    @Override
	public String toString() {
		return JsonUtils.toJson(this);
	}
}