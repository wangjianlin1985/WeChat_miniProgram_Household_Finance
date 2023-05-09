var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryViewHidden: true, //是否隐藏查询条件界面
    expendTypeObj_Index:"0", //图书分类查询条件
    expendTypes: [{"expendTypeId":0,"expendTypeName":"不限制"}],
    expendPurpose: "", //支出用途查询关键字
    payWayObj_Index:"0", //图书分类查询条件
    payWays: [{"payWayId":0,"payWayName":"不限制"}],
    payAccount: "", //支付账号查询关键字
    expendDate: "", //支付日期查询关键字
    userInfoObj_Index:"0", //图书分类查询条件
    userInfos: [{"user_name":"","name":"不限制"}],
    expends: [], //界面显示的支出信息列表数据
    page_size: 8, //每页显示几条数据
    page: 1,  //当前要显示第几页
    totalPage: null, //总的页码数
    loading_hide: true, //是否隐藏加载动画
    nodata_hide: true, //是否隐藏没有数据记录提示
  },

  // 加载支出信息列表
  listExpend: function () {
    var self = this
    var url = config.basePath + "api/expend/userList"
    //如果要显示的页码超过总页码不操作
    if(self.data.totalPage != null && self.data.page > self.data.totalPage) return
    self.setData({
      loading_hide: false,  //显示加载动画
    })
    //提交查询参数到服务器查询数据列表
    utils.sendRequest(url, {
      "expendTypeObj.expendTypeId": self.data.expendTypes[self.data.expendTypeObj_Index].expendTypeId,
      "expendPurpose": self.data.expendPurpose,
      "payWayObj.payWayId": self.data.payWays[self.data.payWayObj_Index].payWayId,
      "payAccount": self.data.payAccount,
      "expendDate": self.data.expendDate,
      "userInfoObj.user_name": self.data.userInfos[self.data.userInfoObj_Index].user_name,
      "page": self.data.page,
      "rows": self.data.page_size,
    }, function (res) { 
      wx.stopPullDownRefresh()
      setTimeout(function () {  
        self.setData({
          expends: self.data.expends.concat(res.data.list),
          totalPage: res.data.totalPage,
          loading_hide: true
        })
      }, 500)
      //如果当前显示的是最后一页，则显示没数据提示
      if(self.data.page == self.data.totalPage) {
        self.setData({
          nodata_hide: false,
        })
      }
    })
  },

  //显示或隐藏查询视图切换
  toggleQueryViewHide: function () {
    this.setData({
      queryViewHidden: !this.data.queryViewHidden,
    })
  },

  //点击查询按钮的事件
  queryExpend: function(e) {
    var self = this
    self.setData({
      page: 1,
      totalPage: null,
      expends: [],
      loading_hide: true, //隐藏加载动画
      nodata_hide: true, //隐藏没有数据记录提示 
      queryViewHidden: true, //隐藏查询视图
    })
    self.listExpend()
  },

  //查询参数支付日期选择事件
  bind_expendDate_change: function (e) {
    this.setData({
      expendDate: e.detail.value
    })
  },
  //清空查询参数支付日期
  clear_expendDate: function (e) {
    this.setData({
      expendDate: "",
    })
  },

  //绑定查询参数输入事件
  searchValueInput: function (e) {
    var id = e.target.dataset.id
    if (id == "expendPurpose") {
      this.setData({
        "expendPurpose": e.detail.value,
      })
    }

    if (id == "payAccount") {
      this.setData({
        "payAccount": e.detail.value,
      })
    }

  },

  //查询参数支出类型选择事件
  bind_expendTypeObj_change: function(e) {
    this.setData({
      expendTypeObj_Index: e.detail.value
    })
  },

  //查询参数支付方式选择事件
  bind_payWayObj_change: function(e) {
    this.setData({
      payWayObj_Index: e.detail.value
    })
  },

  //查询参数用户选择事件
  bind_userInfoObj_change: function(e) {
    this.setData({
      userInfoObj_Index: e.detail.value
    })
  },

  init_query_params: function() { 
    var self = this
    var url = null
    //初始化支出类型下拉框
    url = config.basePath + "api/expendType/listAll"
    utils.sendRequest(url,null,function(res){
      wx.stopPullDownRefresh();
      self.setData({
        expendTypes: self.data.expendTypes.concat(res.data),
      })
    })
    //初始化支付方式下拉框
    url = config.basePath + "api/payWay/listAll"
    utils.sendRequest(url,null,function(res){
      wx.stopPullDownRefresh();
      self.setData({
        payWays: self.data.payWays.concat(res.data),
      })
    })
    //初始化用户下拉框
    url = config.basePath + "api/userInfo/listAll"
    utils.sendRequest(url,null,function(res){
      wx.stopPullDownRefresh();
      self.setData({
        userInfos: self.data.userInfos.concat(res.data),
      })
    })
  },

  //删除支出信息记录
  removeExpend: function (e) {
    var self = this
    var expendId = e.currentTarget.dataset.expendid
    wx.showModal({
      title: '提示',
      content: '确定要删除expendId=' + expendId + '的记录吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var url = config.basePath + "api/expend/delete/" + expendId
          utils.sendRequest(url, null, function (res) {
            wx.stopPullDownRefresh();
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 500
            })
            //删除支出信息后客户端同步删除数据
            var expends = self.data.expends;
            for (var i = 0; i < expends.length; i++) {
              if (expends[i].expendId == expendId) {
                expends.splice(i, 1)
                break
              }
            }
            self.setData({ expends: expends })
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listExpend()
    this.init_query_params()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    self.setData({
      page: 1,  //显示最新的第1页结果
      expends: [], //清空支出信息数据
      nodata_hide: true, //隐藏没数据提示
    })
    self.listExpend()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this
    if (self.data.page < self.data.totalPage) {
      self.setData({
        page: self.data.page + 1, 
      })
      self.listExpend()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})

