var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    incomeId: 0, //收入id
    incomeTypeObj_Index: "0", //收入类型
    incomeTypes: [],
    incomeFrom: "", //收入来源
    payWayObj_Index: "0", //支付方式
    payWays: [],
    payAccount: "", //收入账号
    incomeMoney: "", //收入金额
    incomeDate: "", //收入日期
    userObj_Index: "0", //用户
    userInfos: [],
    memo: "", //备注
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //初始化下拉框的信息
  init_select_params: function () { 
    var self = this;
    var url = null;
    url = config.basePath + "api/incomeType/listAll";
    utils.sendRequest(url, null, function (res) {
      wx.stopPullDownRefresh();
      self.setData({
        incomeTypes: res.data,
      });
    });
    url = config.basePath + "api/payWay/listAll";
    utils.sendRequest(url, null, function (res) {
      wx.stopPullDownRefresh();
      self.setData({
        payWays: res.data,
      });
    });
    url = config.basePath + "api/userInfo/listAll";
    utils.sendRequest(url, null, function (res) {
      wx.stopPullDownRefresh();
      self.setData({
        userInfos: res.data,
      });
    });
  },
  //收入类型改变事件
  bind_incomeTypeObj_change: function (e) {
    this.setData({
      incomeTypeObj_Index: e.detail.value
    })
  },

  //支付方式改变事件
  bind_payWayObj_change: function (e) {
    this.setData({
      payWayObj_Index: e.detail.value
    })
  },

  //用户改变事件
  bind_userObj_change: function (e) {
    this.setData({
      userObj_Index: e.detail.value
    })
  },

  //选择收入日期
  bind_incomeDate_change: function (e) {
    this.setData({
      incomeDate: e.detail.value
    })
  },
  //清空收入日期
  clear_incomeDate: function (e) {
    this.setData({
      incomeDate: "",
    });
  },

  /*提交添加收入信息到服务器 */
  formSubmit: function (e) {
    var self = this;
    var formData = e.detail.value;
    var url = config.basePath + "api/income/userAdd";
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 500
      })

      //提交成功后重置表单数据
      self.setData({
        incomeId: 0,
        incomeTypeObj_Index: "0",
    incomeFrom: "",
        payWayObj_Index: "0",
    payAccount: "",
    incomeMoney: "",
    incomeDate: "",
        userObj_Index: "0",
    memo: "",
        loadingHide: true,
        loadingText: "网络操作中。。",
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init_select_params();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var token = wx.getStorageSync('authToken');
    if (!token) {
      wx.navigateTo({
        url: '../mobile/mobile',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})

