<%@ page language="java" import="java.util.*"  contentType="text/html;charset=UTF-8"%>
<jsp:include page="../check_logstate.jsp"/>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/userInfo.css" />
<div id="userInfoAddDiv">
	<form id="userInfoAddForm" enctype="multipart/form-data"  method="post">
		<div>
			<span class="label">亲友账号:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="userInfo_user_name" name="userInfo.user_name" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">登录密码:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="userInfo_password" name="userInfo.password" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">姓名:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="userInfo_name" name="userInfo.name" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">性别:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="userInfo_sex" name="userInfo.sex" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">家庭关系:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="userInfo_homeName" name="userInfo.homeName" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">职业:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="userInfo_workName" name="userInfo.workName" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">出生日期:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="userInfo_birthday" name="userInfo.birthday" />

			</span>

		</div>
		<div>
			<span class="label">用户照片:</span>
			<span class="inputControl">
				<input id="userPhotoFile" name="userPhotoFile" type="file" size="50" />
			</span>
		</div>
		<div>
			<span class="label">工作地址:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="userInfo_address" name="userInfo.address" style="width:200px" />

			</span>

		</div>
		<div class="operation">
			<a id="userInfoAddButton" class="easyui-linkbutton">添加</a>
			<a id="userInfoClearButton" class="easyui-linkbutton">重填</a>
		</div> 
	</form>
</div>
<script src="${pageContext.request.contextPath}/UserInfo/js/userInfo_add.js"></script> 
