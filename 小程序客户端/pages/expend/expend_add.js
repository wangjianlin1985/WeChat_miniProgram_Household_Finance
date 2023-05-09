var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    expendId: 0, //支出id
    expendTypeObj_Index: "0", //支出类型
    expendTypes: [],
    expendPurpose: "", //支出用途
    payWayObj_Index: "0", //支付方式
    payWays: [],
    payAccount: "", //支付账号
    expendMoney: "", //支付金额
    expendDate: "", //支付日期
    userInfoObj_Index: "0", //用户
    userInfos: [],
    memo: "", //备忘信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //初始化下拉框的信息
  init_select_params: function () { 
    var self = this;
    var url = null;
    url = config.basePath + "api/expendType/listAll";
    utils.sendRequest(url, null, function (res) {
      wx.stopPullDownRefresh();
      self.setData({
        expendTypes: res.data,
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
  //支出类型改变事件
  bind_expendTypeObj_change: function (e) {
    this.setData({
      expendTypeObj_Index: e.detail.value
    })
  },

  //支付方式改变事件
  bind_payWayObj_change: function (e) {
    this.setData({
      payWayObj_Index: e.detail.value
    })
  },

  //用户改变事件
  bind_userInfoObj_change: function (e) {
    this.setData({
      userInfoObj_Index: e.detail.value
    })
  },

  //选择支付日期
  bind_expendDate_change: function (e) {
    this.setData({
      expendDate: e.detail.value
    })
  },
  //清空支付日期
  clear_expendDate: function (e) {
    this.setData({
      expendDate: "",
    });
  },

  /*提交添加支出信息到服务器 */
  formSubmit: function (e) {
    var self = this;
    var formData = e.detail.value;
    var url = config.basePath + "api/expend/userAdd";
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 500
      })

      //提交成功后重置表单数据
      self.setData({
        expendId: 0,
        expendTypeObj_Index: "0",
    expendPurpose: "",
        payWayObj_Index: "0",
    payAccount: "",
    expendMoney: "",
    expendDate: "",
        userInfoObj_Index: "0",
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

