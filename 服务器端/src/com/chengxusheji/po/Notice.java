package com.chengxusheji.po;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;
import org.json.JSONException;
import org.json.JSONObject;
import com.client.utils.JsonUtils;
import com.client.utils.SessionConsts;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class Notice {
    /*记录id*/
    private Integer noticeId;
    public Integer getNoticeId(){
        return noticeId;
    }
    public void setNoticeId(Integer noticeId){
        this.noticeId = noticeId;
    }

    /*标题*/
    @NotEmpty(message="标题不能为空")
    private String title;
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    /*内容*/
    @NotEmpty(message="内容不能为空")
    private String content;
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    /*发布日期*/
    @NotEmpty(message="发布日期不能为空")
    private String addDate;
    public String getAddDate() {
        return addDate;
    }
    public void setAddDate(String addDate) {
        this.addDate = addDate;
    }

    @JsonIgnore
    public JSONObject getJsonObject() throws JSONException {
    	JSONObject jsonNotice=new JSONObject(); 
		jsonNotice.accumulate("noticeId", this.getNoticeId());
		jsonNotice.accumulate("title", this.getTitle());
		jsonNotice.accumulate("content", this.getContent());
		jsonNotice.accumulate("addDate", this.getAddDate().length()>19?this.getAddDate().substring(0,19):this.getAddDate());
		return jsonNotice;
    }

    @Override
	public String toString() {
		return JsonUtils.toJson(this);
	}
}