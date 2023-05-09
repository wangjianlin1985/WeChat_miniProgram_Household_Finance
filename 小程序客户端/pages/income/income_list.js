var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryViewHidden: true, //是否隐藏查询条件界面
    incomeTypeObj_Index:"0", //图书分类查询条件
    incomeTypes: [{"incomeTypeId":0,"incomeTypeName":"不限制"}],
    incomeFrom: "", //收入来源查询关键字
    payWayObj_Index:"0", //图书分类查询条件
    payWays: [{"payWayId":0,"payWayName":"不限制"}],
    payAccount: "", //收入账号查询关键字
    incomeDate: "", //收入日期查询关键字
    userObj_Index:"0", //图书分类查询条件
    userInfos: [{"user_name":"","name":"不限制"}],
    incomes: [], //界面显示的收入信息列表数据
    page_size: 8, //每页显示几条数据
    page: 1,  //当前要显示第几页
    totalPage: null, //总的页码数
    loading_hide: true, //是否隐藏加载动画
    nodata_hide: true, //是否隐藏没有数据记录提示
  },

  // 加载收入信息列表
  listIncome: function () {
    var self = this
    var url = config.basePath + "api/income/userList"
    //如果要显示的页码超过总页码不操作
    if(self.data.totalPage != null && self.data.page > self.data.totalPage) return
    self.setData({
      loading_hide: false,  //显示加载动画
    })
    //提交查询参数到服务器查询数据列表
    utils.sendRequest(url, {
      "incomeTypeObj.incomeTypeId": self.data.incomeTypes[self.data.incomeTypeObj_Index].incomeTypeId,
      "incomeFrom": self.data.incomeFrom,
      "payWayObj.payWayId": self.data.payWays[self.data.payWayObj_Index].payWayId,
      "payAccount": self.data.payAccount,
      "incomeDate": self.data.incomeDate,
      "userObj.user_name": self.data.userInfos[self.data.userObj_Index].user_name,
      "page": self.data.page,
      "rows": self.data.page_size,
    }, function (res) { 
      wx.stopPullDownRefresh()
      setTimeout(function () {  
        self.setData({
          incomes: self.data.incomes.concat(res.data.list),
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
  queryIncome: function(e) {
    var self = this
    self.setData({
      page: 1,
      totalPage: null,
      incomes: [],
      loading_hide: true, //隐藏加载动画
      nodata_hide: true, //隐藏没有数据记录提示 
      queryViewHidden: true, //隐藏查询视图
    })
    self.listIncome()
  },

  //查询参数收入日期选择事件
  bind_incomeDate_change: function (e) {
    this.setData({
      incomeDate: e.detail.value
    })
  },
  //清空查询参数收入日期
  clear_incomeDate: function (e) {
    this.setData({
      incomeDate: "",
    })
  },

  //绑定查询参数输入事件
  searchValueInput: function (e) {
    var id = e.target.dataset.id
    if (id == "incomeFrom") {
      this.setData({
        "incomeFrom": e.detail.value,
      })
    }

    if (id == "payAccount") {
      this.setData({
        "payAccount": e.detail.value,
      })
    }

  },

  //查询参数收入类型选择事件
  bind_incomeTypeObj_change: function(e) {
    this.setData({
      incomeTypeObj_Index: e.detail.value
    })
  },

  //查询参数支付方式选择事件
  bind_payWayObj_change: function(e) {
    this.setData({
      payWayObj_Index: e.detail.value
    })
  },

  //查询参数用户选择事件
  bind_userObj_change: function(e) {
    this.setData({
      userObj_Index: e.detail.value
    })
  },

  init_query_params: function() { 
    var self = this
    var url = null
    //初始化收入类型下拉框
    url = config.basePath + "api/incomeType/listAll"
    utils.sendRequest(url,null,function(res){
      wx.stopPullDownRefresh();
      self.setData({
        incomeTypes: self.data.incomeTypes.concat(res.data),
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

  //删除收入信息记录
  removeIncome: function (e) {
    var self = this
    var incomeId = e.currentTarget.dataset.incomeid
    wx.showModal({
      title: '提示',
      content: '确定要删除incomeId=' + incomeId + '的记录吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var url = config.basePath + "api/income/delete/" + incomeId
          utils.sendRequest(url, null, function (res) {
            wx.stopPullDownRefresh();
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 500
            })
            //删除收入信息后客户端同步删除数据
            var incomes = self.data.incomes;
            for (var i = 0; i < incomes.length; i++) {
              if (incomes[i].incomeId == incomeId) {
                incomes.splice(i, 1)
                break
              }
            }
            self.setData({ incomes: incomes })
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
    this.listIncome()
    this.init_query_params()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    self.setData({
      page: 1,  //显示最新的第1页结果
      incomes: [], //清空收入信息数据
      nodata_hide: true, //隐藏没数据提示
    })
    self.listIncome()
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
      self.listIncome()
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

